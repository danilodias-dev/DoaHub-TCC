/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * ============================================
 * DoaHub — Auth Context (Mock)
 * ============================================
 * Gerencia a sessão do doador de forma simulada.
 * Persiste o estado no localStorage para sobreviver
 * a refreshes de página.
 *
 * Estrutura do usuário armazenado:
 *   { name: string, email: string }
 *
 * Para integrar Supabase no futuro, basta substituir
 * as chamadas de localStorage pelas chamadas de auth
 * do cliente Supabase dentro deste contexto.
 */

const STORAGE_KEY = 'doahub_user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Recupera sessão persistida no mount inicial
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Sessão corrompida — ignora e começa como guest
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Simula o login de um doador.
   * @param {{ name: string, email: string }} userData
   */
  const login = useCallback((userData) => {
    const sessionUser = { 
      name: userData.name, 
      email: userData.email,
      role: userData.role || 'DONOR',
      type: userData.type || 'INDIVIDUAL',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  }, []);

  /**
   * Encerra a sessão do doador.
   */
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para consumir o contexto de autenticação.
 * Deve ser usado dentro de <AuthProvider>.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
