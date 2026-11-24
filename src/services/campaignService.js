import { supabase } from '../lib/supabase';

/**
 * Serviço de Campanhas e Relatórios de Impacto
 */
export const campaignService = {
  /**
   * Busca campanhas ativas com dados da ONG relacionada
   * Permite filtros por categoria, localização e termo de busca
   */
  async buscarCampanhas(filtros = {}) {
    let query = supabase
      .from('campanhas')
      .select('*, ongs(*)')
      .order('criado_em', { ascending: false });

    if (filtros.status) {
      query = query.eq('status', filtros.status);
    } else {
      query = query.eq('status', 'Ativa');
    }

    if (filtros.categoria && filtros.categoria !== 'Todas') {
      query = query.eq('categoria', filtros.categoria);
    }

    if (filtros.localizacao) {
      query = query.ilike('localizacao', `%${filtros.localizacao}%`);
    }

    if (filtros.termo) {
      query = query.or(`titulo.ilike.%${filtros.termo}%,descricao.ilike.%${filtros.termo}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  /**
   * Busca campanha pelo ID com dados da ONG
   */
  async buscarCampanhaPorId(id) {
    const { data, error } = await supabase
      .from('campanhas')
      .select('*, ongs(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Cria nova campanha
   */
  async criarCampanha(dados) {
    const { data, error } = await supabase
      .from('campanhas')
      .insert([dados])
      .select('*, ongs(*)')
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Atualiza campanha existente
   */
  async atualizarCampanha(id, dados) {
    const { data, error } = await supabase
      .from('campanhas')
      .update(dados)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Lista relatórios de impacto de uma ONG
   */
  async listarRelatoriosImpacto(ongId) {
    let query = supabase
      .from('relatorios_impacto')
      .select('*')
      .order('data_publicacao', { ascending: false });

    if (ongId) {
      query = query.eq('ong_id', ongId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  /**
   * Cria novo relatório de impacto
   */
  async criarRelatorioImpacto(dados) {
    const { data, error } = await supabase
      .from('relatorios_impacto')
      .insert([dados])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
