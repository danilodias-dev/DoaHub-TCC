import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Globe2, Target, Zap } from 'lucide-react';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { Link } from 'react-router-dom';
import { motionTokens } from '../../utils/motion';

export function QuemSomos() {
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const values = [
    { icon: Target, title: "Nossa Missão", desc: "Democratizar o acesso à filantropia estratégica, conectando recursos a quem realmente gera impacto social." },
    { icon: ShieldCheck, title: "Nossa Visão", desc: "Ser a maior e mais confiável plataforma de doações da América Latina até 2030, baseada em transparência absoluta." },
    { icon: Zap, title: "Nossos Valores", desc: "Ética radical, inovação constante, empatia profunda e compromisso com o resultado social mensurável." }
  ];

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={motionTokens.page}
      className="flex flex-col w-full overflow-hidden"
    >
      
      {/* Hero Section - Editorial Style */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald/5 text-emerald rounded-full text-xs font-bold uppercase tracking-widest self-center md:self-start"
            >
              <Heart className="w-3 h-3" /> Propósito & Tecnologia
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-display font-extrabold text-graphite-dark tracking-tighter leading-[0.9]"
            >
              Construindo um futuro mais <span className="text-emerald">generoso</span>.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-graphite-light leading-relaxed max-w-xl"
            >
              O DoaHub nasceu de uma inquietude: como garantir que cada centavo doado realmente mude uma vida? Unimos tecnologia de ponta e curadoria humana para criar a rede de solidariedade mais transparente do país.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop" 
                alt="Impacto Social" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-slow"
              />
            </div>
            {/* Floating Element */}
            <div className="absolute -bottom-6 -left-6 bg-emerald text-white p-6 rounded-3xl shadow-xl z-20 hidden md:block max-w-[200px] animate-bounce-slow">
              <span className="text-3xl font-bold font-display">1.2M</span>
              <p className="text-xs font-medium text-white/80">Vidas impactadas desde o primeiro dia de fundação.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section: The Problem & Solution */}
      <section className="py-20 bg-ice px-6 border-y border-graphite/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6 order-2 md:order-1">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-graphite-dark leading-tight">A falta de confiança não pode travar a bondade.</h2>
              <div className="flex flex-col gap-4">
                <div className="p-5 bg-white rounded-2xl border-l-4 border-emerald shadow-sm">
                  <p className="text-graphite-dark font-medium italic">"Segundo dados do IDIS, o maior motivo para brasileiros não doarem mais é o medo da má utilização dos recursos."</p>
                </div>
                <p className="text-graphite-light font-medium leading-relaxed">
                  Resolvemos esse problema eliminando a opacidade. No DoaHub, a ONG não é apenas listada; ela é auditada. Cada relatório de impacto é digital e rastreável, transformando cada doador em um investidor social consciente.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 order-1 md:order-2">
               <div className="bg-white p-6 rounded-[2rem] aspect-square flex flex-col items-center justify-center text-center gap-3 shadow-sm hover:shadow-xl transition-all">
                  <div className="w-12 h-12 rounded-full bg-emerald/10 text-emerald flex items-center justify-center">
                     <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-graphite-dark uppercase">Auditoria Viral</span>
               </div>
               <div className="bg-emerald p-6 rounded-[2rem] aspect-square flex flex-col items-center justify-center text-center gap-3 shadow-xl shadow-emerald/20 mt-8">
                  <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center">
                     <Globe2 className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-white uppercase">Rede Global</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-16">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-graphite-dark">O que nos guia.</h2>
            <p className="text-graphite-light font-medium text-lg">Nossas fundações são sólidas, desenhadas para suportar o peso da responsabilidade social.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white border border-graphite/5 p-10 rounded-[3rem] shadow-sm flex flex-col items-center text-center gap-6 group hover:shadow-2xl hover:shadow-emerald/5 transition-all duration-page"
              >
                <div className="w-20 h-20 rounded-3xl bg-emerald/5 text-emerald flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-page">
                  <v.icon className="w-10 h-10" />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display font-bold text-2xl text-graphite-dark">{v.title}</h3>
                  <p className="text-graphite-light leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders/Commitment Section */}
      <section className="py-24 bg-graphite-dark text-white px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-10">
          <div className="w-16 h-1 bg-emerald rounded-full"></div>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">O compromisso do DoaHub é com o seu legado.</h2>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl font-medium">
            Mais do que uma plataforma de tecnologia, somos uma comunidade de brasileiros que acredita no poder da ação local para resolver desafios globais. O seu ato de doar é o início de uma engrenagem que não para nunca.
          </p>
          <div className="flex gap-4 mt-4">
            <Link to="/cadastro">
              <PremiumButton size="lg">Quero fazer parte</PremiumButton>
            </Link>
            <Link to="/doador">
              <PremiumButton variant="glass" size="lg" className="border-white/20 hover:bg-white/10 text-white">Explorar Campanhas</PremiumButton>
            </Link>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
