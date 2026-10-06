import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  User,
  Building2,
  ChevronDown,
  InfoIcon,
  ShieldCheck,
  AlertTriangle,
  Heart,
  Users,
  CheckCircle2,
  Sparkles,
  X,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Sliders,
  RotateCcw,
  Percent,
} from 'lucide-react';
import { DarfInstructionCard } from '../../components/fiscal/DarfInstructionCard';

// ─── Animation Tokens ────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
  transition: { duration: 0.35, ease: 'easeOut' },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
  transition: { duration: 0.25 },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatBRL(value) {
  if (!value || isNaN(value)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function parseBRL(str) {
  if (!str) return 0;
  const cleaned = str.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

function maskCurrency(raw) {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  const cents = parseInt(digits, 10);
  const brl = cents / 100;
  return brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function maskCurrencyNoPrefix(raw) {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  const cents = parseInt(digits, 10);
  const brl = cents / 100;
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(brl);
}

function parseBRLNoPrefix(str) {
  if (!str) return 0;
  const cleaned = str.replace(/[^\d]/g, '');
  return parseInt(cleaned, 10) / 100 || 0;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Tooltip({ children, content }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const openTooltip = () => {
    clearTimeout(timerRef.current);
    setOpen(true);
  };

  const scheduleClose = () => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  const toggleTooltip = () => {
    setOpen(prev => !prev);
  };

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onClick={toggleTooltip}
        onMouseEnter={openTooltip}
        onMouseLeave={scheduleClose}
        onFocus={openTooltip}
        onBlur={scheduleClose}
        className="ml-1.5 w-6 h-6 flex items-center justify-center text-graphite-light hover:text-emerald transition-colors duration-fast focus:outline-none rounded"
        aria-label="Informação adicional"
        aria-expanded={open}
      >
        <InfoIcon className="w-3.5 h-3.5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            {...fadeIn}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 bg-graphite-dark text-white text-xs rounded-2xl px-3 py-2.5 shadow-2xl pointer-events-none leading-relaxed"
          >
            {content}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-graphite-dark" />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </span>
  );
}

// Entity Card — usa verde explícito (border-green-500 / bg-green-50) para o estado ativo
function EntityCard({ id, label, description, icon: Icon, selected, onClick }) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={`relative flex flex-col gap-2 p-5 rounded-3xl border-2 text-left transition-all duration-default focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500
        ${selected
          ? 'border-green-500 bg-green-50 shadow-md shadow-green-500/10'
          : 'border-graphite/10 bg-white hover:border-green-400/50 hover:shadow-sm'
        }`}
    >
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-default
        ${selected ? 'bg-green-500 text-white' : 'bg-ice text-graphite-light'}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <span className={`font-bold text-sm font-display ${selected ? 'text-green-800' : 'text-graphite-dark'}`}>
        {label}
      </span>
      {description && (
        <span className={`text-xs leading-relaxed ${selected ? 'text-green-700' : 'text-graphite-light'}`}>{description}</span>
      )}
      {selected && (
        <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-green-500" />
      )}
    </button>
  );
}

// Radio Option — usado no Step 2 (Modelo de Declaração / Regime Tributário)
function RadioOption({ id, name, value, currentValue, label, description, allowed, onChange }) {
  const isSelected = currentValue === value;
  return (
    <label
      htmlFor={id}
      className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-default
        ${isSelected && allowed  ? 'border-green-500 bg-green-50'
        : isSelected && !allowed ? 'border-red-400 bg-red-50'
        : 'border-graphite/10 bg-white hover:border-graphite/25 hover:shadow-sm'
        }`}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="mt-0.5 w-4 h-4 accent-green-600 cursor-pointer flex-shrink-0"
      />
      <div className="flex flex-col gap-0.5">
        <span className={`text-sm font-bold font-display leading-tight
          ${isSelected && allowed  ? 'text-green-800'
          : isSelected && !allowed ? 'text-red-700'
          : 'text-graphite-dark'
          }`}>
          {label}
        </span>
        {description && (
          <span className={`text-xs leading-relaxed
            ${isSelected && allowed  ? 'text-green-700'
            : isSelected && !allowed ? 'text-red-600'
            : 'text-graphite-light'
            }`}>
            {description}
          </span>
        )}
      </div>
    </label>
  );
}

// SelectionCard mantido apenas para compatibilidade interna (não usado em Step 1/2 agora)
function SelectionCard({ id, label, description, icon: Icon, selected, onClick }) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={`relative flex flex-col gap-2 p-5 rounded-3xl border-2 text-left transition-all duration-default focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500
        ${selected
          ? 'border-green-500 bg-green-50 shadow-md shadow-green-500/10'
          : 'border-graphite/10 bg-white hover:border-green-400/50 hover:shadow-sm'
        }`}
    >
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-default
        ${selected ? 'bg-green-500 text-white' : 'bg-ice text-graphite-light'}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <span className={`font-bold text-sm font-display ${selected ? 'text-green-800' : 'text-graphite-dark'}`}>
        {label}
      </span>
      {description && (
        <span className="text-xs text-graphite-light leading-relaxed">{description}</span>
      )}
      {selected && (
        <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-green-500" />
      )}
    </button>
  );
}

function MetricCard({ label, value, highlight = false, sublabel, children }) {
  return (
    <motion.div
      layout
      {...fadeUp}
      className={`rounded-3xl p-5 flex flex-col gap-1 border
        ${highlight
          ? 'bg-emerald text-white border-emerald shadow-lg shadow-emerald/20'
          : 'bg-white border-graphite/8 shadow-sm'
        }`}
    >
      <span className={`text-xs font-semibold uppercase tracking-wider ${highlight ? 'text-white/70' : 'text-graphite-light'}`}>
        {label}
      </span>
      <span className={`text-2xl font-display font-extrabold ${highlight ? 'text-white' : 'text-graphite-dark'}`}>
        {value}
      </span>
      {sublabel && (
        <span className={`text-xs ${highlight ? 'text-white/60' : 'text-graphite-light'}`}>
          {sublabel}
        </span>
      )}
      {children}
    </motion.div>
  );
}

function BlockedWarning({ message }) {
  return (
    <motion.div
      {...fadeUp}
      className="flex gap-3 items-start bg-red-50 border-2 border-red-300 rounded-3xl p-5 shadow-sm shadow-red-100"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center mt-0.5">
        <AlertTriangle className="w-4 h-4 text-red-600" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold text-red-700">Regime não elegível</span>
        <p className="text-sm text-red-600 font-medium leading-relaxed">{message}</p>
      </div>
    </motion.div>
  );
}

function DestinationBucket({ icon: Icon, label, fund, value, colorClass }) {
  return (
    <div className={`flex flex-col gap-3 p-5 rounded-3xl border-2 ${colorClass}`}>
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" />
        <span className="text-sm font-bold font-display">{label}</span>
      </div>
      <p className="text-xs text-graphite-light leading-relaxed">{fund}</p>
      <span className="text-xl font-display font-extrabold text-graphite-dark">{formatBRL(value)}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function SimuladorIR() {
  const navigate = useNavigate();

  // ── States ──────────────────────────────────────────────────────────────────
  const [entity, setEntity]           = useState(null);       // 'pf' | 'pj'
  const [pfModel, setPfModel]         = useState(null);       // 'completo' | 'simplificado'
  const [pjRegime, setPjRegime]       = useState(null);       // 'lucro_real' | 'lucro_presumido' | 'simples'
  const [inputMode, setInputMode]     = useState('estimate'); // 'estimate' | 'exact'
  const [rawIncome, setRawIncome]     = useState('');
  const [rawTaxDue, setRawTaxDue]     = useState('');
  const [income, setIncome]           = useState(0);          // valor float da renda bruta
  const [taxDue, setTaxDue]           = useState(0);          // valor float do IR calculado
  const [lgpdConsent, setLgpdConsent] = useState(false);

  // ── RN01 & RF04 States ──────────────────────────────────────────────────────
  const [ecaRatio, setEcaRatio]                 = useState(50); // 0 a 100% para o Fundo da Criança (ECA)
  const [timingMode, setTimingMode]             = useState('daa'); // 'daa' (na declaração) | 'annual' (ano-calendário)
  const [selectedRegionId, setSelectedRegionId] = useState('sp-capital');

  // Resultado calculado — null quando vazio, objeto quando há resultado
  const [calc, setCalc] = useState(null);

  // ── Derived flags ───────────────────────────────────────────────────────────
  const isPF       = entity === 'pf';
  const isPJ       = entity === 'pj';
  const isBlocked  = (isPF && pfModel === 'simplificado') ||
                     (isPJ && pjRegime && pjRegime !== 'lucro_real');
  const isEligible = (isPF && pfModel === 'completo') || (isPJ && pjRegime === 'lucro_real');

  // ── Motor de Cálculo em Tempo Real (useEffect) ──────────────────────────────
  useEffect(() => {
    // Pré-condições obrigatórias: LGPD aceito e regime elegível
    if (!lgpdConsent || !isEligible) {
      setCalc(null);
      return;
    }

    // Imposto Devido:
    // 'estimate' → alíquota flat didática de 15% sobre renda bruta
    // 'exact'    → valor exato digitado pelo usuário
    const owedTax = inputMode === 'estimate' ? income * 0.15 : taxDue;

    if (owedTax <= 0) {
      setCalc(null);
      return;
    }

    // Limite máximo global de destinação por tipo de contribuinte:
    // PF: 6% do IR devido (Lei 8.069/90 + Lei 12.213/10)
    // PJ Lucro Real: 2% do IRPJ devido
    const limitPct   = isPF ? 0.06 : 0.02;
    const totalLimit = owedTax * limitPct;

    // Distribuição customizada livre (RN01)
    const ecaPctDecimal   = ecaRatio / 100;
    const idosoPctDecimal = (100 - ecaRatio) / 100;

    const ecaLimit   = totalLimit * ecaPctDecimal;
    const idosoLimit = totalLimit * idosoPctDecimal;

    // Alíquotas efetivas incidentes sobre o imposto devido
    const effectiveEcaPct   = limitPct * ecaPctDecimal;
    const effectiveIdosoPct = limitPct * idosoPctDecimal;

    setCalc({
      owedTax,
      totalLimit,
      ecaLimit,
      idosoLimit,
      limitPct,
      ecaRatio,
      effectiveEcaPct,
      effectiveIdosoPct,
      isEstimate: inputMode === 'estimate'
    });
  }, [lgpdConsent, isEligible, inputMode, income, taxDue, isPF, ecaRatio]);

  // ── Input handlers (máscara BRL sem prefixo R$) ─────────────────────────────
  const handleIncomeChange = (e) => {
    const masked = maskCurrencyNoPrefix(e.target.value);
    setRawIncome(masked);
    setIncome(parseBRLNoPrefix(masked));
  };

  const handleTaxDueChange = (e) => {
    const val = e.target.value;
    const masked = maskCurrencyNoPrefix(val);
    setRawTaxDue(masked);
    setTaxDue(parseBRLNoPrefix(masked));
  };
  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -12 },
    transition: { duration: 0.4, ease: 'easeOut' },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col w-full"
    >
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-graphite-dark pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-16 w-64 h-64 bg-glow/5 rounded-full blur-2xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col gap-5">
          <motion.div {...fadeUp} transition={{ delay: 0.05 }} className="inline-flex items-center gap-2 bg-emerald/15 border border-emerald/30 text-emerald rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            Ferramenta Gratuita
          </motion.div>
          <motion.h1 {...fadeUp} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight">
            Simulador de IR
          </motion.h1>
          <motion.p {...fadeUp} transition={{ delay: 0.15 }} className="text-white/60 text-lg max-w-2xl mx-auto font-medium">
            Descubra quanto do seu imposto de renda pode ser direcionado legalmente para projetos sociais aprovados pelo DoaHub.
          </motion.p>
        </div>
      </section>

      {/* ─── Main Content ──────────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-6 bg-ice min-h-screen">
        <div className="max-w-6xl mx-auto">

          {/* LGPD Consent Banner */}
          <motion.div
            layout
            {...fadeUp}
            className={`mb-8 rounded-3xl border-2 p-5 flex flex-col sm:flex-row gap-4 items-start transition-colors duration-default
              ${lgpdConsent ? 'bg-emerald/5 border-emerald/30' : 'bg-white border-graphite/10'}`}
          >
            <div className="flex items-start gap-3 flex-1">
              <ShieldCheck className={`w-6 h-6 flex-shrink-0 mt-0.5 transition-colors duration-default ${lgpdConsent ? 'text-emerald' : 'text-graphite-light'}`} />
              <div className="flex flex-col gap-1">
                <span className="font-display font-bold text-sm text-graphite-dark">
                  Conformidade LGPD — Processamento Local
                </span>
                <p className="text-xs text-graphite-light leading-relaxed">
                  Esta ferramenta não coleta, armazena ou envia seus dados financeiros a nenhum servidor. Todo o processamento ocorre exclusivamente no seu navegador (client-side). Marque a caixa ao lado para confirmar que compreendeu e consente com a utilização desta ferramenta de simulação educacional.
                </p>
              </div>
            </div>
            <label id="lgpd-consent-label" className="flex items-center gap-3 cursor-pointer flex-shrink-0 mt-1">
              <input
                id="lgpd-consent"
                type="checkbox"
                checked={lgpdConsent}
                onChange={(e) => setLgpdConsent(e.target.checked)}
                className="w-5 h-5 rounded-md accent-emerald cursor-pointer"
              />
              <span className="text-sm font-semibold text-graphite-dark">Concordo</span>
            </label>
          </motion.div>

          {/* ─── Bento Grid ──────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">

            {/* CARD 1: Entity Selection */}
            <motion.div layout {...fadeUp} transition={{ delay: 0.05 }}
              className={`md:col-span-1 bg-white rounded-[2rem] border border-graphite/8 p-6 shadow-sm flex flex-col gap-5 transition-opacity duration-default
                ${!lgpdConsent ? 'opacity-50 pointer-events-none select-none cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-graphite-light uppercase tracking-wider">Passo 1</span>
                <h2 className="font-display font-bold text-lg text-graphite-dark">Quem declara?</h2>
                {!lgpdConsent && (
                  <p className="text-xs text-graphite-light">Aceite os termos LGPD acima para continuar.</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <EntityCard
                  id="entity-pf"
                  label="Pessoa Física (PF)"
                  description="Contribuinte individual — declaração IRPF"
                  icon={User}
                  selected={entity === 'pf'}
                  onClick={() => { setEntity('pf'); setPjRegime(null); }}
                />
                <EntityCard
                  id="entity-pj"
                  label="Pessoa Jurídica (PJ)"
                  description="Empresa — declaração IRPJ"
                  icon={Building2}
                  selected={entity === 'pj'}
                  onClick={() => { setEntity('pj'); setPfModel(null); }}
                />
              </div>
            </motion.div>

            {/* CARD 2: Tax Model / Regime */}
            <motion.div layout {...fadeUp} transition={{ delay: 0.1 }}
              className={`md:col-span-2 bg-white rounded-[2rem] border border-graphite/8 p-6 shadow-sm flex flex-col gap-5 transition-opacity duration-default
                ${(!lgpdConsent || !entity) ? 'opacity-50 pointer-events-none select-none cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-graphite-light uppercase tracking-wider">Passo 2</span>
                <h2 className="font-display font-bold text-lg text-graphite-dark">
                  {!entity
                    ? 'Modelo de declaração'
                    : isPF
                    ? 'Qual é o seu modelo de declaração?'
                    : 'Qual é o regime tributário da empresa?'}
                </h2>
              </div>

              <AnimatePresence mode="wait">
                {/* Placeholder — Step 1 ainda não selecionado */}
                {!entity && (
                  <motion.div
                    key="placeholder"
                    {...fadeIn}
                    className="flex flex-col items-center justify-center gap-3 py-10 text-center"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-ice flex items-center justify-center">
                      <ChevronDown className="w-6 h-6 text-graphite-light/40" />
                    </div>
                    <p className="text-sm text-graphite-light font-medium">
                      Selecione o tipo de contribuinte no <strong>Passo 1</strong> para continuar.
                    </p>
                  </motion.div>
                )}

                {/* Radio Buttons — PF */}
                {isPF && (
                  <motion.div key="pf-models" {...fadeUp} className="flex flex-col gap-3">
                    <RadioOption
                      id="pf-completo"
                      name="pf-model"
                      value="completo"
                      currentValue={pfModel}
                      label="Declaração Completa (Modelo Completo)"
                      description="Permite deduções legais detalhadas, incluindo a destinação de IR para fundos sociais como ECA e Idoso. Recomendado para quem tem muitas despesas dedutíveis."
                      allowed={true}
                      onChange={setPfModel}
                    />
                    <RadioOption
                      id="pf-simplificado"
                      name="pf-model"
                      value="simplificado"
                      currentValue={pfModel}
                      label="Declaração Simplificada"
                      description="Utiliza desconto padrão de 20% sobre a base de cálculo. Não é possível realizar destinação incentivada de IR nesta modalidade."
                      allowed={false}
                      onChange={setPfModel}
                    />
                  </motion.div>
                )}

                {/* Radio Buttons — PJ */}
                {isPJ && (
                  <motion.div key="pj-regimes" {...fadeUp} className="flex flex-col gap-3">
                    <RadioOption
                      id="pj-lucro-real"
                      name="pj-regime"
                      value="lucro_real"
                      currentValue={pjRegime}
                      label="Lucro Real"
                      description="Regime elegível. Empresas no Lucro Real podem deduzir até 2% do IRPJ devido (1% para ECA + 1% para o Fundo do Idoso)."
                      allowed={true}
                      onChange={setPjRegime}
                    />
                    <RadioOption
                      id="pj-lucro-presumido"
                      name="pj-regime"
                      value="lucro_presumido"
                      currentValue={pjRegime}
                      label="Lucro Presumido"
                      description="Regime não elegível. A legislação não permite a destinação incentivada de IRPJ para este regime."
                      allowed={false}
                      onChange={setPjRegime}
                    />
                    <RadioOption
                      id="pj-simples"
                      name="pj-regime"
                      value="simples"
                      currentValue={pjRegime}
                      label="Simples Nacional"
                      description="Regime não elegível. O Simples Nacional unifica tributos e não contempla a destinação incentivada de IR."
                      allowed={false}
                      onChange={setPjRegime}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Alerta de bloqueio — vermelho proeminente */}
              <AnimatePresence>
                {isBlocked && (
                  <BlockedWarning
                    message={
                      isPF
                        ? 'A Declaração Simplificada não permite a destinação incentivada de IR para fundos sociais (Lei 8.069/90 e Lei 10.741/03). Para utilizar este benefício, você deve optar pela Declaração Completa ao entregar sua declaração.'
                        : 'A destinação incentivada de IRPJ é permitida exclusivamente para empresas no regime de Lucro Real (Lei 8.069/90 e Lei 10.741/03). O regime selecionado não contempla este benefício fiscal.'
                    }
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* CARD 3: Input Mode & Value */}
            <motion.div layout {...fadeUp} transition={{ delay: 0.15 }}
              className={`md:col-span-2 bg-white rounded-[2rem] border border-graphite/8 p-6 shadow-sm flex flex-col gap-5 transition-opacity duration-default
                ${(!lgpdConsent || !entity || !isEligible) ? 'opacity-50 pointer-events-none select-none cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-graphite-light uppercase tracking-wider">Passo 3</span>
                <h2 className="font-display font-bold text-lg text-graphite-dark">Informe seus valores</h2>
                {(!isEligible && entity) && (
                  <p className="text-xs text-red-500 font-medium">Selecione um regime tributário elegível no Passo 2 para liberar este campo.</p>
                )}
              </div>

              {/* Mode toggle */}
              <div className="flex gap-2 p-1 bg-ice rounded-2xl">
                {[
                  { key: 'estimate', label: 'Estimativa Rápida', icon: TrendingUp },
                  { key: 'exact',  label: 'IR Calculado',      icon: Calculator  },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    id={`mode-${key}`}
                    type="button"
                    onClick={() => setInputMode(key)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-default
                      ${inputMode === key
                        ? 'bg-green-50 text-green-700 shadow-sm border border-green-200/50'
                        : 'text-graphite-light hover:text-graphite-dark bg-transparent'}`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {inputMode === 'estimate' ? (
                  <motion.div key="estimate" {...fadeUp} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="gross-income" className="text-sm font-semibold text-graphite-dark">
                        {isPJ ? 'Lucro Operacional Bruto (anual)' : 'Renda Bruta Anual'}
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-light" />
                        <input
                          id="gross-income"
                          type="text"
                          inputMode="numeric"
                          value={rawIncome}
                          onChange={handleIncomeChange}
                          placeholder="0,00"
                          className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-graphite/15 bg-ice focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-emerald font-medium text-graphite-dark transition-all duration-fast"
                        />
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-2xl p-4">
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800 leading-relaxed">
                        <strong>Aviso importante:</strong> Esta estimativa utiliza uma alíquota flat de <strong>15%</strong> apenas para fins didáticos. A alíquota real do Imposto de Renda no Brasil é <strong>progressiva</strong>, podendo chegar a <strong>27,5%</strong> (PF) ou variar conforme o regime (PJ). Para calcular seu IR real, consulte um contador ou o programa da Receita Federal.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="exact" {...fadeUp} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="tax-due" className="text-sm font-semibold text-graphite-dark flex items-center">
                        Imposto Devido (calculado)
                        <Tooltip content="Valor do campo 'Imposto Devido' apurado em sua declaração ou por seu contador, antes de qualquer dedução.">
                          <span />
                        </Tooltip>
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-light" />
                        <input
                          id="tax-due"
                          type="text"
                          inputMode="numeric"
                          value={rawTaxDue}
                          onChange={handleTaxDueChange}
                          placeholder="0,00"
                          className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-graphite/15 bg-ice focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-emerald font-medium text-graphite-dark transition-all duration-fast"
                        />
                      </div>
                      <p className="text-xs text-graphite-light">
                        Insira o valor exato do imposto devido, conforme calculado pela Receita Federal.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>


            {/* ═══════════════════════════════════════════════════════════════
                CARD 4 — "Aha! Moment" — Resultado unificado (col-span-3)
                • Estado vazio: ícone cinza + instrução
                • Estado ativo: fundo verde vibrante, limite em tipografia massiva,
                  dois sub-buckets (ECA + Idoso), barra de distribuição e CTA
            ════════════════════════════════════════════════════════════════ */}
            <motion.div
              layout
              {...fadeUp}
              transition={{ delay: 0.2 }}
              className={`md:col-span-3 rounded-[2rem] border overflow-hidden transition-all duration-500
                ${calc
                  ? 'bg-emerald border-emerald shadow-2xl shadow-emerald/30'
                  : 'bg-white border-graphite/8 shadow-sm'
                }`}
            >
              <AnimatePresence mode="wait">

                {/* ── Estado Vazio ──────────────────────────────────────────── */}
                {!calc && (
                  <motion.div
                    key="empty"
                    {...fadeIn}
                    className="flex flex-col items-center justify-center gap-4 p-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-3xl bg-ice flex items-center justify-center">
                      <Calculator className="w-8 h-8 text-graphite-light/40" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-graphite-light uppercase tracking-wider">Resultado</span>
                      <h2 className="font-display font-bold text-lg text-graphite-dark">Potencial de Destino</h2>
                      <p className="text-sm text-graphite-light mt-1 max-w-sm mx-auto">
                        Preencha os passos anteriores para descobrir quanto do seu IR pode ser direcionado a projetos sociais.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ── Estado Ativo: "Aha! Moment" ──────────────────────────── */}
                {calc && (
                  <motion.div key="result" {...fadeUp} className="flex flex-col">

                    {/* Topo: headline + limite total + barra de distribuição */}
                    <div className="p-6 md:p-8 flex flex-col gap-5">

                      {/* Badge de estimativa */}
                      {calc.isEstimate && (
                        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5 self-start">
                          <InfoIcon className="w-3.5 h-3.5 text-white/70 flex-shrink-0" />
                          <span className="text-xs text-white/80 font-medium">
                            Estimativa com alíquota flat de 15% — consulte seu contador para o valor real
                          </span>
                        </div>
                      )}

                      {/* Headline + valor massivo */}
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                          Resultado · Potencial de Destino
                        </span>
                        <span className="text-white/70 text-sm font-medium">
                          IR de referência: {formatBRL(calc.owedTax)} · Limite de {(calc.limitPct * 100).toFixed(0)}%
                        </span>
                        {/* Valor principal em tipografia massiva */}
                        <span className="font-display font-black text-5xl md:text-7xl text-white tracking-tight leading-none mt-1">
                          {formatBRL(calc.totalLimit)}
                        </span>
                        <span className="text-sm text-white/70 font-medium mt-1">
                          Você pode destinar esse valor a ONGs verificadas — sem custo adicional.
                        </span>
                      </div>

                      {/* ─── RN01: Slider Interativo de Proporção Livre ECA ↔ Idoso ─── */}
                      <div className="bg-black/15 backdrop-blur-sm rounded-3xl p-5 md:p-6 border border-white/15 flex flex-col gap-4 mt-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <Sliders className="w-4 h-4 text-emerald-light" />
                            <span className="text-xs font-bold uppercase tracking-wider text-white">
                              Distribuição Personalizada entre os Fundos (RN01)
                            </span>
                          </div>

                          {/* Botões de atalho rápido / presets */}
                          <div className="flex items-center flex-wrap gap-1.5 text-[11px] font-bold">
                            {[
                              { label: '100% Criança', ratio: 100 },
                              { label: '70 / 30', ratio: 70 },
                              { label: '50 / 50 (Padrão)', ratio: 50 },
                              { label: '30 / 70', ratio: 30 },
                              { label: '100% Idoso', ratio: 0 },
                            ].map((preset) => (
                              <button
                                key={preset.label}
                                type="button"
                                onClick={() => setEcaRatio(preset.ratio)}
                                className={`px-2.5 py-1 rounded-lg transition-all ${
                                  ecaRatio === preset.ratio
                                    ? 'bg-white text-emerald shadow-sm font-extrabold'
                                    : 'bg-white/10 hover:bg-white/20 text-white/80'
                                }`}
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Slider Input */}
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between text-xs font-semibold text-white/90">
                            <span className="flex items-center gap-1.5 text-blue-200">
                              <Users className="w-3.5 h-3.5" />
                              Fundo da Criança (ECA): <strong>{calc.ecaRatio}%</strong>
                            </span>
                            <span className="flex items-center gap-1.5 text-rose-200">
                              <Heart className="w-3.5 h-3.5" />
                              Fundo do Idoso: <strong>{100 - calc.ecaRatio}%</strong>
                            </span>
                          </div>

                          <div className="relative flex items-center">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              step="5"
                              value={ecaRatio}
                              onChange={(e) => setEcaRatio(Number(e.target.value))}
                              aria-label="Proporção entre Fundo da Criança e Fundo do Idoso"
                              className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald focus:outline-none"
                            />
                          </div>

                          {/* Barra visual de distribuição animada */}
                          <div className="h-3 bg-white/20 rounded-full overflow-hidden flex shadow-inner mt-1">
                            <motion.div
                              style={{ width: `${calc.ecaRatio}%` }}
                              transition={{ duration: 0.2, ease: 'easeOut' }}
                              className="h-full bg-blue-300 rounded-l-full"
                            />
                            <motion.div
                              style={{ width: `${100 - calc.ecaRatio}%` }}
                              transition={{ duration: 0.2, ease: 'easeOut' }}
                              className="h-full bg-rose-300 rounded-r-full"
                            />
                          </div>

                          <div className="flex justify-between text-[11px] text-white/70 font-medium">
                            <span>
                              {formatBRL(calc.ecaLimit)} ({(calc.effectiveEcaPct * 100).toFixed(1)}% do IR)
                            </span>
                            <span>
                              {(calc.effectiveIdosoPct * 100).toFixed(1)}% do IR ({formatBRL(calc.idosoLimit)})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sub-buckets detalhados — fundo levemente contrastante */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
                      {/* ECA */}
                      <div className="bg-blue-950/30 p-6 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-400/25 flex items-center justify-center flex-shrink-0">
                            <Users className="w-4 h-4 text-blue-200" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Fundo da Criança (ECA)</p>
                            <p className="text-[11px] text-white/50">
                              {calc.ecaRatio}% da destinação · {(calc.effectiveEcaPct * 100).toFixed(1)}% do IR · Lei 8.069/90
                            </p>
                          </div>
                        </div>
                        <span className="font-display font-extrabold text-2xl text-white">
                          {formatBRL(calc.ecaLimit)}
                        </span>
                        <p className="text-xs text-white/50 leading-relaxed">
                          Apoia projetos de educação, proteção e acolhimento a crianças e adolescentes em vulnerabilidade.
                        </p>
                      </div>

                      {/* Fundo do Idoso */}
                      <div className="bg-rose-950/20 p-6 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-rose-400/25 flex items-center justify-center flex-shrink-0">
                            <Heart className="w-4 h-4 text-rose-200" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-rose-200 uppercase tracking-wider">Fundo do Idoso</p>
                            <p className="text-[11px] text-white/50">
                              {100 - calc.ecaRatio}% da destinação · {(calc.effectiveIdosoPct * 100).toFixed(1)}% do IR · Lei 12.213/10
                            </p>
                          </div>
                        </div>
                        <span className="font-display font-extrabold text-2xl text-white">
                          {formatBRL(calc.idosoLimit)}
                        </span>
                        <p className="text-xs text-white/50 leading-relaxed">
                          Financia iniciativas de saúde, convivência e dignidade para idosos em situação de vulnerabilidade.
                        </p>
                      </div>
                    </div>

                    {/* CTA — Encontrar ONGs para Destinar */}
                    <div className="bg-black/20 px-6 md:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <Sparkles className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-white/80 leading-relaxed">
                          <strong className="text-white">Pronto para destinar?</strong>{' '}
                          Explore ONGs verificadas no DoaHub e direcione seu limite de{' '}
                          <strong className="text-yellow-300">{formatBRL(calc.totalLimit)}</strong>.
                        </p>
                      </div>
                      <button
                        id="ir-sim-ong-cta"
                        type="button"
                        onClick={() => navigate('/explorar')}
                        className="group flex items-center gap-2.5 bg-white text-emerald font-black text-sm px-6 py-3.5 rounded-2xl shadow-lg hover:bg-yellow-300 hover:text-emerald-dark transition-all duration-300 active:scale-95 whitespace-nowrap flex-shrink-0"
                      >
                        Encontrar ONGs para Destinar
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* CARD 5: Ficha e Instrução Oficial DARF (RF04) */}
            {calc && (
              <div className="md:col-span-3">
                <DarfInstructionCard
                  calc={calc}
                  isPF={isPF}
                  timingMode={timingMode}
                  onSelectTimingMode={setTimingMode}
                  selectedRegionId={selectedRegionId}
                  onSelectRegionId={setSelectedRegionId}
                />
              </div>
            )}

            {/* CARD 6: Info / Disclaimer footer */}
            <motion.div layout {...fadeUp} transition={{ delay: 0.25 }}
              className="md:col-span-3 border border-graphite/8 bg-white rounded-[2rem] p-5 flex flex-col sm:flex-row gap-4 items-start"
            >
              <InfoIcon className="w-5 h-5 text-graphite-light flex-shrink-0 mt-0.5" />
              <p className="text-xs text-graphite-light leading-relaxed">
                <strong className="text-graphite-dark">Aviso legal:</strong> Este simulador é uma ferramenta educacional sem finalidade de assessoria fiscal ou jurídica. Os resultados apresentados são meramente ilustrativos. O DoaHub não coleta nem armazena nenhum dos dados inseridos neste formulário — todo o processamento é realizado localmente no seu dispositivo. Para orientação específica sobre sua declaração, consulte sempre um profissional contábil habilitado. Legislação de referência: Lei 8.069/90 (ECA), Lei 10.741/03 (Estatuto do Idoso), Decreto 3.000/99 (RIR), IN RFB 2.066/2022.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
