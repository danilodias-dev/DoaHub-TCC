export function downloadDonationReceipt(donation, orgProfile) {
  // Gera conteúdo do recibo
  const receiptContent = `
============================================================
                  RECIBO DE DOAÇÃO
============================================================

Organização: ${orgProfile.name}
CNPJ: ${orgProfile.cnpj}
Endereço: ${orgProfile.address}
Contato: ${orgProfile.email} | ${orgProfile.phone}

------------------------------------------------------------
DADOS DA DOAÇÃO
------------------------------------------------------------
Doador: ${donation.name}
Valor: ${donation.amount}
Data: ${donation.time} (aproximada/baseada no feed)
Ação: ${donation.action}

------------------------------------------------------------
DECLARAÇÃO
------------------------------------------------------------
Declaramos para os devidos fins que recebemos do doador 
acima qualificado a quantia supra discriminada, a título 
de doação, a qual será integralmente aplicada na manutenção 
das atividades desta instituição.

Recibo gerado automaticamente pela plataforma DoaHub.
${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
============================================================
`;

  // Cria um blob com o conteúdo do recibo
  const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  // Formata o nome do arquivo
  const fileName = `Recibo_Doacao_${donation.name.replace(/\s+/g, '_')}_${new Date().getTime()}.txt`;

  // Cria um elemento <a> invisível para forçar o download
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();

  // Limpeza
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
