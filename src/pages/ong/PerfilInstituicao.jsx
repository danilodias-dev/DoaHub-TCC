import { motion } from 'framer-motion';
import { Mail, Globe, MapPin, CheckCircle2, ShieldCheck, Heart, Megaphone, FileText, Share2 } from 'lucide-react';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { CampaignCard } from '../../components/ui/CampaignCard';

export function PerfilInstituicao() {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const campaigns = [
// ... existing campaigns ...
  ];

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6 }}
      className="flex flex-col w-full"
    >
      
      {/* Cover and Profile Header */}
      <section className="relative">
        <div className="h-64 md:h-80 w-full bg-graphite-dark relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1459183885421-5cc683b8dbaf?w=1600&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40 grayscale"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative -mt-20 md:-mt-24 z-10">
          <div className="flex flex-col md:flex-row items-end gap-6 md:gap-10">
            <div className="relative group">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] bg-white p-2 shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1559024094-4a1e4495c3c1?w=400&auto=format&fit=crop" 
                  className="w-full h-full object-cover rounded-[2rem]"
                  alt="NGO Logo"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald text-white rounded-full flex items-center justify-center border-4 border-ice shadow-lg">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 mb-4 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white">Instituto Esperança</h1>
                <span className="inline-flex px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white/80 uppercase tracking-widest border border-white/10 self-center md:self-auto">Organização Auditada</span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-white/60 font-medium">
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Recife, PE</div>
                <div className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> esperanca.org.br</div>
                <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> contato@esperanca.org.br</div>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <PremiumButton size="lg" className="px-8 shadow-xl shadow-emerald/30 group">
                Apoiar agora <Heart className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </PremiumButton>
              <button className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-graphite transition-all flex items-center justify-center border border-white/10">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 md:py-24 px-6 bg-ice">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left: About & Stats */}
          <div className="lg:col-span-2 flex flex-col gap-12">
            
            {/* About UI */}
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-graphite/5">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-graphite-dark mb-6">Sobre a Instituição</h2>
              <p className="text-graphite-light text-lg leading-relaxed font-medium">
                Desde 2012, o Instituto Esperança atua na ponta, transformando a realidade de famílias em situação de vulnerabilidade extrema no Sertão de Pernambuco. Nosso foco é segurança alimentar, educação de base e capacitação técnica para mulheres, garantindo não apenas o prato na mesa, mas a dignidade do trabalho. 
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                 <div className="flex flex-col p-6 bg-ice rounded-3xl gap-1">
                    <span className="text-3xl font-display font-extrabold text-emerald">12 anos</span>
                    <span className="text-xs font-bold text-graphite-light uppercase tracking-widest">De Atuação Ativa</span>
                 </div>
                 <div className="flex flex-col p-6 bg-ice rounded-3xl gap-1">
                    <span className="text-3xl font-display font-extrabold text-emerald">845k</span>
                    <span className="text-xs font-bold text-graphite-light uppercase tracking-widest">Arrecadação Total</span>
                 </div>
                 <div className="flex flex-col p-6 bg-ice rounded-3xl gap-1">
                    <span className="text-3xl font-display font-extrabold text-emerald">42k</span>
                    <span className="text-xs font-bold text-graphite-light uppercase tracking-widest">Pessoas Auxiliadas</span>
                 </div>
              </div>
            </div>

            {/* Active Campaigns */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between px-2">
                 <h2 className="text-2xl md:text-3xl font-display font-bold text-graphite-dark">Campanhas em Aberto</h2>
                 <div className="w-12 h-1 bg-emerald rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {campaigns.map((camp, i) => (
                  <CampaignCard key={i} {...camp} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Transparency & Badges */}
          <div className="flex flex-col gap-8">
            
            {/* Trust Center */}
            <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-graphite/5 flex flex-col gap-6">
              <div className="flex items-center gap-3 text-emerald">
                <ShieldCheck className="w-8 h-8" />
                <h3 className="font-display font-bold text-xl text-graphite-dark">Trust Center</h3>
              </div>
              <p className="text-sm font-medium text-graphite-light">Esta ONG mantém o registro público de transparência nível A+ no DoaHub.</p>
              
              <div className="flex flex-col gap-4 mt-4">
                {[
                  { icon: FileText, label: "Estatuto Social 2024", date: "Doc. Verificado" },
                  { icon: FileText, label: "Recibo de Auditoria Q4", date: "Auditado" },
                  { icon: FileText, label: "Balanço Patrimonial", date: "Aprovado" }
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-ice rounded-2xl group cursor-pointer hover:bg-emerald/5 transition-colors">
                     <div className="flex items-center gap-3">
                        <doc.icon className="w-5 h-5 text-graphite-light group-hover:text-emerald" />
                        <span className="text-sm font-bold text-graphite-dark">{doc.label}</span>
                     </div>
                     <span className="text-[10px] font-extrabold text-emerald bg-emerald/10 px-2 py-0.5 rounded-full">{doc.date}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full py-4 rounded-2xl bg-ice text-sm font-bold text-graphite-light hover:bg-emerald/10 hover:text-emerald transition-all">Ver Mural de Transparência</button>
            </div>

            {/* Impact Quote */}
            <div className="bg-emerald rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald/20">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Megaphone className="w-32 h-32 rotate-12" />
               </div>
               <div className="relative z-10 flex flex-col gap-6">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center font-bold text-2xl">“</div>
                  <p className="text-xl font-display font-bold leading-tight">O DoaHub nos permitiu focar no que importa: as famílias. Deixamos a transparência e a tecnologia com eles.</p>
                  <div className="flex flex-col">
                     <span className="font-bold">Marta Vianna</span>
                     <span className="text-xs text-white/60">Diretora Executiva</span>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

    </motion.div>
  );
}
