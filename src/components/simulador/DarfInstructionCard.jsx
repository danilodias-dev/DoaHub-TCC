import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Copy,
  Check,
  Printer,
  Building2,
  Users,
  Heart,
  ShieldCheck,
  ChevronDown,
  MapPin,
  Calendar,
  AlertTriangle,
  Building,
  Landmark,
  FileCheck,
  BookmarkPlus
} from 'lucide-react';
import { FISCAL_REGIONS, DARF_CODES } from '../../data/fiscalFunds';
import { useDonor } from '../../contexts/DonorContext';
import { useAuth } from '../../contexts/AuthContext';

function formatBRL(value) {
  if (!value || isNaN(value)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function DarfInstructionCard({
  calc,
  isPF,
  timingMode, // 'daa' | 'annual'
  onSelectTimingMode,
  selectedRegionId,
  onSelectRegionId
}) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [salvoMsg, setSalvoMsg] = useState(null);
  const { registrarDestinacao } = useDonor();
  const { isAuthenticated } = useAuth();

  const handleSalvarDestinacao = async (fundoTipo, valor, darfCodigo, fundoNome) => {
    if (!isAuthenticated) {
      setSalvoMsg('Faça login para salvar esta guia no seu histórico!');
      setTimeout(() => setSalvoMsg(null), 3500);
      return;
    }
    setSalvando(true);
    try {
      await registrarDestinacao({
        valor,
        fundo_governamental: `${fundoTipo} - ${fundoNome}`,
        codigo_darf: darfCodigo,
        status: 'Pendente',
      });
      setSalvoMsg(`Guia ${fundoTipo} registrada no seu painel com sucesso!`);
    } catch (err) {
      console.error(err);
      setSalvoMsg('Erro ao registrar no histórico.');
    } finally {
      setSalvando(false);
      setTimeout(() => setSalvoMsg(null), 4000);
    }
  };

  const currentRegion = FISCAL_REGIONS.find(r => r.id === selectedRegionId) || FISCAL_REGIONS[0];

  // Força 'annual' para PJ caso esteja selecionado 'daa'
  const effectiveTimingMode = isPF ? timingMode : 'annual';

  const timingKey = effectiveTimingMode === 'annual' ? 'ANO_CALENDARIO' : 'DAA';
  const ecaDarfCode = DARF_CODES.ECA[timingKey]?.code || '3351';
  // Para PJ no Fundo do Idoso, a Receita Federal utiliza o código 6023 (ou depósito direto); omitir o código 9090 que é exclusivo do IRPF DAA
  const idosoDarfCode = isPF ? (effectiveTimingMode === 'annual' ? '6023' : '9090') : '6023';

  const ecaInfo = DARF_CODES.ECA[timingKey];
  const idosoInfo = DARF_CODES.IDOSO[timingKey];

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const generateFullSummaryText = () => {
    return `=== DOAHUB - INSTRUÇÕES DE DESTINAÇÃO FISCAL ===
Exercício: ${new Date().getFullYear()} | Modalidade: ${isPF ? 'Pessoa Física (IRPF)' : 'Pessoa Jurídica (IRPJ Lucro Real)'}
Momento: ${effectiveTimingMode === 'annual' ? 'No Decorrer do Ano-Calendário / Apuração' : 'Diretamente na Declaração (DAA)'}
Região / Fundo: ${currentRegion.name}

1. FUNDO DA CRIANÇA E DO ADOLESCENTE (ECA):
- Valor a Destinar: ${formatBRL(calc.ecaLimit)}
- Forma de Repasse / Código: ${isPF ? `DARF Cód. ${ecaDarfCode}` : `DARF Cód. ${ecaDarfCode} ou Depósito Bancário`}
- CNPJ do Fundo: ${currentRegion.ecaFund.cnpj}
- Beneficiário: ${currentRegion.ecaFund.name}
- Banco: ${currentRegion.ecaFund.bank} | Agência: ${currentRegion.ecaFund.agency} | C/C: ${currentRegion.ecaFund.account}
- Conselho Gestor: ${currentRegion.ecaFund.managingCouncil}
- Base Legal: Art. 260 da Lei Federal nº 8.069/90 (ECA)

2. FUNDO DO IDOSO:
- Valor a Destinar: ${formatBRL(calc.idosoLimit)}
- Forma de Repasse / Código: ${isPF ? (effectiveTimingMode === 'annual' ? `DARF Cód. ${idosoDarfCode}` : `DARF Cód. ${idosoDarfCode} (DAA)`) : `DARF Cód. ${idosoDarfCode} ou Depósito Bancário`}
- CNPJ do Fundo: ${currentRegion.idosoFund.cnpj}
- Beneficiário: ${currentRegion.idosoFund.name}
- Banco: ${currentRegion.idosoFund.bank} | Agência: ${currentRegion.idosoFund.agency} | C/C: ${currentRegion.idosoFund.account}
- Conselho Gestor: ${currentRegion.idosoFund.managingCouncil}
- Base Legal: Lei Federal nº 12.213/2010

VALOR TOTAL DA DESTINAÇÃO: ${formatBRL(calc.totalLimit)}
* Comprovação: ${isPF ? 'Recolhimento via DARF abatido no ajuste do IRPF' : 'Recibo de Doação Incentivada emitido pelo Conselho para escrituração no LALUR / ECF.'}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-[2.5rem] border border-graphite/10 shadow-xl overflow-hidden mt-6"
    >
      {/* ─── Top Header Oficial ────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-graphite-dark via-graphite to-graphite-dark text-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald/20 border border-emerald/40 flex items-center justify-center text-emerald flex-shrink-0">
            {isPF ? <FileText className="w-7 h-7" /> : <Building className="w-7 h-7" />}
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald/25 text-emerald-light px-2.5 py-0.5 rounded-full border border-emerald/30">
                RF04 · Roteamento Fiscal {isPF ? '(PF)' : '(PJ Lucro Real)'}
              </span>
              <span className="text-xs text-white/50 hidden sm:inline">Modelo Non-Custodial</span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-extrabold tracking-tight">
              {isPF ? 'Instrução Oficial de Emissão de DARF' : 'Instrução de Destinação de IRPJ (Lucro Real)'}
            </h3>
            <p className="text-xs text-white/70">
              {isPF
                ? 'Parametrização exata para preenchimento na Declaração de Imposto de Renda (IRPF).'
                : 'Instruções para depósito bancário direto ao Fundo e lançamento contábil no LALUR / ECF.'}
            </p>
          </div>
        </div>

        {/* Botões de Ação Topo */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => copyToClipboard(generateFullSummaryText(), 'all')}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
          >
            {copiedKey === 'all' ? (
              <>
                <Check className="w-4 h-4 text-emerald" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar Todos os Dados
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald hover:bg-emerald-dark text-white transition-all shadow-md shadow-emerald/20"
          >
            <Printer className="w-4 h-4" />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {/* ─── Controles de Contexto Fiscal ─────────────────────────────── */}
      {salvoMsg && (
        <div className="mx-6 mt-4 p-3 bg-emerald/10 border border-emerald/20 text-emerald-dark text-xs font-bold rounded-2xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald flex-shrink-0" />
          <span>{salvoMsg}</span>
        </div>
      )}
      <div className="p-6 md:p-8 bg-ice/40 border-b border-graphite/5 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seletor de Momento de Destinação */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-graphite-light flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald" />
            Momento da Destinação Tributária
          </label>
          <div className="grid grid-cols-2 gap-2 bg-white p-1.5 rounded-2xl border border-graphite/10">
            {/* Opção DAA — Desabilitada para PJ */}
            <button
              type="button"
              disabled={!isPF}
              onClick={() => isPF && onSelectTimingMode('daa')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left flex flex-col gap-0.5 ${
                !isPF
                  ? 'bg-graphite/5 text-graphite-light/50 cursor-not-allowed border border-graphite/5'
                  : timingMode === 'daa'
                  ? 'bg-emerald text-white shadow-sm'
                  : 'text-graphite hover:bg-ice'
              }`}
            >
              <span>Na Declaração (DAA)</span>
              <span className={`text-[10px] font-normal ${!isPF ? 'text-graphite-light/40' : timingMode === 'daa' ? 'text-white/80' : 'text-graphite-light'}`}>
                {isPF ? 'Exclusivo PGD IRPF (3351 / 9090)' : 'Não aplicável a PJ'}
              </span>
            </button>

            {/* Opção Ano-Calendário */}
            <button
              type="button"
              onClick={() => onSelectTimingMode('annual')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left flex flex-col gap-0.5 ${
                effectiveTimingMode === 'annual'
                  ? 'bg-emerald text-white shadow-sm'
                  : 'text-graphite hover:bg-ice'
              }`}
            >
              <span>No Ano-Calendário / Apuração</span>
              <span className={`text-[10px] font-normal ${effectiveTimingMode === 'annual' ? 'text-white/80' : 'text-graphite-light'}`}>
                {isPF ? 'Códigos 3351 & 6023' : 'Recolhimento Corporativo'}
              </span>
            </button>
          </div>

          <span className="text-[11px] text-graphite-light">
            {isPF ? (
              timingMode === 'daa'
                ? 'Destinação direta durante a entrega do IRPF (março/abril) com emissão de DARF pelo próprio programa da Receita.'
                : 'Destinação antecipada ao longo do ano corrente com recolhimento via DARF ou guia bancária do fundo.'
            ) : (
              <strong className="text-emerald font-semibold">
                Pessoas Jurídicas (Lucro Real) efetuam a destinação exclusivamente no ano-calendário/período de apuração.
              </strong>
            )}
          </span>
        </div>

        {/* Seletor de Fundo Público / Região */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-graphite-light flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald" />
            Fundo Público e Região Beneficiária
          </label>
          <div className="relative">
            <select
              value={selectedRegionId}
              onChange={(e) => onSelectRegionId(e.target.value)}
              className="w-full bg-white border border-graphite/10 rounded-2xl py-3 pl-4 pr-10 text-xs md:text-sm font-bold text-graphite-dark outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/10 cursor-pointer appearance-none"
            >
              {FISCAL_REGIONS.map(region => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-light pointer-events-none" />
          </div>
          <span className="text-[11px] text-graphite-light">
            Os valores são creditados exclusivamente na conta bancária oficial do fundo vinculado ao município/estado.
          </span>
        </div>
      </div>

      {/* ─── Cards das Guias DARF (ECA & Idoso) ────────────────────────── */}
      <div className="p-6 md:p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 1. GUIA DARF - ECA */}
          <div className="border border-blue-200 bg-blue-50/40 rounded-3xl p-6 flex flex-col justify-between gap-5 relative overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md shadow-blue-500/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                    Guia 1 · Infância e Juventude
                  </span>
                  <h4 className="text-base font-bold text-graphite-dark mt-1">
                    Fundo dos Direitos da Criança (ECA)
                  </h4>
                </div>
              </div>

              {/* Badge Código da Receita ou Forma de Repasse */}
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-graphite-light uppercase font-bold">
                  {isPF ? 'Cód. Receita' : 'Forma de Repasse'}
                </span>
                <span className="text-sm md:text-base font-black font-display text-blue-700 bg-white border border-blue-200 px-2.5 py-0.5 rounded-lg shadow-sm">
                  {isPF ? ecaDarfCode : `DARF ${ecaDarfCode} / Depósito`}
                </span>
              </div>
            </div>

            {/* Dados Parametrizados */}
            <div className="bg-white rounded-2xl p-4 border border-blue-100/80 flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-graphite/5">
                <span className="text-graphite-light">Valor a Destinar:</span>
                <span className="font-display font-black text-blue-900 text-lg">
                  {formatBRL(calc.ecaLimit)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-graphite-light">CNPJ do Fundo:</span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-graphite-dark">
                  <span>{currentRegion.ecaFund.cnpj}</span>
                  <button
                    type="button"
                    title="Copiar CNPJ"
                    onClick={() => copyToClipboard(currentRegion.ecaFund.cnpj, 'cnpj-eca')}
                    className="p-1 hover:bg-ice rounded text-graphite-light hover:text-blue-600 transition-colors"
                  >
                    {copiedKey === 'cnpj-eca' ? <Check className="w-3.5 h-3.5 text-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-start gap-2">
                <span className="text-graphite-light flex-shrink-0">Beneficiário:</span>
                <span className="text-right font-medium text-graphite-dark truncate" title={currentRegion.ecaFund.name}>
                  {currentRegion.ecaFund.name}
                </span>
              </div>

              {/* Dados Bancários Oficiais para PJ/Depósito */}
              <div className="flex justify-between items-center bg-blue-50/60 p-2 rounded-xl border border-blue-100">
                <span className="text-graphite-light flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-blue-600" />
                  Conta Oficial:
                </span>
                <span className="font-mono font-bold text-blue-950">
                  {currentRegion.ecaFund.bank} · Ag: {currentRegion.ecaFund.agency} · C/C: {currentRegion.ecaFund.account}
                </span>
              </div>

              <div className="flex justify-between items-center text-[11px] pt-1 text-graphite-light/80">
                <span>Base Normativa:</span>
                <span className="italic">{ecaInfo?.law}</span>
              </div>

              {!isPF && (
                <div className="bg-emerald/5 p-2 rounded-xl border border-emerald/10 text-[11px] text-emerald-dark font-medium flex items-center gap-1.5 mt-1">
                  <FileCheck className="w-3.5 h-3.5 text-emerald flex-shrink-0" />
                  <span>Comprovação via Recibo de Doação Incentivada (CMDCA) para lançamento no LALUR.</span>
                </div>
              )}
            </div>

            {/* Ação rápida da guia */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-blue-200/50">
              <span className="text-[11px] text-blue-800 font-medium">
                {isPF ? ecaInfo?.programSection : 'Depósito Direto ou Guia de Arrecadação'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSalvarDestinacao('ECA', calc.ecaLimit, ecaDarfCode, currentRegion.ecaFund.name)}
                  disabled={salvando}
                  className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  Salvar Guia
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(
                    `FUNDO ECA: CNPJ ${currentRegion.ecaFund.cnpj} | Banco: ${currentRegion.ecaFund.bank} Ag: ${currentRegion.ecaFund.agency} C/C: ${currentRegion.ecaFund.account} | Valor: ${formatBRL(calc.ecaLimit)}`,
                    'guide-eca'
                  )}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  {copiedKey === 'guide-eca' ? <Check className="w-3.5 h-3.5 text-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                  {isPF ? 'Copiar Linha Digitável' : 'Copiar Dados Bancários'}
                </button>
              </div>
            </div>
          </div>

          {/* 2. GUIA DARF - IDOSO */}
          <div className="border border-rose-200 bg-rose-50/40 rounded-3xl p-6 flex flex-col justify-between gap-5 relative overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md shadow-rose-500/20">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                    Guia 2 · Terceira Idade
                  </span>
                  <h4 className="text-base font-bold text-graphite-dark mt-1">
                    Fundo Municipal do Idoso (FMI)
                  </h4>
                </div>
              </div>

              {/* Badge Código da Receita / Forma de Repasse */}
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-graphite-light uppercase font-bold">
                  {isPF ? 'Cód. Receita' : 'Forma de Repasse'}
                </span>
                <span className="text-sm md:text-base font-black font-display text-rose-700 bg-white border border-rose-200 px-2.5 py-0.5 rounded-lg shadow-sm">
                  {isPF ? idosoDarfCode : `DARF ${idosoDarfCode} / Depósito`}
                </span>
              </div>
            </div>

            {/* Dados Parametrizados */}
            <div className="bg-white rounded-2xl p-4 border border-rose-100/80 flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-graphite/5">
                <span className="text-graphite-light">Valor a Destinar:</span>
                <span className="font-display font-black text-rose-900 text-lg">
                  {formatBRL(calc.idosoLimit)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-graphite-light">CNPJ do Fundo:</span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-graphite-dark">
                  <span>{currentRegion.idosoFund.cnpj}</span>
                  <button
                    type="button"
                    title="Copiar CNPJ"
                    onClick={() => copyToClipboard(currentRegion.idosoFund.cnpj, 'cnpj-idoso')}
                    className="p-1 hover:bg-ice rounded text-graphite-light hover:text-rose-600 transition-colors"
                  >
                    {copiedKey === 'cnpj-idoso' ? <Check className="w-3.5 h-3.5 text-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-start gap-2">
                <span className="text-graphite-light flex-shrink-0">Beneficiário:</span>
                <span className="text-right font-medium text-graphite-dark truncate" title={currentRegion.idosoFund.name}>
                  {currentRegion.idosoFund.name}
                </span>
              </div>

              {/* Dados Bancários Oficiais para PJ/Depósito */}
              <div className="flex justify-between items-center bg-rose-50/60 p-2 rounded-xl border border-rose-100">
                <span className="text-graphite-light flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-rose-600" />
                  Conta Oficial:
                </span>
                <span className="font-mono font-bold text-rose-950">
                  {currentRegion.idosoFund.bank} · Ag: {currentRegion.idosoFund.agency} · C/C: {currentRegion.idosoFund.account}
                </span>
              </div>

              <div className="flex justify-between items-center text-[11px] pt-1 text-graphite-light/80">
                <span>Base Normativa:</span>
                <span className="italic">{idosoInfo?.law}</span>
              </div>

              {!isPF && (
                <div className="bg-emerald/5 p-2 rounded-xl border border-emerald/10 text-[11px] text-emerald-dark font-medium flex items-center gap-1.5 mt-1">
                  <FileCheck className="w-3.5 h-3.5 text-emerald flex-shrink-0" />
                  <span>Comprovação via Recibo de Doação Incentivada (CMI) para lançamento no LALUR.</span>
                </div>
              )}
            </div>

            {/* Ação rápida da guia */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-rose-200/50">
              <span className="text-[11px] text-rose-800 font-medium">
                {isPF ? idosoInfo?.programSection : 'Depósito Direto ou Guia de Arrecadação'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSalvarDestinacao('IDOSO', calc.idosoLimit, idosoDarfCode, currentRegion.idosoFund.name)}
                  disabled={salvando}
                  className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 transition-colors"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  Salvar Guia
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(
                    `FUNDO IDOSO: CNPJ ${currentRegion.idosoFund.cnpj} | Banco: ${currentRegion.idosoFund.bank} Ag: ${currentRegion.idosoFund.agency} C/C: ${currentRegion.idosoFund.account} | Valor: ${formatBRL(calc.idosoLimit)}`,
                    'guide-idoso'
                  )}
                  className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-900 hover:underline"
                >
                  {copiedKey === 'guide-idoso' ? <Check className="w-3.5 h-3.5 text-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                  {isPF ? 'Copiar Linha Digitável' : 'Copiar Dados Bancários'}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ─── Passo a Passo Dinâmico (PF vs PJ) ─────────────────── */}
        <div className="bg-graphite-dark/5 rounded-2xl p-5 border border-graphite/10 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-graphite-dark font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald" />
            {isPF
              ? 'Passo a Passo de Preenchimento no Programa da Receita Federal (PGD IRPF)'
              : 'Passo a Passo Corporativo para Destinação de IRPJ (Lucro Real)'}
          </div>

          {isPF ? (
            /* Fluxo Pessoa Física */
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-graphite leading-relaxed list-decimal list-inside">
              <li className="bg-white p-3 rounded-xl border border-graphite/5">
                <strong>1. Localize a Ficha:</strong> No menu lateral esquerdo do IRPF, clique em <em>"Doações Diretamente na Declaração"</em> e escolha a aba (Criança/Adolescente ou Idoso).
              </li>
              <li className="bg-white p-3 rounded-xl border border-graphite/5">
                <strong>2. Selecione o Fundo:</strong> Clique em <em>"Novo"</em>, selecione o Tipo de Fundo (<strong>{currentRegion.ecaFund.esfera}</strong>), UF (<strong>{currentRegion.state}</strong>) e confirme o CNPJ <strong>{currentRegion.ecaFund.cnpj}</strong>.
              </li>
              <li className="bg-white p-3 rounded-xl border border-graphite/5">
                <strong>3. Emita e Pague o DARF:</strong> No menu <em>"Imprimir" &gt; "DARF - Doações Diretamente na Declaração"</em>, pague a guia até o último dia útil de abril. O valor abaterá do seu imposto a pagar ou aumentará sua restituição!
              </li>
            </ol>
          ) : (
            /* Fluxo Pessoa Jurídica */
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-graphite leading-relaxed list-decimal list-inside">
              <li className="bg-white p-3 rounded-xl border border-graphite/5">
                <strong>1. Efetue a Transferência:</strong> Realize a transferência do valor (respeitando o teto de 1% IRPJ por fundo) diretamente para a conta bancária oficial do Fundo Municipal (FUMCAD/FMID) até o final do período de apuração.
              </li>
              <li className="bg-white p-3 rounded-xl border border-graphite/5">
                <strong>2. Obtenha o Recibo Oficial:</strong> Envie o comprovante de depósito ao Conselho de Direitos (CMDCA/CMI) solicitando a emissão do <em>Recibo de Doação Incentivada</em> nominal à sua empresa.
              </li>
              <li className="bg-white p-3 rounded-xl border border-graphite/5">
                <strong>3. Lançamento no LALUR / ECF:</strong> Entregue o recibo oficial à equipe contábil para registro de dedução do IRPJ no LALUR e transmissão na ECF (Escrituração Contábil Fiscal).
              </li>
            </ol>
          )}
        </div>

      </div>
    </motion.div>
  );
}
