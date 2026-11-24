import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Megaphone, 
  FileText, 
  Settings, 
  Plus, 
  Search, 
  Bell,
  ShieldCheck,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { Logo } from '../../components/ui/Logo';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { NewCampaignModal } from '../../components/ui/NewCampaignModal';
import { Toast } from '../../components/ui/Toast';
import { DashboardTab } from '../../components/admin/tabs/DashboardTab';
import { CampaignsTab } from '../../components/admin/tabs/CampaignsTab';
import { ReportsTab } from '../../components/admin/tabs/ReportsTab';
import { SettingsTab } from '../../components/admin/tabs/SettingsTab';
import { useCampaigns, useNotification } from '../../contexts/CampaignContext';
import { useMemo } from 'react';
import { motionTokens } from '../../utils/motion';

export function DashboardONG() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addCampaign, orgProfile } = useCampaigns();
  const { notification, dismissNotification, showNotification } = useNotification();

  const handleOpenNewCampaign = () => {
    if (!orgProfile.isVerified) {
      navigate('/ong/onboarding/2');
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
      transition={motionTokens.page}
      className="min-h-screen bg-ice flex"
    >
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-graphite/5 flex flex-col sticky top-0 h-screen hidden lg:flex">
        <Logo className="p-8" />
        
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
                   {orgProfile.isVerified 
                     ? <ShieldCheck className="w-3.5 h-3.5 text-emerald" title="Verificada" />
                     : orgProfile.verificationStatus === 'pending' 
                       ? <Clock className="w-3.5 h-3.5 text-amber-500" title="Em Análise" /> 
                       : null}
                 </div>
                  <Link to={`/instituicao/${orgProfile.id}`} className="text-xs text-graphite-light font-medium hover:text-emerald hover:underline transition-colors">
                    Ver Perfil Público
                  </Link>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
         
         {/* Header */}
         <header className="h-16 lg:h-20 bg-white border-b border-graphite/5 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40">
            <Logo className="lg:hidden scale-90 origin-left" />
            <div className="hidden lg:flex items-center gap-4 bg-ice px-4 py-2 rounded-xl border border-graphite/5 w-full max-w-md">
               <Search className="w-4 h-4 text-graphite-light" />
               <input type="text" placeholder="Buscar doações, relatórios..." className="bg-transparent border-none outline-none text-sm font-medium w-full text-graphite-dark" />
            </div>

            <div className="flex items-center gap-3">
               <button className="w-10 h-10 rounded-xl hover:bg-ice flex items-center justify-center text-graphite-light transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
               </button>
               <PremiumButton 
                 size="sm" 
                 className={`hidden md:flex gap-2 ${!orgProfile.isVerified ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20' : ''}`} 
                 onClick={handleOpenNewCampaign}
               >
                 {!orgProfile.isVerified ? <AlertTriangle className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                 {!orgProfile.isVerified ? 'Concluir Cadastro' : 'Nova Campanha'}
               </PremiumButton>
            </div>
         </header>

         {/* Scrollable Area — Tab Content */}
         <div className="p-4 lg:p-8 pb-24 lg:pb-8 flex flex-col gap-6 lg:gap-8 max-w-7xl mx-auto w-full">
            {tabContent}
         </div>
      </main>

      {/* FAB Nova Campanha — visível apenas em telas menores que lg */}
      <button
        onClick={handleOpenNewCampaign}
        className={`lg:hidden fixed bottom-20 right-5 z-40 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all active:scale-95 ${
          !orgProfile.isVerified
            ? 'bg-amber-500 shadow-amber-500/40 text-white'
            : 'bg-emerald shadow-emerald/40 text-white'
        }`}
        aria-label={!orgProfile.isVerified ? 'Concluir Cadastro' : 'Nova Campanha'}
        title={!orgProfile.isVerified ? 'Concluir Cadastro' : 'Nova Campanha'}
      >
        {!orgProfile.isVerified ? (
          <AlertTriangle className="w-6 h-6" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
      </button>

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
            className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl text-[10px] font-bold transition-colors min-w-[56px] min-h-[48px] ${activeTab === item.id ? 'text-emerald' : 'text-graphite-light'}`}
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
