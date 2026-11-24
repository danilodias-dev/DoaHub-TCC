import { supabase } from '../lib/supabase';

const BUCKET_NAME = 'comprovantes';

/**
 * Serviço para manipulação de Storage privado no Supabase (Bucket 'comprovantes')
 */
export const storageService = {
  /**
   * Upload privado de comprovante seguindo a convenção ${usuarioId}/${destinacaoId}-${Date.now()}.pdf (ou extensão correta)
   */
  async uploadComprovante({ usuarioId, destinacaoId, file }) {
    if (!usuarioId || !destinacaoId || !file) {
      throw new Error('Parâmetros obrigatórios ausentes para o upload do comprovante.');
    }

    const fileExt = (file?.name && typeof file.name === 'string') 
      ? (file.name.split('.').pop() || 'pdf') 
      : 'pdf';
    const filePath = `${usuarioId}/${destinacaoId}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    return {
      path: data.path,
      fullPath: data.fullPath,
    };
  },

  /**
   * Gera uma Signed URL temporária válida por 60 segundos para download seguro em conformidade com LGPD
   */
  async getSignedUrl(filePath, expiresIn = 60) {
    if (!filePath) return null;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      console.error('Erro ao gerar URL temporária do comprovante:', error);
      throw error;
    }

    return data?.signedUrl || null;
  },

  /**
   * Remove arquivo do storage
   */
  async removeFile(filePath) {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) throw error;
    return data;
  },
};
