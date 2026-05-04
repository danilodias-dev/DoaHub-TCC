import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  FileText,
  Download,
  Eye,
  Calendar,
  TrendingUp,
  Users,
  Heart,
  CheckCircle2,
  ChevronDown,
  BarChart3,
  X,
} from 'lucide-react';
import { useCampaigns } from '../../context/CampaignContext';

/**
 * ============================================
 * DoaHub — Aba Relatórios de Impacto
 * ============================================
 * Consolida resultados sociais com gráficos de
 * conversão doações→impacto e documentos mensais.
 */

// ─── Dados históricos de impacto (simulados) ────────────────
const MONTHLY_IMPACT_DATA = [
  { month: 'Jan', doacoes: 18500, familias: 120, refeicoes: 2400, kits: 45 },
  { month: 'Fev', doacoes: 21200, familias: 145, refeicoes: 2800, kits: 52 },
  { month: 'Mar', doacoes: 19800, familias: 130, refeicoes: 2600, kits: 48 },
  { month: 'Abr', doacoes: 25600, familias: 170, refeicoes: 3400, kits: 64 },
  { month: 'Mai', doacoes: 28900, familias: 192, refeicoes: 3800, kits: 72 },
  { month: 'Jun', doacoes: 24300, familias: 158, refeicoes: 3100, kits: 60 },
  { month: 'Jul', doacoes: 31500, familias: 210, refeicoes: 4200, kits: 80 },
  { month: 'Ago', doacoes: 29800, familias: 198, refeicoes: 3900, kits: 76 },
  { month: 'Set', doacoes: 33200, familias: 220, refeicoes: 4400, kits: 84 },
  { month: 'Out', doacoes: 35800, familias: 238, refeicoes: 4700, kits: 90 },
  { month: 'Nov', doacoes: 38500, familias: 256, refeicoes: 5100, kits: 97 },
  { month: 'Dez', doacoes: 42500, familias: 280, refeicoes: 5600, kits: 105 },
];

// ─── Documentos mensais ─────────────────────────────────────
const MONTHLY_REPORTS = [
  { id: 1, month: 'Dezembro 2024', status: 'disponivel', pages: 24, size: '2.4 MB', highlights: '280 famílias atendidas • R$ 42.5k arrecadados' },
  { id: 2, month: 'Novembro 2024', status: 'disponivel', pages: 22, size: '2.1 MB', highlights: '256 famílias atendidas • R$ 38.5k arrecadados' },
  { id: 3, month: 'Outubro 2024', status: 'disponivel', pages: 20, size: '1.9 MB', highlights: '238 famílias atendidas • R$ 35.8k arrecadados' },
  { id: 4, month: 'Setembro 2024', status: 'disponivel', pages: 19, size: '1.8 MB', highlights: '220 famílias atendidas • R$ 33.2k arrecadados' },
  { id: 5, month: 'Agosto 2024', status: 'disponivel', pages: 18, size: '1.7 MB', highlights: '198 famílias atendidas • R$ 29.8k arrecadados' },
  { id: 6, month: 'Julho 2024', status: 'disponivel', pages: 21, size: '2.0 MB', highlights: '210 famílias atendidas • R$ 31.5k arrecadados' },
  { id: 7, month: 'Junho 2024', status: 'disponivel', pages: 17, size: '1.6 MB', highlights: '158 famílias atendidas • R$ 24.3k arrecadados' },
  { id: 8, month: 'Maio 2024', status: 'disponivel', pages: 18, size: '1.7 MB', highlights: '192 famílias atendidas • R$ 28.9k arrecadados' },
];

// ─── Tooltip customizado ────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-graphite/10 border border-graphite/5 p-4 min-w-[180px]">
      <p className="font-bold text-graphite-dark text-sm mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-graphite-light font-medium">{p.name}</span>
          </div>
          <span className="font-bold text-graphite-dark">
            {p.name === 'Doações' ? `R$ ${(p.value / 1000).toFixed(1)}k` : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Cores do design system ─────────────────────────────────
const EMERALD = '#2ecc71';
const EMERALD_LIGHT = '#a3e4bc';
const SKY = '#3b82f6';
const AMBER = '#f59e0b';

export function ReportsTab() {
  const { campaigns } = useCampaigns();
  const [chartType, setChartType] = useState('doacoes');
  const [showAllReports, setShowAllReports] = useState(false);
  const [previewReport, setPreviewReport] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  // Métricas totais derivadas dos dados
  const totals = useMemo(() => ({
    doacoes: MONTHLY_IMPACT_DATA.reduce((s, m) => s + m.doacoes, 0),
    familias: MONTHLY_IMPACT_DATA.reduce((s, m) => s + m.familias, 0),
    refeicoes: MONTHLY_IMPACT_DATA.reduce((s, m) => s + m.refeicoes, 0),
    kits: MONTHLY_IMPACT_DATA.reduce((s, m) => s + m.kits, 0),
  }), []);

  const displayedReports = showAllReports ? MONTHLY_REPORTS : MONTHLY_REPORTS.slice(0, 4);

  // Simula download
  const handleDownload = (report) => {
    setDownloadingId(report.id);
    setTimeout(() => {
      setDownloadingId(null);
      const blob = new Blob(
        [`DoaHub - Relatório de Impacto\n${report.month}\n\n${report.highlights}\n\nEste é um arquivo de demonstração.`],
        { type: 'text/plain' }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `DoaHub_Relatorio_${report.month.replace(' ', '_')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }, 1200);
  };

  // Dados do gráfico selecionado
  const chartConfig = {
    doacoes: { key: 'doacoes', label: 'Doações (R$)', color: EMERALD, format: (v) => `R$ ${(v / 1000).toFixed(1)}k` },
    familias: { key: 'familias', label: 'Famílias Atendidas', color: SKY, format: (v) => v },
    refeicoes: { key: 'refeicoes', label: 'Refeições Distribuídas', color: AMBER, format: (v) => v },
  };

  const activeChart = chartConfig[chartType];

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-graphite-dark">
            Relatórios de Impacto
          </h2>
          <p className="text-graphite-light font-medium mt-1">
            Acompanhe a conversão das doações em impacto social direto.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-graphite-light font-medium bg-ice px-3 py-2 rounded-xl self-start">
          <Calendar className="w-3.5 h-3.5" />
          Jan — Dez 2024
        </div>
      </div>

      {/* ────────────── KPI Summary ────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Arrecadado', value: `R$ ${(totals.doacoes / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'bg-emerald/10 text-emerald' },
          { label: 'Famílias Atendidas', value: totals.familias.toLocaleString('pt-BR'), icon: Users, color: 'bg-blue-50 text-blue-500' },
          { label: 'Refeições Distribuídas', value: `${(totals.refeicoes / 1000).toFixed(1)}k`, icon: Heart, color: 'bg-amber-50 text-amber-500' },
          { label: 'Kits Entregues', value: totals.kits.toLocaleString('pt-BR'), icon: CheckCircle2, color: 'bg-purple-50 text-purple-500' },
        ].map((kpi, idx) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-graphite/5 shadow-sm flex items-center gap-4"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${kpi.color}`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-graphite-light font-medium truncate">{kpi.label}</span>
              <span className="text-lg font-display font-extrabold text-graphite-dark">{kpi.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ────────────── Gráfico de Impacto ────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-graphite/5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-graphite-dark">Evolução do Impacto</h3>
              <p className="text-xs text-graphite-light font-medium">Doações convertidas em impacto direto mensal</p>
            </div>
          </div>

          {/* Seletor de métrica */}
          <div className="flex items-center gap-1.5 bg-ice rounded-xl p-1">
            {Object.entries(chartConfig).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => setChartType(key)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  chartType === key
                    ? 'bg-white text-graphite-dark shadow-sm'
                    : 'text-graphite-light hover:text-graphite-dark'
                }`}
              >
                {cfg.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Gráfico */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MONTHLY_IMPACT_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={activeChart.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={activeChart.color} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }}
                tickFormatter={activeChart.format}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={activeChart.key}
                name={activeChart.label}
                stroke={activeChart.color}
                strokeWidth={2.5}
                fill="url(#gradientFill)"
                dot={{ r: 4, fill: '#fff', stroke: activeChart.color, strokeWidth: 2 }}
                activeDot={{ r: 6, fill: activeChart.color, stroke: '#fff', strokeWidth: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legenda resumo */}
        <div className="mt-6 pt-6 border-t border-graphite/5 grid grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-lg font-display font-extrabold text-graphite-dark">
              {activeChart.format(MONTHLY_IMPACT_DATA[MONTHLY_IMPACT_DATA.length - 1][activeChart.key])}
            </span>
            <p className="text-[10px] text-graphite-light font-medium uppercase tracking-wider mt-0.5">Último mês</p>
          </div>
          <div>
            <span className="text-lg font-display font-extrabold text-emerald">
              +{Math.round(((MONTHLY_IMPACT_DATA[11][activeChart.key] - MONTHLY_IMPACT_DATA[0][activeChart.key]) / MONTHLY_IMPACT_DATA[0][activeChart.key]) * 100)}%
            </span>
            <p className="text-[10px] text-graphite-light font-medium uppercase tracking-wider mt-0.5">Crescimento anual</p>
          </div>
          <div>
            <span className="text-lg font-display font-extrabold text-graphite-dark">
              {activeChart.format(Math.round(MONTHLY_IMPACT_DATA.reduce((s, m) => s + m[activeChart.key], 0) / 12))}
            </span>
            <p className="text-[10px] text-graphite-light font-medium uppercase tracking-wider mt-0.5">Média mensal</p>
          </div>
        </div>
      </motion.div>

      {/* ────────────── Gráfico de barras comparativo ────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-graphite/5"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-graphite-dark">Conversão Doações → Famílias</h3>
            <p className="text-xs text-graphite-light font-medium">Comparação mensal entre arrecadação e alcance social</p>
          </div>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_IMPACT_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                width={45}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="doacoes" name="Doações" fill={EMERALD_LIGHT} radius={[6, 6, 0, 0]} barSize={20} />
              <Bar yAxisId="right" dataKey="familias" name="Famílias" fill={SKY} radius={[6, 6, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ────────────── Lista de Documentos Mensais ────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-graphite/5"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-graphite-dark">Relatórios Mensais</h3>
              <p className="text-xs text-graphite-light font-medium">{MONTHLY_REPORTS.length} documentos disponíveis para download</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {displayedReports.map((report, idx) => (
              <motion.div
                layout
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: idx * 0.04 }}
                className="flex items-center gap-4 p-5 rounded-2xl border border-graphite/5 hover:border-emerald/20 hover:shadow-lg hover:shadow-emerald/5 transition-all group"
              >
                {/* Ícone do documento */}
                <div className="w-12 h-14 rounded-xl bg-ice border border-graphite/5 flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-emerald/5 group-hover:border-emerald/20 transition-colors">
                  <FileText className="w-5 h-5 text-graphite-light group-hover:text-emerald transition-colors" />
                  <span className="text-[8px] font-bold text-graphite-light/60 uppercase mt-0.5">PDF</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-graphite-dark group-hover:text-emerald transition-colors">
                    Relatório — {report.month}
                  </h4>
                  <p className="text-xs text-graphite-light font-medium mt-0.5 truncate">
                    {report.highlights}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-graphite-light/60 font-medium">
                    <span>{report.pages} páginas</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setPreviewReport(report)}
                    className="w-9 h-9 rounded-xl bg-ice hover:bg-emerald/10 flex items-center justify-center text-graphite-light hover:text-emerald transition-colors"
                    title="Visualizar relatório"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDownload(report)}
                    disabled={downloadingId === report.id}
                    className={`h-9 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      downloadingId === report.id
                        ? 'bg-emerald/10 text-emerald cursor-wait'
                        : 'bg-emerald text-white hover:shadow-lg hover:shadow-emerald/20'
                    }`}
                  >
                    {downloadingId === report.id ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="w-3.5 h-3.5 border-2 border-emerald border-t-transparent rounded-full"
                        />
                        Baixando...
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" /> Baixar
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Botão ver mais / menos */}
        {MONTHLY_REPORTS.length > 4 && (
          <button
            onClick={() => setShowAllReports(p => !p)}
            className="w-full mt-6 py-3 rounded-xl border border-graphite/10 text-sm font-bold text-graphite-light hover:bg-ice hover:text-emerald hover:border-emerald/20 transition-all flex items-center justify-center gap-1.5"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showAllReports ? 'rotate-180' : ''}`} />
            {showAllReports ? 'Ver menos' : `Ver todos (${MONTHLY_REPORTS.length})`}
          </button>
        )}
      </motion.div>

      {/* ────────────── Modal Pré-visualização ────────────── */}
      <AnimatePresence>
        {previewReport && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setPreviewReport(null)}
          >
            <motion.div
              className="absolute inset-0 bg-graphite-dark/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-emerald/5 px-8 py-6 flex items-center justify-between border-b border-graphite/5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-graphite-dark">{previewReport.month}</h3>
                    <p className="text-xs text-graphite-light font-medium">{previewReport.pages} págs • {previewReport.size}</p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewReport(null)}
                  className="w-10 h-10 rounded-xl hover:bg-white flex items-center justify-center text-graphite-light"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Conteúdo simulado */}
              <div className="px-8 py-6 flex flex-col gap-5">
                <div>
                  <h4 className="text-sm font-bold text-graphite-dark mb-2">Resumo Executivo</h4>
                  <p className="text-xs text-graphite-light leading-relaxed font-medium">
                    Neste período, a organização alcançou resultados expressivos na distribuição de recursos 
                    para comunidades em situação de vulnerabilidade. {previewReport.highlights}.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Doações Recebidas', value: '127' },
                    { label: 'Novos Doadores', value: '34' },
                    { label: 'Taxa Recorrência', value: '68%' },
                    { label: 'Satisfação', value: '4.8/5' },
                  ].map(s => (
                    <div key={s.label} className="bg-ice rounded-xl p-3 text-center">
                      <span className="text-lg font-display font-extrabold text-graphite-dark">{s.value}</span>
                      <p className="text-[9px] text-graphite-light font-medium uppercase tracking-wider mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { handleDownload(previewReport); setPreviewReport(null); }}
                  className="w-full py-3 rounded-xl bg-emerald text-white text-sm font-bold hover:shadow-lg hover:shadow-emerald/20 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Baixar Relatório Completo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
