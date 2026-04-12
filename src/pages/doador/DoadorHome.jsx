import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Grid, Heart } from 'lucide-react';
import { CampaignCard } from '../../components/ui/CampaignCard';
import { MOCK_CAMPAIGNS } from '../../data/mockData';

export function DoadorHome() {
  const [activeTab, setActiveTab] = useState("all");

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-ice pt-24 pb-20 px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-2"
          >
            <h1 className="text-4xl font-display font-extrabold text-graphite-dark">
              Encontre o seu <span className="text-emerald">propósito</span>
            </h1>
            <p className="text-graphite-light text-lg max-w-xl">
              Navegue pelo nosso ecossistema de ONGs auditadas. Apoie projetos com transparência e prestação de contas real.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-auto"
          >
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-graphite-light group-focus-within:text-emerald transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Buscar ONGs ou causas..." 
                className="w-full md:w-80 bg-white border border-graphite/10 focus:border-emerald/50 focus:ring-4 focus:ring-emerald/10 text-graphite rounded-full py-3.5 pl-11 pr-4 outline-none transition-all duration-300 shadow-sm"
              />
            </div>
          </motion.div>
        </div>

        {/* Bento Bar / Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-4 flex flex-col sm:flex-row shadow-sm border border-graphite/5 gap-4"
        >
          <div className="flex bg-ice rounded-2xl p-1 overflow-x-auto select-none sm:w-auto w-full">
            {[
              { id: "all", label: "Todas Causas", icon: Grid },
              { id: "edu", label: "Educação", icon: Heart },
              { id: "env", label: "Meio Ambiente", icon: MapPin },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all mr-1 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? "bg-white text-emerald shadow-sm" 
                    : "text-graphite-light hover:text-graphite"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 flex justify-end items-center px-4">
               <div className="text-sm text-graphite-light font-medium">
                  Resultados auditados
               </div>
          </div>
        </motion.div>

        {/* Campaign Grid Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
        >
          {MOCK_CAMPAIGNS.map((camp, index) => (
             <motion.div 
                key={camp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
             >
                <CampaignCard {...camp} />
             </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
