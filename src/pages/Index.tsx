import React, { useEffect, useState } from 'react';
import { toast } from "@/hooks/use-toast";
import UtmService from "../services/UtmService";
import { useFacebookPixel } from "../hooks/useFacebookPixel";
import LoadingScreen from '../components/LoadingScreen';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MessageSquare } from "lucide-react";

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientCode, setClientCode] = useState<number | null>(null);
  const { isInitialized, fbp, eventId, trackLead } = useFacebookPixel();

  useEffect(() => {
    // Se ainda não inicializou ou já temos clientCode, não processa de novo
    if (!isInitialized || clientCode !== null) return;

    const processPageLoad = async () => {
      try {
        console.log("[INDEX] Processando carregamento da página");
        console.log("[INDEX] URL completa acessada:", window.location.href);

        // Aguardar pixel
        await new Promise(resolve => setTimeout(resolve, 200));

        // UTM
        const utmParams = UtmService.getUtmParamsFromUrl();
        console.log("[INDEX] UTM params:", utmParams);

        // Gerar código e geolocalização
        const [generatedClientCode, { ip, geoData }] = await Promise.all([
          UtmService.generateClientCode(),
          UtmService.getIpAndGeoData()
        ]);
        console.log("[INDEX] Dados básicos:", { clientCode: generatedClientCode, ip });

        // Salvar clientCode no state para não mudar mais
        setClientCode(generatedClientCode);

        // Dados do dispositivo
        const deviceData = {
          device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          operating_system: navigator.platform || 'unknown',
          browser: navigator.userAgent.split(' ').pop() || 'unknown',
          screen_resolution: `${screen.width}x${screen.height}`
        };

        // fbclid e cookie
        const urlParams = new URLSearchParams(window.location.search);
        const fbclid = urlParams.get('fbclid');
        let fbc: string | null = null;
        if (fbclid) fbc = await UtmService.waitForFbcCookie();

        // Número fixo para redirecionamento
        const numeroData = {
          telefone: "5591982581308", // Coloca o número que tu quiser
          mensagem: "Olá! Tenho interesse. Sou o cliente XXX me manda as promoções por gentileza!! (obrigatório o envio desta mensagem para ser atendido)"
        };

        // Salvar no back
        const savedRecord = await UtmService.saveEnhancedUtmData({
          utmParams,
          clientCode: generatedClientCode,
          ip,
          geoData: { ...geoData, pagina: window.location.href, user_agent: navigator.userAgent },
          deviceData,
          fbclid,
          fbc,
          numeroRedirecionado: numeroData?.telefone,
          external_id: fbp,
          event_id: eventId
        });
        console.log("[INDEX] Dados salvos:", savedRecord);

        // Disparar Lead
        setTimeout(() => {
          const leadEventId = trackLead({
            content_name: window.location.pathname,
            content_category: utmParams?.utm_campaign || 'direct'
          });
          console.log("[INDEX] Evento Lead:", leadEventId);
        }, 500);

        // Toast de código (usando sempre o mesmo clientCode gerado)
        const codeFormatted = generatedClientCode.toString().padStart(3, '0');
        toast({ title: "Segue Mais Você", description: `Seu código: ${codeFormatted}` });

        // Redirecionar após 1s
        if (numeroData) {
          const message = UtmService.formatWhatsAppMessage(generatedClientCode, ip, numeroData.mensagem);
          const whatsappUrl = UtmService.generateWhatsAppUrl(numeroData.telefone, message);
          console.log("[INDEX] Redirecionando pra WhatsApp:", whatsappUrl);
          setTimeout(() => { window.location.href = whatsappUrl; }, 1000);
        }

      } catch (err: any) {
        console.error("[INDEX] Erro:", err);
        setError(err.message || "Ocorreu um erro. Redirecionando alternativo...");
        setTimeout(() => {
          const defaultPhone = "5591982581308";
          const defaultMsg = "Olá! Tenho interesse. Me envia promoções, por favor!";
          const altUrl = `https://api.whatsapp.com/send/?phone=${defaultPhone}&text=${encodeURIComponent(defaultMsg)}&type=phone_number&app_absent=0`;
          window.location.href = altUrl;
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    processPageLoad();
  }, [isInitialized, clientCode, fbp, eventId, trackLead]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: '#EFEAE2',
        backgroundImage: 'url("/static/img/bg-whats.png")',
        fontFamily: "'Open Sans', sans-serif"
      }}
    >
      {error ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <div className="w-full text-center max-w-[90%] flex flex-col items-center gap-8 p-12 bg-white rounded-2xl shadow-lg text-gray-700">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <MessageSquare size={32} color="#10b981" />
            </div>
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Problema detectado</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <p>Segue Mais Você</p>
            <p>Redirecionando para atendimento alternativo...</p>
          </div>
        </div>
      ) : isLoading ? (
        <LoadingScreen />
      ) : null}
    </div>
  );
};

export default Index;
