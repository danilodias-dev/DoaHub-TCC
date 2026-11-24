import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { destinacaoService } from '../../services/destinacaoService';
import {
  TrendingUp,
  Building2,
  Users,
  ShieldCheck,
  DollarSign,
  Heart,
  FileCheck,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { PremiumButton } from '../../components/ui/PremiumButton';

export function AdminDashboard() {
  const [metricas, setMetricas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarMetricas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await destinacaoService.buscarMetricasGlobaisAdmin();
      setMetricas(data);
    } catch (err) {
      console.error('Erro ao carregar métricas admin:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarMetricas();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              Painel Geral de Controle
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Visão consolidada das destinações fiscais, homologação de ONGs e auditoria fiscal no Supabase.
            </p>
          </div>
          <button
            onClick={carregarMetricas}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar Dados
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">Erro ao carregar métricas: {error}</p>
          </div>
        )}

        {/* Cards de Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-slate-400">Total Destinado</p>
              <h3 className="text-2xl font-bold text-slate-900">
                R$ {(metricas?.totalDestinado || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h3>
              <p className="text-xs text-emerald-600 font-medium mt-0.5">
                R$ {(metricas?.totalDestinadoConsolidado || 0).toLocaleString('pt-BR')} consolidados
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-slate-400">ONGs Cadastradas</p>
              <h3 className="text-2xl font-bold text-slate-900">{metricas?.totalOngs || 0}</h3>
              <p className="text-xs text-blue-600 font-medium mt-0.5">
                {metricas?.ongsPendentes || 0} aguardando homologação
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-slate-400">Campanhas Ativas</p>
              <h3 className="text-2xl font-bold text-slate-900">{metricas?.campanhasAtivas || 0}</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {metricas?.totalCampanhas || 0} no histórico total
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-slate-400">Usuários Registrados</p>
              <h3 className="text-2xl font-bold text-slate-900">{metricas?.totalUsuarios || 0}</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Doadores & Representantes</p>
            </div>
          </div>
        </div>

        {/* Divisão por Fundos Governamentais */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-600" />
            Distribuição por Fundo Público Governamental
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-slate-800">Fundo da Criança e do Adolescente (ECA)</span>
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 font-bold rounded">DARF 3351</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                R$ {(metricas?.volumeEca || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-slate-500 mt-1">Conformidade com Art. 260 da Lei Federal 8.069/1990</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-slate-800">Fundo dos Direitos do Idoso</span>
                <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded">DARF 9090 / 6023</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                R$ {(metricas?.volumeIdoso || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-slate-500 mt-1">Conformidade com a Lei Federal 12.213/2010</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
