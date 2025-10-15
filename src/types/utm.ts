
export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  tintim_fbid?: string;
}

export interface GeoData {
  cidade?: string;
  estado?: string;
  pais?: string;
  pagina?: string;
  user_agent?: string;
}

export interface DeviceData {
  device_type: string;
  operating_system: string;
  browser: string;
  screen_resolution: string;
}

export interface TextoRedirecionamento {
  id: string;
  numero_id: string;
  texto: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface RedirecionamentoNumero {
  id: string;
  telefone: string;
  ativo: boolean;
  porcentagem: number;
  mensagem?: string;
  textos?: TextoRedirecionamento[];
}

export interface UtmRecord extends UtmParams {
  id?: string;
  timestamp: string;
  ip?: string | null;
  whatsapp_redirected: boolean;
  client_code: number;
  N8N_RETORNOU?: string | null;
  // Dados geográficos
  cidade?: string | null;
  estado?: string | null;
  pais?: string | null;
  pagina?: string | null;
  user_agent?: string | null;
  // Dados do dispositivo
  device_type?: string | null;
  operating_system?: string | null;
  browser?: string | null;
  screen_resolution?: string | null;
  fbclid?: string | null;
  fbc?: string | null; // Cookie _fbc
  // Número redirecionado
  numero_redirecionado?: string | null;
  // Dados de rede social
  rede_social?: string | null;
  rede_social_local?: string | null;
  // Dados do Facebook Pixel
  external_id?: string | null; // fbp
  event_id?: string | null;    // event_id para desduplicação
  fbp?: string | null;         // Alias para external_id para compatibilidade
}
