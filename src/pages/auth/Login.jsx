import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Code, Globe, ArrowLeft } from 'lucide-react';
import { Logo } from '../../components/ui/Logo';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { motionTokens } from '../../utils/motion';
import { useAuth } from '../../context/AuthContext';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simula autenticação — seta o estado de auth e redireciona para o painel do doador
    login({ name: 'João Silva', email: 'joao@email.com' });
    navigate('/doador');
  };

  const pageVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 }
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
      
      {/* Voltar Home - Mobile Floating */}
      <Link to="/" className="fixed top-6 left-6 z-50 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white hover:bg-white hover:text-graphite transition-all md:hidden">
        <ArrowLeft className="w-5 h-5" />
      </Link>

      {/* Left Side: Visual / Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-graphite-dark overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center scale-110 animate-pulse-slow"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-emerald/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 w-full p-16 flex flex-col justify-between">
          <Logo light />

          <div className="flex flex-col gap-6 max-w-md">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-display font-extrabold text-white leading-tight"
            >
              Transforme intenção em <span className="text-emerald-light">ação</span>.
            </motion.h2>
            <p className="text-white/70 text-lg font-medium leading-relaxed">
              Entre para gerenciar suas doações, acompanhar o impacto das causas que você apoia e descobrir novos projetos auditados.
            </p>
          </div>

          <div className="flex items-center gap-6 text-white/50 text-sm font-medium">
            <span>© 2026 DoaHub Platform</span>
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            <span>Privacidade &amp; Segurança</span>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-ice/30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md flex flex-col gap-8"
        >
          {/* Mobile Logo Only */}
          <div className="lg:hidden flex flex-col items-center gap-4 mb-2">
            <Logo iconOnly className="scale-125" />
            <h1 className="text-2xl font-display font-bold text-graphite-dark tracking-tight">Bem-vindo de volta!</h1>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="hidden lg:block text-3xl font-display font-bold text-graphite-dark">Acesse sua conta</h1>
            <p className="text-graphite-light font-medium">Não tem uma conta? <Link to="/cadastro" className="text-emerald hover:underline font-bold">Cadastre-se grátis</Link></p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 px-4 bg-white border border-graphite/5 rounded-2xl font-bold text-sm text-graphite hover:bg-ice transition-colors shadow-sm">
              <Globe className="w-5 h-5 text-red-500" /> Google
            </button>
            <button className="flex items-center justify-center gap-3 py-3 px-4 bg-white border border-graphite/5 rounded-2xl font-bold text-sm text-graphite hover:bg-ice transition-colors shadow-sm">
              <Code className="w-5 h-5" /> GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-graphite/10"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white/0 px-4 text-graphite-light font-bold tracking-widest">Ou use seu e-mail</span></div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-graphite-light uppercase tracking-wider ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-graphite-light" />
                <input 
                  type="email" 
                  placeholder="seu@email.com" 
                  required
                  className="w-full bg-white border border-graphite/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald/50 focus:ring-4 focus:ring-emerald/5 transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-graphite-light uppercase tracking-wider">Senha</label>
                <button type="button" className="text-[10px] font-bold text-emerald hover:underline">Esqueceu a senha?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-graphite-light" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  required
                  className="w-full bg-white border border-graphite/5 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-emerald/50 focus:ring-4 focus:ring-emerald/5 transition-all font-medium"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-graphite-light hover:text-graphite transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-1 ml-1 cursor-pointer group">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-graphite/20 text-emerald focus:ring-emerald cursor-pointer" />
              <label htmlFor="remember" className="text-sm font-medium text-graphite-light group-hover:text-graphite cursor-pointer transition-colors">Lembrar de mim por 30 dias</label>
            </div>

            <PremiumButton type="submit" size="lg" className="mt-4 shadow-xl shadow-emerald/30">
              Entrar na Plataforma
            </PremiumButton>
          </form>

          <Link to="/" className="lg:hidden flex items-center justify-center gap-2 text-sm font-bold text-graphite-light hover:text-emerald transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para o Site
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
