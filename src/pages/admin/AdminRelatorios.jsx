import { useState, useEffect } from 'react';
import { destinacaoService } from '../../services/destinacaoService';
import {
  FileSpreadsheet,
  Download,
  Calendar,
  Building,
  CheckCircle,
  FileCheck2,
  RefreshCw,
  Search,
  Filter,
} from 'lucide-react';

export function AdminRelatorios() {
  const [metricas, setMetricas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await destinacaoService.buscarMetricasGlobaisAdmin();
        setMetricas(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <FileSpreadsheet className="w-8 h-8 text-blue-600" />
              Relatórios Fiscais e Auditoria
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Geração de relatórios consolidados para prestação de contas aos Conselhos Municipais e Receita Federal.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            Exportar Relatório PDF
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Resumo da Prestação de Contas Consolidada</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs uppercase font-semibold text-slate-400">Total Arrecadado Via Plataforma</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                R$ {(metricas?.totalDestinado || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h3>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs uppercase font-semibold text-slate-400">Total Fundo ECA (Art. 260)</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1">
                R$ {(metricas?.volumeEca || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h3>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs uppercase font-semibold text-slate-400">Total Fundo do Idoso</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">
                R$ {(metricas?.volumeIdoso || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h3>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Parâmetros Oficiais de Auditoria:</h3>
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
              <li>Mapeamento em conformidade com as instruções normativas da Receita Federal do Brasil (RFB).</li>
              <li>Comprovantes armazenados em bucket seguro isolado com criptografia em repouso.</li>
              <li>Acesso restrito em conformidade com as diretrizes da LGPD (Lei nº 13.709/2018).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
