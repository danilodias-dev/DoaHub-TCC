import React from 'react';
import { AlertTriangle, RefreshCw, Home, LogOut } from 'lucide-react';

/**
 * ErrorBoundary Global para evitar telas brancas na aplicação
 * Captura erros de renderização e exibe interface amigável de recuperação.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary capturou um erro não tratado:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetAndGoHome = () => {
    try {
      localStorage.removeItem('sb-chgiriggbwjnxrvxmjxx-auth-token');
      localStorage.removeItem('doahub_user');
    } catch (e) {
      console.warn('Erro ao limpar cache local:', e);
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
              Algo inesperado aconteceu
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Ocorreu uma falha temporária ao carregar a interface. Não se preocupe, seus dados e ações anteriores continuam seguros.
            </p>

            {this.state.error && (
              <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-left mb-6 overflow-x-auto text-[11px] font-mono text-slate-500 max-h-24">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={this.handleReload}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-600/20"
              >
                <RefreshCw className="w-4 h-4" />
                Recarregar Página
              </button>
              
              <button
                onClick={this.handleResetAndGoHome}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
              >
                <Home className="w-4 h-4" />
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
