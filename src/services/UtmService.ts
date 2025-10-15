import { UtmParams } from "../types/utm";
import ClientCodeService from "./ClientCodeService";
import GeoLocationService from "./GeoLocationService";
import PhoneRedirectionService from "./PhoneRedirectionService";
import WhatsAppService from "./WhatsAppService";
import UtmParserService from "./UtmParserService";
import UtmDataService from "./UtmDataService";
import CookieService from "./CookieService";
import FacebookPixelService from "./FacebookPixelService";

export class UtmService {
  // Delegate to ClientCodeService
  public async generateClientCode(): Promise<number> {
    return ClientCodeService.generateClientCode();
  }

  // Delegate to GeoLocationService (métodos originais mantidos para compatibilidade)
  public async getIpAddress(): Promise<string | null> {
    return GeoLocationService.getIpAddress();
  }

  public async getGeoLocationData(ip: string | null) {
    return GeoLocationService.getGeoLocationData(ip);
  }

  // NOVO: Método otimizado que busca IP e Geo em uma única operação
  public async getIpAndGeoData() {
    return GeoLocationService.getIpAndGeoData();
  }

  // Delegate to PhoneRedirectionService
  public async getActivePhoneNumber() {
    return PhoneRedirectionService.getActivePhoneNumber();
  }

  // Delegate to WhatsAppService
  public formatWhatsAppMessage(clientCode: number | null, ip: string | null, template?: string): string {
    return WhatsAppService.formatWhatsAppMessage(clientCode, ip, template);
  }

  public generateWhatsAppUrl(phone: string, message: string): string {
    return WhatsAppService.generateWhatsAppUrl(phone, message);
  }

  // Delegate to UtmParserService
  public getUtmParamsFromUrl(): UtmParams | null {
    return UtmParserService.getUtmParamsFromUrl();
  }

  // Delegate to UtmDataService with Facebook Pixel integration
  public async saveEnhancedUtmData(params: Parameters<typeof UtmDataService.saveEnhancedUtmData>[0]) {
    return UtmDataService.saveEnhancedUtmData(params);
  }

  // Keep the cookie method as it's simple and doesn't need its own service
  public getFacebookClickIdFromCookie(): string | null {
    return CookieService.getFacebookClickId();
  }

  // Facebook Pixel integration methods
  public initializeFacebookPixel(): void {
    FacebookPixelService.init();
  }

  public generateEventId(): string {
    return FacebookPixelService.generateEventId();
  }

  public getOrGenerateFbp(): string {
    return FacebookPixelService.getOrGenerateFbp();
  }

  public trackPageView(eventId: string): void {
    FacebookPixelService.trackPageView(eventId);
  }

  public trackLead(eventId: string, parameters: Record<string, any> = {}): void {
    FacebookPixelService.trackLead(eventId, parameters);
  }

  public async waitForFbcCookie(maxWaitTime = 1000): Promise<string | null> {
    return FacebookPixelService.waitForFbcCookie(maxWaitTime);
  }
}

export default new UtmService();
