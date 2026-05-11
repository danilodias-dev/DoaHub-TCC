import { motion } from 'framer-motion';
import { Shield, ArrowRight, Home, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PremiumButton } from '../../components/ui/PremiumButton';

const STEPS = [
  { id: 1, label: 'Dados da ONG', path: '/ong/onboarding/1' },
  { id: 2, label: 'Documentação', path: '/ong/onboarding/2' },
  { id: 3, label: 'Aprovação', path: '/ong/onboarding/sucesso' }
];

export function OnboardingSuccess() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-ice">
      <div className="h-20"></div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        
        {/* Progress Indicator - All Completed */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {STEPS.map((step, index) => {
            const isCompleted = index < 2; // currentStep is 3
            const isCurrent = index === 2;

            return (
              <div key={step.id} className="flex items-center gap-3">
                <div 
                  onClick={() => isCompleted && navigate(step.path)}
                  className={`flex items-center gap-2 ${isCompleted ? 'cursor-pointer hover:opacity-70 transition-opacity' : 'pointer-events-none'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    isCompleted ? 'bg-emerald text-white' : 
                    isCurrent ? 'bg-emerald text-white shadow-lg shadow-emerald/30' : 
                    'bg-graphite/10 text-graphite-light'
                  }`}>
                    {isCompleted || (step.id === 3 && isCurrent) ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`hidden md:block text-sm font-bold ${
                    isCompleted || isCurrent ? 'text-emerald' : 'text-graphite-light font-medium'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`w-12 h-0.5 ${isCompleted ? 'bg-emerald' : 'bg-graphite/10'}`}></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Success Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-graphite/5 border border-graphite/5 text-center"
        >
          <div className="w-24 h-24 rounded-3xl bg-emerald/10 text-emerald flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-extrabold text-graphite-dark mb-4">
            Documentação Recebida!
          </h1>
          <p className="text-graphite-light font-medium text-lg max-w-lg mx-auto mb-10">
            Sua instituição foi enviada para análise com sucesso. Nossa equipe de curadoria verificará os dados em até 48 horas úteis.
          </p>

          <div className="bg-ice rounded-2xl p-6 flex items-start gap-4 text-left border border-graphite/5 mb-10">
            <Shield className="w-6 h-6 text-emerald flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-graphite-dark">Próximos Passos</h3>
              <p className="text-sm text-graphite-light font-medium mt-1">
                Você receberá uma confirmação por e-mail assim que seu perfil for aprovado. Após a aprovação, você poderá publicar suas campanhas e começar a receber doações.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <PremiumButton size="lg" className="w-full md:w-auto px-10 gap-2" onClick={() => navigate('/ong/dashboard')}>
              Ir para o Dashboard <ArrowRight className="w-5 h-5" />
            </PremiumButton>
            <Link to="/" className="flex items-center gap-2 font-bold text-graphite-light hover:text-emerald transition-colors px-6 py-3">
              <Home className="w-5 h-5" /> Voltar ao Início
            </Link>
          </div>
        </motion.div>

        <p className="text-center text-graphite-light/60 text-sm mt-8 font-medium">
          Dúvidas? Entre em contato com <span className="text-emerald underline">ajuda@doahub.org</span>
        </p>
      </div>
    </div>
  );
}
