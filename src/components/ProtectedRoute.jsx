/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * Componente de Proteção de Rotas com RBAC (Role-Based Access Control)
 * Suporta filtragem por roles permitidas: ['admin'], ['ong'], ['doador']
 */
export function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, profile, userType, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Exibe spinner enquanto a sessão do Supabase está sendo recuperada
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-600">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-4" />
        <p className="text-sm font-medium">Verificando credenciais e acessos...</p>
      </div>
    );
  }

  // Redireciona para o login caso não esteja autenticado
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Validação de RBAC caso haja restrição de papéis
  if (allowedRoles.length > 0) {
    const currentRole = userType || profile?.tipo || 'doador';
    const hasPermission = allowedRoles.includes(currentRole);

    if (!hasPermission) {
      // Redireciona o usuário para sua respectiva área caso não tenha permissão na rota solicitada
      if (currentRole === 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
      }
      if (currentRole === 'ong') {
        return <Navigate to="/ong/dashboard" replace />;
      }
      return <Navigate to="/doador" replace />;
    }
  }

  return children;
}
