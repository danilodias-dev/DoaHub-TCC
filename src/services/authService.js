import { supabase } from '../lib/supabase';

/**
 * Serviço de Autenticação integrado ao Supabase Auth e à tabela public.usuarios
 */
export const authService = {
  /**
   * Realiza login por e-mail e senha
   */
  async signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Realiza cadastro de novo usuário
   * Envia nome e tipo nos metadados para que a Trigger on_auth_user_created popule public.usuarios
   */
  async signUp({ email, password, nome, tipo = 'doador' }) {
    const redirectUrl = typeof window !== 'undefined' ? window.location.origin : undefined;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          nome,
          tipo,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Encerra a sessão do usuário
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Obtém a sessão atual
   */
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  /**
   * Busca o perfil do usuário na tabela public.usuarios
   */
  async getCurrentProfile(userId) {
    if (!userId) return null;
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      return null;
    }
    return data;
  },

  /**
   * Observador de alterações de estado de autenticação
   */
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
