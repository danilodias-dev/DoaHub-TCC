import { motion } from 'framer-motion';
import { Mail, Lock, User, ShieldCheck, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { motionTokens } from '../../utils/motion';

export function Cadastro() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulação de cadastro - redireciona para a home do doador
    navigate('/doador');
  };

  const pageVariants = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={motionTokens.page}
      className="min-h-screen bg-white flex relative overflow-hidden"
    >
      
      {/* Back Button - Responsive */}
      <Link to="/login" className="fixed top-6 left-6 z-50 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white hover:bg-white hover:text-graphite transition-all md:hidden">
        <ArrowLeft className="w-5 h-5" />
      </Link>

      {/* Left Side: Illustration / Value Prop (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-emerald overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1459183885421-5cc683b8dbaf?w=1200&auto=format&fit=crop")' }}
        ></div>
        
        <div className="relative z-10 w-full p-16 flex flex-col justify-between text-white">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white text-emerald flex items-center justify-center shadow-xl">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">Doa<span className="text-white/80">Hub</span></span>
          </Link>

          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-6xl font-display font-extrabold leading-[0.9] tracking-tighter">Onde a sua ajuda encontra o seu <span className="text-graphite-dark">propósito</span>.</h2>
              <p className="text-white/80 text-xl font-medium max-w-md">Junte-se a mais de 10.000 doadores que escolheram a transparência como base da sua filantropia.</p>
            </motion.div>

            <div className="flex flex-col gap-4">
              {[
                "Curadoria rigorosa de ONGs",
                "Acompanhamento em tempo real",
                "Relatórios de impacto mensais",
                "Certificado de doador destaque"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-white" /> {benefit}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Built for humans, powered by tech.</p>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-ice/20">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md flex flex-col gap-8"
        >
          {/* Mobile UI Only */}
          <div className="lg:hidden flex flex-col items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald text-white flex items-center justify-center shadow-xl">
              <Heart className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-display font-bold text-graphite-dark tracking-tight">Crie sua conta</h1>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="hidden lg:block text-4xl font-display font-bold text-graphite-dark tracking-tight">Faça parte agora.</h1>
            <p className="text-graphite-light font-medium">Já possui uma conta? <Link to="/login" className="text-emerald hover:underline font-bold">Faça login</Link></p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-graphite-light uppercase tracking-widest ml-1">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-graphite-light" />
                <input 
                  type="text" 
                  placeholder="Seu nome" 
                  required
                  className="w-full bg-white border border-graphite/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald/50 focus:ring-4 focus:ring-emerald/5 transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-graphite-light uppercase tracking-widest ml-1">E-mail Corporativo ou Pessoal</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-graphite-light" />
                <input 
                  type="email" 
                  placeholder="exemplo@email.com" 
                  required
                  className="w-full bg-white border border-graphite/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald/50 focus:ring-4 focus:ring-emerald/5 transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-graphite-light uppercase tracking-widest ml-1">Senha Segura</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-graphite-light" />
                <input 
                  type="password" 
                  placeholder="Crie uma senha forte" 
                  required
                  className="w-full bg-white border border-graphite/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald/50 focus:ring-4 focus:ring-emerald/5 transition-all font-medium"
                />
              </div>
            </div>

            <div className="bg-emerald/5 p-4 rounded-2xl flex gap-3 items-start border border-emerald/10 mt-2">
              <ShieldCheck className="w-5 h-5 text-emerald mt-0.5" />
              <p className="text-xs text-graphite-light font-medium leading-relaxed">
                Ao se cadastrar, você concorda com nossos <span className="text-emerald font-bold cursor-pointer">Termos de Uso</span> e nossa <span className="text-emerald font-bold cursor-pointer">Política de Privacidade</span> sob a LGPD.
              </p>
            </div>

            <PremiumButton type="submit" size="lg" className="mt-4 shadow-xl shadow-emerald/20">
              Finalizar Cadastro
            </PremiumButton>
          </form>

          <Link to="/" className="lg:hidden flex items-center justify-center gap-2 text-sm font-bold text-graphite-light hover:text-emerald transition-colors">
            <ArrowLeft className="w-4 h-4" /> Cancelar e Sair
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
