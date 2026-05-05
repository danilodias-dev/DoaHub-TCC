/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Filter, Download } from 'lucide-react';
import { useState } from 'react';
import { useCampaigns } from '../../context/CampaignContext';
import { downloadDonationReceipt } from '../../utils/receiptGenerator';

/**
 * ============================================
 * DoaHub — Modal Feed de Atividade Completo
 * ============================================
 * Exibe o array completo de atividades do estado
 * global em lista scrollável com filtros por tipo.
 */

const TYPE_LABELS = {
  all: 'Todos',
  donation: 'Doações',
  donor: 'Doadores',
  milestone: 'Marcos',
  report: 'Relatórios',
  campaign_created: 'Campanhas Criadas',
  campaign_removed: 'Campanhas Removidas',
  campaign_updated: 'Atualizações',
};

const TYPE_COLORS = {
  donation: 'bg-emerald/10 text-emerald',
  donor: 'bg-blue-50 text-blue-500',
  milestone: 'bg-amber-50 text-amber-500',
  report: 'bg-purple-50 text-purple-500',
  campaign_created: 'bg-amber-50 text-amber-500',
  campaign_removed: 'bg-red-50 text-red-500',
  campaign_updated: 'bg-sky-50 text-sky-500',
};

export function ActivityFeedModal({ isOpen, onClose, activityFeed }) {
  const { orgProfile } = useCampaigns();
  const [filter, setFilter] = useState('all');
  const modalRef = useRef(null);

  // Fecha com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Bloqueia scroll do body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setFilter('all');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const filtered = filter === 'all'
    ? activityFeed
    : activityFeed.filter(a => a.type === filter);

  // Tipos presentes no feed para gerar filtros dinâmicos
  const availableTypes = ['all', ...new Set(activityFeed.map(a => a.type))];

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-graphite-dark/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col z-10 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feed-modal-title"
          >
            {/* Header fixo */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md rounded-t-[2.5rem] border-b border-graphite/5 px-8 py-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="feed-modal-title" className="text-xl font-display font-extrabold text-graphite-dark">
                    Atividade Recente
                  </h2>
                  <p className="text-xs text-graphite-light font-medium">
                    {activityFeed.length} evento{activityFeed.length !== 1 ? 's' : ''} registrado{activityFeed.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl hover:bg-ice flex items-center justify-center text-graphite-light hover:text-graphite-dark transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filtros */}
            <div className="px-8 py-4 border-b border-graphite/5 flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <Filter className="w-4 h-4 text-graphite-light flex-shrink-0" />
              {availableTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                    filter === type
                      ? 'bg-emerald text-white shadow-sm'
                      : 'bg-ice text-graphite-light hover:text-emerald hover:bg-emerald/5'
                  }`}
                >
                  {TYPE_LABELS[type] || type}
                </button>
              ))}
            </div>

            {/* Lista scrollável */}
            <div className="flex-1 overflow-y-auto px-8 py-4">
              <div className="flex flex-col gap-1">
                <AnimatePresence mode="popLayout">
                  {filtered.map((a, idx) => (
                    <motion.div
                      layout
                      key={a.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: idx * 0.02 }}
                      className="flex gap-4 p-4 rounded-2xl hover:bg-ice transition-colors group"
                    >
                      {/* Ícone */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        TYPE_COLORS[a.type] || 'bg-ice text-graphite-light'
                      }`}>
                        <a.icon className="w-5 h-5" />
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <p className="text-sm font-medium text-graphite-dark truncate">
                          <span className="font-bold">{a.name}</span>
                        </p>
                        <p className="text-xs text-graphite-light font-medium">
                          {a.action}
                        </p>
                      </div>

                      {/* Valor + Hora */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="flex flex-col items-end gap-0.5">
                          {a.amount && (
                            <span className="text-sm font-bold text-emerald">
                              {a.amount}
                            </span>
                          )}
                          <span className="text-[10px] text-graphite-light/60 font-medium">
                            {a.time}
                          </span>
                        </div>
                        
                        {a.type === 'donation' && (
                          <button
                            onClick={() => downloadDonationReceipt(a, orgProfile)}
                            className="w-8 h-8 rounded-lg bg-ice hover:bg-emerald/10 flex items-center justify-center text-graphite-light hover:text-emerald transition-colors"
                            title="Baixar Recibo"
                            aria-label="Baixar Recibo"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Empty state filtrado */}
                {filtered.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Activity className="w-10 h-10 text-graphite-light/20 mb-3" />
                    <p className="text-graphite-light font-medium text-sm">
                      Nenhuma atividade encontrada para este filtro.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer com resumo */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-graphite/5 px-8 py-4 flex items-center justify-between">
              <span className="text-xs text-graphite-light font-medium">
                Exibindo <span className="font-bold text-graphite-dark">{filtered.length}</span> de {activityFeed.length} eventos
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-ice text-sm font-bold text-graphite-light hover:bg-graphite/10 transition-colors"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
