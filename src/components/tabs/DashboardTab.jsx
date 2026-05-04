import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Megaphone,
  ArrowUpRight,
  MoreVertical,
  Clock,
} from 'lucide-react';
import { useCampaigns } from '../../context/CampaignContext';
import { ActivityFeedModal } from '../ui/ActivityFeedModal';

/**
 * ============================================
 * DoaHub — Dashboard Tab (Painel Central)
 * ============================================
 * Consome o estado global de campanhas e renderiza:
 * - 4 cartões de métricas (stats)
 * - Lista dinâmica de campanhas com barras de progresso
 * - Feed de atividade recente reativo
 * - Card de dica de impacto
 */

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function DashboardTab() {
  const { campaigns, stats, activityFeed } = useCampaigns();
  const [isFeedOpen, setIsFeedOpen] = useState(false);

  return (
    <>
      {/* Saudação */}
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-display font-bold text-graphite-dark">
          Olá, Instituto Esperança 👋
        </h2>
        <p className="text-graphite-light font-medium">
          Bem vindo ao painel de gestão. Aqui está o resumo do seu impacto.
        </p>
      </div>

      {/* ────────────── Métricas Superiores ────────────── */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        {stats.map((s, idx) => (
          <motion.div
            key={s.title}
            variants={fadeUp}
            className="bg-white rounded-[2rem] p-6 shadow-sm border border-graphite/5 flex flex-col gap-4 group hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald/5 text-emerald flex items-center justify-center font-bold">
                <s.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald bg-emerald/10 px-2 py-1 rounded-lg flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> {s.trend}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-graphite-light">{s.title}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={s.value}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-display font-extrabold text-graphite-dark"
                >
                  {s.value}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ────────────── Bento Grid Principal ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Coluna Esquerda: Gerenciar Campanhas ── */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-graphite/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display font-bold text-xl text-graphite-dark">
              Gerenciar Campanhas
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-graphite-light bg-ice px-2.5 py-1 rounded-lg">
                {campaigns.filter(c => c.status === 'Ativa').length} ativas
              </span>
              <button className="text-sm font-bold text-emerald hover:underline">
                Ver tudo
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {campaigns.map((c, idx) => {
                const perc = c.goal > 0 ? Math.min(Math.round((c.raised / c.goal) * 100), 100) : 0;
                const isActive = c.status === 'Ativa';

                return (
                  <motion.div
                    layout
                    key={c.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-5 p-4 rounded-2xl hover:bg-ice transition-colors group cursor-pointer border border-transparent hover:border-graphite/5"
                  >
                    {/* Ícone */}
                    <div className="w-14 h-14 bg-ice rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                      <div className={`w-full h-full flex items-center justify-center ${isActive ? 'bg-emerald/10' : 'bg-graphite/5'}`}>
                        <Megaphone className={`w-6 h-6 ${isActive ? 'text-emerald' : 'text-graphite-light'}`} />
                      </div>
                    </div>

                    {/* Info + Barra de Progresso */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                      <span className="font-bold text-graphite-dark truncate group-hover:text-emerald transition-colors">
                        {c.title}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="w-full max-w-[160px] h-2 bg-graphite/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${isActive ? 'bg-emerald' : 'bg-graphite-light'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${perc}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.1 }}
                          />
                        </div>
                        <span className={`text-xs font-bold ${perc >= 100 ? 'text-emerald' : 'text-graphite-light'}`}>
                          {perc}%
                        </span>
                      </div>
                      {c.category && (
                        <span className="text-[10px] uppercase font-bold text-graphite-light/60 tracking-wider">
                          {c.category}
                        </span>
                      )}
                    </div>

                    {/* Valores + Status */}
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="font-bold text-graphite-dark text-sm">
                        R$ {c.raised.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-[10px] text-graphite-light font-medium">
                        de R$ {c.goal.toLocaleString('pt-BR')}
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald' : 'bg-graphite-light'}`} />
                        <span className="text-[10px] uppercase font-bold text-graphite-light tracking-wider">
                          {c.status}
                        </span>
                      </div>
                    </div>

                    {/* Menu */}
                    <button className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center text-graphite-light flex-shrink-0">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Empty state */}
            {campaigns.length === 0 && (
              <div className="text-center py-12">
                <Megaphone className="w-12 h-12 text-graphite-light/30 mx-auto mb-3" />
                <p className="text-graphite-light font-medium text-sm">Nenhuma campanha criada ainda.</p>
                <p className="text-graphite-light/60 text-xs mt-1">Clique em "Nova Campanha" para começar.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Coluna Direita: Feed + Dica ── */}
        <div className="lg:col-span-1 flex flex-col gap-8">

          {/* Feed de Atividade Recente */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-graphite/5 flex-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-xl text-graphite-dark">
                Atividade Recente
              </h3>
              <span className="text-[10px] uppercase font-bold text-graphite-light bg-ice px-2 py-1 rounded-lg tracking-wider">
                Live
              </span>
            </div>

            <div className="flex flex-col gap-5">
              <AnimatePresence initial={false}>
                {activityFeed.slice(0, 6).map((a) => (
                  <motion.div
                    layout
                    key={a.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex gap-4 group"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      a.type === 'campaign_created'
                        ? 'bg-amber-50 text-amber-500 group-hover:bg-amber-100'
                        : 'bg-ice text-graphite-light group-hover:bg-emerald/5 group-hover:text-emerald'
                    }`}>
                      <a.icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-medium text-graphite-dark truncate">
                        <span className="font-bold">{a.name}</span>
                        {a.amount ? (
                          <span className="text-emerald font-bold"> • {a.amount}</span>
                        ) : ''}
                      </p>
                      <p className="text-xs text-graphite-light font-medium">
                        {a.action} • {a.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsFeedOpen(true)}
              className="w-full mt-8 py-3 rounded-xl border border-graphite/10 text-sm font-bold text-graphite-light hover:bg-ice hover:border-emerald/20 hover:text-emerald transition-all"
            >
              Ver Feed Completo
            </button>
          </div>

          {/* Card Dica de Impacto */}
          <div className="bg-emerald rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-emerald/20">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Clock className="w-20 h-20 rotate-12" />
            </div>
            <div className="relative z-10">
              <h4 className="font-display font-bold text-xl mb-2">Dica de Impacto 💡</h4>
              <p className="text-white/80 text-sm font-medium leading-relaxed mb-4">
                Campanhas com fotos reais do impacto aumentam a doação média em{' '}
                <span className="text-white font-bold">45%</span>.
              </p>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all underline decoration-white/30">
                Atualizar fotos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Feed Completo */}
      <ActivityFeedModal
        isOpen={isFeedOpen}
        onClose={() => setIsFeedOpen(false)}
        activityFeed={activityFeed}
      />
    </>
  );
}
