import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';
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
          <Logo light />
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
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <p className="text-xs">
            © 2026 <span className="text-white font-bold">Doa</span><span className="text-emerald font-bold">Hub</span>. 
            Todos os direitos reservados. Projeto TCC.
          </p>
          <div className="flex gap-6 text-xs">
            <span className="hover:text-emerald transition-colors cursor-pointer">Termos de Uso</span>
            <span className="hover:text-emerald transition-colors cursor-pointer">Privacidade</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: Instagram, label: 'Instagram' },
            { icon: Twitter, label: 'Twitter' },
            { icon: Linkedin, label: 'LinkedIn' },
            { icon: Github, label: 'GitHub' },
          ].map((social, idx) => (
            <a 
              key={idx} 
              href="#" 
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:bg-emerald hover:text-white transition-all"
              aria-label={social.label}
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
