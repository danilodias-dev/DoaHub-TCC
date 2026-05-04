import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Megaphone,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Target,
  Users,
  Tag,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';
import { PremiumButton } from '../ui/PremiumButton';
import { useCampaigns } from '../../context/CampaignContext';

/**
 * ============================================
 * DoaHub — Aba Minhas Campanhas
 * ============================================
 * Grade de cartões de campanhas com ações de
 * edição e exclusão conectadas ao estado global.
 */

// ─── Filtros de status ───────────────────────────────────────
const FILTERS = [
  { label: 'Todas', value: 'all' },
  { label: 'Ativas', value: 'Ativa' },
  { label: 'Finalizadas', value: 'Finalizada' },
];

export function CampaignsTab({ onOpenModal }) {
  const { campaigns, removeCampaign, updateCampaign } = useCampaigns();
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const filtered = filter === 'all'
    ? campaigns
    : campaigns.filter(c => c.status === filter);

  // ─── Edição inline ─────────────────────────────────────────
  const startEdit = (campaign) => {
    setEditingId(campaign.id);
    setEditForm({
      title: campaign.title,
      description: campaign.description || '',
      goal: String(campaign.goal),
      category: campaign.category || '',
    });
    setDeleteConfirmId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = (id) => {
    if (!editForm.title.trim()) return;
    updateCampaign(id, {
      title: editForm.title.trim(),
      description: editForm.description.trim(),
      goal: parseFloat(editForm.goal) || 0,
      category: editForm.category,
    });
    setEditingId(null);
    setEditForm({});
  };

  // ─── Exclusão com confirmação ──────────────────────────────
  const confirmDelete = (id) => {
    setDeleteConfirmId(id);
    setEditingId(null);
  };

  const executeDelete = (id) => {
    removeCampaign(id);
    setDeleteConfirmId(null);
  };

  return (
    <>
      {/* Header da aba */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-graphite-dark">
            Minhas Campanhas
          </h2>
          <p className="text-graphite-light font-medium mt-1">
            {campaigns.length} campanha{campaigns.length !== 1 ? 's' : ''} • {campaigns.filter(c => c.status === 'Ativa').length} ativa{campaigns.filter(c => c.status === 'Ativa').length !== 1 ? 's' : ''}
          </p>
        </div>
        <PremiumButton size="md" className="gap-2 self-start" onClick={onOpenModal}>
          <Plus className="w-4 h-4" /> Nova Campanha
        </PremiumButton>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-2">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              filter === f.value
                ? 'bg-emerald text-white shadow-lg shadow-emerald/20'
                : 'bg-white text-graphite-light border border-graphite/10 hover:border-emerald/30 hover:text-emerald'
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="text-xs text-graphite-light/60 font-medium ml-2">
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grade de Cartões */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((c) => {
            const perc = c.goal > 0 ? Math.min(Math.round((c.raised / c.goal) * 100), 100) : 0;
            const isActive = c.status === 'Ativa';
            const isEditing = editingId === c.id;
            const isDeleting = deleteConfirmId === c.id;

            return (
              <motion.div
                layout
                key={c.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-[2rem] shadow-sm border overflow-hidden flex flex-col transition-all ${
                  isDeleting
                    ? 'border-red-200 shadow-red-100/50'
                    : 'border-graphite/5 hover:shadow-xl hover:shadow-emerald/5'
                }`}
              >
                {/* Header do card */}
                <div className={`px-6 pt-6 pb-4 flex items-start justify-between gap-3 ${isDeleting ? 'opacity-50' : ''}`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-emerald/10 text-emerald' : 'bg-graphite/5 text-graphite-light'
                    }`}>
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] uppercase font-bold tracking-wider ${
                      isActive
                        ? 'bg-emerald/10 text-emerald'
                        : 'bg-graphite/5 text-graphite-light'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald' : 'bg-graphite-light'}`} />
                      {c.status}
                    </div>
                  </div>

                  {/* Ações */}
                  {!isEditing && !isDeleting && (
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => startEdit(c)}
                        className="w-8 h-8 rounded-lg hover:bg-ice flex items-center justify-center text-graphite-light hover:text-emerald transition-colors"
                        title="Editar campanha"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => confirmDelete(c.id)}
                        className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-graphite-light hover:text-red-500 transition-colors"
                        title="Excluir campanha"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Corpo do card */}
                <div className={`px-6 pb-6 flex-1 flex flex-col ${isDeleting ? 'opacity-50' : ''}`}>
                  {isEditing ? (
                    /* ─── Modo Edição ─── */
                    <div className="flex flex-col gap-3">
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border-2 border-emerald/30 bg-ice/50 text-sm font-bold text-graphite-dark outline-none focus:border-emerald"
                        placeholder="Título"
                      />
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border-2 border-graphite/10 bg-ice/50 text-sm font-medium text-graphite-dark outline-none focus:border-emerald resize-none"
                        rows={2}
                        placeholder="Descrição"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={editForm.goal}
                          onChange={(e) => setEditForm(prev => ({ ...prev, goal: e.target.value.replace(/[^\d]/g, '') }))}
                          className="w-full px-3 py-2 rounded-xl border-2 border-graphite/10 bg-ice/50 text-sm font-medium text-graphite-dark outline-none focus:border-emerald"
                          placeholder="Meta (R$)"
                        />
                        <input
                          type="text"
                          value={editForm.category}
                          onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl border-2 border-graphite/10 bg-ice/50 text-sm font-medium text-graphite-dark outline-none focus:border-emerald"
                          placeholder="Categoria"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => saveEdit(c.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald text-white text-xs font-bold hover:bg-emerald-light transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" /> Salvar
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-graphite/10 text-graphite-light text-xs font-bold hover:bg-ice transition-colors"
                        >
                          <X className="w-3.5 h-3.5" /> Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ─── Modo Visualização ─── */
                    <>
                      <h3 className="font-display font-bold text-lg text-graphite-dark leading-tight mb-1">
                        {c.title}
                      </h3>
                      {c.description && (
                        <p className="text-xs text-graphite-light font-medium line-clamp-2 mb-4">
                          {c.description}
                        </p>
                      )}

                      {/* Métricas do card */}
                      <div className="grid grid-cols-3 gap-3 mt-auto mb-4">
                        <div className="bg-ice rounded-xl p-3 flex flex-col items-center">
                          <Target className="w-4 h-4 text-emerald mb-1" />
                          <span className="text-xs font-bold text-graphite-dark">
                            R$ {c.goal.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-[9px] text-graphite-light font-medium">Meta</span>
                        </div>
                        <div className="bg-ice rounded-xl p-3 flex flex-col items-center">
                          <Megaphone className="w-4 h-4 text-emerald mb-1" />
                          <span className="text-xs font-bold text-graphite-dark">
                            R$ {c.raised.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-[9px] text-graphite-light font-medium">Arrecadado</span>
                        </div>
                        <div className="bg-ice rounded-xl p-3 flex flex-col items-center">
                          <Users className="w-4 h-4 text-emerald mb-1" />
                          <span className="text-xs font-bold text-graphite-dark">{c.donors}</span>
                          <span className="text-[9px] text-graphite-light font-medium">Doadores</span>
                        </div>
                      </div>

                      {/* Barra de progresso */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-graphite/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${isActive ? 'bg-emerald' : 'bg-graphite-light'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${perc}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        </div>
                        <span className={`text-xs font-bold min-w-[2.5rem] text-right ${perc >= 100 ? 'text-emerald' : 'text-graphite-light'}`}>
                          {perc}%
                        </span>
                      </div>

                      {c.category && (
                        <div className="flex items-center gap-1.5 mt-3">
                          <Tag className="w-3 h-3 text-graphite-light/50" />
                          <span className="text-[10px] uppercase font-bold text-graphite-light/60 tracking-wider">
                            {c.category}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Overlay de confirmação de exclusão */}
                <AnimatePresence>
                  {isDeleting && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="px-6 pb-6 -mt-2"
                    >
                      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <p className="text-sm font-semibold text-red-600">
                            Remover esta campanha permanentemente?
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => executeDelete(c.id)}
                            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Sim, Remover
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="flex-1 py-2.5 rounded-xl border border-graphite/10 text-graphite-light text-xs font-bold hover:bg-white transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="w-20 h-20 rounded-[1.5rem] bg-ice flex items-center justify-center mb-4">
            <Megaphone className="w-10 h-10 text-graphite-light/30" />
          </div>
          <h3 className="font-display font-bold text-xl text-graphite-dark mb-2">
            {filter === 'all' ? 'Nenhuma campanha encontrada' : `Nenhuma campanha ${filter.toLowerCase()}`}
          </h3>
          <p className="text-graphite-light font-medium text-sm max-w-md">
            {filter === 'all'
              ? 'Crie sua primeira campanha para começar a receber doações.'
              : 'Tente alterar o filtro ou crie uma nova campanha.'}
          </p>
          {filter === 'all' && (
            <PremiumButton size="md" className="mt-6 gap-2" onClick={onOpenModal}>
              <Plus className="w-4 h-4" /> Nova Campanha
            </PremiumButton>
          )}
        </motion.div>
      )}
    </>
  );
}
