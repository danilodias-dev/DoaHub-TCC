import { motion } from 'framer-motion';
import { User, Shield, Bell, CreditCard, Camera, Lock, Check, Save } from 'lucide-react';
import { useState } from 'react';
import { PremiumButton } from '../../components/ui/PremiumButton';

export function Configuracoes() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaved, setIsSaved] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const TABS = [
    { id: 'profile', label: 'Meu Perfil', icon: User },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'payments', label: 'Pagamentos', icon: CreditCard },
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-ice pt-24 pb-20 px-6"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-display font-extrabold text-graphite-dark tracking-tight">Configurações</h1>
          <p className="text-graphite-light font-medium">Gerencie suas informações pessoais e preferências de conta.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Nav */}
          <div className="w-full md:w-64 flex flex-col gap-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id ? 'bg-emerald text-white shadow-lg shadow-emerald/30' : 'bg-white text-graphite-light hover:bg-white/50 border border-graphite/5'}`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Card */}
          <div className="flex-grow bg-white rounded-[2.5rem] border border-graphite/5 shadow-sm p-8 md:p-12 relative overflow-hidden">
            
            {/* Header of Content */}
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-display font-bold text-graphite-dark">
                {TABS.find(t => t.id === activeTab)?.label}
              </h2>
              {isSaved && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-emerald font-bold text-sm bg-emerald/10 px-4 py-2 rounded-full"
                >
                  <Check className="w-4 h-4" /> Alterações Salvas
                </motion.div>
              )}
            </div>

            {/* TAB: Profile */}
            {activeTab === 'profile' && (
              <div className="flex flex-col gap-8 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full bg-ice border-4 border-white shadow-xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop" alt="Perfil" className="w-full h-full object-cover" />
                    </div>
                    <button className="absolute bottom-0 right-0 p-2.5 bg-emerald text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold text-graphite-dark">Ricardo Oliveira</h3>
                    <p className="text-sm font-medium text-graphite-light mb-2">Membro desde Março de 2026</p>
                    <span className="px-3 py-1 bg-emerald/10 text-emerald text-[10px] uppercase font-black rounded-full tracking-widest w-fit">Doador Nível 7</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 shadow-inner-sm">
                    <label className="text-[10px] font-bold text-graphite-light uppercase tracking-widest ml-1">Nome Completo</label>
                    <input type="text" defaultValue="Ricardo Oliveira" className="w-full bg-ice/50 border border-graphite/5 rounded-2xl py-4 px-6 outline-none focus:border-emerald font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-graphite-light uppercase tracking-widest ml-1">E-mail</label>
                    <input type="email" defaultValue="ricardo@email.com" className="w-full bg-ice/50 border border-graphite/5 rounded-2xl py-4 px-6 outline-none focus:border-emerald font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-graphite-light uppercase tracking-widest ml-1">Telefone</label>
                    <input type="text" defaultValue="(11) 98765-4321" className="w-full bg-ice/50 border border-graphite/5 rounded-2xl py-4 px-6 outline-none focus:border-emerald font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-graphite-light uppercase tracking-widest ml-1">Cidade / Estado</label>
                    <input type="text" defaultValue="São Paulo, SP" className="w-full bg-ice/50 border border-graphite/5 rounded-2xl py-4 px-6 outline-none focus:border-emerald font-medium" />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Security */}
            {activeTab === 'security' && (
              <div className="flex flex-col gap-8 animate-in slide-in-from-right duration-500">
                <div className="bg-orange/5 border border-orange/10 p-6 rounded-2xl flex gap-4 items-start mb-2">
                  <div className="p-2 bg-orange/10 rounded-xl text-orange">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-graphite-dark">Proteja sua conta</p>
                    <p className="text-sm text-graphite-light font-medium leading-relaxed">Sua senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, números e caracteres especiais.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-6 max-w-md">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-graphite-light uppercase tracking-widest ml-1">Senha Atual</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-ice/50 border border-graphite/5 rounded-2xl py-4 px-6 outline-none focus:border-emerald font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-graphite-light uppercase tracking-widest ml-1">Nova Senha</label>
                    <input type="password" placeholder="Nova senha de 8+ dígitos" className="w-full bg-ice/50 border border-graphite/5 rounded-2xl py-4 px-6 outline-none focus:border-emerald font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-graphite-light uppercase tracking-widest ml-1">Confirmar Nova Senha</label>
                    <input type="password" placeholder="Repita a nova senha" className="w-full bg-ice/50 border border-graphite/5 rounded-2xl py-4 px-6 outline-none focus:border-emerald font-medium" />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Notifications */}
            {activeTab === 'notifications' && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-500">
                {[
                  { label: "Alertas de Impacto", desc: "Receba relatórios de como sua doação foi utilizada pela ONG.", defaultChecked: true },
                  { label: "Novas Campanhas", desc: "Seja avisado quando ONGs que você segue lançarem novos projetos.", defaultChecked: true },
                  { label: "Dicas de Filantropia", desc: "Newsletter mensal com curadoria das melhores práticas sociais.", defaultChecked: false },
                  { label: "Segurança da Conta", desc: "Avisos sobre novos logins e alterações de senha.", defaultChecked: true, mandatory: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl hover:bg-ice/30 transition-colors">
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-graphite-dark">{item.label}</p>
                      <p className="text-sm text-graphite-light font-medium">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.defaultChecked} disabled={item.mandatory} className="sr-only peer" />
                      <div className="w-11 h-6 bg-graphite/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald"></div>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: Payments */}
            {activeTab === 'payments' && (
              <div className="flex flex-col gap-8 animate-in fade-in duration-500">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-[1.5rem] bg-gradient-to-br from-graphite-dark to-graphite p-6 relative overflow-hidden text-white shadow-xl">
                       <CreditCard className="absolute top-4 right-4 w-12 h-12 opacity-10" />
                       <div className="flex flex-col gap-8">
                          <span className="text-xs font-black uppercase tracking-widest opacity-60">Cartão Principal</span>
                          <span className="text-xl font-display font-bold tracking-widest">•••• •••• •••• 8842</span>
                          <div className="flex justify-between items-end">
                             <span className="text-sm font-bold">RICARDO OLIVEIRA</span>
                             <span className="text-xs font-bold opacity-60">12/29</span>
                          </div>
                       </div>
                    </div>
                    <button className="border-2 border-dashed border-graphite/10 rounded-[1.5rem] flex flex-col items-center justify-center p-6 gap-3 text-graphite-light hover:border-emerald/30 hover:text-emerald transition-all group">
                       <div className="w-10 h-10 rounded-full bg-ice flex items-center justify-center group-hover:bg-emerald group-hover:text-white transition-colors">
                          <CreditCard className="w-5 h-5" />
                       </div>
                       <span className="font-bold text-sm">Adicionar Novo Cartão</span>
                    </button>
                 </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="mt-12 pt-8 border-t border-graphite/5 flex justify-end gap-4">
              <button className="px-8 py-3 text-graphite-light font-bold hover:text-graphite transition-colors">Descartar</button>
              <PremiumButton onClick={handleSave} className="px-10 flex items-center gap-2">
                <Save className="w-4 h-4" /> Salvar Alterações
              </PremiumButton>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
