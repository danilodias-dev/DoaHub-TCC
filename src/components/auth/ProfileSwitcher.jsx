/* eslint-disable react/prop-types */
import { User, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ============================================
 * DoaHub — Profile Switcher (Role Selector)
 * ============================================
 * Segmented control / Tab group acessível (WAI-ARIA tablist)
 * para alternar entre cadastro de Doador e ONG.
 */
export function ProfileSwitcher({ activeRole, onSelectRole }) {
  const handleKeyDown = (e, targetRole) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      onSelectRole(targetRole);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Tipo de cadastro"
      className="w-full bg-ice p-1.5 rounded-2xl border border-graphite/10 grid grid-cols-2 gap-1.5"
    >
      {/* Opção 1: Doador */}
      <button
        type="button"
        role="tab"
        id="tab-donor"
        aria-selected={activeRole === 'donor'}
        aria-controls="panel-donor"
        tabIndex={activeRole === 'donor' ? 0 : -1}
        onClick={() => onSelectRole('donor')}
        onKeyDown={(e) => handleKeyDown(e, 'ong')}
        className={`relative min-h-[48px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold transition-all duration-default focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald ${
          activeRole === 'donor'
            ? 'bg-white text-emerald shadow-sm shadow-graphite/5 border border-emerald/20'
            : 'text-graphite-light hover:text-graphite hover:bg-white/50'
        }`}
      >
        <User className={`w-4 h-4 flex-shrink-0 ${activeRole === 'donor' ? 'text-emerald' : 'text-graphite-light'}`} />
        <div className="flex flex-col items-start text-left leading-tight">
          <span>Sou Doador</span>
          <span className="text-[10px] font-normal opacity-75 hidden sm:inline text-graphite-light">Pessoa Física ou Empresa</span>
        </div>
        {activeRole === 'donor' && (
          <motion.div
            layoutId="profileTabHighlight"
            className="absolute inset-0 rounded-xl border-2 border-emerald/30 pointer-events-none"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </button>

      {/* Opção 2: ONG */}
      <button
        type="button"
        role="tab"
        id="tab-ong"
        aria-selected={activeRole === 'ong'}
        aria-controls="panel-ong"
        tabIndex={activeRole === 'ong' ? 0 : -1}
        onClick={() => onSelectRole('ong')}
        onKeyDown={(e) => handleKeyDown(e, 'donor')}
        className={`relative min-h-[48px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold transition-all duration-default focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald ${
          activeRole === 'ong'
            ? 'bg-white text-emerald shadow-sm shadow-graphite/5 border border-emerald/20'
            : 'text-graphite-light hover:text-graphite hover:bg-white/50'
        }`}
      >
        <Building2 className={`w-4 h-4 flex-shrink-0 ${activeRole === 'ong' ? 'text-emerald' : 'text-graphite-light'}`} />
        <div className="flex flex-col items-start text-left leading-tight">
          <span>Sou uma ONG</span>
          <span className="text-[10px] font-normal opacity-75 hidden sm:inline text-graphite-light">Instituição Social</span>
        </div>
        {activeRole === 'ong' && (
          <motion.div
            layoutId="profileTabHighlight"
            className="absolute inset-0 rounded-xl border-2 border-emerald/30 pointer-events-none"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </button>
    </div>
  );
}
