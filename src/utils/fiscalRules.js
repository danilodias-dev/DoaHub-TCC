/**
 * Utilitários e regras de cálculo fiscal para doações com incentivo fiscal (IRPF / IRPJ).
 * Em conformidade com a Lei Federal nº 8.069/1990 (ECA) e Lei nº 12.213/2010 (Fundo do Idoso).
 */

export function formatBRL(value) {
  if (!value || isNaN(value)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function parseBRL(str) {
  if (!str) return 0;
  const cleaned = String(str).replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

/**
 * Calcula o potencial de dedução no IRPF com base no imposto devido e tipo de declaração.
 */
export function calculateFiscalIncentivePF({ impostoDevido = 0, isCompleta = true, timingMode = 'daa' }) {
  if (!isCompleta) {
    return {
      maxDeductionTotal: 0,
      maxEca: 0,
      maxIdoso: 0,
      eligible: false,
      reason: 'Apenas a declaração por Deduções Legais (Modelo Completo) permite destinação de IR.'
    };
  }

  // Na declaração de ajuste anual (DAA), limite de 3% para ECA e 3% para Idoso (total 6%)
  // Durante o ano-calendário, limite de até 6% global somado a outros incentivos
  const maxPercentPerFund = timingMode === 'daa' ? 0.03 : 0.06;
  const maxTotalPercent = 0.06;

  const maxTotal = impostoDevido * maxTotalPercent;
  const maxPerFund = impostoDevido * maxPercentPerFund;

  return {
    maxDeductionTotal: maxTotal,
    maxEca: maxPerFund,
    maxIdoso: maxPerFund,
    eligible: true
  };
}
