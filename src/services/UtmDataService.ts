
import { supabase } from "../integrations/supabase/client";
import { UtmParams, UtmRecord, GeoData, DeviceData } from "../types/utm";
import SocialSourceDetectionService from "./SocialSourceDetectionService";

export class UtmDataService {
  public async saveEnhancedUtmData(params: {
    utmParams?: UtmParams;
    clientCode: number;
    ip: string | null;
    geoData: GeoData;
    deviceData: DeviceData;
    fbclid?: string | null;
    fbc?: string | null;
    numeroRedirecionado?: string;
    external_id?: string; // fbp
    event_id?: string;    // event_id para desduplicação
  }): Promise<UtmRecord | null> {
    try {
      if (!params.ip) {
        console.log("[UTM] IP não disponível, criando novo registro");
        return await this.createNewRecord(params);
      }

      // Verificar se já existe um registro com este IP
      const { data: existingRecord, error: selectError } = await supabase
        .from('utm')
        .select('*')
        .eq('ip', params.ip)
        .order('timestamp', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (selectError) {
        console.error("[UTM] Erro ao verificar IP existente:", selectError);
        return await this.createNewRecord(params);
      }

      if (!existingRecord) {
        console.log("[UTM] IP não encontrado, criando novo registro");
        return await this.createNewRecord(params);
      }

      console.log("[UTM] IP encontrado, atualizando registro existente");
      return await this.updateExistingRecord(existingRecord, params);

    } catch (error) {
      console.error("[UTM] Erro geral ao salvar dados:", error);
      return await this.createNewRecord(params);
    }
  }

  private async createNewRecord(params: {
    utmParams?: UtmParams;
    clientCode: number;
    ip: string | null;
    geoData: GeoData;
    deviceData: DeviceData;
    fbclid?: string | null;
    fbc?: string | null;
    numeroRedirecionado?: string;
    external_id?: string;
    event_id?: string;
  }): Promise<UtmRecord | null> {
    // Detectar origem social
    const socialSourceInfo = SocialSourceDetectionService.detectSocialSource();
    
    const record: UtmRecord = {
      utm_source: params.utmParams?.utm_source || 'direct',
      utm_medium: params.utmParams?.utm_medium || 'none',
      utm_campaign: params.utmParams?.utm_campaign || 'none',
      utm_content: params.utmParams?.utm_content || 'none',
      tintim_fbid: params.utmParams?.tintim_fbid,
      timestamp: new Date().toISOString(),
      ip: params.ip,
      whatsapp_redirected: true,
      client_code: params.clientCode,
      N8N_RETORNOU: 'False',
      cidade: params.geoData.cidade,
      estado: params.geoData.estado,
      pais: params.geoData.pais,
      pagina: window.location.href, // Garantir que seja a URL completa
      user_agent: params.geoData.user_agent,
      device_type: params.deviceData.device_type,
      operating_system: params.deviceData.operating_system,
      browser: params.deviceData.browser,
      screen_resolution: params.deviceData.screen_resolution,
      fbclid: params.fbclid,
      fbc: params.fbc,
      numero_redirecionado: params.numeroRedirecionado,
      // Adicionar dados de rede social
      rede_social: socialSourceInfo.rede_social,
      rede_social_local: socialSourceInfo.rede_social_local,
      // Adicionar dados do Facebook Pixel
      external_id: params.external_id,
      event_id: params.event_id
    };

    console.log("[UTM] Dados a serem salvos:", {
      utm_source: record.utm_source,
      utm_medium: record.utm_medium,
      utm_campaign: record.utm_campaign,
      utm_content: record.utm_content,
      pagina: record.pagina
    });

    const { data, error } = await supabase
      .from('utm')
      .insert(record)
      .select()
      .single();

    if (error) {
      console.error("[UTM] Erro ao criar novo registro:", error);
      return null;
    }

    console.log("[UTM] Novo registro criado com sucesso");
    return data;
  }

  private async updateExistingRecord(
    existingRecord: UtmRecord,
    params: {
      utmParams?: UtmParams;
      clientCode: number;
      ip: string | null;
      geoData: GeoData;
      deviceData: DeviceData;
      fbclid?: string | null;
      fbc?: string | null;
      numeroRedirecionado?: string;
      external_id?: string;
      event_id?: string;
    }
  ): Promise<UtmRecord | null> {
    // Detectar origem social atual
    const socialSourceInfo = SocialSourceDetectionService.detectSocialSource();
    
    // Preparar dados para atualização, preservando valores existentes quando novos valores estão vazios
    const updateData: Partial<UtmRecord> = {
      // UTM: atualiza apenas se houver novos valores ou se não houver valores existentes válidos
      utm_source: params.utmParams?.utm_source || 
                 (existingRecord.utm_source && existingRecord.utm_source !== 'direct' ? existingRecord.utm_source : 'direct'),
      utm_medium: params.utmParams?.utm_medium || 
                 (existingRecord.utm_medium && existingRecord.utm_medium !== 'none' ? existingRecord.utm_medium : 'none'),
      utm_campaign: params.utmParams?.utm_campaign || 
                   (existingRecord.utm_campaign && existingRecord.utm_campaign !== 'none' ? existingRecord.utm_campaign : 'none'),
      utm_content: params.utmParams?.utm_content || 
                  (existingRecord.utm_content && existingRecord.utm_content !== 'none' ? existingRecord.utm_content : 'none'),
      tintim_fbid: params.utmParams?.tintim_fbid || existingRecord.tintim_fbid,

      // Sempre atualiza timestamp, client_code e dados de redirecionamento
      timestamp: new Date().toISOString(),
      client_code: params.clientCode,
      whatsapp_redirected: true,
      numero_redirecionado: params.numeroRedirecionado,

      // Dados geográficos: sempre atualiza, garantindo que a URL completa seja salva
      cidade: params.geoData.cidade || existingRecord.cidade,
      estado: params.geoData.estado || existingRecord.estado,
      pais: params.geoData.pais || existingRecord.pais,
      pagina: window.location.href, // Sempre usar a URL completa atual
      user_agent: params.geoData.user_agent || existingRecord.user_agent,

      // Dados do dispositivo: sempre atualiza
      device_type: params.deviceData.device_type || existingRecord.device_type,
      operating_system: params.deviceData.operating_system || existingRecord.operating_system,
      browser: params.deviceData.browser || existingRecord.browser,
      screen_resolution: params.deviceData.screen_resolution || existingRecord.screen_resolution,

      // Facebook: sempre atualiza se disponível
      fbclid: params.fbclid || existingRecord.fbclid,
      fbc: params.fbc || existingRecord.fbc,

      // Dados de rede social: atualiza se detectado na URL atual, senão mantém o existente
      rede_social: socialSourceInfo.rede_social || existingRecord.rede_social,
      rede_social_local: socialSourceInfo.rede_social_local || existingRecord.rede_social_local,

      // Dados do Facebook Pixel: sempre atualiza se disponível
      external_id: params.external_id || existingRecord.external_id,
      event_id: params.event_id || existingRecord.event_id,
    };

    console.log("[UTM] Dados a serem atualizados:", {
      utm_source: updateData.utm_source,
      utm_medium: updateData.utm_medium,
      utm_campaign: updateData.utm_campaign,
      utm_content: updateData.utm_content,
      pagina: updateData.pagina
    });

    const { data, error } = await supabase
      .from('utm')
      .update(updateData)
      .eq('id', existingRecord.id)
      .select()
      .single();

    if (error) {
      console.error("[UTM] Erro ao atualizar registro existente:", error);
      return null;
    }

    console.log("[UTM] Registro atualizado com sucesso");
    return data;
  }
}

export default new UtmDataService();
