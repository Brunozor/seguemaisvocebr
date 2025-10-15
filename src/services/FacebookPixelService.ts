
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export class FacebookPixelService {
  private static pixelId: string = '567728368972201';
  private static isInitialized: boolean = false;

  /**
   * Inicializa o Facebook Pixel
   */
  public static init(): void {
    if (typeof window === 'undefined') return;

    if (!window.fbq) {
      // Carrega o Facebook Pixel se não estiver disponível
      this.loadFacebookPixel();
    }

    if (!this.isInitialized) {
      window.fbq('init', this.pixelId);
      this.isInitialized = true;
      console.log(`Facebook Pixel inicializado: ${this.pixelId}`);
    }
  }

  /**
   * Carrega o script do Facebook Pixel
   */
  private static loadFacebookPixel(): void {
    // Função fbq básica
    window.fbq = function() {
      // @ts-ignore
      window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
    };
    
    // @ts-ignore
    if (!window._fbq) window._fbq = window.fbq;
    // @ts-ignore
    window.fbq.push = window.fbq;
    // @ts-ignore
    window.fbq.loaded = true;
    // @ts-ignore
    window.fbq.version = '2.0';
    // @ts-ignore
    window.fbq.queue = [];

    // Carrega o script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }

  /**
   * Verifica se o Facebook Pixel está disponível
   */
  public static isAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.fbq === 'function';
  }

  /**
   * Gera um event_id único para desduplicação
   */
  public static generateEventId(): string {
    return 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Gera ou obtém o fbp (Facebook Browser ID)
   */
  public static getOrGenerateFbp(): string {
    const existingFbp = this.getCookie('_fbp');
    
    if (existingFbp) {
      return existingFbp;
    }

    // Gera um novo fbp seguindo o padrão da Meta: fb.1.timestamp.randomNumber
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 2147483647);
    const fbp = `fb.1.${timestamp}.${randomNumber}`;
    
    // Define o cookie com expiração de 90 dias
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (90 * 24 * 60 * 60 * 1000));
    
    document.cookie = `_fbp=${fbp}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
    
    console.log('Novo fbp gerado:', fbp);
    return fbp;
  }

  /**
   * Captura o valor de um cookie
   */
  private static getCookie(name: string): string | null {
    try {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return decodeURIComponent(value);
      }
      return null;
    } catch (error) {
      console.error(`Erro ao capturar cookie ${name}:`, error);
      return null;
    }
  }

  /**
   * Dispara o evento PageView
   */
  public static trackPageView(eventId: string): void {
    if (!this.isAvailable()) {
      console.warn('Facebook Pixel não disponível para PageView');
      return;
    }

    try {
      window.fbq('track', 'PageView', {}, {
        eventID: eventId
      });
      console.log(`Evento PageView enviado com event_id: ${eventId}`);
    } catch (error) {
      console.error('Erro ao enviar evento PageView:', error);
    }
  }

  /**
   * Dispara o evento Lead
   */
  public static trackLead(eventId: string, parameters: Record<string, any> = {}): void {
    if (!this.isAvailable()) {
      console.warn('Facebook Pixel não disponível para Lead');
      return;
    }

    try {
      window.fbq('track', 'Lead', parameters, {
        eventID: eventId
      });
      console.log(`Evento Lead enviado com event_id: ${eventId}`, parameters);
    } catch (error) {
      console.error('Erro ao enviar evento Lead:', error);
    }
  }

  /**
   * Método genérico para disparar eventos
   */
  public static trackEvent(eventName: string, parameters: Record<string, any> = {}, eventId?: string): void {
    if (!this.isAvailable()) {
      console.warn('Facebook Pixel não disponível para tracking');
      return;
    }

    try {
      const eventData: any = {};
      if (eventId) {
        eventData.eventID = eventId;
      }

      window.fbq('track', eventName, parameters, eventData);
      console.log(`Evento '${eventName}' enviado para Facebook Pixel`, parameters);
    } catch (error) {
      console.error('Erro ao enviar evento para Facebook Pixel:', error);
    }
  }

  /**
   * Verifica se existe fbclid na URL atual
   */
  public static hasFbclidInUrl(): boolean {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).has('fbclid');
  }

  /**
   * Método otimizado que verifica periodicamente o cookie _fbc e chama o callback quando disponível
   */
  public static onFbcReady(
    callback: (fbc: string | null) => void,
    maxWaitTime = 1000,
    checkInterval = 100
  ): void {
    if (!this.isAvailable()) {
      console.warn('Facebook Pixel não disponível');
      callback(null);
      return;
    }

    if (!this.hasFbclidInUrl()) {
      console.log('Nenhum fbclid na URL - cookie _fbc não será criado');
      callback(null);
      return;
    }

    const startTime = Date.now();

    const checkForFbc = () => {
      const fbc = this.getCookie('_fbc');

      if (fbc) {
        console.log('Cookie _fbc encontrado rapidamente:', fbc);
        callback(fbc);
        return;
      }

      if (Date.now() - startTime >= maxWaitTime) {
        console.warn('Timeout otimizado: Cookie _fbc não foi criado dentro de', maxWaitTime, 'ms');
        callback(null);
        return;
      }

      setTimeout(checkForFbc, checkInterval);
    };

    checkForFbc();
  }

  /**
   * Versão Promise para aguardar o cookie _fbc (otimizada)
   */
  public static waitForFbcCookie(maxWaitTime = 1000): Promise<string | null> {
    return new Promise((resolve) => {
      this.onFbcReady(resolve, maxWaitTime);
    });
  }
}

export default FacebookPixelService;
