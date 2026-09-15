import { useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

const PIXEL_ID = "567728368972201";
const WEBHOOK_URL = "https://webhookv2.engagehub.pro/webhook/07ab7948-6b62-49a8-b471-2f52cc21d634";
const PIXEL_TRACKING_WEBHOOK_URL = "https://webhookv2.engagehub.pro/webhook/metapixelrastreamento";
// Endpoint anycast da Cloudflare: devolve o IP de saida real do lead (IPv6
// quando ele tem um) em ~40ms. Substitui o api64.ipify.org, medido em
// 660-1270ms, que sozinho segurava o redirecionamento.
const IP_TRACE_URL = "https://www.cloudflare.com/cdn-cgi/trace";
// Teto para a busca do IPv6: ela apenas enriquece o payload, entao nunca pode
// atrasar o redirect se a rede do lead estiver ruim.
const IP_TRACE_DEADLINE_MS = 400;

interface WebhookResponse {
  code: string;
  telefone: string;
  mensagem: string;
}

interface IPAddresses {
  ipv4: string;
  ipv6: string;
  best: string;
}

interface UTMData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  utm_id: string;
  fbclid: string;
}

const Index = () => {
  const [status, setStatus] = useState<"loading" | "redirecting" | "error">("loading");
  const [message, setMessage] = useState("Conectando você ao WhatsApp...");

  const getDeviceInfo = useCallback(() => {
    const userAgent = navigator.userAgent;
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);
    const isAndroid = /Android/i.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
    
    let os = "unknown";
    if (isAndroid) os = "android";
    else if (isIOS) os = "ios";
    else if (/Windows/i.test(userAgent)) os = "windows";
    else if (/Mac/i.test(userAgent)) os = "macos";
    else if (/Linux/i.test(userAgent)) os = "linux";

    let browser = "unknown";
    if (/Chrome/i.test(userAgent) && !/Edg/i.test(userAgent)) browser = "chrome";
    else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) browser = "safari";
    else if (/Firefox/i.test(userAgent)) browser = "firefox";
    else if (/Edg/i.test(userAgent)) browser = "edge";

    return {
      device_type: isMobile ? "mobile" : "desktop",
      operating_system: os,
      browser: browser,
      user_agent: userAgent,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
    };
  }, []);

  const getUTMParams = useCallback((): UTMData => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
      utm_id: params.get("utm_id") || "",
      fbclid: params.get("fbclid") || "",
    };
  }, []);

  const getFBCookie = useCallback((name: string): string => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split("=");
      if (key === name) return value;
    }
    return "";
  }, []);

  // Descobre o maior dominio no qual o navegador aceita gravar cookie
  // (ex.: ".minhaempresa.com.br"). E o mesmo escopo usado pelo fbevents.js —
  // gravar no host exato criaria um _fbp duplicado e divergente do pixel.
  const getCookieDomain = useCallback((): string => {
    const host = window.location.hostname;
    if (host === "localhost" || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return "";
    const parts = host.split(".");
    for (let i = parts.length - 2; i >= 0; i--) {
      const candidate = "." + parts.slice(i).join(".");
      document.cookie = `_fbdt=1; domain=${candidate}; path=/`;
      if (document.cookie.includes("_fbdt=1")) {
        document.cookie = `_fbdt=; domain=${candidate}; path=/; max-age=0`;
        return candidate;
      }
    }
    return "";
  }, []);

  const setFBCookie = useCallback((name: string, value: string) => {
    const domain = getCookieDomain();
    const domainPart = domain ? `; domain=${domain}` : "";
    document.cookie = `${name}=${value}; max-age=7776000; path=/${domainPart}; SameSite=Lax`;
  }, [getCookieDomain]);

  // Persiste o _fbc para que visitas seguintes (sem fbclid na URL) continuem
  // enviando o clique de origem na API de Conversoes.
  const ensureFBC = useCallback((fbclid: string): string => {
    const existing = getFBCookie("_fbc");
    if (!fbclid) return existing;
    if (existing && existing.endsWith(`.${fbclid}`)) return existing;
    const fbc = `fb.1.${Date.now()}.${fbclid}`;
    setFBCookie("_fbc", fbc);
    return fbc;
  }, [getFBCookie, setFBCookie]);

  // Cria o _fbp ANTES do fbq("init"): o pixel reaproveita o cookie existente,
  // entao navegador e servidor enviam exatamente o mesmo fbp (cobertura 100%).
  const ensureFBP = useCallback((): string => {
    const existing = getFBCookie("_fbp");
    if (existing) return existing;
    const fbp = `fb.1.${Date.now()}.${Math.floor(Math.random() * 10000000000)}`;
    setFBCookie("_fbp", fbp);
    return fbp;
  }, [getFBCookie, setFBCookie]);

  const loadPixelScript = useCallback(() => {
    const f = window as any;
    
    if (typeof window !== "undefined" && !f.fbq) {
      const b = document;
      const e = "script";
      const v = "https://connect.facebook.net/en_US/fbevents.js";
      
      f.fbq = function() {
        f.fbq.callMethod ? f.fbq.callMethod.apply(f.fbq, arguments) : f.fbq.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = f.fbq;
      f.fbq.push = f.fbq;
      f.fbq.loaded = true;
      f.fbq.version = "2.0";
      f.fbq.queue = [];
      
      const n = b.createElement(e) as HTMLScriptElement;
      n.async = true;
      n.src = v;
      const s = b.getElementsByTagName(e)[0];
      s?.parentNode?.insertBefore(n, s);
    }
  }, []);

  // NAO enviar `ph` aqui. O unico telefone conhecido nesta pagina e o numero de
  // destino do WhatsApp (da empresa), identico para todos os visitantes — era a
  // causa do erro "mais de 50% dos telefones sao duplicatas" em PageView/Contact.
  // O telefone real do cliente so existe depois da conversa, e deve ser enviado
  // pelo n8n nas etapas seguintes.
  const initPixel = useCallback((advancedMatching?: { external_id?: string }) => {
    const f = window as any;
    if (!f.fbq) return;
    const matchData: Record<string, string> = {};
    if (advancedMatching?.external_id) {
      matchData.external_id = advancedMatching.external_id;
    }
    f.fbq("init", PIXEL_ID, Object.keys(matchData).length > 0 ? matchData : undefined);
  }, []);

  const sendPixelTrackingWebhook = async (eventName: string, eventData: Record<string, any>, eventId: string, additionalData: Record<string, any>) => {
    try {
      const payload = {
        event_name: eventName,
        event_id: eventId,
        event_data: eventData,
        pixel_id: PIXEL_ID,
        // event_time e o momento real do evento no navegador: o n8n deve repassar
        // este valor para a API de Conversoes (nao a hora em que processou).
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: window.location.href,
        timestamp: new Date().toISOString(),
        ...additionalData,
      };
      
      console.log("Enviando para webhook de rastreamento do pixel:", payload);
      
      const response = await fetch(PIXEL_TRACKING_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        // sobrevive ao redirecionamento para o wa.me
        keepalive: true,
      });
      
      console.log("Resposta do webhook de rastreamento:", response.status);
    } catch (error) {
      console.error("Erro ao enviar dados para webhook de rastreamento do pixel:", error);
    }
  };

  const trackMetaEvent = useCallback((eventName: string, eventData: Record<string, any>, eventId: string, additionalData: Record<string, any> = {}) => {
    console.log("trackMetaEvent chamado:", eventName, eventData, eventId);
    
    // Sempre enviar para o webhook de rastreamento primeiro (não depende do fbq estar pronto)
    sendPixelTrackingWebhook(eventName, eventData, eventId, additionalData);
    
    // Tentar enviar para o Meta Pixel se disponível
    if (typeof window !== "undefined" && (window as any).fbq) {
      console.log("fbq disponível, disparando evento");
      (window as any).fbq("track", eventName, eventData, { eventID: eventId });
    } else {
      console.log("fbq não disponível ainda");
    }
  }, []);

  const fetchIP = async (endpoint: string): Promise<string> => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      return data.ip || "";
    } catch {
      return "";
    }
  };

  // Resposta em text/plain, uma "chave=valor" por linha; a linha `ip=` traz o
  // endereco de saida real do lead.
  const fetchTraceIP = async (): Promise<string> => {
    try {
      const response = await fetch(IP_TRACE_URL);
      const text = await response.text();
      return text.match(/^ip=(.*)$/m)?.[1].trim() || "";
    } catch {
      return "";
    }
  };

  // Resolve com `fallback` se `promise` estourar o prazo, em vez de deixar a
  // pagina presa esperando uma rede lenta.
  const withDeadline = <T,>(promise: Promise<T>, ms: number, fallback: T): Promise<T> =>
    Promise.race([
      promise,
      new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
    ]);

  // api.ipify.org so tem registro A: o browser e obrigado a sair por IPv4 e
  // sempre devolve o IPv4 — que alimenta o external_id e o codigo da mensagem,
  // por isso essa busca e obrigatoria. O IPv6 (o IPv4 mobile vem de CGNAT
  // compartilhado e serve de pouco pro Meta) e um extra: entra se chegar a tempo.
  const getIPAddresses = async (): Promise<IPAddresses> => {
    const [ipv4, best] = await Promise.all([
      fetchIP("https://api.ipify.org?format=json"),
      withDeadline(fetchTraceIP(), IP_TRACE_DEADLINE_MS, ""),
    ]);
    const ipv6 = best.includes(":") ? best : "";
    return { ipv4, ipv6, best: best || ipv4 };
  };

  const fetchWebhookData = async (urlAcessada: string): Promise<WebhookResponse | null> => {
    try {
      const response = await fetch(`${WEBHOOK_URL}?url=${encodeURIComponent(urlAcessada)}`);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data[0];
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar dados do webhook:", error);
      return null;
    }
  };

  const sendWebhookData = async (payload: Record<string, any>): Promise<boolean> => {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      return true;
    } catch (error) {
      console.error("Erro ao enviar dados para webhook:", error);
      return false;
    }
  };

  const buildMessage = (template: string, clientCode: string, ip: string): string => {
    const last3Ip = ip.split(".").pop()?.slice(-3).padStart(3, "0") || "000";
    const fullCode = `${last3Ip}${clientCode}`;
    return template.replace("XXXXXX", fullCode);
  };

  const redirectToWhatsApp = (phone: string, message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.location.href = whatsappUrl;
  };

  useEffect(() => {
    // Carrega o script do pixel
    loadPixelScript();

    const utmData = getUTMParams();
    const deviceInfo = getDeviceInfo();
    const urlAcessada = window.location.href;
    const timestamp = new Date().toISOString();

    // Cookies gravados ANTES do init para que o fbq reaproveite os mesmos valores
    const fbp = ensureFBP();
    const fbc = ensureFBC(utmData.fbclid);

    const pageViewEventId = uuidv4();
    const eventId = uuidv4();

    const baseContext = {
      fbc: fbc,
      fbp: fbp,
      user_agent: deviceInfo.user_agent,
      url_acessada: urlAcessada,
      utms: utmData,
      device_info: deviceInfo,
    };

    // PageView dispara de imediato, sem esperar IP + webhook (2 chamadas de rede).
    // Isso corta segundos da "atualidade dos dados" e evita perder o evento de
    // quem sai da pagina antes do redirecionamento.
    initPixel();
    trackMetaEvent("PageView", {}, pageViewEventId, baseContext);

    const processRedirect = async () => {
      try {
        setMessage("Buscando informações...");
        
        const [ips, webhookData] = await Promise.all([
          getIPAddresses(),
          fetchWebhookData(urlAcessada),
        ]);

        // `ip` segue sendo o IPv4: alimenta o external_id e o codigo da mensagem,
        // cujos formatos o n8n ja consome. O IPv6 vai em campos proprios.
        const ip = ips.ipv4;

        if (!webhookData) {
          setStatus("error");
          setMessage("Não foi possível obter os dados. Tente novamente.");
          return;
        }

        const externalId = ip.replace(/\./g, "") + webhookData.code;

        // Reinicializa o pixel com Advanced Matching (external_id, sem telefone)
        initPixel({ external_id: externalId });

        // Track Contact event with proper parameters
        trackMetaEvent("Contact", {
          content_name: "WhatsApp Redirect",
          content_category: "Lead",
        }, eventId, {
          ...baseContext,
          ip: ip,
          ip_v6: ips.ipv6,
          client_ip_address: ips.best,
          client_code: webhookData.code,
          external_id: externalId,
        });

        const payload = {
          utms: {
            utm_source: utmData.utm_source,
            utm_medium: utmData.utm_medium,
            utm_campaign: utmData.utm_campaign,
            utm_content: utmData.utm_content,
            utm_term: utmData.utm_term,
            utm_id: utmData.utm_id,
            fbclid: utmData.fbclid,
          },
          utm_source: utmData.utm_source,
          utm_medium: utmData.utm_medium,
          utm_campaign: utmData.utm_campaign,
          utm_content: utmData.utm_content,
          utm_term: utmData.utm_term,
          utm_id: utmData.utm_id,
          fbclid: utmData.fbclid,
          fbc: fbc,
          fbp: fbp,
          ip: ip,
          ip_v6: ips.ipv6,
          // Endereco que o lead realmente usou (IPv6 quando existe): e este que
          // deve ir em user_data.client_ip_address na API de Conversoes.
          client_ip_address: ips.best,
          client_code: webhookData.code,
          user_agent: deviceInfo.user_agent,
          device_type: deviceInfo.device_type,
          operating_system: deviceInfo.operating_system,
          browser: deviceInfo.browser,
          screen_resolution: deviceInfo.screen_resolution,
          // Numero de DESTINO (da empresa). Nunca mapear para `ph` na CAPI:
          // e o mesmo para todos os visitantes e gera "telefones duplicados".
          numero_redirecionado: webhookData.telefone,
          external_id: externalId,
          event_id: eventId,
          pageview_event_id: pageViewEventId,
          event_name: "Contact",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: urlAcessada,
          timestamp: timestamp,
          url_acessada: urlAcessada,
        };

        setStatus("redirecting");
        setMessage("Redirecionando para o WhatsApp...");

        const finalMessage = buildMessage(webhookData.mensagem, webhookData.code, ip);

        // Sem `await`: `keepalive: true` faz o POST sobreviver ao unload, entao
        // esperar a resposta antes de navegar so custava tempo. O fetch e
        // disparado de forma sincrona aqui, antes de a navegacao comecar.
        sendWebhookData(payload);

        redirectToWhatsApp(webhookData.telefone, finalMessage);

      } catch (error) {
        console.error("Erro no processamento:", error);
        setStatus("error");
        setMessage("Ocorreu um erro. Tente novamente.");
      }
    };

    processRedirect();
  }, [getUTMParams, getDeviceInfo, loadPixelScript, initPixel, trackMetaEvent, ensureFBC, ensureFBP]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        {/* WhatsApp Icon with Animation */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-whatsapp/20 animate-pulse-ring" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ animationDelay: "0.5s" }}>
            <div className="w-32 h-32 rounded-full bg-whatsapp/10 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
          </div>
          <div className="relative z-10 w-24 h-24 bg-whatsapp rounded-full flex items-center justify-center shadow-lg animate-float">
            <svg
              viewBox="0 0 24 24"
              className="w-14 h-14 text-primary-foreground"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {status === "error" ? "Ops!" : "Aguarde"}
          </h1>
          
          <p className="text-muted-foreground mb-6">{message}</p>

          {/* Loading Indicator */}
          {status !== "error" && (
            <div className="flex justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-whatsapp animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-3 h-3 rounded-full bg-whatsapp animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-3 h-3 rounded-full bg-whatsapp animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          )}

          {/* Error Retry Button */}
          {status === "error" && (
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-3 bg-whatsapp text-primary-foreground rounded-xl font-medium hover:bg-whatsapp-dark transition-colors"
            >
              Tentar Novamente
            </button>
          )}
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Conexão segura</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
