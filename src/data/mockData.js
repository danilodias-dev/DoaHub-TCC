/**
 * ============================================
 * DoaHub — Dados Mock Centralizados
 * ============================================
 * Todos os dados de simulação do frontend ficam aqui.
 * Em produção, esses dados viriam de uma API.
 */
import { 
  DollarSign, 
  Megaphone, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Eye, 
  PieChart, 
  Heart, 
  Calendar, 
  Award, 
  Star, 
  Flame, 
  Shield, 
  Sparkles 
} from 'lucide-react';

// ─── Campanhas (usadas em DoadorHome, PerfilONG) ─────────────
export const MOCK_CAMPAIGNS = [
  {
    id: 301,
    title: 'Alimentação para 500 Famílias no Sertão',
    ongName: 'Instituto Esperança Viva',
    location: 'Pernambuco, PE',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop',
    raisedAmount: 42500,
    goalAmount: 50000,
    donorsCount: 312,
  },
  {
    id: 302,
    title: 'Equipando Escola Comunitária de Tecnologia',
    ongName: 'Code for Kids',
    location: 'São Paulo, SP',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop',
    raisedAmount: 12000,
    goalAmount: 30000,
    donorsCount: 89,
  },
  {
    id: 303,
    title: 'Resgate e Reabilitação de Animais Silvestres',
    ongName: 'Santuário Verde',
    location: 'Manaus, AM',
    imageUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&auto=format&fit=crop',
    raisedAmount: 5800,
    goalAmount: 15000,
    donorsCount: 45,
  },
  {
    id: 304,
    title: 'Construção de Poços Artesianos',
    ongName: 'Água para Todos',
    location: 'Bahia, BA',
    imageUrl: 'https://images.unsplash.com/photo-1541819056461-7299a997d91e?w=600&auto=format&fit=crop',
    raisedAmount: 95000,
    goalAmount: 100000,
    donorsCount: 856,
  },
];

// ─── Campanhas do Perfil ONG ─────────────────────────────────
export const MOCK_ONG_CAMPAIGNS = [
  {
    id: 305,
    title: 'Reforma Escola do Bem',
    ongName: 'Inst. Esperança',
    location: 'Recife, PE',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-375597792779?w=800&auto=format&fit=crop',
    raisedAmount: 13500,
    goalAmount: 30000,
    donorsCount: 312,
  },
  {
    id: 306,
    title: 'Kit Escolar 2024',
    ongName: 'Inst. Esperança',
    location: 'Recife, PE',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop',
    raisedAmount: 22000,
    goalAmount: 20000,
    donorsCount: 210,
  },
];

// ─── Histórico de Doações ────────────────────────────────────
export const MOCK_DONATIONS = [
  { id: 101, campaignId: 301, campaign: 'Alimentação Sertão PE', ong: 'Inst. Esperança Viva', amount: 200, date: '02/04/2026', status: 'Confirmada' },
  { id: 102, campaignId: 305, campaign: 'Reforma Escola Comunitária', ong: 'ONG Educar+', amount: 150, date: '28/03/2026', status: 'Confirmada' },
  { id: 103, campaignId: 306, campaign: 'Kit Escolar 2026', ong: 'Inst. Esperança Viva', amount: 100, date: '15/03/2026', status: 'Confirmada' },
  { id: 104, campaignId: 304, campaign: 'Água Potável Amazônia', ong: 'Planeta Azul', amount: 500, date: '01/03/2026', status: 'Confirmada' },
  { id: 105, campaignId: 301, campaign: 'Alimentação Sertão PE', ong: 'Inst. Esperança Viva', amount: 100, date: '14/02/2026', status: 'Confirmada' },
];

// ─── Medalhas do Doador ──────────────────────────────────────
export const MOCK_BADGES = [
  { title: 'Primeiro Impacto', desc: 'Fez sua primeira doação', icon: Star, earned: true },
  { title: 'Doador Fiel', desc: '3 meses consecutivos', icon: Flame, earned: true },
  { title: 'Guardião', desc: 'Doou para 5+ causas', icon: Shield, earned: true },
  { title: 'Lenda', desc: 'Doou R$ 5.000+', icon: Sparkles, earned: false },
];

// ─── Registro de Auditoria (Transparência) ───────────────────
export const MOCK_AUDIT_LOG = [
  { ong: 'Instituto Esperança Viva', campaign: 'Alimentação Sertão PE', amount: 'R$ 42.500', date: 'Abr 2026', status: 'Auditado' },
  { ong: 'ONG Educar+', campaign: 'Reforma Escola Comunitária', amount: 'R$ 15.000', date: 'Mar 2026', status: 'Auditado' },
  { ong: 'Planeta Azul', campaign: 'Água Potável Amazônia', amount: 'R$ 78.200', date: 'Mar 2026', status: 'Auditado' },
  { ong: 'Casa Acolher', campaign: 'Abrigo para Idosos', amount: 'R$ 31.000', date: 'Fev 2026', status: 'Auditado' },
  { ong: 'Inst. Esperança Viva', campaign: 'Kit Escolar 2026', amount: 'R$ 22.000', date: 'Fev 2026', status: 'Auditado' },
];

// ─── Stats do Dashboard ONG ──────────────────────────────────
export const MOCK_DASHBOARD_STATS = [
  { title: 'Total Arrecadado', value: 'R$ 124.500', trend: '+12%', icon: DollarSign, color: 'emerald' },
  { title: 'Campanhas Ativas', value: '8', trend: '2 novas', icon: Megaphone, color: 'blue' },
  { title: 'Doadores Ativos', value: '1.240', trend: '+5%', icon: Users, color: 'purple' },
  { title: 'Impacto Estimado', value: '4.5k', trend: 'Vidas', icon: TrendingUp, color: 'orange' },
];

export const MOCK_DASHBOARD_CAMPAIGNS = [
  { id: 301, title: 'Alimentação Sertão PE', status: 'Ativa', raised: 42500, goal: 50000, donors: 312 },
  { id: 305, title: 'Reforma Escola do Bem', status: 'Ativa', raised: 15000, goal: 30000, donors: 145 },
  { id: 306, title: 'Kit Escolar 2024', status: 'Finalizada', raised: 22000, goal: 20000, donors: 210 },
];

// ─── Transparência e Estatísticas Globais ────────────────────
export const MOCK_GLOBAL_STATS = [
  { label: 'Total Repassado', value: 'R$ 2.4M', icon: DollarSign, desc: 'Diretamente às ONGs' },
  { label: 'ONGs Certificadas', value: '47', icon: ShieldCheck, desc: 'Curadoria aprovada' },
  { label: 'Doadores Ativos', value: '12.800', icon: Users, desc: 'Em todo o Brasil' },
  { label: 'Taxa Administrativa', value: '0%', icon: PieChart, desc: 'Sem custos ocultos' },
];

export const MOCK_PILLARS = [
  { title: 'Curadoria Rigorosa', desc: 'Cada ONG passa por um processo de 48h de verificação de documentos, CNPJ e histórico antes de ser aprovada na plataforma.', icon: ShieldCheck },
  { title: 'Repasse Direto', desc: '100% do valor doado é transferido diretamente para a conta jurídica da instituição. O DoaHub opera com taxa zero.', icon: DollarSign },
  { title: 'Rastreabilidade Total', desc: 'Cada transação gera um comprovante PIX verificável. ONGs publicam relatórios de impacto mensais abertos ao público.', icon: Eye },
  { title: 'Auditorias Públicas', desc: 'Relatórios trimestrais auditados por parceiros independentes. Todos os dados são abertos e acessíveis nesta página.', icon: PieChart },
];

// ─── Estatísticas de Impacto (Doador) ────────────────────────
export const MOCK_IMPACT_STATS = [
  { label: 'Total Doado', value: 'R$ 2.350', icon: TrendingUp },
  { label: 'Causas Apoiadas', value: '7', icon: Heart },
  { label: 'Meses Ativo', value: '5', icon: Calendar },
];
