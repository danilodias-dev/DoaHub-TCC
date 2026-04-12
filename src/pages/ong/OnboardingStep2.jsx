import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, CheckCircle2, ChevronLeft, Shield, ArrowRight, File } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PremiumButton } from '../../components/ui/PremiumButton';

export function OnboardingStep2() {
  const navigate = useNavigate();
  const [files, setFiles] = useState({ estatuto: null, ata: null, comprovante: null });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleFileSimulate = (field) => {
    setFiles(prev => ({ ...prev, [field]: `documento_${field}.pdf` }));
  };

  const allUploaded = files.estatuto && files.ata && files.comprovante;

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
              <div 
                key={doc.key}
                className={`rounded-2xl border-2 border-dashed p-6 flex items-center gap-5 transition-all cursor-pointer group ${files[doc.key] ? 'border-emerald/30 bg-emerald/5' : 'border-graphite/10 hover:border-emerald/20 hover:bg-ice'}`}
                onClick={() => handleFileSimulate(doc.key)}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${files[doc.key] ? 'bg-emerald/10 text-emerald' : 'bg-ice text-graphite-light group-hover:text-emerald'}`}>
                  {files[doc.key] ? <CheckCircle2 className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-graphite-dark">{doc.label}</p>
                  <p className="text-sm text-graphite-light font-medium">{doc.desc}</p>
                  {files[doc.key] && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald">
                      <File className="w-3 h-3" /> {files[doc.key]}
                    </motion.div>
                  )}
                </div>
                {!files[doc.key] && (
                  <span className="text-xs font-bold uppercase tracking-wider text-graphite-light bg-ice px-3 py-1.5 rounded-lg group-hover:bg-emerald/10 group-hover:text-emerald transition-colors">Enviar</span>
                )}
              </div>
            ))}
          </div>

          {/* Terms */}
          <div className="mt-8 flex items-start gap-3">
            <button 
              onClick={() => setTermsAccepted(!termsAccepted)}
              className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${termsAccepted ? 'bg-emerald border-emerald text-white' : 'border-graphite/20 hover:border-emerald/50'}`}
            >
              {termsAccepted && <CheckCircle2 className="w-4 h-4" />}
            </button>
            <p className="text-sm text-graphite-light font-medium">
              Declaro que as informações são verdadeiras e aceito os <span className="text-emerald underline cursor-pointer">Termos de Uso</span> e a <span className="text-emerald underline cursor-pointer">Política de Privacidade</span> da plataforma DoaHub.
            </p>
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
              onClick={() => navigate('/ong/dashboard')}
              disabled={!allUploaded || !termsAccepted}
              className="px-10 gap-2"
            >
              Enviar para Análise <ArrowRight className="w-5 h-5" />
            </PremiumButton>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
