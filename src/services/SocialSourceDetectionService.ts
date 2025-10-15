
export interface SocialSourceInfo {
  rede_social: string | null;
  rede_social_local: string | null;
}

export class SocialSourceDetectionService {
  public static detectSocialSource(): SocialSourceInfo {
    const currentPath = window.location.pathname;
    
    // Detectar Instagram (instagram, story ou bio)
    if (currentPath === '/instagram') {
      return {
        rede_social: 'instagram',
        rede_social_local: 'feed'
      };
    }
    
    if (currentPath === '/story') {
      return {
        rede_social: 'instagram',
        rede_social_local: 'story'
      };
    }
    
    if (currentPath === '/bio') {
      return {
        rede_social: 'instagram',
        rede_social_local: 'bio'
      };
    }
    
    // Detectar WhatsApp grupos
    const grupoMatch = currentPath.match(/^\/grupo-(.+)$/);
    if (grupoMatch) {
      const nomeGrupo = grupoMatch[1];
      return {
        rede_social: 'whatsapp',
        rede_social_local: nomeGrupo
      };
    }
    
    // Detectar WhatsApp genérico
    if (currentPath === '/grupo') {
      return {
        rede_social: 'whatsapp',
        rede_social_local: 'grupo'
      };
    }
    
    // Caso padrão - sem informação específica
    return {
      rede_social: null,
      rede_social_local: null
    };
  }
}

export default SocialSourceDetectionService;
