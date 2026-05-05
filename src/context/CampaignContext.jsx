/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useMemo, useCallback } from 'react';
import { DollarSign, Megaphone, Users, TrendingUp, CheckCircle2, FileText, Sparkles, Trash2, Pencil } from 'lucide-react';

/**
 * ============================================
 * DoaHub — Campaign Context (Refatorado)
 * ============================================
 * Centraliza o estado de campanhas, atividades
 * e métricas. Contextos separados para evitar
 * re-renderizações desnecessárias com notificações.
 */

const INITIAL_CAMPAIGNS = [
  { id: 1, title: 'Alimentação Sertão PE', status: 'Ativa', raised: 42500, goal: 50000, donors: 312, category: 'Alimentação', description: 'Distribuição de cestas básicas para famílias em situação de vulnerabilidade no sertão pernambucano.' },
  { id: 2, title: 'Reforma Escola Comunitária', status: 'Ativa', raised: 15000, goal: 30000, donors: 145, category: 'Educação', description: 'Reforma completa da infraestrutura da escola comunitária do bairro Santo Amaro.' },
  { id: 3, title: 'Kit Escolar 2024', status: 'Finalizada', raised: 22000, goal: 20000, donors: 210, category: 'Educação', description: 'Distribuição de kits escolares completos para crianças carentes.' },
];

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
    emailDoacoes: true, emailRelatorios: true, emailCampanhas: false,
    pushDoacoes: true, pushMetas: true, pushRelatorios: false,
  },
};

const INITIAL_STATE = {
  campaigns: INITIAL_CAMPAIGNS,
  activityFeed: INITIAL_ACTIVITY,
  orgProfile: INITIAL_ORG_PROFILE,
};

function formatTimeAgo(date) {
  const diffMin = Math.floor((new Date() - date) / 60000);
  if (diffMin < 1) return 'Agora mesmo';
  if (diffMin < 60) return `Há ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `Há ${diffH}h`;
  return `Há ${Math.floor(diffH / 24)}d`;
}

// ─── Reducer ──────────────────────────────────────────────────
function campaignReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_ORG_PROFILE':
      return { ...state, orgProfile: { ...state.orgProfile, ...action.payload } };
    
    case 'ADD_CAMPAIGN': {
      const newCampaign = { ...action.payload, id: Date.now(), status: 'Ativa', raised: 0, donors: 0 };
      const newActivity = {
        id: Date.now(), name: newCampaign.title, amount: `Meta: R$ ${newCampaign.goal.toLocaleString('pt-BR')}`,
        time: formatTimeAgo(new Date()), action: 'Nova campanha criada', icon: Sparkles, type: 'campaign_created',
      };
      return { ...state, campaigns: [newCampaign, ...state.campaigns], activityFeed: [newActivity, ...state.activityFeed] };
    }
    
    case 'REMOVE_CAMPAIGN': {
      const campaign = state.campaigns.find(c => c.id === action.payload);
      if (!campaign) return state;
      const newActivity = {
        id: Date.now(), name: campaign.title, amount: null, time: formatTimeAgo(new Date()),
        action: 'Campanha removida', icon: Trash2, type: 'campaign_removed',
      };
      return { ...state, campaigns: state.campaigns.filter(c => c.id !== action.payload), activityFeed: [newActivity, ...state.activityFeed] };
    }

    case 'UPDATE_CAMPAIGN': {
      const { id, updates } = action.payload;
      const campaign = state.campaigns.find(c => c.id === id);
      const name = updates.title || campaign?.title || 'Campanha';
      const newActivity = {
        id: Date.now(), name, amount: null, time: formatTimeAgo(new Date()),
        action: 'Campanha atualizada', icon: Pencil, type: 'campaign_updated',
      };
      return {
        ...state,
        campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...updates } : c),
        activityFeed: [newActivity, ...state.activityFeed]
      };
    }

    default:
      return state;
  }
}

// ─── Contextos ────────────────────────────────────────────────
const CampaignContext = createContext(null);
const NotificationContext = createContext(null);

export function CampaignProvider({ children }) {
  const [state, dispatch] = useReducer(campaignReducer, INITIAL_STATE);
  
  // Notification isolado usa um reducer ou estado simples? Estado simples basta.
  const [notification, setNotificationState] = useReducer((prev, action) => {
    if (action === null) return null;
    return action;
  }, null);

  const showNotification = useCallback((type, title, message) => {
    setNotificationState({ type, title, message });
    setTimeout(() => setNotificationState(null), 5000);
  }, []);

  const dismissNotification = useCallback(() => {
    setNotificationState(null);
  }, []);

  // Actions encadeadas
  const updateOrgProfile = useCallback((updates) => {
    dispatch({ type: 'UPDATE_ORG_PROFILE', payload: updates });
    showNotification('success', 'Configurações salvas!', 'As informações foram atualizadas com sucesso.');
  }, [showNotification]);

  const addCampaign = useCallback((campaignData) => {
    dispatch({ type: 'ADD_CAMPAIGN', payload: campaignData });
    showNotification('success', 'Campanha criada!', `"${campaignData.title}" está ativa.`);
  }, [showNotification]);

  const removeCampaign = useCallback((id) => {
    dispatch({ type: 'REMOVE_CAMPAIGN', payload: id });
    showNotification('info', 'Campanha removida', 'A campanha foi removida com sucesso.');
  }, [showNotification]);

  const updateCampaign = useCallback((id, updates) => {
    dispatch({ type: 'UPDATE_CAMPAIGN', payload: { id, updates } });
    showNotification('success', 'Campanha atualizada!', 'As informações foram atualizadas.');
  }, [showNotification]);

  // Derived Stats
  const stats = useMemo(() => {
    const { campaigns, orgProfile } = state;
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
    
    let impactLevel = progress >= 100 ? 'Embaixador' : progress >= 75 ? 'Ouro' : progress >= 50 ? 'Prata' : progress >= 25 ? 'Bronze' : 'Iniciante';

    return {
      cards: [
        { title: 'Total Arrecadado', value: `R$ ${totalRaised.toLocaleString('pt-BR')}`, trend: '+12%', icon: DollarSign, color: 'emerald' },
        { title: 'Campanhas Ativas', value: String(activeCampaigns.length), trend: newCampaignsCount > 0 ? `${newCampaignsCount} novas` : '2 novas', icon: Megaphone, color: 'blue' },
        { title: 'Doadores Ativos', value: totalDonors.toLocaleString('pt-BR'), trend: '+5%', icon: Users, color: 'purple' },
        { title: 'Meta Global', value: `${progress}%`, trend: `Nível ${impactLevel}`, icon: TrendingUp, color: progress >= 100 ? 'emerald' : 'orange' },
      ],
      totalRaised, progress, impactLevel, goalReached: progress >= 100
    };
  }, [state.campaigns, state.orgProfile.globalGoal]);

  const campaignValue = useMemo(() => ({
    campaigns: state.campaigns,
    activityFeed: state.activityFeed,
    orgProfile: state.orgProfile,
    stats,
    addCampaign, removeCampaign, updateCampaign, updateOrgProfile,
  }), [state, stats, addCampaign, removeCampaign, updateCampaign, updateOrgProfile]);

  const notificationValue = useMemo(() => ({
    notification, showNotification, dismissNotification
  }), [notification, showNotification, dismissNotification]);

  return (
    <NotificationContext.Provider value={notificationValue}>
      <CampaignContext.Provider value={campaignValue}>
        {children}
      </CampaignContext.Provider>
    </NotificationContext.Provider>
  );
}

export function useCampaigns() {
  const context = useContext(CampaignContext);
  if (!context) throw new Error('useCampaigns deve ser usado dentro de CampaignProvider');
  return context;
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification deve ser usado dentro de CampaignProvider');
  return context;
}
