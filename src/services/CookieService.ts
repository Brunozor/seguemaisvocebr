
export class CookieService {
  /**
   * Captura um cookie específico pelo nome
   * @param name Nome do cookie a ser capturado
   * @returns Valor do cookie ou null se não existir
   */
  public static getCookie(name: string): string | null {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      
      if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(';').shift();
        return cookieValue ? decodeURIComponent(cookieValue) : null;
      }
      
      return null;
    } catch (error) {
      console.error(`Error getting cookie ${name}:`, error);
      return null;
    }
  }

  /**
   * Captura o Facebook Click ID (_fbc) do navegador
   * @returns Valor do _fbc ou null se não existir
   */
  public static getFacebookClickId(): string | null {
    return this.getCookie('_fbc');
  }

  /**
   * Captura todos os cookies Facebook relacionados
   * @returns Objeto com todos os cookies Facebook encontrados
   */
  public static getAllFacebookCookies(): {
    fbc?: string | null;
    fbp?: string | null;
  } {
    return {
      fbc: this.getCookie('_fbc'),
      fbp: this.getCookie('_fbp')
    };
  }
}

export default CookieService;
