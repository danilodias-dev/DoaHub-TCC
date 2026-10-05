import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { DonorProvider } from './context/DonorContext';
import { CampaignProvider } from './context/CampaignContext';
import { NavHeader } from './components/layout/NavHeader';
import { Footer } from './components/layout/Footer';

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
        <Route path="/doador" element={<DoadorHome />} />
        <Route path="/explorar" element={<ExplorarCampanhas />} />
        <Route path="/campanha/:id" element={<Campanha />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/obrigado" element={<Obrigado />} />
        <Route path="/doador/historico" element={<Historico />} />
        <Route path="/doador/doacoes" element={<MinhasDoacoes />} />

        {/* ONG e Instituição */}
        <Route path="/instituicao/:id" element={<PerfilInstituicao />} />
        <Route path="/ong/onboarding/1" element={<OnboardingStep1 />} />
        <Route path="/ong/onboarding/2" element={<OnboardingStep2 />} />
        <Route path="/ong/onboarding/sucesso" element={<OnboardingSuccess />} />
        <Route path="/ong/dashboard" element={<DashboardONG />} />
        
        {/* Shared */}
        <Route path="/configuracoes" element={<Configuracoes />} />
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

