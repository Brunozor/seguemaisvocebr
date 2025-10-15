
import { useEffect, useState } from 'react';
import UtmService from '../services/UtmService';

export const useFacebookPixel = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [fbp, setFbp] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    const initializePixel = async () => {
      try {
        // Inicializar o Facebook Pixel
        UtmService.initializeFacebookPixel();
        
        // Gerar ou obter o fbp
        const generatedFbp = UtmService.getOrGenerateFbp();
        setFbp(generatedFbp);
        
        // Gerar event_id único
        const generatedEventId = UtmService.generateEventId();
        setEventId(generatedEventId);
        
        // Disparar PageView após um pequeno delay para garantir que o pixel foi carregado
        setTimeout(() => {
          UtmService.trackPageView(generatedEventId);
        }, 100);
        
        setIsInitialized(true);
        
        console.log('Facebook Pixel inicializado com sucesso', {
          fbp: generatedFbp,
          eventId: generatedEventId
        });
        
      } catch (error) {
        console.error('Erro ao inicializar Facebook Pixel:', error);
      }
    };

    initializePixel();
  }, []);

  const trackLead = (parameters: Record<string, any> = {}) => {
    if (!isInitialized || !eventId) {
      console.warn('Facebook Pixel não inicializado ou event_id não disponível');
      return;
    }

    const leadEventId = UtmService.generateEventId();
    UtmService.trackLead(leadEventId, parameters);
    
    return leadEventId;
  };

  return {
    isInitialized,
    fbp,
    eventId,
    trackLead
  };
};
