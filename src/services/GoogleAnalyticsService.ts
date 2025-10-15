export class GoogleAnalyticsService {
  private readonly GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Substitua pelo seu ID real do GA4
  private isInitialized = false;

  public initializeGA4(): void {
    if (this.isInitialized) {
      console.warn('Google Analytics já foi inicializado.');
      return;
    }

    // Adicionar o script do GA4 apenas se ainda não existir
    if (!document.querySelector(`script[src*="${this.GA_MEASUREMENT_ID}"]`)) {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA_MEASUREMENT_ID}`;
      document.head.appendChild(gaScript);
    }

    // Adicionar configuração do gtag
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${this.GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(configScript);

    // Garantir que o gtag global está definido
    if (typeof (window as any).gtag !== 'function') {
      (window as any).gtag = function() {
        (window as any).dataLayer.push(arguments);
      };
    }

    this.isInitialized = true;
  }

  public trackPageView(): void {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    } else {
      console.warn('gtag ainda não está definido. Verifique se o GA foi inicializado.');
    }
  }

  public trackRedirection(clientCode: number, phone: string): void {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'whatsapp_redirect', {
        event_category: 'engagement',
        event_label: `client_${clientCode}`,
        client_code: clientCode,
        destination_phone: phone
      });
    } else {
      console.warn('gtag ainda não está definido. Verifique se o GA foi inicializado.');
    }
  }
}

export default new GoogleAnalyticsService();
