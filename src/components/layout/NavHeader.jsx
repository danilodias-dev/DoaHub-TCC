import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, UserCircle2, LogOut, LayoutDashboard, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { useAuth } from '../../context/AuthContext';
import { HIDDEN_NAV_ROUTES } from '../../data/constants';

/**
 * Links públicos comuns a todos os estados (guest e logado).
 * Inseridos na ordem exata especificada pelo design.
 */
const GUEST_LINKS = [
  { to: '/explorar',     label: 'Explorar' },
  { to: '/simulador-ir', label: 'Simulador de IR' },
  { to: '/quem-somos',  label: 'Quem Somos' },
  { to: '/transparencia', label: 'Transparência' },
  { to: '/ajuda',        label: 'Ajuda' },
];

/**
 * Links do doador logado — "Meu Painel" inserido imediatamente
 * após "Simulador de IR" e antes de "Quem Somos".
 */
const DONOR_LINKS = [
  { to: '/explorar',     label: 'Explorar' },
  { to: '/simulador-ir', label: 'Simulador de IR' },
  { to: '/doador',       label: 'Meu Painel' },
  { to: '/quem-somos',  label: 'Quem Somos' },
  { to: '/transparencia', label: 'Transparência' },
  { to: '/ajuda',        label: 'Ajuda' },
];

/**
 * Links do mobile drawer — guest
 */
const MOBILE_GUEST_LINKS = [
  { to: '/',             label: 'Início' },
  { to: '/explorar',     label: 'Explorar' },
  { to: '/simulador-ir', label: 'Simulador de IR' },
  { to: '/quem-somos',  label: 'Quem Somos' },
  { to: '/transparencia', label: 'Transparência' },
  { to: '/ajuda',        label: 'Ajuda' },
];

/**
 * Links do mobile drawer — doador logado
 */
const MOBILE_DONOR_LINKS = [
  { to: '/',                 label: 'Início' },
  { to: '/explorar',         label: 'Explorar' },
  { to: '/simulador-ir',     label: 'Simulador de IR' },
  { to: '/doador',           label: 'Meu Painel' },
  { to: '/quem-somos',      label: 'Quem Somos' },
  { to: '/transparencia',    label: 'Transparência' },
  { to: '/ajuda',            label: 'Ajuda' },
  { to: '/configuracoes',    label: 'Meu Perfil' },
];

// ─── Componente: Item de navegação desktop ──────────────────────────────────

/**
 * Renderiza um link de navegação desktop com indicador de aba ativa.
 * O underline com layoutId="activeNavTab" faz o indicador deslizar
 * suavemente entre abas usando Framer Motion layout animation.
 */
function NavItem({ to, label, isActive }) {
  return (
    <Link
      to={to}
      className={`relative pb-1 font-medium transition-colors duration-default ${
        isActive ? 'text-emerald' : 'text-graphite-light hover:text-emerald'
      }`}
    >
      {label}
      {isActive && (
        <motion.span
          layoutId="activeNavTab"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-6 rounded-full bg-emerald"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
    </Link>
  );
}

// ─── Componente: Dropdown de perfil ─────────────────────────────────────────

function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Pega só o primeiro nome para exibição compacta
  const firstName = user.name.split(' ')[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-graphite hover:bg-emerald/5 hover:text-emerald transition-all duration-default"
      >
        <UserCircle2 className="w-6 h-6 text-emerald flex-shrink-0" />
        <span className="text-sm">Olá, <strong>{firstName}</strong></span>
        <ChevronDown
          className={`w-4 h-4 text-graphite-light transition-transform duration-default ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-52 bg-white border border-graphite/5 rounded-2xl shadow-xl shadow-graphite/10 overflow-hidden z-50"
          >
            {/* Cabeçalho do dropdown */}
            <div className="px-4 py-3 border-b border-graphite/5">
              <p className="text-xs font-bold text-graphite-light uppercase tracking-wide">Conta</p>
              <p className="text-sm font-semibold text-graphite-dark truncate mt-0.5">{user.name}</p>
            </div>

            {/* Opções */}
            <div className="p-1.5 flex flex-col gap-0.5">
              <Link
                to="/configuracoes"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-graphite hover:bg-emerald/5 hover:text-emerald transition-colors"
              >
                <User className="w-4 h-4 flex-shrink-0" />
                Meu Perfil
              </Link>
              <Link
                to="/doador"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-graphite hover:bg-emerald/5 hover:text-emerald transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
                Meu Painel
              </Link>
            </div>

            {/* Logout */}
            <div className="p-1.5 pt-0">
              <div className="border-t border-graphite/5 pt-1.5">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  Sair
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Componente Principal: NavHeader ────────────────────────────────────────

export function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading, logout } = useAuth();

  // Fecha o mobile menu em toda troca de rota
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Oculta o header em rotas específicas (dashboard ONG, checkout, auth)
  if (HIDDEN_NAV_ROUTES.some(p => pathname.startsWith(p))) return null;

  const navLinks = user ? DONOR_LINKS : GUEST_LINKS;
  const mobileLinks = user ? MOBILE_DONOR_LINKS : MOBILE_GUEST_LINKS;

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <>
      <header className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <NavItem
                key={link.to}
                to={link.to}
                label={link.label}
                isActive={pathname === link.to || (link.to !== '/' && pathname.startsWith(link.to)) || (link.to === '/simulador-ir' && pathname === '/simulador')}
              />
            ))}
          </nav>

          {/* Desktop — Área de ação (direita) */}
          <div
            className={`flex items-center gap-3 transition-opacity duration-fast ${
              isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            {user ? (
              /* Doador logado: dropdown de perfil */
              <div className="hidden md:flex">
                <ProfileDropdown user={user} onLogout={handleLogout} />
              </div>
            ) : (
              /* Guest: botões Entrar + Cadastrar ONG */
              <>
                <Link
                  to="/login"
                  className="hidden md:block font-medium text-graphite hover:text-emerald transition-colors duration-default text-sm"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="hidden md:inline-flex items-center px-5 py-2.5 bg-emerald text-white rounded-full font-semibold hover:bg-emerald-dark transition-all duration-default shadow-md shadow-emerald/20 text-sm whitespace-nowrap"
                >
                  Cadastrar ONG
                </Link>
              </>
            )}

            {/* Hamburger Mobile — sempre visível */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-ice transition-colors text-graphite-dark"
              aria-label="Abrir menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/60 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl p-6 flex flex-col gap-2"
            >
              {/* Header do drawer */}
              <div className="flex justify-between items-center mb-6">
                <Logo className="scale-90 origin-left" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-ice text-graphite-dark transition-colors"
                  aria-label="Fechar menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Info do usuário logado (mobile) */}
              {user && (
                <div className="flex items-center gap-3 px-4 py-3 bg-emerald/5 rounded-2xl mb-2">
                  <UserCircle2 className="w-8 h-8 text-emerald flex-shrink-0" />
                  <div>
                    <p className="text-xs text-graphite-light font-medium">Bem-vindo de volta!</p>
                    <p className="text-sm font-bold text-graphite-dark">{user.name}</p>
                  </div>
                </div>
              )}

              {/* Links de navegação */}
              <div className="flex flex-col gap-1 flex-grow overflow-y-auto">
                {mobileLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-3.5 rounded-2xl font-medium transition-all duration-default ${
                      pathname === link.to || (link.to !== '/' && pathname.startsWith(link.to)) || (link.to === '/simulador-ir' && pathname === '/simulador')
                        ? 'bg-emerald text-white shadow-lg shadow-emerald/20'
                        : 'text-graphite hover:bg-emerald/5 hover:text-emerald'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Footer do drawer */}
              <div className="mt-auto flex flex-col gap-3 pt-4">
                <hr className="border-graphite/5" />
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl font-bold text-red-500 border border-red-100 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Sair da Conta
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-4 rounded-2xl font-bold text-graphite text-center border border-graphite/10 hover:bg-ice transition-colors"
                    >
                      Entrar
                    </Link>
                    <Link
                      to="/cadastro"
                      className="px-4 py-4 bg-emerald text-white rounded-2xl font-black text-center shadow-xl shadow-emerald/20 active:scale-95 transition-all"
                    >
                      Cadastrar ONG
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
