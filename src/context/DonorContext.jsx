import { createContext, useContext, useState, useMemo } from 'react';

/**
 * ============================================
 * DoaHub — Donor Context (Mock Relacional)
 * ============================================
 * Gerencia os dados do painel do doador (Meu Painel),
 * incluindo doações (guias fiscais), métricas financeiras
 * e relatórios de prestação de contas (Impact Reports).
 * 
 * Estruturado com chave relacional (impactReportId) simulando
 * um JOIN no Supabase entre as tabelas `donations` e `ngo_impact_reports`.
 */

const MOCK_DONATIONS = [
  {
    id: 'don-001',
    date: '2026-03-15',
    ngo: 'Instituto Esperança',
    fund: 'Fundo Municipal da Criança e do Adolescente (FMDCA)',
    amount: 1510,
    status: 'Consolidado',
    receiptUrl: '/mock/receipt-1.pdf',
    impactReportId: 'rep-101', // Relational foreign key
  },
  {
    id: 'don-002',
    date: '2026-04-10',
    ngo: 'EcoAção',
    fund: 'Fundo Municipal do Meio Ambiente',
    amount: 350,
    status: 'Pendente',
    receiptUrl: null,
    impactReportId: null, // Pending donations don't have impact reports yet
  },
  {
    id: 'don-003',
    date: '2025-12-20',
    ngo: 'Educa +',
    fund: 'Fundo Municipal da Criança e do Adolescente (FMDCA)',
    amount: 1010,
    status: 'Consolidado',
    receiptUrl: '/mock/receipt-3.pdf',
    impactReportId: 'rep-102',
  },
];

const MOCK_IMPACT_REPORTS = [
  {
    id: 'rep-101',
    ngoName: 'Instituto Esperança',
    title: 'Kit Material Escolar 2026',
    date: '2026-05-10',
    metrics: [
      { label: 'Crianças Atendidas', value: '150' },
      { label: 'Kits Entregues', value: '150' }
    ],
    description: 'Com a sua destinação fiscal, conseguimos adquirir e distribuir kits de material escolar completos para 150 crianças em situação de vulnerabilidade na comunidade, garantindo o início do ano letivo com dignidade.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'rep-102',
    ngoName: 'Educa +',
    title: 'Reforma da Biblioteca Comunitária',
    date: '2026-01-15',
    metrics: [
      { label: 'Livros Adquiridos', value: '300' },
      { label: 'Jovens Beneficiados', value: '120/mês' }
    ],
    description: 'Sua doação ajudou diretamente na reforma estrutural e na compra de novos acervos para a biblioteca comunitária, criando um ambiente seguro e inspirador para os jovens da região.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop',
  }
];

const DonorContext = createContext(null);

export function DonorProvider({ children }) {
  const [donations] = useState(MOCK_DONATIONS);
  const [impactReports] = useState(MOCK_IMPACT_REPORTS);

  const getImpactReport = (id) => impactReports.find(r => r.id === id) || null;

  // Derived Financial Metrics
  const metrics = useMemo(() => {
    // Current year filtering (simulated as 2026)
    const currentYearDonations = donations.filter(d => d.date.startsWith('2026'));
    
    const totalDestined = currentYearDonations.reduce((acc, curr) => acc + curr.amount, 0);
    const taxCeiling = 2100; // Simulated user ceiling limit based on income
    
    const consolidated = currentYearDonations.filter(d => d.status === 'Consolidado').length;
    const pending = currentYearDonations.filter(d => d.status === 'Pendente').length;
    const totalGuides = currentYearDonations.length;

    return {
      totalDestined,
      taxCeiling,
      totalGuides,
      consolidated,
      pending,
      deadline: '30 de Abril de 2027', // Typical deadline for 2026 base year
    };
  }, [donations]);

  return (
    <DonorContext.Provider value={{ donations, metrics, getImpactReport }}>
      {children}
    </DonorContext.Provider>
  );
}

export function useDonor() {
  const context = useContext(DonorContext);
  if (!context) throw new Error('useDonor deve ser usado dentro de um DonorProvider');
  return context;
}
