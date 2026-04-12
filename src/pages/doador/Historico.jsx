import { motion } from 'framer-motion';
import { Heart, Award, TrendingUp, Calendar, ChevronRight, Star, Flame, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_IMPACT_STATS, MOCK_BADGES, MOCK_DONATIONS } from '../../data/mockData';

export function Historico() {
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
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-ice pb-24"
    >
      <div className="h-20"></div>
      
      {/* Profile Hero */}
      <div className="relative overflow-hidden bg-white border-b border-graphite/5">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-emerald/10 flex items-center justify-center font-display font-bold text-3xl text-emerald shadow-lg shadow-emerald/10 border-4 border-white">
              D
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-extrabold text-graphite-dark tracking-tight">Meu Impacto</h1>
              <p className="text-graphite-light font-medium mt-1">Acompanhe sua jornada de solidariedade no DoaHub.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">
        
        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_IMPACT_STATS.map((s, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] p-6 border border-graphite/5 flex items-center gap-5 shadow-sm hover:shadow-lg hover:shadow-emerald/5 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald/5 text-emerald flex items-center justify-center">
                <s.icon className="w-7 h-7" />
              </div>
              <div>
                <span className="text-sm font-medium text-graphite-light">{s.label}</span>
                <p className="text-2xl font-display font-extrabold text-graphite-dark">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Badges / Medals */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="font-display font-bold text-2xl text-graphite-dark mb-6 flex items-center gap-2"><Award className="w-6 h-6 text-emerald" /> Suas Medalhas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MOCK_BADGES.map((b, idx) => (
              <div 
                key={idx}
                className={`bg-white rounded-2xl p-5 border flex flex-col items-center text-center gap-3 transition-all duration-300 ${b.earned ? 'border-emerald/20 hover:shadow-lg hover:shadow-emerald/10 hover:-translate-y-1' : 'border-graphite/5 opacity-40 grayscale'}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${b.earned ? 'bg-emerald/10 text-emerald' : 'bg-ice text-graphite-light'}`}>
                  <b.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm text-graphite-dark">{b.title}</p>
                  <p className="text-xs text-graphite-light font-medium mt-0.5">{b.desc}</p>
                </div>
                {b.earned && <span className="text-[10px] font-bold bg-emerald/10 text-emerald px-2 py-0.5 rounded-full uppercase tracking-widest">Conquistada</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Donation Timeline */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h2 className="font-display font-bold text-2xl text-graphite-dark mb-6">Histórico de Doações</h2>
          <div className="bg-white rounded-[2rem] border border-graphite/5 shadow-sm overflow-hidden">
            {MOCK_DONATIONS.map((d, idx) => (
              <Link 
                key={d.id}
                to={`/campanha/${d.id}`}
                className={`flex items-center gap-5 px-6 py-5 hover:bg-ice transition-colors cursor-pointer group ${idx < donations.length - 1 ? 'border-b border-graphite/5' : ''}`}
              >
                {/* Status Dot */}
                <div className="w-3 h-3 rounded-full bg-emerald flex-shrink-0 shadow-sm shadow-emerald/40"></div>
                
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-graphite-dark group-hover:text-emerald transition-colors truncate">{d.campaign}</p>
                  <p className="text-xs font-medium text-graphite-light mt-0.5">{d.ong} • {d.date}</p>
                </div>

                {/* Amount */}
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-emerald text-lg">R$ {d.amount}</span>
                  <ChevronRight className="w-4 h-4 text-graphite-light group-hover:text-emerald transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link to="/doador" className="px-8 py-4 bg-emerald text-white rounded-full font-bold shadow-lg shadow-emerald/30 hover:bg-emerald-light transition-colors flex items-center gap-2">
            Explorar Novas Causas <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </motion.div>
  );
}
