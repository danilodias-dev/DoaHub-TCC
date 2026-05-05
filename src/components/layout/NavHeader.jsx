import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HIDDEN_NAV_ROUTES } from '../../data/constants';

const NAV_LINKS = [
  { to: '/explorar', label: 'Explorar' },
  { to: '/transparencia', label: 'Transparência' },
  { to: '/quem-somos', label: 'Quem Somos' },
  { to: '/ajuda', label: 'Central de Ajuda' },
];

const MOBILE_LINKS = [
  { to: '/', label: 'Início' },
  { to: '/explorar', label: 'Explorar Campanhas' },
  { to: '/transparencia', label: 'Transparência' },
  { to: '/quem-somos', label: 'Quem Somos' },
  { to: '/ajuda', label: 'Central de Ajuda' },
  { to: '/doador/doacoes', label: 'Minhas Doações' },
  { to: '/configuracoes', label: 'Configurações' },
  { to: '/ong/dashboard', label: 'Área da ONG' },
];

export function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Hide global nav on specific pages
  if (HIDDEN_NAV_ROUTES.some(p => pathname.startsWith(p))) return null;

  return (
    <>
      <header className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-emerald text-white flex items-center justify-center shadow-lg shadow-emerald/40 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="font-display font-bold text-xl md:text-2xl text-graphite-dark tracking-tight">Doa<span className="text-emerald">Hub</span></span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 font-medium text-graphite-light">
            {NAV_LINKS.map(link => (
              <Link key={link.to} to={link.to} className="hover:text-emerald transition-colors">{link.label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden md:block font-medium text-graphite hover:text-emerald transition-colors">Entrar</Link>
            <Link to="/cadastro" className="hidden md:inline-flex px-5 py-2.5 bg-graphite-dark text-white rounded-full font-medium hover:bg-emerald transition-all duration-300 shadow-md text-sm">
              Cadastre-se
            </Link>
            {/* Hamburger Mobile */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-ice transition-colors text-graphite-dark">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/60 backdrop-blur-md" 
              onClick={() => setIsOpen(false)}
            ></motion.div>
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl p-6 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center mb-8">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-lg bg-emerald text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="font-display font-bold text-lg text-graphite-dark">DoaHub</span>
                </Link>
                <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-ice text-graphite-dark transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {MOBILE_LINKS.map(link => (
                  <Link 
                    key={link.to} 
                    to={link.to} 
                    className={`px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 ${
                      pathname === link.to 
                        ? 'bg-emerald text-white shadow-lg shadow-emerald/20' 
                        : 'text-graphite hover:bg-emerald/5 hover:text-emerald'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <hr className="my-4 border-graphite/5" />
                <Link to="/login" className="px-4 py-4 rounded-2xl font-bold text-graphite text-center border border-graphite/10 hover:bg-ice transition-colors">
                  Entrar
                </Link>
                <Link to="/cadastro" className="px-4 py-4 bg-emerald text-white rounded-2xl font-black text-center shadow-xl shadow-emerald/20 active:scale-95 transition-all">
                  Cadastre-se Agora
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
