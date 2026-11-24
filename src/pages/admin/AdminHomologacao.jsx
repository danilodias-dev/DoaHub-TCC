import { useState, useEffect } from 'react';
import { ongService } from '../../services/ongService';
import {
  CheckCircle2,
  XCircle,
  Building2,
  Globe,
  Mail,
  Phone,
  FileText,
  AlertCircle,
  RefreshCw,
  MapPin,
  ShieldAlert,
} from 'lucide-react';
import { PremiumButton } from '../../components/ui/PremiumButton';

export function AdminHomologacao() {
  const [ongs, setOngs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [message, setMessage] = useState(null);

  const carregarOngs = async () => {
    setLoading(true);
    try {
      const data = await ongService.listarOngsPendentes();
      setOngs(data);
    } catch (err) {
      console.error('Erro ao listar ONGs pendentes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarOngs();
  }, []);

  const handleHomologar = async (ongId, aprovar) => {
    setActionLoading(ongId);
    try {
      await ongService.homologarOng(ongId, aprovar);
      setMessage({ type: 'success', text: aprovar ? 'ONG homologada e verificada com sucesso!' : 'ONG reprovada/arquivada.' });
      setOngs(prev => prev.filter(o => o.id !== ongId));
    } catch (err) {
      console.error('Erro ao homologar ONG:', err);
      setMessage({ type: 'error', text: 'Não foi possível atualizar o status da ONG.' });
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-amber-600" />
              Homologação de ONGs (RF06)
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Validação cadastral, regularidade fiscal e verificação de elegibilidade aos fundos públicos.
            </p>
          </div>
          <button
            onClick={carregarOngs}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Recarregar
          </button>
        </div>

        {message && (
          <div
            className={`p-4 rounded-xl border flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <RefreshCw className="w-8 h-8 animate-spin text-slate-400 mx-auto mb-3" />
            <p className="text-sm text-slate-500">Buscando instituições pendentes de análise...</p>
          </div>
        ) : ongs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">Tudo em dia!</h3>
            <p className="text-slate-500 text-sm mt-1">
              Nenhuma organização pendente de homologação no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {ongs.map((ong) => (
              <div key={ong.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                      <Building2 className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{ong.nome}</h3>
                      <p className="text-xs text-slate-500 font-mono">CNPJ: {ong.cnpj || 'Não informado'}</p>
                    </div>
                  </div>

                  {ong.bio && <p className="text-sm text-slate-600 line-clamp-2">{ong.bio}</p>}

                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {ong.cidade || 'São Paulo'} - {ong.estado || 'SP'}
                    </span>
                    {ong.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        {ong.email}
                      </span>
                    )}
                    {ong.fundo_tipo && (
                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold">
                        Fundo: {ong.fundo_tipo}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex md:flex-col justify-end gap-3 min-w-[180px]">
                  <button
                    onClick={() => handleHomologar(ong.id, true)}
                    disabled={actionLoading === ong.id}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Aprovar ONG
                  </button>
                  <button
                    onClick={() => handleHomologar(ong.id, false)}
                    disabled={actionLoading === ong.id}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 font-semibold text-sm transition-all disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    Reprovar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
