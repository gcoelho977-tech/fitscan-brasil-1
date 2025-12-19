
// Serviço simplificado para usar Stripe Payment Links.
// Não requer ativação de "Client-only integration" no painel do Stripe.

export const PAYMENT_LINKS = {
  // Links reais fornecidos
  MONTHLY: 'https://buy.stripe.com/dRm9AT8tGe5U2ywfBP8Zq00',   
  QUARTERLY: 'https://buy.stripe.com/eVqcN56ly8LAehedtH8Zq01', 
  ANNUAL: 'https://buy.stripe.com/bJe4gz25i1j8b52exL8Zq02'      
};

export const handleCheckout = (paymentLink: string) => {
  // Redirecionamento síncrono e direto para máxima velocidade
  if (paymentLink) {
    window.location.href = paymentLink;
  } else {
    console.error("Link de pagamento inválido");
  }
};

// Função mantida apenas para compatibilidade de importação, se necessário
export const getStripe = () => {
  return null;
};