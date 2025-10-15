export class FbclidService {
  private readonly FBCLID_COOKIE_NAME = 'fbclid_utm';
  private readonly COOKIE_EXPIRY_DAYS = 30;

  /**
   * Obtém o parâmetro 'fbclid' da URL atual.
   */
  public getFbclidFromUrl(): string | null {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const fbclid = urlParams.get('fbclid');
      return fbclid && fbclid.trim() !== '' ? fbclid : null;
    } catch (error) {
      console.error('Erro ao ler fbclid da URL:', error);
      return null;
    }
  }

  /**
   * Salva o fbclid em um cookie com tempo de expiração definido.
   * @param fbclid O valor do fbclid a ser salvo.
   */
  public saveFbclidToCookie(fbclid: string): void {
    if (!fbclid || fbclid.trim() === '') {
      console.warn('Tentativa de salvar fbclid inválido no cookie.');
      return;
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.COOKIE_EXPIRY_DAYS);

    const cookieValue = `${this.FBCLID_COOKIE_NAME}=${encodeURIComponent(fbclid)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;

    document.cookie = cookieValue;
  }

  /**
   * Recupera o fbclid armazenado no cookie, se existir.
   */
  public getFbclidFromCookie(): string | null {
    const nameEQ = `${this.FBCLID_COOKIE_NAME}=`;
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(nameEQ)) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  }

  /**
   * Recupera o fbclid atual:
   * - Primeiro verifica na URL.
   * - Se encontrar, salva no cookie.
   * - Se não encontrar, tenta recuperar do cookie.
   */
  public getCurrentFbclid(): string | null {
    const urlFbclid = this.getFbclidFromUrl();

    if (urlFbclid) {
      this.saveFbclidToCookie(urlFbclid);
      return urlFbclid;
    }

    return this.getFbclidFromCookie();
  }

  /**
   * Limpa o cookie de fbclid.
   * Útil em cenários de logout ou reset de tracking.
   */
  public clearFbclidCookie(): void {
    document.cookie = `${this.FBCLID_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  }
}

export default new FbclidService();
