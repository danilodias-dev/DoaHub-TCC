/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega a sessão inicial e perfil do Supabase
  const loadInitialSession = useCallback(async () => {
    try {
      setIsLoading(true);
      const session = await authService.getSession();
      if (session?.user) {
        setUser(session.user);
        const userProfile = await authService.getCurrentProfile(session.user.id);
        setProfile(userProfile);
      } else {
        setUser(null);
        setProfile(null);
      }
    } catch (err) {
      console.error('Erro ao inicializar sessão de autenticação:', err);
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialSession();

    // Escuta mudanças de auth em tempo real
    const { data: { subscription } } = authService.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const userProfile = await authService.getCurrentProfile(session.user.id);
        setProfile(userProfile);
      } else {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [loadInitialSession]);

  /**
   * Login por e-mail e senha
   */
  const login = useCallback(async ({ email, password }) => {
    setIsLoading(true);
    try {
      const { user: loggedUser } = await authService.signIn({ email, password });
      setUser(loggedUser);
      if (loggedUser) {
        const userProfile = await authService.getCurrentProfile(loggedUser.id);
        setProfile(userProfile);
        return { user: loggedUser, profile: userProfile };
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Cadastro de novo usuário
   */
  const signUp = useCallback(async ({ email, password, nome, tipo = 'doador' }) => {
    setIsLoading(true);
    try {
      const data = await authService.signUp({ email, password, nome, tipo });
      if (data?.user) {
        setUser(data.user);
        const userProfile = await authService.getCurrentProfile(data.user.id);
        setProfile(userProfile);
      }
      return data;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Erro ao encerrar sessão:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Tipo do usuário atual ('doador' | 'ong' | 'admin' ou nulo)
  const userType = profile?.tipo || user?.user_metadata?.tipo || null;
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        userType,
        isAuthenticated,
        isLoading,
        login,
        signUp,
        logout,
        reloadProfile: async () => {
          if (user?.id) {
            const p = await authService.getCurrentProfile(user.id);
            setProfile(p);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
