/**
 * ============================================================================
 * DoaHub — Catálogo de Fundos Públicos Governamentais & Códigos DARF
 * ============================================================================
 * Mapeamento oficial de Fundos da Criança e do Adolescente (ECA) e do Idoso
 * com CNPJs reais e parametrização dos Códigos de Receita DARF da Receita Federal.
 * Em conformidade com:
 *  - Lei Federal nº 8.069/1990 (ECA, art. 260)
 *  - Lei Federal nº 12.213/2010 (Fundo do Idoso)
 *  - Instruções Normativas RFB (Códigos 3351, 9090, 6023)
 */

export const FISCAL_REGIONS = [
  {
    id: 'sp-capital',
    name: 'São Paulo - SP (Capital)',
    state: 'SP',
    city: 'São Paulo',
    ecaFund: {
      name: 'Fundo Municipal dos Direitos da Criança e do Adolescente de São Paulo (FUMCAD SP)',
      cnpj: '14.248.887/0001-08',
      bank: 'Banco do Brasil',
      agency: '1897-X',
      account: '8669-X',
      managingCouncil: 'CMDCA - São Paulo',
      esfera: 'Municipal'
    },
    idosoFund: {
      name: 'Fundo Municipal do Idoso de São Paulo (FMID SP)',
      cnpj: '19.789.263/0001-85',
      bank: 'Banco do Brasil',
      agency: '1897-X',
      account: '19000-4',
      managingCouncil: 'CMI - São Paulo',
      esfera: 'Municipal'
    }
  },
  {
    id: 'recife',
    name: 'Recife - PE',
    state: 'PE',
    city: 'Recife',
    ecaFund: {
      name: 'Fundo Municipal da Criança e do Adolescente de Recife',
      cnpj: '14.502.810/0001-38',
      bank: 'Caixa Econômica Federal',
      agency: '0045',
      account: '3410-9',
      managingCouncil: 'COMDICA - Recife',
      esfera: 'Municipal'
    },
    idosoFund: {
      name: 'Fundo Municipal da Pessoa Idosa de Recife',
      cnpj: '20.103.450/0001-92',
      bank: 'Caixa Econômica Federal',
      agency: '0045',
      account: '4500-1',
      managingCouncil: 'COMDIR - Recife',
      esfera: 'Municipal'
    }
  },
  {
    id: 'rj-capital',
    name: 'Rio de Janeiro - RJ',
    state: 'RJ',
    city: 'Rio de Janeiro',
    ecaFund: {
      name: 'Fundo Municipal dos Direitos da Criança e do Adolescente do Rio de Janeiro',
      cnpj: '14.412.356/0001-05',
      bank: 'Banco do Brasil',
      agency: '2234-9',
      account: '15400-2',
      managingCouncil: 'CMDCA - Rio de Janeiro',
      esfera: 'Municipal'
    },
    idosoFund: {
      name: 'Fundo Municipal do Idoso do Rio de Janeiro',
      cnpj: '19.865.123/0001-44',
      bank: 'Banco do Brasil',
      agency: '2234-9',
      account: '18750-6',
      managingCouncil: 'COMDEPI - Rio de Janeiro',
      esfera: 'Municipal'
    }
  },
  {
    id: 'nacional',
    name: 'Âmbito Nacional (Fundos Federais)',
    state: 'BR',
    city: 'Brasília',
    ecaFund: {
      name: 'Fundo Nacional para a Criança e o Adolescente (FNCA)',
      cnpj: '03.719.533/0001-90',
      bank: 'Banco do Brasil',
      agency: '1607-1',
      account: '170500-8',
      managingCouncil: 'CONANDA - Conselho Nacional',
      esfera: 'Nacional'
    },
    idosoFund: {
      name: 'Fundo Nacional do Idoso (FNI)',
      cnpj: '35.787.971/0001-32',
      bank: 'Banco do Brasil',
      agency: '1607-1',
      account: '170600-4',
      managingCouncil: 'CNDI - Conselho Nacional dos Direitos da Pessoa Idosa',
      esfera: 'Nacional'
    }
  }
];

export const DARF_CODES = {
  ECA: {
    DAA: {
      code: '3351',
      label: 'Destinação Direta na Declaração (IRPF)',
      programSection: 'Doações Diretamente na Declaração - ECA',
      law: 'Art. 260 da Lei nº 8.069/90 (ECA)'
    },
    ANO_CALENDARIO: {
      code: '3351',
      label: 'Doações aos Fundos dos Direitos da Criança e do Adolescente',
      programSection: 'Pagamentos Efetuados - Código 43',
      law: 'Art. 260 da Lei nº 8.069/90 (ECA)'
    }
  },
  IDOSO: {
    DAA: {
      code: '9090',
      label: 'Destinação Direta na Declaração (IRPF)',
      programSection: 'Doações Diretamente na Declaração - Idoso',
      law: 'Lei nº 12.213/2010'
    },
    ANO_CALENDARIO: {
      code: '6023',
      label: 'Doações aos Fundos dos Direitos do Idoso',
      programSection: 'Pagamentos Efetuados - Código 44',
      law: 'Lei nº 12.213/2010'
    }
  }
};
