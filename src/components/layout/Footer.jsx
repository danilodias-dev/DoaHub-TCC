import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { HIDDEN_NAV_ROUTES } from '../../data/constants';

const FOOTER_SECTIONS = [
  {
    title: 'Plataforma',
    links: [
      { to: '/doador', label: 'Explorar Campanhas' },
      { to: '/transparencia', label: 'Transparência' },
      { to: '/quem-somos', label: 'Quem Somos' },
    ],
  },
  {
    title: 'Para ONGs',
    links: [
      { to: '/ong/onboarding/1', label: 'Cadastrar ONG' },
      { to: '/ong/dashboard', label: 'Dashboard' },
    ],
  },
  {
    title: 'Suporte',
    links: [
      { to: '/ajuda', label: 'Central de Ajuda' },
    ],
    extra: <span className="text-sm">contato@doahub.org.br</span>,
  },
];

export function Footer() {
  const { pathname } = useLocation();

  if (HIDDEN_NAV_ROUTES.some(p => pathname.startsWith(p))) return null;

  return (
    <footer className="bg-graphite-dark text-white/60 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald text-white flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-lg text-white">Doa<span className="text-emerald">Hub</span></span>
          </Link>
          <p className="text-sm leading-relaxed">Conectando doadores a propósitos reais com transparência e tecnologia.</p>
        </div>

        {/* Sections */}
        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <span className="font-bold text-white text-sm uppercase tracking-wider mb-2">{section.title}</span>
            {section.links.map(link => (
              <Link key={link.to} to={link.to} className="text-sm hover:text-emerald transition-colors">{link.label}</Link>
            ))}
            {section.extra}
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs">© 2026 DoaHub. Todos os direitos reservados. Projeto TCC.</p>
        <div className="flex gap-6 text-xs">
          <span className="hover:text-emerald transition-colors cursor-pointer">Termos de Uso</span>
          <span className="hover:text-emerald transition-colors cursor-pointer">Privacidade</span>
        </div>
      </div>
    </footer>
  );
}
