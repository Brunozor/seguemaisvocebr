
import { GeoData } from "../types/utm";

export class GeoLocationService {
  public async getIpAddress(): Promise<string | null> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("[GEO] Erro ao obter IP:", error);
      return null;
    }
  }

  public async getGeoLocationData(ip: string | null): Promise<GeoData> {
    try {
      if (!ip) {
        return {
          cidade: 'Desconhecida',
          estado: 'Desconhecido',
          pais: 'Desconhecido',
          pagina: window.location.href, // URL completa
          user_agent: navigator.userAgent
        };
      }

      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();

      return {
        cidade: data.city || 'Desconhecida',
        estado: data.regionName || 'Desconhecido',
        pais: data.country || 'Desconhecido',
        pagina: window.location.href, // URL completa
        user_agent: navigator.userAgent
      };
    } catch (error) {
      console.error("[GEO] Erro ao obter dados de geolocalização:", error);
      return {
        cidade: 'Desconhecida',
        estado: 'Desconhecido',
        pais: 'Desconhecido',
        pagina: window.location.href, // URL completa
        user_agent: navigator.userAgent
      };
    }
  }

  // Método otimizado que busca IP e Geo em uma única operação
  public async getIpAndGeoData(): Promise<{ ip: string | null; geoData: GeoData }> {
    const ip = await this.getIpAddress();
    const geoData = await this.getGeoLocationData(ip);
    return { ip, geoData };
  }
}

export default new GeoLocationService();
