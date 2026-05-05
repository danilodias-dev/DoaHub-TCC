import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Upload, CheckCircle2, ChevronLeft, Shield, ArrowRight, File, XCircle, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { useCampaigns } from '../../context/CampaignContext';

const ACCEPTED_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
];
const ACCEPTED_EXTENSIONS = '.pdf,.png,.jpg,.jpeg,.webp';
const MAX_FILE_SIZE_MB = 10;

export function OnboardingStep2() {
  const navigate = useNavigate();
  const { updateOrgProfile } = useCampaigns();
  const [files, setFiles] = useState({ estatuto: null, ata: null, comprovante: null });
  const [errors, setErrors] = useState({ estatuto: null, ata: null, comprovante: null });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);

  // Refs for hidden file inputs
  const inputRefs = {
    estatuto: useRef(null),
    ata: useRef(null),
    comprovante: useRef(null),
  };

  const validateFile = (file) => {
    if (!file) return 'Nenhum arquivo selecionado.';
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Formato não suportado. Envie PDF ou imagem (PNG, JPG, WebP).';
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `Arquivo muito grande. Máximo permitido: ${MAX_FILE_SIZE_MB}MB.`;
    }
    return null;
  };

  const handleFileChange = (field, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
      setFiles(prev => ({ ...prev, [field]: null }));
      // Reset input so the same file can be re-selected
      event.target.value = '';
      return;
    }

    setErrors(prev => ({ ...prev, [field]: null }));
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  const handleRemoveFile = (field, e) => {
    e.stopPropagation();
    setFiles(prev => ({ ...prev, [field]: null }));
    setErrors(prev => ({ ...prev, [field]: null }));
    if (inputRefs[field].current) {
      inputRefs[field].current.value = '';
    }
  };

  const triggerFileInput = (field) => {
    inputRefs[field].current?.click();
  };

  const allUploaded = files.estatuto && files.ata && files.comprovante;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Primary blocking criterion: terms must be accepted
    if (!termsAccepted) {
      setTermsError(true);
      // Scroll to terms section for visibility
      document.getElementById('terms-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Secondary check: all files must be uploaded
    if (!allUploaded) {
      return;
    }

    // All validations passed — proceed
    updateOrgProfile({ isVerified: true });
    navigate('/ong/onboarding/sucesso');
  };

  const handleTermsToggle = () => {
    const newValue = !termsAccepted;
    setTermsAccepted(newValue);
    if (newValue) {
      setTermsError(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-ice">
      <div className="h-20"></div>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald text-white flex items-center justify-center font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="hidden md:block text-sm font-bold text-emerald">Dados da ONG</span>
          </div>
          <div className="w-12 h-0.5 bg-emerald"></div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-emerald/30">2</div>
            <span className="hidden md:block text-sm font-bold text-emerald">Documentação</span>
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
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-extrabold text-graphite-dark">Documentação Jurídica</h1>
              <p className="text-graphite-light font-medium mt-1">Envie os documentos para validação da curadoria.</p>
            </div>
          </div>

          {/* Upload Fields */}
          <div className="flex flex-col gap-5">
            {[
              { key: 'estatuto', label: 'Estatuto Social', desc: 'Documento registrado em cartório.' },
              { key: 'ata', label: 'Ata da Última Assembleia', desc: 'Com eleição da diretoria vigente.' },
              { key: 'comprovante', label: 'Comprovante de Endereço', desc: 'Conta de luz, água ou similar.' },
            ].map((doc) => (
              <div key={doc.key}>
                {/* Hidden file input */}
                <input
                  ref={inputRefs[doc.key]}
                  type="file"
                  accept={ACCEPTED_EXTENSIONS}
                  className="hidden"
                  id={`file-input-${doc.key}`}
                  onChange={(e) => handleFileChange(doc.key, e)}
                />

                <div
                  className={`rounded-2xl border-2 border-dashed p-6 flex items-center gap-5 transition-all cursor-pointer group ${
                    errors[doc.key]
                      ? 'border-red-400/50 bg-red-50/50'
                      : files[doc.key]
                        ? 'border-emerald/30 bg-emerald/5'
                        : 'border-graphite/10 hover:border-emerald/20 hover:bg-ice'
                  }`}
                  onClick={() => !files[doc.key] && triggerFileInput(doc.key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); !files[doc.key] && triggerFileInput(doc.key); }}}
                  aria-label={`Upload ${doc.label}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    errors[doc.key]
                      ? 'bg-red-100 text-red-500'
                      : files[doc.key]
                        ? 'bg-emerald/10 text-emerald'
                        : 'bg-ice text-graphite-light group-hover:text-emerald'
                  }`}>
                    {errors[doc.key]
                      ? <AlertTriangle className="w-6 h-6" />
                      : files[doc.key]
                        ? <CheckCircle2 className="w-6 h-6" />
                        : <Upload className="w-6 h-6" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-graphite-dark">{doc.label}</p>
                    <p className="text-sm text-graphite-light font-medium">{doc.desc}</p>

                    <AnimatePresence mode="wait">
                      {files[doc.key] && (
                        <motion.div
                          key="file-info"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="flex items-center gap-2 mt-2"
                        >
                          <File className="w-3.5 h-3.5 text-emerald flex-shrink-0" />
                          <span className="text-xs font-bold text-emerald truncate max-w-[200px]" title={files[doc.key].name}>
                            {files[doc.key].name}
                          </span>
                          <span className="text-xs text-graphite-light font-medium">
                            ({formatFileSize(files[doc.key].size)})
                          </span>
                        </motion.div>
                      )}

                      {errors[doc.key] && (
                        <motion.p
                          key="error-msg"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-xs font-semibold text-red-500 mt-2"
                        >
                          {errors[doc.key]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {files[doc.key] ? (
                    <button
                      onClick={(e) => handleRemoveFile(doc.key, e)}
                      className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-graphite-light bg-ice px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors flex-shrink-0"
                      aria-label={`Remover ${doc.label}`}
                    >
                      <XCircle className="w-3.5 h-3.5" /> Remover
                    </button>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-wider text-graphite-light bg-ice px-3 py-1.5 rounded-lg group-hover:bg-emerald/10 group-hover:text-emerald transition-colors flex-shrink-0">
                      Enviar
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Accepted formats hint */}
          <p className="text-xs text-graphite-light/70 font-medium mt-3 ml-1">
            Formatos aceitos: PDF, PNG, JPG, WebP — Tamanho máximo: {MAX_FILE_SIZE_MB}MB
          </p>

          {/* Terms */}
          <div id="terms-section" className="mt-8">
            <div className={`flex items-start gap-3 p-4 rounded-2xl transition-all ${termsError ? 'bg-red-50/70 border border-red-200' : 'bg-transparent border border-transparent'}`}>
              <button 
                onClick={handleTermsToggle}
                className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
                  termsError && !termsAccepted
                    ? 'border-red-400 hover:border-red-500 animate-pulse'
                    : termsAccepted
                      ? 'bg-emerald border-emerald text-white'
                      : 'border-graphite/20 hover:border-emerald/50'
                }`}
                aria-required="true"
                aria-invalid={termsError && !termsAccepted}
                aria-describedby="terms-error-message"
              >
                {termsAccepted && <CheckCircle2 className="w-4 h-4" />}
              </button>
              <div className="flex-1">
                <p className="text-sm text-graphite-light font-medium">
                  Declaro que as informações são verdadeiras e aceito os <span className="text-emerald underline cursor-pointer">Termos de Uso</span> e a <span className="text-emerald underline cursor-pointer">Política de Privacidade</span> da plataforma DoaHub.
                </p>
              </div>
            </div>

            {/* Terms error message */}
            <AnimatePresence>
              {termsError && !termsAccepted && (
                <motion.div
                  id="terms-error-message"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-2 mt-3 ml-1 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="text-sm font-semibold text-red-600">
                      É obrigatório aceitar os Termos de Uso e a Política de Privacidade para prosseguir com o envio da documentação.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-ice rounded-2xl p-5 flex items-start gap-3 border border-graphite/5">
            <Shield className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-graphite-light">
              Seus documentos serão analisados pela <strong className="text-graphite-dark">curadoria interna</strong> do DoaHub em até 48h. Você receberá um e-mail quando a análise for concluída.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-10 pt-8 border-t border-graphite/5">
            <Link to="/ong/onboarding/1" className="flex items-center gap-1 font-medium text-graphite-light hover:text-emerald transition-colors">
              <ChevronLeft className="w-5 h-5" /> Etapa Anterior
            </Link>
            <PremiumButton 
              size="lg" 
              onClick={handleSubmit}
              disabled={!allUploaded}
              className={`px-10 gap-2 ${allUploaded && !termsAccepted ? 'ring-2 ring-red-300/50' : ''}`}
            >
              Enviar para Análise <ArrowRight className="w-5 h-5" />
            </PremiumButton>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

