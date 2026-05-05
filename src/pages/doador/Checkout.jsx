import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronLeft, Lock, QrCode, Copy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PremiumButton } from '../../components/ui/PremiumButton';

export function Checkout() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [isCopied, setIsCopied] = useState(false);
  const [step, setStep] = useState(1); // 1 = Escolher Valor, 2 = Gerar Pix

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
       // Simulate completing the real flow after "paying"
       navigate('/obrigado');
    }, 2000);
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-ice pt-24 pb-20 px-6"
    >
      
      {/* Checkout Navbar */}
      <header className="bg-white border-b border-graphite/5 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 font-medium text-graphite-light hover:text-emerald transition-colors">
            <ChevronLeft className="w-5 h-5"/> Voltar
          </button>
          
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald"/>
            <span className="font-bold text-graphite text-xs uppercase tracking-wider">DoaHub Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Transparency Overview */}
        <div className="flex flex-col gap-8">
           
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-3">
              <h1 className="font-display font-bold text-3xl text-graphite-dark leading-tight">Escolha como impactar <span className="text-emerald">vidas hoje.</span></h1>
              <p className="text-lg text-graphite-light font-medium">Sua doação será direcionada para <strong className="text-graphite">Alimentação para 500 Famílias no Sertão</strong>.</p>
           </motion.div>

           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-6 border border-emerald/10 shadow-lg shadow-emerald/5 flex flex-col gap-4 relative overflow-hidden">
             
             {/* Decor */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/5 rounded-full -translate-y-16 translate-x-16 pointer-events-none"></div>

             <h3 className="font-bold text-graphite-dark flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald" /> Doação Transparente</h3>
             <ul className="flex flex-col gap-3 text-sm font-medium text-graphite-light">
               <li className="flex gap-3">
                 <div className="w-5 h-5 rounded-full bg-ice flex items-center justify-center text-graphite-dark flex-shrink-0 mt-0.5">1</div>
                 <span>O dinheiro vai <strong>diretamente para a conta jurídica</strong> do Instituto Esperança.</span>
               </li>
               <li className="flex gap-3">
                 <div className="w-5 h-5 rounded-full bg-ice flex items-center justify-center text-graphite-dark flex-shrink-0 mt-0.5">2</div>
                 <span>0% de taxa administrativa por parte do DoaHub. Tudo é repassado.</span>
               </li>
               <li className="flex gap-3">
                 <div className="w-5 h-5 rounded-full bg-ice flex items-center justify-center text-graphite-dark flex-shrink-0 mt-0.5">3</div>
                 <span>A Nota Fiscal/Comprovante de Auditoria é enviada para o seu email.</span>
               </li>
             </ul>
           </motion.div>
        </div>

        {/* Right Side: Interaction Form */}
        <div className="flex flex-col gap-6">
           
           {/* Step 1: Input Value */}
           {step === 1 && (
             <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-8 border border-graphite/5 shadow-xl shadow-graphite/5 flex flex-col gap-6">
                <div className="flex flex-col gap-1 items-center">
                   <span className="text-sm font-bold text-graphite-light uppercase tracking-widest">Valor da Doação</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                   {[50, 100, 200].map((val) => (
                      <button 
                         key={val}
                         onClick={() => setSelectedAmount(val)}
                         className={`py-4 rounded-xl font-bold text-lg transition-all ${selectedAmount === val ? 'bg-emerald text-white shadow-lg shadow-emerald/30 scale-[1.02] ring-2 ring-emerald ring-offset-2' : 'bg-ice text-graphite hover:bg-ice-dark'}`}
                      >
                         R$ {val}
                      </button>
                   ))}
                </div>

                <div className="relative mt-2">
                   <div className="absolute left-6 top-1/2 -translate-y-1/2 font-display text-2xl font-bold text-graphite-light">R$</div>
                   <input 
                      type="number"
                      value={selectedAmount}
                      onChange={(e) => setSelectedAmount(Number(e.target.value))}
                      className="w-full text-center text-5xl font-display font-extrabold text-graphite-dark bg-ice rounded-2xl py-6 hover:bg-ice-dark transition-colors focus:outline-none focus:ring-4 focus:ring-emerald/20"
                   />
                </div>

                <PremiumButton 
                   size="lg" 
                   onClick={() => setStep(2)}
                   disabled={!selectedAmount || selectedAmount <= 0}
                   className="w-full mt-4 h-16 text-lg"
                >
                   Finalizar via PIX
                </PremiumButton>

             </motion.div>
           )}

           {/* Step 2: PIX Checkout Sim */}
           {step === 2 && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-graphite-dark text-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald/20 to-transparent pointer-events-none"></div>

                <h3 className="font-display font-bold text-2xl z-10">Concluir Doação</h3>
                <p className="text-graphite-light font-medium text-center z-10 px-4">Abra o app do seu banco e escaneie o código, ou use o Pix Copia e Cola.</p>

                <div className="bg-white p-4 rounded-2xl z-10 mt-2">
                   <QrCode className="w-48 h-48 text-graphite-dark" />
                </div>

                <div className="flex flex-col items-center gap-1 z-10 mt-2">
                   <span className="text-graphite-light text-sm font-medium">Valor total a pagar:</span>
                   <span className="text-3xl font-display font-bold text-emerald">R$ {selectedAmount.toLocaleString('pt-BR')}</span>
                </div>

                <button 
                  onClick={handleCopy}
                  className={`relative overflow-hidden w-full h-14 mt-4 rounded-full flex items-center justify-center font-bold text-lg transition-all z-10 ${isCopied ? 'bg-emerald text-white' : 'bg-ice text-graphite hover:bg-white'}`}
                >
                   {isCopied ? (
                     <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                       <ShieldCheck className="w-5 h-5"/> Simulando Sucesso...
                     </motion.div>
                   ) : (
                     <div className="flex items-center gap-2">
                       <Copy className="w-5 h-5"/> Copiar Código PIX
                     </div>
                   )}
                </button>

             </motion.div>
           )}

           <p className="text-xs font-medium text-graphite-light/70 text-center flex items-center justify-center gap-1.5 mt-2">
             <Lock className="w-3.5 h-3.5" /> Ambiente Seguro e Criptografado
           </p>
        </div>

      </div>
    </motion.div>
  );
}
