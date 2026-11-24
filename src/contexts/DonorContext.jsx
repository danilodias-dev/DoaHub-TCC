/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { destinacaoService } from '../services/destinacaoService';
import { storageService } from '../services/storageService';
import { useAuth } from './AuthContext';

const DonorContext = createContext(null);

export function DonorProvider({ children }) {
  const { user } = useAuth();
  const [destinacoes, setDestinacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Carrega o histórico de destinações fiscais do usuário logado no Supabase
   */
  const carregarHistorico = useCallback(async () => {
    if (!user?.id) {
      setDestinacoes([]);
      return [];
    }

    setLoading(true);
    setError(null);
    try {
      const data = await destinacaoService.listarDestinacoesDoUsuario(user.id);
      setDestinacoes(data || []);
      return data;
    } catch (err) {
      console.error('Erro ao carregar histórico de destinações:', err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    carregarHistorico();
  }, [carregarHistorico]);

  /**
   * Registra uma nova destinação fiscal
   */
  const registrarDestinacao = useCallback(async (dadosDestinacao) => {
    if (!user?.id) throw new Error('Usuário precisa estar autenticado para registrar destinação.');
    setLoading(true);
    try {
      const payload = {
        usuario_id: user.id,
        ong_id: dadosDestinacao.ong_id || null,
        campanha_id: dadosDestinacao.campanha_id || null,
        valor: Number(dadosDestinacao.valor || 0),
        fundo_governamental: dadosDestinacao.fundo_governamental,
        codigo_darf: dadosDestinacao.codigo_darf,
        status: dadosDestinacao.status || 'Pendente',
      };
      const novaDestinacao = await destinacaoService.registrarDestinacao(payload);
      setDestinacoes(prev => [novaDestinacao, ...prev]);
      return novaDestinacao;
    } catch (err) {
      console.error('Erro ao registrar destinação:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  /**
   * Realiza upload privado do comprovante no storage e atualiza status para 'Consolidado'
   */
  const uploadComprovante = useCallback(async (destinacaoId, file) => {
    if (!user?.id) throw new Error('Usuário não autenticado.');
    setLoading(true);
    try {
      const uploadResult = await storageService.uploadComprovante({
        usuarioId: user.id,
        destinacaoId,
        file,
      });

      const updated = await destinacaoService.anexarComprovante(destinacaoId, uploadResult.path);
      setDestinacoes(prev => prev.map(d => d.id === destinacaoId ? updated : d));
      return updated;
    } catch (err) {
      console.error('Erro no upload de comprovante:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  /**
   * Gera uma Signed URL temporária (60 segundos) para baixar comprovante com segurança (LGPD)
   */
  const baixarComprovante = useCallback(async (filePath) => {
    try {
      const signedUrl = await storageService.getSignedUrl(filePath, 60);
      if (signedUrl) {
        window.open(signedUrl, '_blank');
      }
      return signedUrl;
    } catch (err) {
      console.error('Erro ao obter link seguro do comprovante:', err);
      throw err;
    }
  }, []);

  // Total acumulado destinado pelo doador
  const totalDestinado = useMemo(() => {
    return destinacoes.reduce((acc, curr) => acc + Number(curr.valor || 0), 0);
  }, [destinacoes]);

  // Adaptação para telas que utilizavam a propriedade legado donations / metrics
  const legacyDonations = useMemo(() => {
    return destinacoes.map(d => ({
      id: d.id,
      date: (typeof d.data_destinacao === 'string' && d.data_destinacao.includes('T')) 
        ? d.data_destinacao.split('T')[0] 
        : (d.data_destinacao || '2026-04-10'),
      ngo: d.ongs?.nome || 'Fundo Oficial Selecionado',
      fund: d.fundo_governamental || 'Fundo Municipal (ECA/Idoso)',
      amount: Number(d.valor || 0),
      status: d.status || 'Pendente',
      receiptUrl: d.comprovante_url,
      impactReportId: d.relatorio_impacto_id,
    }));
  }, [destinacoes]);

  const metrics = useMemo(() => {
    const consolidated = destinacoes.filter(d => d.status === 'Consolidado' || d.status === 'Confirmada').length;
    const pending = destinacoes.filter(d => d.status === 'Pendente').length;
    return {
      totalDestined: totalDestinado,
      taxCeiling: 2500,
      totalGuides: destinacoes.length,
      consolidated,
      pending,
      deadline: '30 de Abril de 2027',
    };
  }, [destinacoes, totalDestinado]);

  return (
    <DonorContext.Provider
      value={{
        // Requisitos: destinacoes, totalDestinado, carregarHistorico, registrarDestinacao, uploadComprovante, baixarComprovante
        destinacoes,
        totalDestinado,
        carregarHistorico,
        registrarDestinacao,
        uploadComprovante,
        baixarComprovante,
        loading,
        error,
        // Compatibilidade com telas legadas do doador
        donations: legacyDonations,
        metrics,
        getImpactReport: () => null,
      }}
    >
      {children}
    </DonorContext.Provider>
  );
}

export function useDonor() {
  const context = useContext(DonorContext);
  if (!context) throw new Error('useDonor deve ser usado dentro de um DonorProvider');
  return context;
}
