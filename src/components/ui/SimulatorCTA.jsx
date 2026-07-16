import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Sparkles, BadgePercent, Landmark } from 'lucide-react';

const STATS = [
  { icon: BadgePercent, label: 'PF pode destinar', value: 'até 6%' },
  { icon: Landmark,     label: 'PJ no Lucro Real', value: 'até 2%' },
  { icon: Calculator,  label: 'Cálculo 100%',      value: 'grátis' },
];

export function SimulatorCTA() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="px-4 md:px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-[2rem] overflow-hidden bg-[#1a4fe0] shadow-2xl shadow-blue-900/30"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl" />
            {/* Grid dots */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 p-8 md:p-12 lg:p-14">

            {/* Left: Copy */}
            <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase self-center lg:self-start"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                Simulador Gratuito
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.45 }}
                className="flex flex-col gap-3"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                  Descubra o seu potencial<br className="hidden md:block" /> de{' '}
                  <span className="text-yellow-300">impacto social.</span>
                </h2>
                <p className="text-white/70 text-base md:text-lg font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Você pode destinar parte do seu Imposto de Renda a ONGs verificadas{' '}
                  <strong className="text-white">sem pagar um centavo a mais</strong>. É um
                  direito legal que poucos brasileiros conhecem.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                <button
                  id="simulator-cta-btn"
                  type="button"
                  onClick={() => navigate('/simulador-ir')}
                  className="group inline-flex items-center gap-3 bg-white text-blue-700 font-black text-base px-8 py-4 rounded-2xl shadow-xl hover:bg-yellow-300 hover:text-blue-900 transition-all duration-300 active:scale-95"
                >
                  <Calculator className="w-5 h-5" />
                  Simular meu IR agora
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>

            {/* Right: Stats Bento */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto"
            >
              {STATS.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.35 }}
                  className="flex-1 lg:flex-none flex flex-col items-center lg:flex-row lg:items-center gap-3 bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl p-4 lg:px-5 lg:py-4 lg:min-w-[200px]"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-yellow-300" />
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="font-display font-extrabold text-white text-lg leading-none">
                      {value}
                    </div>
                    <div className="text-white/60 text-xs mt-0.5">{label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
