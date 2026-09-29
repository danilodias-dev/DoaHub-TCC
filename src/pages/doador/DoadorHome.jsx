import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, AlertCircle, FileCheck2, TrendingUp, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDonor } from '../../context/DonorContext';
import { motionTokens } from '../../utils/motion';
import { PremiumButton } from '../../components/ui/PremiumButton';

function ImpactModal({ report, onClose }) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="absolute inset-0 bg-graphite-dark/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Cover Image */}
        <div className="h-48 md:h-64 relative">
          <img src={report.image} alt="Impacto" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark/90 to-transparent flex flex-col justify-end p-6">
            <span className="text-emerald-light font-bold text-xs uppercase tracking-widest mb-1">Prestação de Contas</span>
            <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white">{report.title}</h3>
            <p className="text-white/80 text-sm mt-1">{report.ngoName} • {new Date(report.date).toLocaleDateString('pt-BR')}</p>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto">
          <p className="text-graphite-light text-base md:text-lg leading-relaxed mb-8">
            {report.description}
          </p>
          
          <h4 className="text-sm font-bold text-graphite-dark uppercase tracking-wider mb-4 border-b border-graphite/5 pb-2">Resultados Alcançados</h4>
          <div className="grid grid-cols-2 gap-4">
            {report.metrics.map((metric, i) => (
              <div key={i} className="bg-ice p-4 rounded-2xl flex flex-col gap-1 border border-graphite/5">
                <span className="text-2xl font-black text-emerald">{metric.value}</span>
                <span className="text-xs font-bold text-graphite-light uppercase tracking-wider">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function DoadorHome() {
  const { user } = useAuth();
  const { donations, metrics, getImpactReport } = useDonor();
  const [selectedReportId, setSelectedReportId] = useState(null);

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const handleDownloadZip = () => {
    // TODO: Integração Backend / Frontend
    // Para múltiplos PDFs, recomenda-se:
    // 1. Gerar os PDFs consolidados no backend e retornar um link de arquivo .zip, OU
    // 2. Usar a biblioteca frontend `jszip` para baixar cada comprovante individualmente
    // da CDN (ex: Supabase Storage) e empacotar no navegador do usuário.
    alert('Simulação: Baixando todos os comprovantes em ZIP...');
  };

  const selectedReport = getImpactReport(selectedReportId);

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={motionTokens.page}
      className="min-h-screen bg-ice pt-24 pb-20 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-display font-extrabold text-graphite-dark">
            Meu <span className="text-emerald">Painel</span>
          </h1>
          <p className="text-graphite-light text-lg">
            Acompanhe sua destinação fiscal e o impacto das suas doações, {user?.name?.split(' ')[0] || 'Doador'}.
          </p>
        </div>

        {/* Metrics Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total Destined */}
          <div className="bg-white p-6 rounded-[2rem] border border-graphite/5 shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 bg-emerald/10 text-emerald rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-graphite-light uppercase tracking-wider">Potencial Utilizado (2026)</p>
              <p className="text-3xl font-display font-black text-graphite-dark mt-1">{formatCurrency(metrics.totalDestined)}</p>
              <p className="text-sm font-medium text-emerald mt-2">de até {formatCurrency(metrics.taxCeiling)} disponíveis</p>
            </div>
          </div>

          {/* Card 2: Guides Counter */}
          <div className="bg-white p-6 rounded-[2rem] border border-graphite/5 shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-graphite-light uppercase tracking-wider">Guias Fiscais Emitidas</p>
              <p className="text-3xl font-display font-black text-graphite-dark mt-1">{metrics.totalGuides} guias</p>
              <div className="flex items-center gap-3 text-sm font-medium mt-2">
                 <span className="flex items-center gap-1 text-emerald"><CheckCircle2 className="w-4 h-4" /> {metrics.consolidated} consolidadas</span>
                 <span className="flex items-center gap-1 text-yellow-600"><AlertCircle className="w-4 h-4" /> {metrics.pending} pendentes</span>
              </div>
            </div>
          </div>

          {/* Card 3: Deadline Alert */}
          <div className="bg-graphite-dark p-6 rounded-[2rem] border border-white/5 shadow-sm flex flex-col gap-4 relative overflow-hidden">
             <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
            <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center relative z-10">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Prazo Declaração IR</p>
              <p className="text-3xl font-display font-black text-white mt-1">Faltam 84 dias</p>
              <p className="text-sm font-medium text-white/80 mt-2">Data limite: {metrics.deadline}</p>
            </div>
          </div>
        </div>

        {/* Destination History Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-graphite/5 p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-graphite-dark">Histórico de Destinações</h2>
              <p className="text-graphite-light text-sm mt-1">Acompanhe o status e faça download dos comprovantes válidos para o IR.</p>
            </div>
            
            <PremiumButton onClick={handleDownloadZip} icon={<Download className="w-5 h-5" />} size="md" className="w-full md:w-auto text-sm bg-emerald text-white shadow-emerald/20">
              Baixar Todos (ZIP)
            </PremiumButton>
          </div>

          {/* Mobile: Card List (< md) */}
          <div className="flex flex-col divide-y divide-graphite/5 md:hidden">
            {donations.map(donation => (
              <div key={donation.id} className="py-4 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <p className="font-bold text-graphite-dark text-sm truncate">{donation.ngo}</p>
                    <p className="text-xs text-graphite-light">{new Date(donation.date).toLocaleDateString('pt-BR')}</p>
                    <p className="text-xs text-graphite-light/70 truncate">{donation.fund}</p>
                  </div>
                  <span className={`flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                    donation.status === 'Consolidado' ? 'bg-emerald/10 text-emerald' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {donation.status === 'Consolidado' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    {donation.status}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="font-black text-emerald text-base">{formatCurrency(donation.amount)}</span>
                  <div className="flex items-center gap-2">
                    {donation.impactReportId && (
                      <button
                        onClick={() => setSelectedReportId(donation.impactReportId)}
                        className="text-xs font-bold text-emerald px-3 py-2 rounded-lg hover:bg-emerald/5 transition-colors min-h-[36px]"
                      >
                        Prestação de Contas
                      </button>
                    )}
                    {donation.receiptUrl ? (
                      <a
                        href={donation.receiptUrl}
                        download
                        className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center text-graphite-light hover:text-emerald hover:bg-emerald/5 rounded-xl transition-colors"
                        title="Baixar Comprovante (PDF)"
                        aria-label="Baixar Comprovante"
                      >
                        <FileText className="w-5 h-5" />
                      </a>
                    ) : (
                      <span className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center text-graphite/20 cursor-not-allowed" title="Comprovante indisponível">
                        <FileText className="w-5 h-5" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Tabela (>= md) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-graphite/5">
                  <th className="py-4 px-4 text-xs font-bold text-graphite-light uppercase tracking-wider">Data</th>
                  <th className="py-4 px-4 text-xs font-bold text-graphite-light uppercase tracking-wider">ONG / Instituição</th>
                  <th className="py-4 px-4 text-xs font-bold text-graphite-light uppercase tracking-wider">Fundo Governamental</th>
                  <th className="py-4 px-4 text-xs font-bold text-graphite-light uppercase tracking-wider">Valor</th>
                  <th className="py-4 px-4 text-xs font-bold text-graphite-light uppercase tracking-wider">Status</th>
                  <th className="py-4 px-4 text-xs font-bold text-graphite-light uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {donations.map(donation => (
                  <tr key={donation.id} className="border-b border-graphite/5 hover:bg-ice/50 transition-colors group">
                    <td className="py-4 px-4 text-sm font-medium text-graphite-dark">
                      {new Date(donation.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-4 px-4 text-sm font-bold text-graphite-dark">{donation.ngo}</td>
                    <td className="py-4 px-4 text-sm font-medium text-graphite-light truncate max-w-[200px]" title={donation.fund}>{donation.fund}</td>
                    <td className="py-4 px-4 text-sm font-black text-emerald">{formatCurrency(donation.amount)}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        donation.status === 'Consolidado' ? 'bg-emerald/10 text-emerald' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {donation.status === 'Consolidado' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                        {donation.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                         {donation.impactReportId && (
                            <button 
                              onClick={() => setSelectedReportId(donation.impactReportId)}
                              className="text-xs font-bold text-emerald hover:text-emerald-dark transition-colors whitespace-nowrap px-3 py-2 rounded-lg hover:bg-emerald/5"
                            >
                              Ver Prestação de Contas
                            </button>
                         )}
                         {donation.receiptUrl ? (
                           <a href={donation.receiptUrl} download className="p-2 text-graphite-light hover:text-emerald hover:bg-emerald/5 rounded-xl transition-colors" title="Baixar Comprovante (PDF)" aria-label="Baixar Comprovante">
                             <FileText className="w-5 h-5" />
                           </a>
                         ) : (
                           <span className="p-2 text-graphite/20 cursor-not-allowed" title="Comprovante indisponível">
                             <FileText className="w-5 h-5" />
                           </span>
                         )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Impacto */}
      <AnimatePresence>
        {selectedReportId && (
           <ImpactModal report={selectedReport} onClose={() => setSelectedReportId(null)} />
        )}
      </AnimatePresence>

    </motion.div>
  );
}
