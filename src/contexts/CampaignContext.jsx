/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { campaignService } from '../services/campaignService';
import { ongService } from '../services/ongService';
import { DollarSign, Megaphone, Users, TrendingUp, CheckCircle2, FileText, Sparkles, Trash2, Pencil } from 'lucide-react';

const CampaignContext = createContext(null);
const NotificationContext = createContext(null);

export function CampaignProvider({ children }) {
  const [campanhas, setCampanhas] = useState([]);
  const [campanhaAtiva, setCampanhaAtiva] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Perfil da ONG vinculada / dados locais para dashboard
  const [orgProfile, setOrgProfile] = useState({
    id: 201,
    name: 'Instituto Esperança',
    bio: 'Organização sem fins lucrativos dedicada à transformação social no sertão nordestino, com foco em segurança alimentar, educação e desenvolvimento comunitário.',
    email: 'contato@institutoesperanca.org.br',
    phone: '(81) 99999-1234',
    website: 'https://institutoesperanca.org.br',
    cnpj: '12.345.678/0001-90',
    address: 'Rua da Esperança, 123 — Recife, PE',
    avatar: null,
    isVerified: true,
    globalGoal: 150000,
    notifications: {
      emailDoacoes: true, emailRelatorios: true, emailCampanhas: false,
      pushDoacoes: true, pushMetas: true, pushRelatorios: false,
    },
  });

  const [activityFeed, setActivityFeed] = useState([
    { id: 101, name: 'Ana Silva', amount: 'R$ 150', time: 'Há 5 min', action: 'Doação recebida', icon: DollarSign, type: 'donation' },
    { id: 102, name: 'Eduardo M.', amount: 'R$ 50', time: 'Há 12 min', action: 'Novo doador mensal', icon: Users, type: 'donor' },
    { id: 103, name: 'Campanha Sertão', amount: null, time: 'Há 1h', action: 'Meta de 80% atingida!', icon: CheckCircle2, type: 'milestone' },
    { id: 104, name: 'Relatório Mensal', amount: null, time: 'Há 3h', action: 'Relatório gerado', icon: FileText, type: 'report' },
    { id: 105, name: 'Maria Santos', amount: 'R$ 300', time: 'Há 5h', action: 'Doação recebida', icon: DollarSign, type: 'donation' },
    { id: 106, name: 'Pedro Oliveira', amount: 'R$ 75', time: 'Há 8h', action: 'Novo doador', icon: Users, type: 'donor' },
  ]);

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  /**
   * Busca campanhas com filtros aplicados no Supabase
   */
  const buscarCampanhas = useCallback(async (filtros = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await campaignService.buscarCampanhas(filtros);
      // Mapeia atributos para compatibilidade transparente com os componentes visuais existentes
      const formatted = (data || []).map(c => ({
        ...c,
        raised: Number(c.valor_arrecadado || 0),
        goal: Number(c.meta || 0),
        donors: Number(c.total_doadores || 0),
        category: c.categoria,
        title: c.titulo,
        description: c.descricao,
        location: c.localizacao,
        launchDate: c.data_lancamento,
        deadline: c.data_encerramento,
        image: c.imagem_url,
        ongName: c.ongs?.nome || 'Organização Parceira',
      }));
      setCampanhas(formatted);
      return formatted;
    } catch (err) {
      console.error('Erro ao buscar campanhas no Supabase:', err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Seleciona campanha ativa por ID
   */
  const selecionarCampanha = useCallback(async (id) => {
    setLoading(true);
    try {
      const c = await campaignService.buscarCampanhaPorId(id);
      const formatted = {
        ...c,
        raised: Number(c.valor_arrecadado || 0),
        goal: Number(c.meta || 0),
        donors: Number(c.total_doadores || 0),
        category: c.categoria,
        title: c.titulo,
        description: c.descricao,
        location: c.localizacao,
        launchDate: c.data_lancamento,
        deadline: c.data_encerramento,
        image: c.imagem_url,
        ongName: c.ongs?.nome || 'Organização Parceira',
      };
      setCampanhaAtiva(formatted);
      return formatted;
    } catch (err) {
      console.error('Erro ao buscar campanha por ID:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Criação de campanha integrada ao Supabase
   */
  const addCampaign = useCallback(async (campaignData) => {
    try {
      const payload = {
        ong_id: campaignData.ong_id || null,
        titulo: campaignData.title,
        descricao: campaignData.description || '',
        categoria: campaignData.category || 'Geral',
        status: 'Ativa',
        meta: campaignData.goal || 0,
        valor_arrecadado: 0,
        total_doadores: 0,
        localizacao: campaignData.location || 'São Paulo - SP',
        data_lancamento: new Date().toISOString(),
        imagem_url: campaignData.image || null,
      };

      const created = await campaignService.criarCampanha(payload);
      showToast('Campanha criada com sucesso!');
      await buscarCampanhas();
      return created;
    } catch (err) {
      console.error('Erro ao criar campanha no Supabase:', err);
      showToast('Erro ao cadastrar campanha');
      throw err;
    }
  }, [buscarCampanhas, showToast]);

  const updateOrgProfile = useCallback((updates) => {
    setOrgProfile(prev => ({ ...prev, ...updates }));
    showToast('Perfil atualizado com sucesso!');
  }, [showToast]);

  // Carrega campanhas no mount inicial
  useEffect(() => {
    buscarCampanhas();
  }, [buscarCampanhas]);

  // Métricas calculadas para Dashboard de ONG / Geral
  const metrics = useMemo(() => {
    const totalRaised = campanhas.reduce((sum, c) => sum + (c.raised || 0), 0);
    const activeCampaignsCount = campanhas.filter(c => c.status === 'Ativa').length;
    const totalDonors = campanhas.reduce((sum, c) => sum + (c.donors || 0), 0);

    return [
      {
        id: 'metric-raised',
        label: 'Total Arrecadado',
        value: `R$ ${totalRaised.toLocaleString('pt-BR')}`,
        change: '+18.4%',
        icon: DollarSign,
        color: 'emerald',
      },
      {
        id: 'metric-active',
        label: 'Campanhas Ativas',
        value: String(activeCampaignsCount),
        change: `${campanhas.length} total`,
        icon: Megaphone,
        color: 'indigo',
      },
      {
        id: 'metric-donors',
        label: 'Doadores Únicos',
        value: totalDonors.toLocaleString('pt-BR'),
        change: '+12%',
        icon: Users,
        color: 'blue',
      },
      {
        id: 'metric-rate',
        label: 'Taxa de Conversão',
        value: '64.2%',
        change: '+4.1%',
        icon: TrendingUp,
        color: 'purple',
      },
    ];
  }, [campanhas]);

  return (
    <CampaignContext.Provider
      value={{
        // Requisitos da Tarefa: campanhas, campanhaAtiva, loading, buscarCampanhas, selecionarCampanha
        campanhas,
        campaigns: campanhas,
        campanhaAtiva,
        loading,
        error,
        buscarCampanhas,
        selecionarCampanha,
        // Métodos de compatibilidade com os componentes existentes da ONG
        orgProfile,
        activityFeed,
        metrics,
        addCampaign,
        updateOrgProfile,
        removeCampaign: (id) => setCampanhas(prev => prev.filter(c => c.id !== id)),
        updateCampaign: (id, updates) => setCampanhas(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c)),
      }}
    >
      <NotificationContext.Provider value={{ toastMessage, showToast }}>
        {children}
      </NotificationContext.Provider>
    </CampaignContext.Provider>
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
