
export class WhatsAppService {
  private getLastThreeDigitsFromIp(ip: string | null): string {
    if (!ip) return '000';
    
    // Extrair apenas os números do IP
    const numbers = ip.replace(/\./g, '');
    
    // Pegar os últimos 3 dígitos
    const lastThree = numbers.slice(-3);
    
    // Se tiver menos de 3 dígitos, preencher com zeros à esquerda
    return lastThree.padStart(3, '0');
  }

  public formatWhatsAppMessage(clientCode: number | null, ip: string | null, template?: string): string {
    const defaultTemplate = 'Olá! Tenho interesse. Sou o cliente XXX me manda as promoções por gentileza!! (obrigatório o envio desta mensagem para ser atendido)';
    const messageTemplate = template || defaultTemplate;

    if (clientCode && ip) {
      const lastThreeIpDigits = this.getLastThreeDigitsFromIp(ip);
      const formattedClientCode = clientCode.toString().padStart(3, '0');
      const combinedCode = lastThreeIpDigits + formattedClientCode;
      
      return messageTemplate.replace(/XXX/g, combinedCode);
    }

    if (clientCode) {
      const formattedCode = clientCode.toString().padStart(3, '0');
      return messageTemplate.replace(/XXX/g, formattedCode);
    }

    return messageTemplate;
  }

  public generateWhatsAppUrl(phone: string, message: string): string {
    return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
  }
}

export default new WhatsAppService();
