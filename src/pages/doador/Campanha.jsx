import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Users, Heart, Share2, CheckCircle2, ChevronLeft, Calendar, ShieldCheck } from 'lucide-react';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { motionTokens } from '../../utils/motion';

export function Campanha() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('sobre');

  // Hardcoded para simulação estática (TCC)
  const proj = {
    title: "Alimentação para 500 Famílias no Sertão",
    ongName: "Instituto Esperança Viva",
    location: "Pernambuco, PE",
    coverUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format&fit=crop",
    raisedAmount: 42500,
    goalAmount: 50000,
    donorsCount: 312,
    daysLeft: 14,
    description: "Neste projeto vital, estamos mobilizando recursos para combater a insegurança alimentar profunda em áreas de seca extrema. Cada R$ 100 arrecadado garante 1 mês inteiro de alimentação básica para uma família de quatro pessoas. O impacto é visual e rastreável. Seu apoio hoje garante não só comida, mas a dignidade e a esperança de toda uma comunidade local e as gerações seguintes.",
    transparencyTokens: ["Auditoria Realizada (2025)", "Repasse Direto s/ Taxas", "Impacto Mensurável"]
  };

  const progressPercentage = Math.min(Math.round((proj.raisedAmount / proj.goalAmount) * 100), 100);

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={motionTokens.page}
      className="w-full min-h-screen bg-ice pb-24"
    >
      
      {/* Dynamic Nav Offset */}
      <div className="h-20 bg-white"></div>
      
      {/* Simple Top Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/doador" className="flex items-center gap-2 text-graphite-light hover:text-emerald font-medium transition-colors">
          <ChevronLeft className="w-5 h-5" /> Voltar ao Marketplace
        </Link>
        <div className="flex gap-2">
           <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-graphite-light hover:text-emerald ease-out duration-default"><Share2 className="w-4 h-4"/></button>
           <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-graphite-light hover:text-red-500 ease-out duration-default"><Heart className="w-4 h-4"/></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col (Content) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Main Cover */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-[400px] md:h-[500px] bg-white rounded-3xl overflow-hidden shadow-sm"
          >
            <img src={proj.coverUrl} alt="Cover" className="w-full h-full object-cover" />
          </motion.div>

          {/* Intro Information */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4"
          >
             <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-emerald/10 text-emerald text-sm font-bold rounded-full uppercase tracking-wider">Combate à Fome</span>
                <p className="text-sm text-graphite-light font-medium flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {proj.location}
                </p>
             </div>
             
             <h1 className="text-4xl md:text-5xl font-display font-extrabold text-graphite-dark leading-tight">{proj.title}</h1>
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald/20 rounded-full flex items-center justify-center font-bold text-emerald">IE</div>
                <p className="font-semibold text-graphite-dark text-lg">Criado por <span className="text-emerald underline decoration-emerald/30 underline-offset-4 cursor-pointer">{proj.ongName}</span></p>
             </div>
          </motion.div>

          <div className="h-px w-full bg-graphite/10 my-2"></div>

          {/* Details & Tabs */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="flex gap-6 border-b border-graphite/10 mb-6">
              {['sobre', 'auditoria', 'galeria'].map(tab => (
                 <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-medium capitalize transition-colors ${activeTab === tab ? 'border-b-2 border-emerald text-emerald' : 'text-graphite-light hover:text-graphite'}`}
                 >
                    {tab}
                 </button>
              ))}
            </div>

            <div className="prose prose-lg text-graphite-light max-w-none">
              <p className="leading-relaxed">{proj.description}</p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              {proj.transparencyTokens.map((t, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-graphite/5 text-sm font-medium text-graphite shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald" /> {t}
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Right Col (Sticky CTA Bento Box) */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-[100px] bg-white rounded-3xl p-6 shadow-xl shadow-graphite/5 border border-graphite/5 flex flex-col gap-6"
          >
            
            {/* The Goal */}
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-display font-bold text-graphite-dark">R$ {proj.raisedAmount.toLocaleString('pt-BR')}</span>
              <p className="font-medium text-graphite-light">
                arrecadados da meta de <span className="text-graphite">R$ {proj.goalAmount.toLocaleString('pt-BR')}</span>
              </p>
            </div>

            {/* Progress Track */}
            <div className="flex flex-col gap-2">
              <div className="w-full h-3 rounded-full bg-ice-dark overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ ...motionTokens.slow, ease: 'easeOut', delay: 0.3 }}
                  className="h-full bg-emerald relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </motion.div>
              </div>
              <p className="text-emerald font-bold text-right text-sm">{progressPercentage}% financiado</p>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-ice rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                 <Users className="w-6 h-6 text-emerald mb-1" />
                 <span className="font-bold text-lg text-graphite-dark">{proj.donorsCount}</span>
                 <span className="text-xs font-medium text-graphite-light">Doadores</span>
               </div>
               <div className="bg-ice rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                 <Calendar className="w-6 h-6 text-graphite-light mb-1" />
                 <span className="font-bold text-lg text-graphite-dark">{proj.daysLeft}</span>
                 <span className="text-xs font-medium text-graphite-light">Dias Restantes</span>
               </div>
            </div>

            <hr className="border-graphite/10" />

            <div className="flex flex-col gap-3">
              <Link to="/checkout" className="w-full">
                <PremiumButton size="lg" className="w-full shadow-emerald/30 shadow-2xl hover:-translate-y-1">
                  Doar Agora
                </PremiumButton>
              </Link>
              <p className="text-center text-xs font-medium text-graphite-light mt-1 flex items-center justify-center gap-1">
                 <ShieldCheck className="w-3.5 h-3.5"/> Transação 100% Segura via PIX
              </p>
            </div>

          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}

