import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Componente de Logo padronizado para o sistema DoaHub.
 * Baseado no sistema de design 'Editorial Empathy'.
 * 
 * @param {string} className - Classes CSS adicionais.
 * @param {boolean} iconOnly - Se verdadeiro, renderiza apenas o ícone.
 * @param {boolean} light - Se verdadeiro, renderiza o texto em branco (para fundos escuros).
 * @param {string} to - Link para onde o logo redireciona.
 */
export function Logo({ className = "", iconOnly = false, light = false, to = "/" }) {
  const content = (
    <div className={`flex items-center gap-2 group ${className}`}>
      {/* Icon: Solid green rounded-square with minimalist white heart outline */}
      <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-emerald text-white flex items-center justify-center shadow-lg shadow-emerald/20 group-hover:scale-105 transition-transform shrink-0">
        <Heart className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
      </div>
      
      {!iconOnly && (
        <span className="font-brand font-bold text-xl md:text-2xl tracking-tight transition-colors flex items-center">
          <span className={light ? 'text-white' : 'text-graphite-dark'}>Doa</span>
          <span className="text-emerald">Hub</span>
        </span>
      )}
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
}
