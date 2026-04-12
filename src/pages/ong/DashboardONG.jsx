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
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  Home
} from 'lucide-react';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { MOCK_DASHBOARD_STATS, MOCK_DASHBOARD_CAMPAIGNS } from '../../data/mockData';

export function DashboardONG() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const pageVariants = {
    initial: { opacity: 0, scale: 0.99 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.01 }
  };

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
        <div className="p-8 flex items-center gap-3">
           <div className="w-8 h-8 rounded-lg bg-emerald text-white flex items-center justify-center font-bold">D</div>
           <span className="font-display font-bold text-xl text-graphite-dark tracking-tight">Doa<span className="text-emerald">Hub</span></span>
        </div>
        
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
                 <span className="text-sm font-bold text-graphite-dark">Inst. Esperança</span>
                 <span className="text-xs text-graphite-light font-medium">Ver Perfil Público</span>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
         
         {/* Header */}
         <header className="h-16 lg:h-20 bg-white border-b border-graphite/5 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40">
            {/* Mobile logo */}
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
               <PremiumButton size="sm" className="hidden md:flex gap-2">
                  <Plus className="w-4 h-4" /> Nova Campanha
               </PremiumButton>
            </div>
         </header>

         {/* Scrollable Area */}
         <div className="p-4 lg:p-8 pb-24 lg:pb-8 flex flex-col gap-6 lg:gap-8 max-w-7xl">
            
            <div className="flex flex-col gap-1">
               <h2 className="text-3xl font-display font-bold text-graphite-dark">Olá, Instituto Esperança 👋</h2>
               <p className="text-graphite-light font-medium">Bem vindo ao painel de gestão. Aqui está o resumo do seu impacto.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {MOCK_DASHBOARD_STATS.map((s, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-[2rem] p-6 shadow-sm border border-graphite/5 flex flex-col gap-4 group hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500"
                  >
                     <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl bg-emerald/5 text-emerald flex items-center justify-center font-bold`}>
                           <s.icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-emerald bg-emerald/10 px-2 py-1 rounded-lg flex items-center gap-1">
                           <ArrowUpRight className="w-3 h-3" /> {s.trend}
                        </span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-medium text-graphite-light">{s.title}</span>
                        <span className="text-2xl font-display font-extrabold text-graphite-dark">{s.value}</span>
                     </div>
                  </motion.div>
               ))}
            </div>

            {/* Main Dashboard Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               
               {/* Left Column: Campaigns Table */}
               <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-graphite/5">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="font-display font-bold text-xl text-graphite-dark">Gerenciar Campanhas</h3>
                     <button className="text-sm font-bold text-emerald hover:underline">Ver tudo</button>
                  </div>

                  <div className="flex flex-col gap-5">
                     {MOCK_DASHBOARD_CAMPAIGNS.map((c) => {
                        const perc = Math.min(Math.round((c.raised / c.goal) * 100), 100);
                        return (
                           <div key={c.id} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-ice transition-colors group cursor-pointer border border-transparent hover:border-graphite/5">
                              <div className="w-14 h-14 bg-ice rounded-xl flex items-center justify-center text-graphite-light overflow-hidden">
                                 <div className="w-full h-full bg-emerald/10 flex items-center justify-center">
                                    <Megaphone className="w-6 h-6 text-emerald" />
                                 </div>
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col gap-1">
                                 <span className="font-bold text-graphite-dark truncate group-hover:text-emerald transition-colors">{c.title}</span>
                                 <div className="flex items-center gap-3">
                                    <div className="w-full max-w-[150px] h-1.5 bg-graphite/10 rounded-full overflow-hidden">
                                       <div className="h-full bg-emerald" style={{ width: `${perc}%` }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-graphite-light">{perc}%</span>
                                 </div>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                 <span className="font-bold text-graphite-dark text-sm">R$ {c.raised.toLocaleString('pt-BR')}</span>
                                 <div className="flex items-center gap-1">
                                    <div className={`w-1.5 h-1.5 rounded-full ${c.status === 'Ativa' ? 'bg-emerald' : 'bg-graphite-light'}`}></div>
                                    <span className="text-[10px] uppercase font-bold text-graphite-light tracking-wider">{c.status}</span>
                                 </div>
                              </div>
                              <button className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center text-graphite-light">
                                 <MoreVertical className="w-4 h-4" />
                              </button>
                           </div>
                        );
                     })}
                  </div>
               </div>

               {/* Right Column: Activity Feed */}
               <div className="lg:col-span-1 flex flex-col gap-8">
                  
                  {/* Activity Feed */}
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-graphite/5 flex-1">
                     <h3 className="font-display font-bold text-xl text-graphite-dark mb-6">Atividade Recente</h3>
                     <div className="flex flex-col gap-6">
                        {[
                           { name: 'Ana Silva', amount: 'R$ 150', time: 'Há 5 min', action: 'Doação recebida', icon: DollarSign },
                           { name: 'Eduardo M.', amount: 'R$ 50', time: 'Há 12 min', action: 'Novo doador mensal', icon: Users },
                           { name: 'Campanha Sertão', amount: null, time: 'Há 1h', action: 'Meta de 80% atingida!', icon: CheckCircle2 },
                           { name: 'Relatório Mensal', amount: null, time: 'Há 3h', action: 'Relatório gerado', icon: FileText },
                        ].map((a, idx) => (
                           <div key={idx} className="flex gap-4 group">
                              <div className="w-10 h-10 rounded-xl bg-ice flex items-center justify-center text-graphite-light flex-shrink-0 group-hover:bg-emerald/5 group-hover:text-emerald transition-colors">
                                 <a.icon className="w-5 h-5" />
                              </div>
                              <div className="flex flex-col">
                                 <p className="text-sm font-medium text-graphite-dark">
                                    <span className="font-bold">{a.name}</span> {a.amount ? <span className="text-emerald font-bold">• {a.amount}</span> : ''}
                                 </p>
                                 <p className="text-xs text-graphite-light font-medium">{a.action} • {a.time}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                     <button className="w-full mt-8 py-3 rounded-xl border border-graphite/10 text-sm font-bold text-graphite-light hover:bg-ice transition-all">Ver Feed Completo</button>
                  </div>

                  {/* Quick Tip / Action */}
                  <div className="bg-emerald rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-emerald/20">
                     <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Clock className="w-20 h-20 rotate-12" />
                     </div>
                     <div className="relative z-10">
                        <h4 className="font-display font-bold text-xl mb-2">Dica de Impacto 💡</h4>
                        <p className="text-white/80 text-sm font-medium leading-relaxed mb-4">Campanhas com fotos reais do impacto aumentam a doação média em <span className="text-white font-bold">45%</span>.</p>
                        <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all underline decoration-white/30">Atualizar fotos</button>
                     </div>
                  </div>

               </div>

            </div>

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
    </motion.div>
  );
}
