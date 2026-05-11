import { motion } from 'framer-motion';
import { Eye, TrendingUp, ArrowUpRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_GLOBAL_STATS, MOCK_AUDIT_LOG, MOCK_PILLARS } from '../../data/mockData';
import { motionTokens } from '../../utils/motion';

export function Transparencia() {
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={motionTokens.page}
      className="min-h-screen bg-ice pb-24"
    >
      <div className="h-20"></div>

      {/* Hero Section */}
      <div className="relative bg-graphite-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-96 h-96 bg-emerald/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald/20 text-emerald rounded-full text-sm font-bold mb-6">
              <Eye className="w-4 h-4" /> Dados Abertos
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold leading-tight tracking-tight mb-6">
              Transparência <br /><span className="text-emerald">como princípio.</span>
            </h1>
            <p className="text-lg text-white/70 font-medium leading-relaxed max-w-xl">
              No DoaHub, cada centavo é rastreável. Aqui você acompanha para onde seu dinheiro foi, quem recebeu, e qual o impacto gerado. Sem letras miúdas.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-10 relative z-20">
          {MOCK_GLOBAL_STATS.map((s, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] p-6 shadow-xl shadow-graphite/5 border border-graphite/5 text-center flex flex-col items-center gap-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-page"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center">
                <s.icon className="w-6 h-6" />
              </div>
              <span className="text-2xl md:text-3xl font-display font-extrabold text-graphite-dark">{s.value}</span>
              <span className="text-sm font-bold text-graphite-dark">{s.label}</span>
              <span className="text-xs font-medium text-graphite-light">{s.desc}</span>
            </motion.div>
          ))}
        </div>

        {/* Pillars */}
        <div className="mt-16">
          <h2 className="text-3xl font-display font-bold text-graphite-dark mb-8 text-center">Os 4 Pilares da Confiança</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_PILLARS.map((p, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] p-8 border border-graphite/5 flex gap-5 hover:shadow-lg hover:shadow-emerald/5 transition-all duration-page group">
                <div className="w-14 h-14 rounded-2xl bg-emerald/5 text-emerald flex items-center justify-center flex-shrink-0 group-hover:bg-emerald group-hover:text-white transition-colors duration-default">
                  <p.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-graphite-dark mb-2">{p.title}</h3>
                  <p className="text-sm text-graphite-light font-medium leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Table */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold text-graphite-dark">Registro Público de Repasses</h2>
            <span className="text-sm font-bold text-emerald flex items-center gap-1 cursor-pointer hover:underline">
              Exportar CSV <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="bg-white rounded-[2rem] border border-graphite/5 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-5 gap-4 px-8 py-4 bg-ice border-b border-graphite/5 text-xs font-bold uppercase tracking-wider text-graphite-light">
              <span>ONG</span>
              <span>Campanha</span>
              <span>Valor Repassado</span>
              <span>Data</span>
              <span>Status</span>
            </div>

            {/* Table Rows */}
            {MOCK_AUDIT_LOG.map((row, idx) => (
              <div key={idx} className={`grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 px-8 py-5 items-center hover:bg-ice transition-colors cursor-pointer group ${idx < MOCK_AUDIT_LOG.length - 1 ? 'border-b border-graphite/5' : ''}`}>
                <span className="font-bold text-graphite-dark group-hover:text-emerald transition-colors">{row.ong}</span>
                <span className="text-sm text-graphite-light font-medium">{row.campaign}</span>
                <span className="font-display font-bold text-emerald flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> {row.amount}
                </span>
                <span className="text-sm text-graphite-light font-medium">{row.date}</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold w-fit">
                  <div className="w-2 h-2 rounded-full bg-emerald"></div>
                  <span className="text-emerald">{row.status}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-[2.5rem] p-12 border border-graphite/5 shadow-sm max-w-2xl mx-auto">
            <TrendingUp className="w-10 h-10 text-emerald mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold text-graphite-dark mb-3">Quer fazer parte desse impacto?</h3>
            <p className="text-graphite-light font-medium mb-8">Junte-se a milhares de brasileiros que escolhem doar com segurança.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/doador" className="px-8 py-4 bg-emerald text-white rounded-full font-bold shadow-lg shadow-emerald/30 hover:bg-emerald-light transition-colors">
                Doar Agora
              </Link>
              <Link to="/ong/onboarding/1" className="px-8 py-4 border-2 border-emerald text-emerald rounded-full font-bold hover:bg-emerald/5 transition-colors">
                Cadastrar ONG
              </Link>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
