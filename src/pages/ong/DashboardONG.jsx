import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Megaphone, 
  FileText, 
  Settings, 
  Plus, 
  Search, 
  Bell,
  ShieldCheck,
} from 'lucide-react';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { NewCampaignModal } from '../../components/ui/NewCampaignModal';
import { Toast } from '../../components/ui/Toast';
import { DashboardTab } from '../../components/tabs/DashboardTab';
import { CampaignsTab } from '../../components/tabs/CampaignsTab';
import { ReportsTab } from '../../components/tabs/ReportsTab';
import { SettingsTab } from '../../components/tabs/SettingsTab';
import { useCampaigns, useNotification } from '../../context/CampaignContext';
import { useMemo } from 'react';

export function DashboardONG() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addCampaign, orgProfile } = useCampaigns();
  const { notification, dismissNotification, showNotification } = useNotification();

  const handleOpenNewCampaign = () => {
    if (!orgProfile.isVerified) {
      showNotification(
        'error',
        'Acesso Negado',
        'Sua ONG precisa estar verificada para publicar novas campanhas. Conclua o envio da documentação.'
      );
      return;
    }
    setIsModalOpen(true);
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.99 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.01 }
  };

  // Renderiza o conteúdo da aba ativa
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'campanhas':
        return <CampaignsTab onOpenModal={handleOpenNewCampaign} />;
      case 'relatorios':
        return <ReportsTab />;
      case 'config':
        return <SettingsTab />;
      default:
        return <DashboardTab />;
    }
  }, [activeTab, handleOpenNewCampaign]);

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-ice flex"
    >
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-graphite/5 flex flex-col sticky top-0 h-screen hidden lg:flex">
        <Link to="/" className="p-8 flex items-center gap-3 hover:opacity-80 transition-opacity">
           <div className="w-8 h-8 rounded-lg bg-emerald text-white flex items-center justify-center font-bold">D</div>
           <span className="font-display font-bold text-xl text-graphite-dark tracking-tight">Doa<span className="text-emerald">Hub</span></span>
        </Link>
        
        <nav className="flex-1 px-4 flex flex-col gap-1 mt-4">
           {[
             { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
             { id: 'campanhas', label: 'Minhas Campanhas', icon: Megaphone },
             { id: 'relatorios', label: 'Relatórios Impacto', icon: FileText },
             { id: 'config', label: 'Configurações', icon: Settings },
           ].map((item) => (
             <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === item.id ? 'bg-emerald/5 text-emerald' : 'text-graphite-light hover:bg-ice hover:text-graphite'}`}
             >
                <item.icon className="w-5 h-5" /> {item.label}
             </button>
           ))}
        </nav>

        <div className="p-6 border-t border-graphite/5">
           <div className="bg-ice rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald/20 flex items-center justify-center font-bold text-emerald">IE</div>
              <div className="flex flex-col">
                 <div className="flex items-center gap-1">
                   <span className="text-sm font-bold text-graphite-dark truncate max-w-[120px]">{orgProfile.name}</span>
                   {orgProfile.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald" title="ONG Verificada" />}
                 </div>
                 <span className="text-xs text-graphite-light font-medium">Ver Perfil Público</span>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
         
         {/* Header */}
         <header className="h-16 lg:h-20 bg-white border-b border-graphite/5 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40">
            <Link to="/" className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald text-white flex items-center justify-center font-bold text-sm">D</div>
              <span className="font-display font-bold text-lg text-graphite-dark">Doa<span className="text-emerald">Hub</span></span>
            </Link>
            <div className="hidden lg:flex items-center gap-4 bg-ice px-4 py-2 rounded-xl border border-graphite/5 w-full max-w-md">
               <Search className="w-4 h-4 text-graphite-light" />
               <input type="text" placeholder="Buscar doações, relatórios..." className="bg-transparent border-none outline-none text-sm font-medium w-full text-graphite-dark" />
            </div>

            <div className="flex items-center gap-3">
               <button className="w-10 h-10 rounded-xl hover:bg-ice flex items-center justify-center text-graphite-light transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
               </button>
               <PremiumButton size="sm" className="hidden md:flex gap-2" onClick={handleOpenNewCampaign}>
                  <Plus className="w-4 h-4" /> Nova Campanha
               </PremiumButton>
            </div>
         </header>

         {/* Scrollable Area — Tab Content */}
         <div className="p-4 lg:p-8 pb-24 lg:pb-8 flex flex-col gap-6 lg:gap-8 max-w-7xl">
            {tabContent}
         </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-graphite/5 z-50 px-2 py-2 flex justify-around items-center">
        {[
          { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
          { id: 'campanhas', label: 'Campanhas', icon: Megaphone },
          { id: 'relatorios', label: 'Relatórios', icon: FileText },
          { id: 'config', label: 'Config', icon: Settings },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-colors ${activeTab === item.id ? 'text-emerald' : 'text-graphite-light'}`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Modal Nova Campanha */}
      <NewCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addCampaign}
      />

      {/* Toast de Notificação */}
      <Toast notification={notification} onDismiss={dismissNotification} />
    </motion.div>
  );
}
