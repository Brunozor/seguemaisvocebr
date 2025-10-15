import { DeviceData } from "../types/utm";

export class DeviceDetectionService {
  private userAgent: string;
  private platform: string;

  constructor() {
    this.userAgent = navigator.userAgent || '';
    this.platform = navigator.platform || '';
  }

  public detectDeviceType(): string {
    const ua = this.userAgent.toLowerCase();

    if (/tablet|ipad|playbook|silk/.test(ua)) {
      return 'tablet';
    }

    if (/mobile|iphone|ipod|android|blackberry|opera mini|windows phone|iemobile|smartphone/.test(ua)) {
      return 'mobile';
    }

    return 'desktop';
  }

  public detectOperatingSystem(): string {
    const ua = this.userAgent;

    if (/Windows NT 10\.0/.test(ua)) return "Windows 10";
    if (/Windows NT 6\.3/.test(ua)) return "Windows 8.1";
    if (/Windows NT 6\.2/.test(ua)) return "Windows 8";
    if (/Windows NT 6\.1/.test(ua)) return "Windows 7";
    if (/Windows NT 6\.0/.test(ua)) return "Windows Vista";
    if (/Windows NT 5\.1/.test(ua)) return "Windows XP";
    if (/Windows NT 5\.0/.test(ua)) return "Windows 2000";
    if (/Mac OS X/.test(ua)) return "macOS";
    if (/X11/.test(ua)) return "UNIX";
    if (/Linux/.test(ua)) return "Linux";
    if (/Android/.test(ua)) return "Android";

    // Detecção mais robusta de iOS (iPhone, iPad, iPod, iPadOS moderno)
    if (/iPhone|iPad|iPod/.test(ua) || 
        (this.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      return "iOS";
    }

    return "Unknown";
  }

  public detectBrowser(): string {
    const ua = this.userAgent;

    if (/OPR|Opera/.test(ua)) return "Opera";
    if (/Edg\//.test(ua)) return "Microsoft Edge"; // Novo Edge (Chromium)
    if (/Edge/.test(ua)) return "Microsoft Edge (Legacy)";
    if (/Chrome/.test(ua) && !/Edg|OPR/.test(ua)) return "Chrome";
    if (/Firefox/.test(ua)) return "Firefox";
    if (/SamsungBrowser/.test(ua)) return "Samsung Browser";
    if (/Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR/.test(ua)) return "Safari";
    if (/Trident|MSIE/.test(ua)) return "Internet Explorer";

    return "Unknown";
  }

  public getScreenResolution(): string {
    const width = window.screen.width;
    const height = window.screen.height;
    return `${width}x${height}`;
  }

  public getAllDeviceData(): DeviceData {
    return {
      device_type: this.detectDeviceType(),
      operating_system: this.detectOperatingSystem(),
      browser: this.detectBrowser(),
      screen_resolution: this.getScreenResolution(),
    };
  }
}

export default new DeviceDetectionService();
