import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Heart, ShieldCheck, CreditCard, Users, MessageCircle, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { motionTokens } from '../../utils/motion';

const faqData = [
  {
    category: "Sobre as Doações",
    icon: Heart,
    questions: [
      { q: "Como garantir que minha doação chegou à ONG?", a: "Todas as doações no DoaHub são rastreáveis. Assim que a ONG recebe o repasse, você recebe uma notificação e o status é atualizado no seu Histórico do Doador, com o recibo digital disponível para download." },
      { q: "Quais são as formas de pagamento aceitas?", a: "Atualmente aceitamos PIX (confirmação imediata), Cartão de Crédito (parcelamento disponível para doações acima de R$ 100) e Boleto Bancário." },
      { q: "Posso cancelar uma doação recorrente?", a: "Sim, a qualquer momento. Basta acessar 'Meu Histórico' > 'Assinaturas' e clicar em cancelar. Não há taxas de cancelamento." }
    ]
  },
  {
    category: "Segurança e Taxas",
    icon: ShieldCheck,
    questions: [
      { q: "O DoaHub cobra taxas das ONGs?", a: "O DoaHub é uma plataforma social. Cobramos uma taxa administrativa mínima de 5% para cobrir custos de servidor e processamento de pagamentos. 95% do valor líquido vai direto para o projeto." },
      { q: "Meus dados estão seguros?", a: "Sim. Utilizamos criptografia de nível bancário (SSL) e não armazenamos dados sensíveis de cartões de crédito em nossos servidores, utilizando gateways de pagamento certificados PCI-DSS." }
    ]
  },
  {
    category: "Para ONGs",
    icon: Users,
    questions: [
      { q: "Como cadastrar minha ONG?", a: "Clique em 'Cadastrar ONG' no menu superior. Você precisará do CNPJ ativo, estatuto social e documentos dos representantes legais para nossa auditoria de compliance." },
      { q: "Quanto tempo leva a aprovação?", a: "Nossa equipe de auditoria leva em média 3 a 5 dias úteis para validar todos os documentos e liberar a criação da primeira campanha." }
    ]
  }
];

function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-graphite/5 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-emerald' : 'text-graphite-dark group-hover:text-emerald'}`}>{question}</span>
        <ChevronDown className={`w-5 h-5 text-graphite-light transition-transform duration-default ${isOpen ? 'rotate-180 text-emerald' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ ...motionTokens.default, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-graphite-light font-medium leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Ajuda() {
  const [activeTab, setActiveTab] = useState(0);

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={motionTokens.page}
      className="flex flex-col w-full"
    >

      {/* Search Hero */}
      <section className="bg-emerald pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-8 relative z-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight">Como podemos ajudar?</h1>
            <p className="text-white/80 text-lg font-medium">Encontre respostas rápidas para suas dúvidas sobre doações, segurança e gestão.</p>
          </div>

          <div className="relative max-w-2xl mx-auto w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-graphite-light" />
            <input
              type="text"
              placeholder="Ex: Como baixar meu recibo, Taxas da plataforma..."
              className="w-full py-5 pl-16 pr-6 rounded-[2rem] bg-white shadow-2xl shadow-emerald-dark/20 text-graphite-dark font-medium focus:ring-4 focus:ring-white/20 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Category Icons */}
      <section className="py-12 bg-ice px-6 border-b border-graphite/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {faqData.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`p-6 rounded-[2rem] border transition-all flex flex-col items-center gap-4 group ${activeTab === idx ? 'bg-white border-emerald shadow-lg' : 'bg-white/50 border-transparent hover:bg-white hover:shadow-md'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === idx ? 'bg-emerald text-white' : 'bg-ice text-graphite-light group-hover:bg-emerald/5 group-hover:text-emerald'}`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-bold tracking-tight ${activeTab === idx ? 'text-graphite-dark' : 'text-graphite-light'}`}>{cat.category}</span>
            </button>
          ))}
          <div className="p-6 rounded-[2rem] bg-white border border-transparent shadow-sm flex flex-col items-center gap-4 opacity-50 cursor-not-allowed hidden md:flex">
            <div className="w-12 h-12 rounded-2xl bg-ice text-graphite-light flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold tracking-tight text-graphite-light">Financeiro</span>
          </div>
        </div>
      </section>

      {/* Accordion List */}
      <section className="py-20 px-6 bg-white min-h-[500px]">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-emerald rounded-full"></div>
            <h2 className="text-2xl font-display font-bold text-graphite-dark">{faqData[activeTab].category}</h2>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-graphite/5 px-8 md:px-10 shadow-sm">
            {faqData[activeTab].questions.map((item, idx) => (
              <AccordionItem key={idx} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-24 bg-ice px-6">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-graphite-dark p-10 md:p-16 flex flex-col items-center text-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <MessageCircle className="w-40 h-40 text-emerald" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald flex items-center justify-center shadow-lg shadow-emerald/30 mb-2">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white">Ainda não encontrou o que procura?</h3>
            <p className="text-white/60 text-lg max-w-xl">Nossa equipe está disponível 24/7 para ajudar você. Resposta média em menos de 1 hora.</p>
          </div>
          <div className="relative z-10 flex flex-wrap justify-center gap-4">

            {/* O NOVO BOTÃO FOI INSERIDO AQUI */}
            <button
              type="button"
              onClick={() => {
                console.log("Triggering Hubi...");
                if (typeof window !== 'undefined' && window.n8nChat && typeof window.n8nChat.toggle === 'function') {
                    window.n8nChat.toggle();
                } else {
                    alert("A Hubi está conectando ao servidor. Aguarde um instante ou recarregue a página (Ctrl + Shift + R).");
                }
              }}
              className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-md active:scale-95"
            >
              Abrir Chat ao Vivo
            </button>

            <PremiumButton variant="glass" size="lg" className="border-white/10 hover:bg-white/5 text-white">Enviar E-mail</PremiumButton>
          </div>
        </div>
      </section>

    </motion.div>
  );
}