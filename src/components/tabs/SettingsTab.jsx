import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Camera, 
  Bell, 
  ShieldCheck, 
  Smartphone,
  Save,
} from 'lucide-react';
import { useCampaigns } from '../../context/CampaignContext';

/**
 * ============================================
 * DoaHub — Aba de Configurações da ONG
 * ============================================
 * Gerencia os dados do perfil, avatar, contato 
 * e preferências de notificação da instituição.
 */

export function SettingsTab() {
  const { orgProfile, updateOrgProfile } = useCampaigns();
  
  // Estado local para os inputs (evitar renders excessivos no contexto enquanto digita)
  const [formData, setFormData] = useState({
    name: orgProfile.name || '',
    bio: orgProfile.bio || '',
    email: orgProfile.email || '',
    phone: orgProfile.phone || '',
    website: orgProfile.website || '',
    cnpj: orgProfile.cnpj || '',
    address: orgProfile.address || '',
  });

  const [notifications, setNotifications] = useState(orgProfile.notifications || {
    emailDoacoes: true,
    emailRelatorios: true,
    emailCampanhas: false,
    pushDoacoes: true,
    pushMetas: true,
    pushRelatorios: false,
  });

  const [avatarPreview, setAvatarPreview] = useState(orgProfile.avatar);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpar erro ao digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleToggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'E-mail inválido';
    if (!formData.cnpj.trim()) newErrors.cnpj = 'CNPJ é obrigatório';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSaving(true);
    
    // Simula tempo de requisição de API
    setTimeout(() => {
      updateOrgProfile({
        ...formData,
        avatar: avatarPreview,
        notifications,
      });
      setIsSaving(false);
    }, 800);
  };

  return (
    <>
      <div className="flex flex-col mb-8">
        <h2 className="text-3xl font-display font-bold text-graphite-dark">
          Configurações
        </h2>
        <p className="text-graphite-light font-medium mt-1">
          Gerencie o perfil público e as preferências da sua instituição.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── Coluna Esquerda: Menu Rápido (Opcional, futuro) ── */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-graphite/5 sticky top-8">
            <nav className="flex flex-col gap-2">
              <a href="#perfil" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-ice text-graphite-dark font-bold text-sm">
                <Building2 className="w-4 h-4 text-emerald" /> Perfil Institucional
              </a>
              <a href="#notificacoes" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-ice text-graphite-light hover:text-graphite-dark font-medium text-sm transition-colors">
                <Bell className="w-4 h-4" /> Notificações
              </a>
              <a href="#seguranca" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-ice text-graphite-light hover:text-graphite-dark font-medium text-sm transition-colors">
                <ShieldCheck className="w-4 h-4" /> Segurança
              </a>
            </nav>
          </div>
        </div>

        {/* ── Coluna Principal: Formulários ── */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Sessão Perfil Institucional */}
          <motion.section 
            id="perfil"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-graphite/5"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-graphite-dark">
                Perfil Institucional
              </h3>
            </div>

            {/* Avatar Upload */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="w-24 h-24 rounded-full bg-ice border-2 border-dashed border-graphite/20 flex flex-col items-center justify-center overflow-hidden transition-colors group-hover:border-emerald/50">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Building2 className="w-8 h-8 text-graphite-light/50 mb-1" />
                      <span className="text-[10px] font-bold text-graphite-light">Logo</span>
                    </>
                  )}
                  {/* Overlay de hover */}
                  <div className="absolute inset-0 bg-graphite-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleAvatarChange} 
                  accept="image/png, image/jpeg" 
                  className="hidden" 
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-graphite-dark">Logo da Organização</h4>
                <p className="text-xs text-graphite-light mt-1">Recomendado: 400x400px (PNG ou JPG até 2MB).</p>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 text-xs font-bold text-emerald hover:underline"
                >
                  Alterar imagem
                </button>
              </div>
            </div>

            {/* Campos Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-bold text-graphite-dark mb-2">Nome da Instituição *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full bg-ice border ${errors.name ? 'border-red-400' : 'border-graphite/10'} rounded-xl px-4 py-3 text-sm font-medium text-graphite-dark focus:outline-none focus:ring-2 focus:ring-emerald/20 transition-all`}
                  placeholder="Ex: Instituto Esperança"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-bold text-graphite-dark mb-2">Biografia Curta</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-ice border border-graphite/10 rounded-xl px-4 py-3 text-sm font-medium text-graphite-dark focus:outline-none focus:ring-2 focus:ring-emerald/20 transition-all resize-none"
                  placeholder="Resuma a missão da sua organização..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-graphite-dark mb-2">CNPJ *</label>
                <input
                  type="text"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                  className={`w-full bg-ice border ${errors.cnpj ? 'border-red-400' : 'border-graphite/10'} rounded-xl px-4 py-3 text-sm font-medium text-graphite-dark focus:outline-none focus:ring-2 focus:ring-emerald/20 transition-all`}
                  placeholder="00.000.000/0000-00"
                />
                {errors.cnpj && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.cnpj}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-graphite-dark mb-2">Website</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-light" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full bg-ice border border-graphite/10 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-graphite-dark focus:outline-none focus:ring-2 focus:ring-emerald/20 transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-graphite/5 w-full my-8" />

            <h4 className="text-sm font-bold text-graphite-dark mb-6">Informações de Contato</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-graphite-dark mb-2">E-mail Público *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-light" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-ice border ${errors.email ? 'border-red-400' : 'border-graphite/10'} rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-graphite-dark focus:outline-none focus:ring-2 focus:ring-emerald/20 transition-all`}
                    placeholder="contato@..."
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-graphite-dark mb-2">Telefone Público</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-light" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-ice border border-graphite/10 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-graphite-dark focus:outline-none focus:ring-2 focus:ring-emerald/20 transition-all"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-bold text-graphite-dark mb-2">Endereço Principal</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-light" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-ice border border-graphite/10 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-graphite-dark focus:outline-none focus:ring-2 focus:ring-emerald/20 transition-all"
                    placeholder="Rua, Número - Bairro, Cidade - UF"
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Sessão Notificações */}
          <motion.section 
            id="notificacoes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-graphite/5"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-graphite-dark">
                  Preferências de Notificação
                </h3>
                <p className="text-xs text-graphite-light font-medium">Escolha quais alertas deseja receber.</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* E-mail */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-4 h-4 text-graphite-light" />
                  <h4 className="text-sm font-bold text-graphite-dark">Notificações por E-mail</h4>
                </div>
                <div className="flex flex-col gap-3">
                  <ToggleSwitch 
                    label="Novas doações confirmadas" 
                    checked={notifications.emailDoacoes} 
                    onChange={() => handleToggleNotification('emailDoacoes')} 
                  />
                  <ToggleSwitch 
                    label="Relatórios mensais disponíveis" 
                    checked={notifications.emailRelatorios} 
                    onChange={() => handleToggleNotification('emailRelatorios')} 
                  />
                  <ToggleSwitch 
                    label="Resumo semanal de campanhas" 
                    checked={notifications.emailCampanhas} 
                    onChange={() => handleToggleNotification('emailCampanhas')} 
                  />
                </div>
              </div>

              <div className="h-px bg-graphite/5 w-full my-2" />

              {/* Push */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="w-4 h-4 text-graphite-light" />
                  <h4 className="text-sm font-bold text-graphite-dark">Notificações na Plataforma (Push)</h4>
                </div>
                <div className="flex flex-col gap-3">
                  <ToggleSwitch 
                    label="Novas doações em tempo real" 
                    checked={notifications.pushDoacoes} 
                    onChange={() => handleToggleNotification('pushDoacoes')} 
                  />
                  <ToggleSwitch 
                    label="Metas de campanhas atingidas" 
                    checked={notifications.pushMetas} 
                    onChange={() => handleToggleNotification('pushMetas')} 
                  />
                  <ToggleSwitch 
                    label="Avisos do sistema e relatórios" 
                    checked={notifications.pushRelatorios} 
                    onChange={() => handleToggleNotification('pushRelatorios')} 
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Botão de Salvar Global */}
          <div className="flex justify-end pt-4 pb-12">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${
                isSaving 
                  ? 'bg-emerald/20 text-emerald cursor-wait shadow-none' 
                  : 'bg-emerald text-white hover:bg-emerald/90 hover:-translate-y-0.5 hover:shadow-emerald/20'
              }`}
            >
              {isSaving ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-emerald border-t-transparent rounded-full"
                  />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Salvar Configurações
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

// Subcomponente de Switch (Toggle)
// eslint-disable-next-line react/prop-types
function ToggleSwitch({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between p-3 rounded-xl hover:bg-ice cursor-pointer transition-colors border border-transparent hover:border-graphite/5">
      <span className="text-sm font-medium text-graphite-dark">{label}</span>
      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-emerald' : 'bg-graphite/20'}`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </div>
      <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
    </label>
  );
}
