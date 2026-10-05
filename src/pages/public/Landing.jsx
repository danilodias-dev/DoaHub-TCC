import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { SimulatorCTA } from '../../components/ui/SimulatorCTA';
import { HeartHandshake, Globe2, ShieldCheck, ArrowRight, CheckCircle2, Users, Building2, TrendingUp } from 'lucide-react';
import { motionTokens } from '../../utils/motion';

export function Landing() {
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const stats = [
    { icon: Users, value: "50", suffix: "k+", label: "Doadores Ativos" },
    { icon: Building2, value: "1.2", suffix: "k+", label: "ONGs Verificadas" },
    { icon: TrendingUp, value: "15", prefix: "R$ ", suffix: "M", label: "Impacto Gerado" },
    { icon: CheckCircle2, value: "100", suffix: "%", label: "Transparência" },
  ];

  const steps = [
    { title: "Escolha uma Causa", desc: "Navegue por centenas de campanhas auditadas em áreas como educação, saúde e meio ambiente." },
    { title: "Doe com Segurança", desc: "Use métodos de pagamento modernos e seguros. Cada centavo é rastreado via blockchain/ledger." },
    { title: "Acompanhe o Impacto", desc: "Receba relatórios em tempo real de como sua doação está mudando vidas." },
  ];

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={motionTokens.page}
      className="w-full flex-col flex overflow-hidden"
    >
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-20 md:pt-24 pb-12 md:pb-16 px-4 md:px-6 overflow-hidden">
        {/* Background image optimized for LCP */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
            alt="Impacto Social DoaHub"
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          {/* Dark translucent overlay gradient (65% opacity guarantees WCAG AA text contrast) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/45 to-black/55 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...motionTokens.slow, ease: "easeOut" }}
            className="glass-dark rounded-full px-4 md:px-5 py-2 mb-6 md:mb-8 flex items-center gap-2 border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-glow animate-pulse"></span>
            <span className="text-xs md:text-sm font-medium text-white/90">Destinação Fiscal sem Custos Adicionais</span>
          </motion.div>

          {/* Headline <h1> */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...motionTokens.slow, delay: 0.1 }}
            className="text-[clamp(1.85rem,5vw+0.5rem,4.5rem)] font-display font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mb-4 md:mb-6 tracking-tight leading-[1.12]"
          >
            Transforme seu <span className="text-emerald-light">Imposto de Renda</span> em impacto social <span className="text-glow">real e rastreável</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...motionTokens.slow, delay: 0.2 }}
            className="text-base md:text-xl text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] max-w-3xl mb-8 md:mb-10 leading-relaxed font-medium"
          >
            O DoaHub conecta você a ONGs homologadas e gera automaticamente suas guias de destinação fiscal — sem custos e com rastreabilidade total.
          </motion.p>

          {/* Dual Fiscal CTAs */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...motionTokens.slow, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-md sm:max-w-none"
          >
            {/* Primary CTA */}
            <Link to="/simulador" className="w-full sm:w-auto">
              <button 
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald hover:bg-emerald-light text-white font-bold text-base md:text-lg px-8 py-4 rounded-full shadow-xl shadow-emerald/30 transition-all duration-default active:scale-95 group"
              >
                Simular Benefício Fiscal <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
            
            {/* Secondary CTA */}
            <Link to="/explorar" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 backdrop-blur-sm font-semibold text-base md:text-lg px-8 py-4 rounded-full transition-all duration-default active:scale-95"
              >
                Explorar Causas
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-16 md:py-20 px-6 border-b border-ice">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <p className="text-sm font-bold text-graphite-light mb-12 tracking-widest uppercase">Por que escolher o DoaHub?</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl">
            {[
              { icon: ShieldCheck, title: "Curadoria Rigorosa", desc: "Apenas instituições com auditoria fiscal e social ativa passam pelo nosso crivo." },
              { icon: Globe2, title: "Transparência Absoluta", desc: "Painéis de prestação de contas visíveis publicamente para cada real doado." },
              { icon: HeartHandshake, title: "Impacto Imediato", desc: "Repasse sem fricção financeira para que os recursos cheguem onde mais importa." }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-4 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center mb-2 group-hover:bg-emerald group-hover:text-white transition-all duration-default">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-graphite-dark">{feature.title}</h3>
                <p className="text-graphite-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-ice py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-5 md:p-8 bg-white rounded-2xl md:rounded-[2.5rem] shadow-sm border border-graphite/5 hover:shadow-xl hover:shadow-emerald/5 hover:-translate-y-1 transition-all duration-page"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-emerald/5 flex items-center justify-center mb-3 md:mb-4">
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-emerald" />
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  {stat.prefix && <span className="text-lg md:text-xl font-bold text-emerald">{stat.prefix}</span>}
                  <span className="text-3xl md:text-5xl font-display font-black text-graphite-dark">
                    {stat.value}
                  </span>
                  {stat.suffix && <span className="text-lg md:text-xl font-bold text-emerald">{stat.suffix}</span>}
                </div>
                <span className="text-[10px] md:text-xs font-black text-graphite-light uppercase tracking-[0.15em] md:tracking-[0.2em]">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-black text-graphite-dark mb-4 tracking-tight">Como o DoaHub funciona?</h2>
            <p className="text-graphite-light text-lg">Mudar o mundo nunca foi tão simples e transparente.</p>
          </div>
          
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-[2rem] border border-graphite/5 hover:bg-ice/30 transition-colors"
              >
                <div className="w-16 h-16 shrink-0 rounded-full bg-graphite-dark text-white flex items-center justify-center text-2xl font-black">
                  {i + 1}
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-graphite-dark mb-2">{step.title}</h3>
                  <p className="text-graphite-light text-lg leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IR Simulator CTA */}
      <SimulatorCTA />

      {/* Testimonials */}
      <section className="bg-graphite-dark py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 flex flex-col gap-4">
             <span className="text-emerald font-black uppercase tracking-widest text-xs">Vozes do Impacto</span>
             <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">O que dizem nossos <span className="text-glow">doadores</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ana Beatriz", role: "Doadora Recorrente", text: "O que mais me encanta no DoaHub é ver exatamente onde meu dinheiro está sendo usado. O relatório mensal é emocionante.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop" },
              { name: "Carlos Eduardo", role: "Apoio a Educação", text: "Nunca foi tão fácil ajudar. A interface é limpa, rápida e passa muita confiança. Recomendo para todos os meus amigos.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop" },
              { name: "Mariana Luz", role: "Doações Pontuais", text: "A curadoria das ONGs me poupou muito tempo de pesquisa. Sei que cada instituição aqui é séria e auditada.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop" }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md flex flex-col gap-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img src={t.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-emerald" alt={t.name} />
                  <div className="flex flex-col">
                    <span className="font-bold text-white tracking-tight">{t.name}</span>
                    <span className="text-xs text-white/40 uppercase font-bold tracking-widest">{t.role}</span>
                  </div>
                </div>
                <p className="text-white/70 italic leading-relaxed font-medium">"{t.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-emerald py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-10">
           <div className="flex flex-col gap-4">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight leading-tight">O amanhã começa com<br /> o seu sim hoje.</h2>
              <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto">Milhares de vidas aguardam por uma oportunidade. Seja o herói de uma história real agora mesmo.</p>
           </div>
           <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/cadastro">
                <PremiumButton size="lg" className="bg-white text-emerald hover:bg-ice hover:text-emerald-dark px-12 shadow-2xl">Começar Agora Grátis</PremiumButton>
              </Link>
           </div>
        </div>
      </section>

    </motion.div>
  );
}
