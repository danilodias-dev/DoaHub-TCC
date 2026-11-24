import { supabase } from '../lib/supabase';

/**
 * Serviço para gestão e consulta de ONGs
 */
export const ongService = {
  /**
   * Lista ONGs verificadas para a vitrine pública e seleção de doações
   */
  async listarOngsVerificadas() {
    const { data, error } = await supabase
      .from('ongs')
      .select('*')
      .eq('is_verificada', true)
      .order('nome', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Lista ONGs pendentes de homologação (para a área de admin - RF06)
   */
  async listarOngsPendentes() {
    const { data, error } = await supabase
      .from('ongs')
      .select('*')
      .eq('is_verificada', false)
      .order('criado_em', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Homologa (aprova ou reprova) uma ONG pendente
   * @param {string} ongId 
   * @param {boolean} isVerificada 
   */
  async homologarOng(ongId, isVerificada = true) {
    const { data, error } = await supabase
      .from('ongs')
      .update({ is_verificada: isVerificada, atualizado_em: new Date().toISOString() })
      .eq('id', ongId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Cadastra nova ONG vinculada ao usuario_id logado
   */
  async cadastrarOng(dados) {
    const { data, error } = await supabase
      .from('ongs')
      .insert([dados])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Busca ONG pelo ID
   */
  async buscarOngPorId(ongId) {
    const { data, error } = await supabase
      .from('ongs')
      .select('*, campanhas(*)')
      .eq('id', ongId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Busca ONG vinculada a um usuário
   */
  async buscarOngPorUsuarioId(usuarioId) {
    const { data, error } = await supabase
      .from('ongs')
      .select('*')
      .eq('usuario_id', usuarioId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },
};
