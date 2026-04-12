import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Share2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Obrigado() {
  const pageVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, type: "spring" }}
      className="min-h-screen bg-ice flex items-center justify-center p-6 relative overflow-hidden"
    >
      
      {/* Celebration Decors */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 blur-3xl rounded-full"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-[2rem] p-10 flex flex-col items-center text-center shadow-2xl relative z-10 border border-white"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
          transition={{ type: "spring", delay: 0.2, duration: 0.8 }}
          className="w-24 h-24 bg-emerald/10 rounded-full flex items-center justify-center text-emerald mb-6"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>

        <h1 className="text-4xl font-display font-extrabold text-graphite-dark mb-4 tracking-tight">Doação Recebida!</h1>
        
        <p className="text-lg text-graphite-light mb-8">
          Muito obrigado pela sua generosidade. Você acabou de impactar a causa <strong className="text-graphite-dark">Alimentação para 500 Famílias no Sertão</strong>.
        </p>

        <div className="w-full bg-ice rounded-2xl p-6 mb-8 flex flex-col gap-2">
           <div className="flex justify-between items-center text-sm font-medium mb-2">
             <span className="text-graphite-light">Comprovante enviado para</span>
             <span className="text-graphite-dark">seu@email.com</span>
           </div>
           <hr className="border-graphite/10" />
           <div className="flex justify-between items-center text-sm font-medium mt-2">
             <span className="text-graphite-light">ID da Transação</span>
             <span className="text-graphite-dark flex items-center gap-1 font-mono uppercase text-xs">#PIX-9A8B7C6</span>
           </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Link to="/doador" className="w-full px-6 py-4 bg-emerald text-white rounded-full font-bold shadow-lg shadow-emerald/30 hover:bg-emerald-light transition-colors flex items-center justify-center gap-2">
            Ver Outras Campanhas <ChevronRight className="w-5 h-5"/>
          </Link>
          <button className="w-full px-6 py-4 bg-graphite/5 text-graphite-dark rounded-full font-bold hover:bg-graphite/10 transition-colors flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5"/> Compartilhar seu Impacto
          </button>
        </div>

      </motion.div>

      <motion.div
         animate={{ y: [0, -10, 0] }}
         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
         className="absolute top-12 right-12 text-emerald/30 hidden md:block"
      >
        <Sparkles className="w-12 h-12" />
      </motion.div>
    </motion.div>
  );
}
