import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, Phone, MapPin, ArrowRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PremiumButton } from '../../components/ui/PremiumButton';

export function OnboardingStep1() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', cnpj: '', email: '', telefone: '', cidade: '', estado: '' });

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const inputClass = "w-full px-5 py-4 bg-ice rounded-2xl border border-graphite/5 text-graphite-dark font-medium placeholder:text-graphite-light/60 focus:outline-none focus:ring-4 focus:ring-emerald/20 focus:border-emerald/30 transition-all";

  return (
    <div className="min-h-screen bg-ice">
      <div className="h-20"></div>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-emerald/30">1</div>
            <span className="hidden md:block text-sm font-bold text-emerald">Dados da ONG</span>
          </div>
          <div className="w-12 h-0.5 bg-graphite/10"></div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-graphite/10 text-graphite-light flex items-center justify-center font-bold text-sm">2</div>
            <span className="hidden md:block text-sm font-medium text-graphite-light">Documentação</span>
          </div>
          <div className="w-12 h-0.5 bg-graphite/10"></div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-graphite/10 text-graphite-light flex items-center justify-center font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="hidden md:block text-sm font-medium text-graphite-light">Aprovação</span>
          </div>
        </div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-graphite/5 border border-graphite/5"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-extrabold text-graphite-dark">Cadastre sua ONG</h1>
              <p className="text-graphite-light font-medium mt-1">Preencha os dados básicos da instituição.</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            
            {/* Nome */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-graphite-dark ml-1">Nome da Instituição *</label>
              <input 
                type="text" 
                placeholder="Ex: Instituto Esperança Viva"
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

          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-10 pt-8 border-t border-graphite/5">
            <Link to="/" className="flex items-center gap-1 font-medium text-graphite-light hover:text-emerald transition-colors">
              <ChevronLeft className="w-5 h-5" /> Voltar
            </Link>
            <PremiumButton 
              size="lg" 
              onClick={() => navigate('/ong/onboarding/2')}
              className="px-10 gap-2"
            >
              Próxima Etapa <ArrowRight className="w-5 h-5" />
            </PremiumButton>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
