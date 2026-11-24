import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { DonorProvider } from './contexts/DonorContext';
import { CampaignProvider } from './contexts/CampaignContext';
import { NavHeader, Footer, MainLayout } from './layouts';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import { Landing } from './pages/public/Landing';
import { QuemSomos } from './pages/public/QuemSomos';
import { Transparencia } from './pages/public/Transparencia';
import { Ajuda } from './pages/public/Ajuda';
import { SimuladorIR } from './pages/public/SimuladorIR';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Cadastro } from './pages/auth/Cadastro';

// Doador Pages
import { DoadorHome } from './pages/doador/DoadorHome';
import { Campanha } from './pages/doador/Campanha';
import { ExplorarCampanhas } from './pages/doador/ExplorarCampanhas';
import { Checkout } from './pages/doador/Checkout';
import { Obrigado } from './pages/doador/Obrigado';
import { Historico } from './pages/doador/Historico';
import { MinhasDoacoes } from './pages/doador/MinhasDoacoes';

// ONG Pages
import { OnboardingStep1 } from './pages/ong/OnboardingStep1';
import { OnboardingStep2 } from './pages/ong/OnboardingStep2';
import { DashboardONG } from './pages/ong/DashboardONG';
import { PerfilInstituicao } from './pages/ong/PerfilInstituicao';
import { OnboardingSuccess } from './pages/ong/OnboardingSuccess';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminHomologacao } from './pages/admin/AdminHomologacao';
import { AdminRelatorios } from './pages/admin/AdminRelatorios';

// Shared
import { Configuracoes } from './pages/shared/Configuracoes';

/**
 * Utility to scroll to TOP on every route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/transparencia" element={<Transparencia />} />
        <Route path="/ajuda" element={<Ajuda />} />
        <Route path="/simulador-ir" element={<SimuladorIR />} />
        <Route path="/simulador" element={<SimuladorIR />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastrar-ong" element={<OnboardingStep1 />} />

        {/* Doador e Exploração */}
        <Route path="/doador" element={<ProtectedRoute allowedRoles={['doador', 'admin']}><DoadorHome /></ProtectedRoute>} />
        <Route path="/explorar" element={<ExplorarCampanhas />} />
        <Route path="/campanhas" element={<ExplorarCampanhas />} />
        <Route path="/campanha/:id" element={<Campanha />} />
        <Route path="/checkout/:id" element={<ProtectedRoute allowedRoles={['doador', 'admin']}><Checkout /></ProtectedRoute>} />
        <Route path="/obrigado" element={<Obrigado />} />
        <Route path="/doador/historico" element={<ProtectedRoute allowedRoles={['doador', 'admin']}><Historico /></ProtectedRoute>} />
        <Route path="/doador/doacoes" element={<ProtectedRoute allowedRoles={['doador', 'admin']}><MinhasDoacoes /></ProtectedRoute>} />

        {/* ONG e Instituição */}
        <Route path="/instituicao/:id" element={<PerfilInstituicao />} />
        <Route path="/ong/onboarding/1" element={<OnboardingStep1 />} />
        <Route path="/ong/onboarding/2" element={<OnboardingStep2 />} />
        <Route path="/ong/onboarding/sucesso" element={<OnboardingSuccess />} />
        <Route path="/ong/dashboard" element={<ProtectedRoute allowedRoles={['ong', 'admin']}><DashboardONG /></ProtectedRoute>} />
        
        {/* Admin RBAC Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/homologacao" element={<ProtectedRoute allowedRoles={['admin']}><AdminHomologacao /></ProtectedRoute>} />
        <Route path="/admin/relatorios" element={<ProtectedRoute allowedRoles={['admin']}><AdminRelatorios /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />

        {/* Shared */}
        <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DonorProvider>
        <CampaignProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <NavHeader />
              <main className="flex-grow">
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </CampaignProvider>
      </DonorProvider>
    </AuthProvider>
  );
}

