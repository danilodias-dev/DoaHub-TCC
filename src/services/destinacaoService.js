import { supabase } from '../lib/supabase';

/**
 * Serviço de Destinações e Métricas Fiscais
 */
export const destinacaoService = {
  /**
   * Registra uma nova destinação fiscal
   */
  async registrarDestinacao({
    usuario_id,
    ong_id,
    campanha_id,
    valor,
    fundo_governamental,
    codigo_darf,
    relatorio_impacto_id = null,
    status = 'Pendente',
  }) {
    const { data, error } = await supabase
      .from('destinacoes')
      .insert([
        {
          usuario_id,
          ong_id,
          campanha_id,
          valor,
          fundo_governamental,
          codigo_darf,
          relatorio_impacto_id,
          status,
          data_destinacao: new Date().toISOString(),
        },
      ])
      .select('*, ongs(*), campanhas(*)')
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Lista destinações do usuário com joins em ongs e campanhas
   */
  async listarDestinacoesDoUsuario(usuarioId) {
    const { data, error } = await supabase
      .from('destinacoes')
      .select('*, ongs(*), campanhas(*)')
      .eq('usuario_id', usuarioId)
      .order('criado_em', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Anexa comprovante à destinação e atualiza status para 'Consolidado'
   */
  async anexarComprovante(destinacaoId, filePath) {
    const { data, error } = await supabase
      .from('destinacoes')
      .update({
        comprovante_url: filePath,
        status: 'Consolidado',
      })
      .eq('id', destinacaoId)
      .select('*, ongs(*), campanhas(*)')
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Busca métricas globais para os dashboards administrativos (/admin/dashboard e /admin/relatorios)
   */
  async buscarMetricasGlobaisAdmin() {
    // 1. Total destinado e volume por fundo
    const { data: destinacoes, error: errDest } = await supabase
      .from('destinacoes')
      .select('valor, status, fundo_governamental, criado_em');

    if (errDest) throw errDest;

    // 2. Contagem e status de ONGs
    const { data: ongs, error: errOngs } = await supabase
      .from('ongs')
      .select('id, is_verificada, fundo_tipo');

    if (errOngs) throw errOngs;

    // 3. Contagem de campanhas
    const { data: campanhas, error: errCamp } = await supabase
      .from('campanhas')
      .select('id, status, valor_arrecadado, meta');

    if (errCamp) throw errCamp;

    // 4. Contagem de usuários
    const { count: totalUsuarios, error: errUsers } = await supabase
      .from('usuarios')
      .select('*', { count: 'exact', head: true });

    if (errUsers) throw errUsers;

    const totalDestinado = (destinacoes || []).reduce((acc, curr) => acc + Number(curr.valor || 0), 0);
    const totalDestinadoConsolidado = (destinacoes || [])
      .filter(d => d.status === 'Consolidado' || d.status === 'Confirmada')
      .reduce((acc, curr) => acc + Number(curr.valor || 0), 0);

    const volumeEca = (destinacoes || [])
      .filter(d => (d.fundo_governamental || '').toUpperCase().includes('ECA') || (d.fundo_governamental || '').toUpperCase().includes('CRIANÇA'))
      .reduce((acc, curr) => acc + Number(curr.valor || 0), 0);

    const volumeIdoso = (destinacoes || [])
      .filter(d => (d.fundo_governamental || '').toUpperCase().includes('IDOSO'))
      .reduce((acc, curr) => acc + Number(curr.valor || 0), 0);

    const ongsAtivas = (ongs || []).filter(o => o.is_verificada).length;
    const ongsPendentes = (ongs || []).filter(o => !o.is_verificada).length;

    return {
      totalDestinado,
      totalDestinadoConsolidado,
      volumeEca,
      volumeIdoso,
      totalOngs: (ongs || []).length,
      ongsAtivas,
      ongsPendentes,
      totalCampanhas: (campanhas || []).length,
      campanhasAtivas: (campanhas || []).filter(c => c.status === 'Ativa').length,
      totalUsuarios: totalUsuarios || 0,
      ultimasDestinacoes: (destinacoes || []).slice(0, 5),
    };
  },
};
