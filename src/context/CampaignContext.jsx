/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { DollarSign, Megaphone, Users, TrendingUp, CheckCircle2, FileText, Sparkles, Trash2, Pencil } from 'lucide-react';

/**
 * ============================================
 * DoaHub — Campaign Context (Estado Global)
 * ============================================
 * Centraliza o estado de campanhas, atividades
 * e métricas derivadas usadas no dashboard da ONG.
 */

// ─── Dados Iniciais (Seed) ──────────────────────────────────
const INITIAL_CAMPAIGNS = [
  { id: 1, title: 'Alimentação Sertão PE', status: 'Ativa', raised: 42500, goal: 50000, donors: 312, category: 'Alimentação', description: 'Distribuição de cestas básicas para famílias em situação de vulnerabilidade no sertão pernambucano.' },
  { id: 2, title: 'Reforma Escola Comunitária', status: 'Ativa', raised: 15000, goal: 30000, donors: 145, category: 'Educação', description: 'Reforma completa da infraestrutura da escola comunitária do bairro Santo Amaro.' },
  { id: 3, title: 'Kit Escolar 2024', status: 'Finalizada', raised: 22000, goal: 20000, donors: 210, category: 'Educação', description: 'Distribuição de kits escolares completos para crianças carentes.' },
];

// ─── Feed de Atividade Inicial ──────────────────────────────
const INITIAL_ACTIVITY = [
  { id: 1, name: 'Ana Silva', amount: 'R$ 150', time: 'Há 5 min', action: 'Doação recebida', icon: DollarSign, type: 'donation' },
  { id: 2, name: 'Eduardo M.', amount: 'R$ 50', time: 'Há 12 min', action: 'Novo doador mensal', icon: Users, type: 'donor' },
  { id: 3, name: 'Campanha Sertão', amount: null, time: 'Há 1h', action: 'Meta de 80% atingida!', icon: CheckCircle2, type: 'milestone' },
  { id: 4, name: 'Relatório Mensal', amount: null, time: 'Há 3h', action: 'Relatório gerado', icon: FileText, type: 'report' },
  { id: 5, name: 'Maria Santos', amount: 'R$ 300', time: 'Há 5h', action: 'Doação recebida', icon: DollarSign, type: 'donation' },
  { id: 6, name: 'Pedro Oliveira', amount: 'R$ 75', time: 'Há 8h', action: 'Novo doador', icon: Users, type: 'donor' },
];

const BASE_RAISED_TOTAL = 124500;
const BASE_DONORS = 1240;

// ─── Perfil Organizacional Inicial ──────────────────────────
const INITIAL_ORG_PROFILE = {
  name: 'Instituto Esperança',
  bio: 'Organização sem fins lucrativos dedicada à transformação social no sertão nordestino, com foco em segurança alimentar, educação e desenvolvimento comunitário.',
  email: 'contato@institutoesperanca.org.br',
  phone: '(81) 99999-1234',
  website: 'https://institutoesperanca.org.br',
  cnpj: '12.345.678/0001-90',
  address: 'Rua da Esperança, 123 — Recife, PE',
  avatar: null,
  isVerified: false,
  globalGoal: 150000,
  notifications: {
    emailDoacoes: true,
    emailRelatorios: true,
    emailCampanhas: false,
    pushDoacoes: true,
    pushMetas: true,
    pushRelatorios: false,
  },
};

const CampaignContext = createContext(null);

// ─── Helpers ─────────────────────────────────────────────────
function formatTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Agora mesmo';
  if (diffMin < 60) return `Há ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `Há ${diffH}h`;
  return `Há ${Math.floor(diffH / 24)}d`;
}

export function CampaignProvider({ children }) {
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [activityFeed, setActivityFeed] = useState(INITIAL_ACTIVITY);
  const [notification, setNotification] = useState(null);
  const [orgProfile, setOrgProfile] = useState(INITIAL_ORG_PROFILE);

  // ─── Atualizar Perfil Organizacional ────────────────────────
  const updateOrgProfile = useCallback((updates) => {
    setOrgProfile(prev => ({ ...prev, ...updates }));
    setNotification({
      type: 'success',
      title: 'Configurações salvas!',
      message: 'As informações da organização foram atualizadas com sucesso.',
    });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  // ─── Adicionar Nova Campanha ────────────────────────────────
  const addCampaign = useCallback((campaignData) => {
    const newCampaign = {
      ...campaignData,
      id: Date.now(),
      status: 'Ativa',
      raised: 0,
      donors: 0,
    };

    setCampaigns(prev => [newCampaign, ...prev]);

    // Adiciona evento ao feed de atividade
    const activityEvent = {
      id: Date.now(),
      name: newCampaign.title,
      amount: `Meta: R$ ${newCampaign.goal.toLocaleString('pt-BR')}`,
      time: formatTimeAgo(new Date()),
      action: 'Nova campanha criada',
      icon: Sparkles,
      type: 'campaign_created',
    };
    setActivityFeed(prev => [activityEvent, ...prev]);

    // Dispara notificação de sucesso
    setNotification({
      type: 'success',
      title: 'Campanha criada com sucesso!',
      message: `"${newCampaign.title}" está ativa e pronta para receber doações.`,
    });

    // Auto-dismiss após 5s
    setTimeout(() => setNotification(null), 5000);

    return newCampaign;
  }, []);

  const showNotification = useCallback((type, title, message) => {
    setNotification({ type, title, message });
    setTimeout(() => setNotification(null), 5000);
  }, []);

  const dismissNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // ─── Remover Campanha ───────────────────────────────────────
  const removeCampaign = useCallback((campaignId) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    setCampaigns(prev => prev.filter(c => c.id !== campaignId));

    // Evento no feed
    setActivityFeed(prev => [{
      id: Date.now(),
      name: campaign.title,
      amount: null,
      time: formatTimeAgo(new Date()),
      action: 'Campanha removida',
      icon: Trash2,
      type: 'campaign_removed',
    }, ...prev]);

    setNotification({
      type: 'info',
      title: 'Campanha removida',
      message: `"${campaign.title}" foi removida com sucesso.`,
    });
    setTimeout(() => setNotification(null), 4000);
  }, [campaigns]);

  // ─── Atualizar Campanha ─────────────────────────────────────
  const updateCampaign = useCallback((campaignId, updates) => {
    setCampaigns(prev => prev.map(c =>
      c.id === campaignId ? { ...c, ...updates } : c
    ));

    const campaign = campaigns.find(c => c.id === campaignId);
    const name = updates.title || campaign?.title || 'Campanha';

    setActivityFeed(prev => [{
      id: Date.now(),
      name,
      amount: null,
      time: formatTimeAgo(new Date()),
      action: 'Campanha atualizada',
      icon: Pencil,
      type: 'campaign_updated',
    }, ...prev]);

    setNotification({
      type: 'success',
      title: 'Campanha atualizada!',
      message: `"${name}" foi atualizada com sucesso.`,
    });
    setTimeout(() => setNotification(null), 4000);
  }, [campaigns]);

  // ─── Métricas Derivadas (recalculadas automaticamente) ─────
  const stats = useMemo(() => {
    const activeCampaigns = campaigns.filter(c => c.status === 'Ativa');
    const newCampaignsCount = campaigns.length - INITIAL_CAMPAIGNS.length;
    const additionalRaised = campaigns
      .filter(c => !INITIAL_CAMPAIGNS.find(ic => ic.id === c.id))
      .reduce((sum, c) => sum + c.raised, 0);

    const totalRaised = BASE_RAISED_TOTAL + additionalRaised;
    const totalDonors = BASE_DONORS + campaigns
      .filter(c => !INITIAL_CAMPAIGNS.find(ic => ic.id === c.id))
      .reduce((sum, c) => sum + c.donors, 0);

    const goal = orgProfile.globalGoal || 150000;
    const progress = Math.min(Math.round((totalRaised / goal) * 100), 100);
    
    let impactLevel = 'Iniciante';
    if (progress >= 100) impactLevel = 'Embaixador';
    else if (progress >= 75) impactLevel = 'Ouro';
    else if (progress >= 50) impactLevel = 'Prata';
    else if (progress >= 25) impactLevel = 'Bronze';

    return {
      cards: [
        {
          title: 'Total Arrecadado',
          value: `R$ ${totalRaised.toLocaleString('pt-BR')}`,
          trend: '+12%',
          icon: DollarSign,
          color: 'emerald',
        },
        {
          title: 'Campanhas Ativas',
          value: String(activeCampaigns.length),
          trend: newCampaignsCount > 0 ? `${newCampaignsCount} nova${newCampaignsCount > 1 ? 's' : ''}` : '2 novas',
          icon: Megaphone,
          color: 'blue',
        },
        {
          title: 'Doadores Ativos',
          value: totalDonors.toLocaleString('pt-BR'),
          trend: '+5%',
          icon: Users,
          color: 'purple',
        },
        {
          title: 'Meta Global',
          value: `${progress}%`,
          trend: `Nível ${impactLevel}`,
          icon: TrendingUp,
          color: progress >= 100 ? 'emerald' : 'orange',
        },
      ],
      totalRaised,
      progress,
      impactLevel,
      goalReached: progress >= 100
    };
  }, [campaigns, orgProfile.globalGoal]);

  const value = useMemo(() => ({
    campaigns,
    stats,
    activityFeed,
    notification,
    orgProfile,
    addCampaign,
    removeCampaign,
    updateCampaign,
    updateOrgProfile,
    dismissNotification,
    showNotification,
  }), [campaigns, stats, activityFeed, notification, orgProfile, addCampaign, removeCampaign, updateCampaign, updateOrgProfile, dismissNotification, showNotification]);

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaigns() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaigns deve ser usado dentro de um CampaignProvider');
  }
  return context;
}
