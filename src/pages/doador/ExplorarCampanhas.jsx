import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, MapPin, Calendar, Heart } from 'lucide-react';
import { useState } from 'react';
import { CampaignCard } from '../../components/ui/CampaignCard';
import { MOCK_CAMPAIGNS } from '../../data/mockData';

export function ExplorarCampanhas() {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid');

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 }
  };

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'fome', label: 'Fome zero' },
    { id: 'saude', label: 'Saúde' },
    { id: 'educacao', label: 'Educação' },
    { id: 'ambiente', label: 'Meio Ambiente' },
  ];

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-ice pt-24 pb-20 px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Search & Breadcrumb */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-graphite-light uppercase tracking-widest">
            <Link to="/">Início</Link>
            <span>/</span>
            <span className="text-emerald">Explorar Campanhas</span>
          </div>
          <h1 className="text-4xl font-display font-extrabold text-graphite-dark tracking-tight">Descubra onde <span className="text-emerald">ajudar</span></h1>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-3xl border border-graphite/5 gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${filter === cat.id ? 'bg-graphite-dark text-white' : 'bg-ice text-graphite-light hover:bg-graphite/5'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-grow">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-light" />
               <input 
                 type="text" 
                 placeholder="Buscar por nome ou cidade..." 
                 className="w-full md:w-64 bg-ice rounded-2xl py-3 pl-11 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald/20 transition-all"
               />
             </div>
             <div className="flex bg-ice p-1 rounded-2xl">
                <button 
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-xl transition-all ${view === 'grid' ? 'bg-white text-emerald shadow-sm' : 'text-graphite-light'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={`p-2 rounded-xl transition-all ${view === 'list' ? 'bg-white text-emerald shadow-sm' : 'text-graphite-light'}`}
                >
                  <List className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_CAMPAIGNS.map((campaign, idx) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <CampaignCard {...campaign} />
            </motion.div>
          ))}
        </div>

        {/* Empty State / Pagination Simulation */}
        <div className="flex flex-col items-center gap-6 py-12 border-t border-graphite/5 mt-8">
           <p className="text-graphite-light font-medium">Você viu todas as campanhas ativas no momento.</p>
           <button className="px-8 py-3 bg-white border border-graphite/10 text-graphite-dark font-bold rounded-full hover:bg-ice transition-colors">
             Ver Campanhas Encerradas
           </button>
        </div>

      </div>
    </motion.div>
  );
}

// Internal Link Helper
import { Link } from 'react-router-dom';
