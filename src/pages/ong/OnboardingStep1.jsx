import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, Phone, MapPin, ArrowRight, ChevronLeft, CheckCircle2, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { ProfileSwitcher } from '../../components/auth/ProfileSwitcher';

const STEPS = [
  { id: 1, label: 'Dados da ONG', path: '/ong/onboarding/1' },
  { id: 2, label: 'Documentação', path: '/ong/onboarding/2' },
  { id: 3, label: 'Aprovação', path: '/ong/onboarding/sucesso' }
];

let cachedForm = { nome: '', cnpj: '', email: '', telefone: '', cidade: '', estado: '' };

export function OnboardingStep1() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState(() => {
    return {
      ...cachedForm,
      nome: location.state?.nome || location.state?.name || cachedForm.nome || '',
      email: location.state?.email || cachedForm.email || '',
    };
  });

  useEffect(() => {
    cachedForm = form;
  }, [form]);

  // Se o usuário alternar de rota e receber novos states
  useEffect(() => {
    if (location.state?.nome || location.state?.name || location.state?.email) {
      setForm(prev => ({
        ...prev,
        nome: location.state.nome || location.state.name || prev.nome,
        email: location.state.email || prev.email,
      }));
    }
  }, [location.state]);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleRoleChange = (role) => {
    if (role === 'donor') {
      navigate('/cadastro', {
        state: {
          name: form.nome,
          email: form.email,
        }
      });
    }
  };

  const inputClass = "w-full px-5 py-4 bg-ice rounded-2xl border border-graphite/5 text-graphite-dark font-medium placeholder:text-graphite-light/60 focus:outline-none focus:ring-4 focus:ring-emerald/20 focus:border-emerald/30 transition-all min-h-[48px]";

  return (
    <div className="min-h-screen bg-ice">
      <div className="h-20"></div>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {STEPS.map((step, index) => {
            const isCompleted = index < 0; // currentStep is 1
            const isCurrent = index === 0;

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

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-graphite/5 border border-graphite/5 flex flex-col gap-8"
        >
          {/* Header e Profile Switcher */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-display font-extrabold text-graphite-dark">Cadastre sua ONG</h1>
                  <p className="text-graphite-light font-medium text-sm mt-0.5">Preencha os dados básicos da instituição.</p>
                </div>
              </div>

              {/* Link explícito para voltar ao cadastro de doador */}
              <button
                type="button"
                onClick={() => handleRoleChange('donor')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald hover:text-emerald-dark hover:underline self-start sm:self-auto py-2 px-3 rounded-xl hover:bg-emerald/5 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                Voltar para cadastro de doador
              </button>
            </div>

            {/* Profile Switcher interativo */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-graphite-light uppercase tracking-widest ml-1">
                Tipo de conta selecionado
              </label>
              <ProfileSwitcher 
                activeRole="ong" 
                onSelectRole={handleRoleChange} 
              />
            </div>
          </div>

          <form 
            id="panel-ong"
            role="tabpanel"
            aria-labelledby="tab-ong"
            onSubmit={(e) => {
              e.preventDefault();
              navigate('/ong/onboarding/2');
            }}
            className="flex flex-col gap-5"
          >
            {/* Nome */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-graphite-dark ml-1">Nome da Instituição *</label>
              <input 
                type="text" 
                placeholder="Ex: Instituto Esperança Viva"
                required
                value={form.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* CNPJ */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-graphite-dark ml-1">CNPJ *</label>
              <input 
                type="text" 
                placeholder="00.000.000/0001-00"
                required
                value={form.cnpj}
                onChange={(e) => handleChange('cnpj', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Email + Tel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-graphite-dark ml-1">E-mail Institucional *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-light" />
                  <input 
                    type="email" 
                    placeholder="contato@ong.org.br"
                    required
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`${inputClass} pl-12`}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-graphite-dark ml-1">Telefone *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-light" />
                  <input 
                    type="tel" 
                    placeholder="(11) 99999-0000"
                    required
                    value={form.telefone}
                    onChange={(e) => handleChange('telefone', e.target.value)}
                    className={`${inputClass} pl-12`}
                  />
                </div>
              </div>
            </div>

            {/* Cidade + Estado Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-graphite-dark ml-1">Cidade *</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-light" />
                  <input 
                    type="text" 
                    placeholder="Ex: São Paulo"
                    required
                    value={form.cidade}
                    onChange={(e) => handleChange('cidade', e.target.value)}
                    className={`${inputClass} pl-12`}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-graphite-dark ml-1">Estado *</label>
                <select 
                  value={form.estado}
                  required
                  onChange={(e) => handleChange('estado', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Selecione...</option>
                  {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-graphite/5">
              <button
                type="button"
                onClick={() => handleRoleChange('donor')}
                className="flex items-center gap-1 font-medium text-graphite-light hover:text-emerald transition-colors text-sm"
              >
                <ChevronLeft className="w-5 h-5" /> Voltar para Doador
              </button>
              <PremiumButton 
                type="submit"
                size="lg" 
                className="px-10 gap-2 min-h-[48px]"
              >
                Próxima Etapa <ArrowRight className="w-5 h-5" />
              </PremiumButton>
            </div>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
