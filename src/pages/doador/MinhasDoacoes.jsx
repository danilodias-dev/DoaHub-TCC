import { motion } from 'framer-motion';
import { Search, Download, Filter, Heart, ExternalLink, Calendar, ChevronRight, CheckCircle2, Upload, FileText } from 'lucide-react';
import { useState } from 'react';
import { motionTokens } from '../../utils/motion';
import { useDonor } from '../../contexts/DonorContext';

export function MinhasDoacoes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadingId, setUploadingId] = useState(null);
  const { destinacoes, donations, totalDestinado, uploadComprovante, baixarComprovante, loading } = useDonor();

  const pageVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={motionTokens.page}
      className="min-h-screen bg-ice pt-24 pb-20 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-display font-extrabold text-graphite-dark tracking-tight">Minhas Doações</h1>
            <p className="text-graphite-light font-medium">Histórico completo das suas contribuições e impacto gerado.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-grow md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-light" />
                <input 
                  type="text" 
                  placeholder="Filtrar por ONG..." 
                  className="w-full bg-white border border-graphite/10 rounded-2xl py-3 pl-11 pr-4 text-sm font-medium outline-none focus:border-emerald/50 transition-all"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button className="p-3 bg-white border border-graphite/10 rounded-2xl text-graphite-light hover:text-emerald transition-colors">
                <Filter className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Impact Summary Mini Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald p-6 rounded-[2rem] text-white shadow-xl shadow-emerald/20 flex flex-col gap-2">
             <span className="text-xs font-black uppercase tracking-widest opacity-60">Total Investido</span>
             <span className="text-3xl font-display font-black">R$ 4.250,00</span>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-graphite/5 flex flex-col gap-2">
             <span className="text-xs font-black uppercase tracking-widest text-graphite-light">Causas Apoiadas</span>
             <span className="text-3xl font-display font-black text-graphite-dark">12</span>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-graphite/5 flex flex-col gap-2">
             <span className="text-xs font-black uppercase tracking-widest text-graphite-light">Vidas Impactadas</span>
             <span className="text-3xl font-display font-black text-emerald">+450</span>
          </div>
        </div>

        {/* Donations Table / List */}
        <div className="bg-white rounded-[2.5rem] border border-graphite/5 shadow-sm overflow-hidden">
          <div className="hidden md:grid grid-cols-5 gap-4 px-8 py-4 bg-ice/30 border-b border-graphite/5 text-[10px] font-black text-graphite-light uppercase tracking-widest">
             <div className="col-span-2">Instituição / Projeto</div>
             <div>Data</div>
             <div>Valor</div>
             <div className="text-right">Ações</div>
          </div>

          <div className="flex flex-col">
            {destinacoes.length === 0 ? (
              <div className="p-12 text-center text-graphite-light font-medium">
                Nenhuma destinação fiscal registrada ainda. Utilize nosso Simulador para gerar sua primeira guia DARF!
              </div>
            ) : (
              destinacoes
                .filter(d => (d.ongs?.nome || d.fundo_governamental || '').toLowerCase().includes(searchTerm.toLowerCase()))
                .map((d) => (
                  <div key={d.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6 md:px-8 md:py-6 border-b border-graphite/5 last:border-0 hover:bg-ice/20 transition-colors items-center group">
                    <div className="col-span-2 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-ice flex items-center justify-center text-emerald">
                        <Heart className="w-6 h-6 fill-current" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-graphite-dark group-hover:text-emerald transition-colors">
                          {d.ongs?.nome || d.fundo_governamental}
                        </span>
                        <span className="text-xs text-graphite-light font-medium">
                          DARF {d.codigo_darf || '3351'} • Status: <span className="font-bold text-emerald">{d.status}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm font-medium text-graphite-light md:text-graphite">
                      <Calendar className="w-4 h-4 md:hidden" />
                      {(typeof d.data_destinacao === 'string' && d.data_destinacao.includes('T'))
                        ? d.data_destinacao.split('T')[0]
                        : (d.data_destinacao || 'Hoje')}
                    </div>
                    
                    <div className="text-lg font-display font-bold text-graphite-dark">
                      R$ {Number(d.valor || 0).toFixed(2)}
                    </div>

                    <div className="flex justify-end gap-2 items-center">
                      {d.comprovante_url ? (
                        <button 
                          onClick={() => baixarComprovante(d.comprovante_url)}
                          className="flex items-center gap-2 px-3 py-2 bg-emerald/10 text-emerald rounded-xl text-xs font-bold hover:bg-emerald hover:text-white transition-all"
                          title="Baixar comprovante seguro"
                        >
                          <Download className="w-4 h-4" /> <span className="hidden lg:inline">Comprovante</span>
                        </button>
                      ) : (
                        <label className="flex items-center gap-2 px-3 py-2 bg-ice rounded-xl text-xs font-bold text-graphite-light hover:bg-emerald hover:text-white transition-all cursor-pointer">
                          <Upload className="w-4 h-4" />
                          <span className="hidden lg:inline">{uploadingId === d.id ? 'Enviando...' : 'Anexar'}</span>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept=".pdf,image/*"
                            disabled={uploadingId === d.id}
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setUploadingId(d.id);
                              try {
                                await uploadComprovante(d.id, file);
                              } finally {
                                setUploadingId(null);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Help Link */}
        <div className="flex justify-center mt-4">
           <Link to="/ajuda" className="text-sm font-bold text-graphite-light hover:text-emerald transition-colors flex items-center gap-2">
              Problemas com uma doação? <ChevronRight className="w-4 h-4" />
           </Link>
        </div>

      </div>
    </motion.div>
  );
}
