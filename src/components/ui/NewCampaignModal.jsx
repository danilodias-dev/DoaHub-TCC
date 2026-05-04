/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Megaphone,
  Target,
  FileText,
  Tag,
  CalendarDays,
  ImagePlus,
  AlertTriangle,
  Sparkles,
  Check,
} from 'lucide-react';
import { PremiumButton } from './PremiumButton';

/**
 * ============================================
 * DoaHub — Modal de Criação de Nova Campanha
 * ============================================
 */

const CATEGORIES = [
  'Alimentação',
  'Educação',
  'Saúde',
  'Moradia',
  'Meio Ambiente',
  'Cultura',
  'Animais',
  'Outro',
];

const initialFormState = {
  title: '',
  description: '',
  goal: '',
  category: '',
  deadline: '',
  imageUrl: '',
};

export function NewCampaignModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Focus trap — foca no primeiro input ao abrir
  useEffect(() => {
    if (isOpen) {
      // Pequeno delay para animação
      const timeout = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 200);
      return () => clearTimeout(timeout);
    } else {
      setForm(initialFormState);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Fecha com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Bloqueia scroll do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Limpa erro do campo ao editar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = 'O título da campanha é obrigatório.';
    } else if (form.title.trim().length < 5) {
      newErrors.title = 'O título deve ter pelo menos 5 caracteres.';
    }

    if (!form.description.trim()) {
      newErrors.description = 'Descreva o objetivo da campanha.';
    } else if (form.description.trim().length < 20) {
      newErrors.description = 'A descrição deve ter pelo menos 20 caracteres.';
    }

    const goalNum = parseFloat(form.goal.replace(/[^\d]/g, ''));
    if (!form.goal || isNaN(goalNum) || goalNum <= 0) {
      newErrors.goal = 'Defina uma meta válida maior que zero.';
    }

    if (!form.category) {
      newErrors.category = 'Selecione uma categoria.';
    }

    if (!form.deadline) {
      newErrors.deadline = 'Defina a data limite da campanha.';
    } else {
      const deadlineDate = new Date(form.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate <= today) {
        newErrors.deadline = 'A data limite deve ser futura.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simula tempo de processamento
    await new Promise(resolve => setTimeout(resolve, 800));

    const goalNum = parseFloat(form.goal.replace(/[^\d]/g, ''));

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      goal: goalNum,
      category: form.category,
      deadline: form.deadline,
      imageUrl: form.imageUrl || null,
    });

    setIsSubmitting(false);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // --- Field Component ---
  const FormField = ({ label, icon: Icon, error, children, required = true }) => (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-2 text-sm font-bold text-graphite-dark">
        <Icon className="w-4 h-4 text-graphite-light" />
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs font-semibold text-red-500 flex items-center gap-1"
          >
            <AlertTriangle className="w-3 h-3" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  const inputBase = 'w-full px-4 py-3 rounded-xl border-2 bg-ice/50 text-sm font-medium text-graphite-dark placeholder:text-graphite-light/50 outline-none transition-all focus:ring-2 focus:ring-emerald/20';
  const inputNormal = `${inputBase} border-graphite/10 focus:border-emerald`;
  const inputError = `${inputBase} border-red-300 focus:border-red-400 focus:ring-red-200/30`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-graphite-dark/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md rounded-t-[2rem] border-b border-graphite/5 px-8 py-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="modal-title" className="text-xl font-display font-extrabold text-graphite-dark">
                    Nova Campanha
                  </h2>
                  <p className="text-xs text-graphite-light font-medium">Preencha os dados para criar uma campanha</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl hover:bg-ice flex items-center justify-center text-graphite-light hover:text-graphite-dark transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-5" noValidate>

              {/* Título */}
              <FormField label="Título da Campanha" icon={Megaphone} error={errors.title}>
                <input
                  ref={firstInputRef}
                  type="text"
                  placeholder="Ex: Alimentação para 500 Famílias"
                  value={form.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={errors.title ? inputError : inputNormal}
                  maxLength={100}
                />
              </FormField>

              {/* Descrição */}
              <FormField label="Descrição" icon={FileText} error={errors.description}>
                <textarea
                  placeholder="Descreva o objetivo e o impacto esperado da campanha..."
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className={`${errors.description ? inputError : inputNormal} resize-none`}
                  rows={3}
                  maxLength={500}
                />
                <span className="text-[10px] text-graphite-light/60 font-medium text-right">
                  {form.description.length}/500
                </span>
              </FormField>

              {/* Meta e Categoria — 2 colunas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Meta (R$)" icon={Target} error={errors.goal}>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Ex: 50000"
                    value={form.goal}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      handleChange('goal', value);
                    }}
                    className={errors.goal ? inputError : inputNormal}
                  />
                </FormField>

                <FormField label="Categoria" icon={Tag} error={errors.category}>
                  <select
                    value={form.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className={`${errors.category ? inputError : inputNormal} appearance-none cursor-pointer`}
                  >
                    <option value="">Selecione...</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </FormField>
              </div>

              {/* Data limite */}
              <FormField label="Data Limite" icon={CalendarDays} error={errors.deadline}>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => handleChange('deadline', e.target.value)}
                  className={`${errors.deadline ? inputError : inputNormal} cursor-pointer`}
                  min={new Date().toISOString().split('T')[0]}
                />
              </FormField>

              {/* URL da imagem (opcional) */}
              <FormField label="URL da Imagem de Capa" icon={ImagePlus} error={errors.imageUrl} required={false}>
                <input
                  type="url"
                  placeholder="https://..."
                  value={form.imageUrl}
                  onChange={(e) => handleChange('imageUrl', e.target.value)}
                  className={inputNormal}
                />
              </FormField>

              {/* Submit */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-graphite/5 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-full text-sm font-bold text-graphite-light hover:bg-ice transition-colors"
                >
                  Cancelar
                </button>
                <PremiumButton
                  type="submit"
                  size="md"
                  className="px-8 gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Criando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Criar Campanha
                    </>
                  )}
                </PremiumButton>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
