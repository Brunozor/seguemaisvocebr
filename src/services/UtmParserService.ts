
import { UtmParams } from "../types/utm";

export class UtmParserService {
  public getUtmParamsFromUrl(): UtmParams | null {
    const urlParams = new URLSearchParams(window.location.search);

    const utm_source = urlParams.get('utm_source');
    const utm_medium = urlParams.get('utm_medium');
    const utm_campaign = urlParams.get('utm_campaign');
    const utm_content = urlParams.get('utm_content');

    // Se pelo menos um parâmetro UTM estiver presente, retorna os dados
    if (utm_source || utm_medium || utm_campaign || utm_content) {
      return {
        utm_source: utm_source || 'direct',
        utm_medium: utm_medium || 'none',
        utm_campaign: utm_campaign || 'none',
        utm_content: utm_content || 'none',
        tintim_fbid: urlParams.get('tintim_fbid') || undefined
      };
    }

    // Se nenhum parâmetro UTM estiver presente, retorna null para usar valores padrão
    return null;
  }
}

export default new UtmParserService();
