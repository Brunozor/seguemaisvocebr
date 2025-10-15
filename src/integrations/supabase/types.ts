export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      add_pagamento_colaboradores: {
        Row: {
          criado: string | null
          id: string
          nome: string | null
          status: string | null
          valor: string | null
        }
        Insert: {
          criado?: string | null
          id?: string
          nome?: string | null
          status?: string | null
          valor?: string | null
        }
        Update: {
          criado?: string | null
          id?: string
          nome?: string | null
          status?: string | null
          valor?: string | null
        }
        Relationships: []
      }
      admin_authorized_ips: {
        Row: {
          created_at: string
          description: string | null
          id: string
          ip: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          ip: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          ip?: string
          updated_at?: string
        }
        Relationships: []
      }
      banks: {
        Row: {
          active: boolean
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      carrinho_abandonado: {
        Row: {
          apikey: string | null
          data_hora_pagamento: string | null
          data_hora_recebeu_mensagem: string | null
          diparou: string | null
          disparar_mensagem: string | null
          id: number
          mensagem: string | null
          qual_numero_empresa: string | null
          recebeu_pagamento: string | null
          telefone: string
        }
        Insert: {
          apikey?: string | null
          data_hora_pagamento?: string | null
          data_hora_recebeu_mensagem?: string | null
          diparou?: string | null
          disparar_mensagem?: string | null
          id?: number
          mensagem?: string | null
          qual_numero_empresa?: string | null
          recebeu_pagamento?: string | null
          telefone: string
        }
        Update: {
          apikey?: string | null
          data_hora_pagamento?: string | null
          data_hora_recebeu_mensagem?: string | null
          diparou?: string | null
          disparar_mensagem?: string | null
          id?: number
          mensagem?: string | null
          qual_numero_empresa?: string | null
          recebeu_pagamento?: string | null
          telefone?: string
        }
        Relationships: []
      }
      categoria_servicos: {
        Row: {
          business_cnpj: number | null
          category_id: number | null
          coast_complement: number | null
          coast_gateway: number | null
          coast_lead: number | null
          "coast_prod-service": number | null
          created_at: string | null
          created_date: string | null
          created_time: string | null
          deleted: boolean | null
          description: string | null
          funnel_active: boolean | null
          funnel_id: number | null
          id: string
          name: string | null
          price: number | null
          quantity: number | null
          subcategory_id: number | null
          updated_date: string | null
          updated_time: string | null
          upsell_price: number | null
          upsell_quantity: number | null
        }
        Insert: {
          business_cnpj?: number | null
          category_id?: number | null
          coast_complement?: number | null
          coast_gateway?: number | null
          coast_lead?: number | null
          "coast_prod-service"?: number | null
          created_at?: string | null
          created_date?: string | null
          created_time?: string | null
          deleted?: boolean | null
          description?: string | null
          funnel_active?: boolean | null
          funnel_id?: number | null
          id?: string
          name?: string | null
          price?: number | null
          quantity?: number | null
          subcategory_id?: number | null
          updated_date?: string | null
          updated_time?: string | null
          upsell_price?: number | null
          upsell_quantity?: number | null
        }
        Update: {
          business_cnpj?: number | null
          category_id?: number | null
          coast_complement?: number | null
          coast_gateway?: number | null
          coast_lead?: number | null
          "coast_prod-service"?: number | null
          created_at?: string | null
          created_date?: string | null
          created_time?: string | null
          deleted?: boolean | null
          description?: string | null
          funnel_active?: boolean | null
          funnel_id?: number | null
          id?: string
          name?: string | null
          price?: number | null
          quantity?: number | null
          subcategory_id?: number | null
          updated_date?: string | null
          updated_time?: string | null
          upsell_price?: number | null
          upsell_quantity?: number | null
        }
        Relationships: []
      }
      CHAMADA: {
        Row: {
          api: string | null
          created_at: string | null
          "horario envio": string | null
          id: number
          instancia: string | null
          phone: number | null
          REMARKETING: string | null
          status: string | null
        }
        Insert: {
          api?: string | null
          created_at?: string | null
          "horario envio"?: string | null
          id: number
          instancia?: string | null
          phone?: number | null
          REMARKETING?: string | null
          status?: string | null
        }
        Update: {
          api?: string | null
          created_at?: string | null
          "horario envio"?: string | null
          id?: number
          instancia?: string | null
          phone?: number | null
          REMARKETING?: string | null
          status?: string | null
        }
        Relationships: []
      }
      chatwoot_settings: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          updated_at: string
          updated_by: string | null
          url: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          updated_at?: string
          updated_by?: string | null
          url: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          updated_at?: string
          updated_by?: string | null
          url?: string
        }
        Relationships: []
      }
      chave_pix: {
        Row: {
          ativado: string | null
          Banco: string | null
          "chave pix": string | null
          CNPJ: string
          id: number
          Nome: string | null
          "tipo de chave": string | null
        }
        Insert: {
          ativado?: string | null
          Banco?: string | null
          "chave pix"?: string | null
          CNPJ: string
          id?: number
          Nome?: string | null
          "tipo de chave"?: string | null
        }
        Update: {
          ativado?: string | null
          Banco?: string | null
          "chave pix"?: string | null
          CNPJ?: string
          id?: number
          Nome?: string | null
          "tipo de chave"?: string | null
        }
        Relationships: []
      }
      cobranca_tintim: {
        Row: {
          dia: string | null
          mês: string | null
          nome: string
          telefone: string
          valor: string | null
        }
        Insert: {
          dia?: string | null
          mês?: string | null
          nome: string
          telefone: string
          valor?: string | null
        }
        Update: {
          dia?: string | null
          mês?: string | null
          nome?: string
          telefone?: string
          valor?: string | null
        }
        Relationships: []
      }
      colaboradores_meia_noite: {
        Row: {
          data: string | null
          id: string
          nome: string
          status: string | null
          valor: string | null
        }
        Insert: {
          data?: string | null
          id?: string
          nome: string
          status?: string | null
          valor?: string | null
        }
        Update: {
          data?: string | null
          id?: string
          nome?: string
          status?: string | null
          valor?: string | null
        }
        Relationships: []
      }
      comprou: {
        Row: {
          campanha: string | null
          comprou: string
          conjunto: string | null
          "DISPAROU RMK": string | null
          id: string
          telefone: string | null
          valor: string | null
        }
        Insert: {
          campanha?: string | null
          comprou: string
          conjunto?: string | null
          "DISPAROU RMK"?: string | null
          id?: string
          telefone?: string | null
          valor?: string | null
        }
        Update: {
          campanha?: string | null
          comprou?: string
          conjunto?: string | null
          "DISPAROU RMK"?: string | null
          id?: string
          telefone?: string | null
          valor?: string | null
        }
        Relationships: []
      }
      comprou_7d: {
        Row: {
          campanha: string | null
          comprou: string
          conjunto: string | null
          "DISPAROU RMK": string | null
          id: string
          telefone: string | null
          valor: string | null
        }
        Insert: {
          campanha?: string | null
          comprou: string
          conjunto?: string | null
          "DISPAROU RMK"?: string | null
          id?: string
          telefone?: string | null
          valor?: string | null
        }
        Update: {
          campanha?: string | null
          comprou?: string
          conjunto?: string | null
          "DISPAROU RMK"?: string | null
          id?: string
          telefone?: string | null
          valor?: string | null
        }
        Relationships: []
      }
      conjunto_selections: {
        Row: {
          conjunto_key: string
          created_at: string
          id: string
          multiply: boolean
          star: boolean
          trending: boolean
          updated_at: string
        }
        Insert: {
          conjunto_key: string
          created_at?: string
          id?: string
          multiply?: boolean
          star?: boolean
          trending?: boolean
          updated_at?: string
        }
        Update: {
          conjunto_key?: string
          created_at?: string
          id?: string
          multiply?: boolean
          star?: boolean
          trending?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      creative_analysis: {
        Row: {
          acc: string | null
          adv_rt: boolean | null
          adv_rt_aumentou: boolean | null
          adv_rt_aumentou_qtd: number | null
          adv_rt_triplicou: boolean | null
          adv_rt_triplicou_qtd: number | null
          adv_site_venda: boolean | null
          adv_site_venda_aumentou: boolean | null
          adv_site_venda_aumentou_qtd: number | null
          adv_site_venda_triplicou: boolean | null
          adv_site_venda_triplicou_qtd: number | null
          adv_wpp_engaj: boolean | null
          adv_wpp_engaj_aumentou: boolean | null
          adv_wpp_engaj_aumentou_qtd: number | null
          adv_wpp_engaj_triplicou: boolean | null
          adv_wpp_engaj_triplicou_qtd: number | null
          adv_wpp_venda: boolean | null
          adv_wpp_venda_aumentou: boolean | null
          adv_wpp_venda_aumentou_qtd: number | null
          adv_wpp_venda_triplicou: boolean | null
          adv_wpp_venda_triplicou_qtd: number | null
          bm: string | null
          created_at: string
          ctr: number | null
          custo: number | null
          data_id: string
          id: string
          nome: string
          roas: number | null
          rt: boolean | null
          rt_aumentou: boolean | null
          rt_aumentou_qtd: number | null
          rt_triplicou: boolean | null
          rt_triplicou_qtd: number | null
          site_venda: boolean | null
          site_venda_aumentou: boolean | null
          site_venda_aumentou_qtd: number | null
          site_venda_triplicou: boolean | null
          site_venda_triplicou_qtd: number | null
          status: string | null
          stories_testado: boolean | null
          updated_at: string
          wpp_engaj: boolean | null
          wpp_engaj_aumentou: boolean | null
          wpp_engaj_aumentou_qtd: number | null
          wpp_engaj_triplicou: boolean | null
          wpp_engaj_triplicou_qtd: number | null
          wpp_venda: boolean | null
          wpp_venda_aumentou: boolean | null
          wpp_venda_aumentou_qtd: number | null
          wpp_venda_triplicou: boolean | null
          wpp_venda_triplicou_qtd: number | null
        }
        Insert: {
          acc?: string | null
          adv_rt?: boolean | null
          adv_rt_aumentou?: boolean | null
          adv_rt_aumentou_qtd?: number | null
          adv_rt_triplicou?: boolean | null
          adv_rt_triplicou_qtd?: number | null
          adv_site_venda?: boolean | null
          adv_site_venda_aumentou?: boolean | null
          adv_site_venda_aumentou_qtd?: number | null
          adv_site_venda_triplicou?: boolean | null
          adv_site_venda_triplicou_qtd?: number | null
          adv_wpp_engaj?: boolean | null
          adv_wpp_engaj_aumentou?: boolean | null
          adv_wpp_engaj_aumentou_qtd?: number | null
          adv_wpp_engaj_triplicou?: boolean | null
          adv_wpp_engaj_triplicou_qtd?: number | null
          adv_wpp_venda?: boolean | null
          adv_wpp_venda_aumentou?: boolean | null
          adv_wpp_venda_aumentou_qtd?: number | null
          adv_wpp_venda_triplicou?: boolean | null
          adv_wpp_venda_triplicou_qtd?: number | null
          bm?: string | null
          created_at?: string
          ctr?: number | null
          custo?: number | null
          data_id: string
          id?: string
          nome: string
          roas?: number | null
          rt?: boolean | null
          rt_aumentou?: boolean | null
          rt_aumentou_qtd?: number | null
          rt_triplicou?: boolean | null
          rt_triplicou_qtd?: number | null
          site_venda?: boolean | null
          site_venda_aumentou?: boolean | null
          site_venda_aumentou_qtd?: number | null
          site_venda_triplicou?: boolean | null
          site_venda_triplicou_qtd?: number | null
          status?: string | null
          stories_testado?: boolean | null
          updated_at?: string
          wpp_engaj?: boolean | null
          wpp_engaj_aumentou?: boolean | null
          wpp_engaj_aumentou_qtd?: number | null
          wpp_engaj_triplicou?: boolean | null
          wpp_engaj_triplicou_qtd?: number | null
          wpp_venda?: boolean | null
          wpp_venda_aumentou?: boolean | null
          wpp_venda_aumentou_qtd?: number | null
          wpp_venda_triplicou?: boolean | null
          wpp_venda_triplicou_qtd?: number | null
        }
        Update: {
          acc?: string | null
          adv_rt?: boolean | null
          adv_rt_aumentou?: boolean | null
          adv_rt_aumentou_qtd?: number | null
          adv_rt_triplicou?: boolean | null
          adv_rt_triplicou_qtd?: number | null
          adv_site_venda?: boolean | null
          adv_site_venda_aumentou?: boolean | null
          adv_site_venda_aumentou_qtd?: number | null
          adv_site_venda_triplicou?: boolean | null
          adv_site_venda_triplicou_qtd?: number | null
          adv_wpp_engaj?: boolean | null
          adv_wpp_engaj_aumentou?: boolean | null
          adv_wpp_engaj_aumentou_qtd?: number | null
          adv_wpp_engaj_triplicou?: boolean | null
          adv_wpp_engaj_triplicou_qtd?: number | null
          adv_wpp_venda?: boolean | null
          adv_wpp_venda_aumentou?: boolean | null
          adv_wpp_venda_aumentou_qtd?: number | null
          adv_wpp_venda_triplicou?: boolean | null
          adv_wpp_venda_triplicou_qtd?: number | null
          bm?: string | null
          created_at?: string
          ctr?: number | null
          custo?: number | null
          data_id?: string
          id?: string
          nome?: string
          roas?: number | null
          rt?: boolean | null
          rt_aumentou?: boolean | null
          rt_aumentou_qtd?: number | null
          rt_triplicou?: boolean | null
          rt_triplicou_qtd?: number | null
          site_venda?: boolean | null
          site_venda_aumentou?: boolean | null
          site_venda_aumentou_qtd?: number | null
          site_venda_triplicou?: boolean | null
          site_venda_triplicou_qtd?: number | null
          status?: string | null
          stories_testado?: boolean | null
          updated_at?: string
          wpp_engaj?: boolean | null
          wpp_engaj_aumentou?: boolean | null
          wpp_engaj_aumentou_qtd?: number | null
          wpp_engaj_triplicou?: boolean | null
          wpp_engaj_triplicou_qtd?: number | null
          wpp_venda?: boolean | null
          wpp_venda_aumentou?: boolean | null
          wpp_venda_aumentou_qtd?: number | null
          wpp_venda_triplicou?: boolean | null
          wpp_venda_triplicou_qtd?: number | null
        }
        Relationships: []
      }
      daily_services: {
        Row: {
          created_at: string
          id: string
          platform: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          platform: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          platform?: string
          updated_at?: string
        }
        Relationships: []
      }
      "disparo 0407": {
        Row: {
          chip_instancia: number | null
          disparo: string | null
          telefone: number
        }
        Insert: {
          chip_instancia?: number | null
          disparo?: string | null
          telefone: number
        }
        Update: {
          chip_instancia?: number | null
          disparo?: string | null
          telefone?: number
        }
        Relationships: []
      }
      disparo_meta: {
        Row: {
          client_id: string
          event_id: string | null
          event_time: string | null
          id: number
          status: string | null
          tipo_evento: string | null
        }
        Insert: {
          client_id: string
          event_id?: string | null
          event_time?: string | null
          id?: number
          status?: string | null
          tipo_evento?: string | null
        }
        Update: {
          client_id?: string
          event_id?: string | null
          event_time?: string | null
          id?: number
          status?: string | null
          tipo_evento?: string | null
        }
        Relationships: []
      }
      disparo_teste: {
        Row: {
          disparou: string | null
          "hora para disparo": string | null
          telefone: string
        }
        Insert: {
          disparou?: string | null
          "hora para disparo"?: string | null
          telefone: string
        }
        Update: {
          disparou?: string | null
          "hora para disparo"?: string | null
          telefone?: string
        }
        Relationships: []
      }
      estagio_lead: {
        Row: {
          estagio: string | null
          id: string
          instancia: string | null
          telefone: string
        }
        Insert: {
          estagio?: string | null
          id?: string
          instancia?: string | null
          telefone: string
        }
        Update: {
          estagio?: string | null
          id?: string
          instancia?: string | null
          telefone?: string
        }
        Relationships: []
      }
      etapa_que_parou: {
        Row: {
          "data e hora": string | null
          etapa: string
          telefone: string
        }
        Insert: {
          "data e hora"?: string | null
          etapa: string
          telefone: string
        }
        Update: {
          "data e hora"?: string | null
          etapa?: string
          telefone?: string
        }
        Relationships: []
      }
      front_redirecionamento: {
        Row: {
          ativo: boolean | null
          background_color: string | null
          background_image: string | null
          cor_principal: string | null
          criou: string
          id: number
          imagem_loading: string | null
          nome: string | null
          subtitulo: string | null
          titulo: string | null
        }
        Insert: {
          ativo?: boolean | null
          background_color?: string | null
          background_image?: string | null
          cor_principal?: string | null
          criou?: string
          id?: number
          imagem_loading?: string | null
          nome?: string | null
          subtitulo?: string | null
          titulo?: string | null
        }
        Update: {
          ativo?: boolean | null
          background_color?: string | null
          background_image?: string | null
          cor_principal?: string | null
          criou?: string
          id?: number
          imagem_loading?: string | null
          nome?: string | null
          subtitulo?: string | null
          titulo?: string | null
        }
        Relationships: []
      }
      grupovip: {
        Row: {
          "dia da semana": string
          "foi disparo": string | null
          horário: string | null
          id: number
          mensagem: string | null
        }
        Insert: {
          "dia da semana": string
          "foi disparo"?: string | null
          horário?: string | null
          id?: number
          mensagem?: string | null
        }
        Update: {
          "dia da semana"?: string
          "foi disparo"?: string | null
          horário?: string | null
          id?: number
          mensagem?: string | null
        }
        Relationships: []
      }
      grupovipidmensagem: {
        Row: {
          apagou: string | null
          dia: string
          id: number
          "id-mensagem": string | null
        }
        Insert: {
          apagou?: string | null
          dia: string
          id?: number
          "id-mensagem"?: string | null
        }
        Update: {
          apagou?: string | null
          dia?: string
          id?: number
          "id-mensagem"?: string | null
        }
        Relationships: []
      }
      hastingpromo: {
        Row: {
          dia: string
          id: number
          mensagem: string | null
        }
        Insert: {
          dia: string
          id?: number
          mensagem?: string | null
        }
        Update: {
          dia?: string
          id?: number
          mensagem?: string | null
        }
        Relationships: []
      }
      historico_mensagem: {
        Row: {
          mensagem: string
          nome: string | null
          primeira: string | null
          resolvido: string | null
          telefone: string
          ultima: string | null
          visualizado: string | null
        }
        Insert: {
          mensagem: string
          nome?: string | null
          primeira?: string | null
          resolvido?: string | null
          telefone: string
          ultima?: string | null
          visualizado?: string | null
        }
        Update: {
          mensagem?: string
          nome?: string | null
          primeira?: string | null
          resolvido?: string | null
          telefone?: string
          ultima?: string | null
          visualizado?: string | null
        }
        Relationships: []
      }
      historico_mensagem_nome_caixa: {
        Row: {
          caixa: string
          "id meta": string | null
          telefone: string
        }
        Insert: {
          caixa: string
          "id meta"?: string | null
          telefone: string
        }
        Update: {
          caixa?: string
          "id meta"?: string | null
          telefone?: string
        }
        Relationships: []
      }
      instancias: {
        Row: {
          api_key_meta: string | null
          id_chatwoot: string | null
          id_conta_wb: string | null
          id_meta: string | null
          it_evo: string | null
          responsável: string | null
          telefone: string
        }
        Insert: {
          api_key_meta?: string | null
          id_chatwoot?: string | null
          id_conta_wb?: string | null
          id_meta?: string | null
          it_evo?: string | null
          responsável?: string | null
          telefone: string
        }
        Update: {
          api_key_meta?: string | null
          id_chatwoot?: string | null
          id_conta_wb?: string | null
          id_meta?: string | null
          it_evo?: string | null
          responsável?: string | null
          telefone?: string
        }
        Relationships: []
      }
      jornada_de_compra: {
        Row: {
          action_source: string | null
          browser: string | null
          "carrinho de compras - funil 03": string | null
          chip_instancia: string | null
          cidade: string | null
          client_code: number | null
          Comprou: string | null
          device_type: string | null
          estado: string | null
          event_id: string | null
          event_source_url: string | null
          external_id: string | null
          fbc: string | null
          fbclid: string | null
          "Fez Contato": string | null
          "Finalização de compra - funil 04": string | null
          id: number
          ip: string | null
          nome: string | null
          operating_system: string | null
          origem: string | null
          pais: string | null
          primeira_mensagem: string | null
          screen_resolution: string | null
          telefone: string
          timestamp_horario_que_entrou_no_site: string | null
          tintim_fbid: string | null
          ultima_mensagem: string | null
          ultimo_contato: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          valor_compra: string | null
          "Visualizar conteúdo - funil 02": string | null
        }
        Insert: {
          action_source?: string | null
          browser?: string | null
          "carrinho de compras - funil 03"?: string | null
          chip_instancia?: string | null
          cidade?: string | null
          client_code?: number | null
          Comprou?: string | null
          device_type?: string | null
          estado?: string | null
          event_id?: string | null
          event_source_url?: string | null
          external_id?: string | null
          fbc?: string | null
          fbclid?: string | null
          "Fez Contato"?: string | null
          "Finalização de compra - funil 04"?: string | null
          id?: number
          ip?: string | null
          nome?: string | null
          operating_system?: string | null
          origem?: string | null
          pais?: string | null
          primeira_mensagem?: string | null
          screen_resolution?: string | null
          telefone: string
          timestamp_horario_que_entrou_no_site?: string | null
          tintim_fbid?: string | null
          ultima_mensagem?: string | null
          ultimo_contato?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          valor_compra?: string | null
          "Visualizar conteúdo - funil 02"?: string | null
        }
        Update: {
          action_source?: string | null
          browser?: string | null
          "carrinho de compras - funil 03"?: string | null
          chip_instancia?: string | null
          cidade?: string | null
          client_code?: number | null
          Comprou?: string | null
          device_type?: string | null
          estado?: string | null
          event_id?: string | null
          event_source_url?: string | null
          external_id?: string | null
          fbc?: string | null
          fbclid?: string | null
          "Fez Contato"?: string | null
          "Finalização de compra - funil 04"?: string | null
          id?: number
          ip?: string | null
          nome?: string | null
          operating_system?: string | null
          origem?: string | null
          pais?: string | null
          primeira_mensagem?: string | null
          screen_resolution?: string | null
          telefone?: string
          timestamp_horario_que_entrou_no_site?: string | null
          tintim_fbid?: string | null
          ultima_mensagem?: string | null
          ultimo_contato?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          valor_compra?: string | null
          "Visualizar conteúdo - funil 02"?: string | null
        }
        Relationships: []
      }
      lancamento_engagehub: {
        Row: {
          data: string
          id: string
          valor_fornecedor: string | null
          valor_meta: string | null
        }
        Insert: {
          data: string
          id?: string
          valor_fornecedor?: string | null
          valor_meta?: string | null
        }
        Update: {
          data?: string
          id?: string
          valor_fornecedor?: string | null
          valor_meta?: string | null
        }
        Relationships: []
      }
      meta_inf_numero: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      numeros_redirecionados: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          mensagem_padrao: string
          porcentagem: number
          telefone: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id?: string
          mensagem_padrao?: string
          porcentagem?: number
          telefone: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          mensagem_padrao?: string
          porcentagem?: number
          telefone?: string
          updated_at?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      pesquisas_suporte: {
        Row: {
          agente_nome: string
          cliente_telefone: string
          contato_email_cliente: string | null
          contato_nome_cliente: string | null
          created_at: string
          id: string
          nota_satisfacao: number
          problema_resolvido: boolean
        }
        Insert: {
          agente_nome: string
          cliente_telefone: string
          contato_email_cliente?: string | null
          contato_nome_cliente?: string | null
          created_at?: string
          id?: string
          nota_satisfacao: number
          problema_resolvido: boolean
        }
        Update: {
          agente_nome?: string
          cliente_telefone?: string
          contato_email_cliente?: string | null
          contato_nome_cliente?: string | null
          created_at?: string
          id?: string
          nota_satisfacao?: number
          problema_resolvido?: boolean
        }
        Relationships: []
      }
      pixautom: {
        Row: {
          "data e hora": string
          telefone: string
        }
        Insert: {
          "data e hora": string
          telefone: string
        }
        Update: {
          "data e hora"?: string
          telefone?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string | null
          role: string
          theme_preference: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          name?: string | null
          role?: string
          theme_preference?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          role?: string
          theme_preference?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      recuperacao: {
        Row: {
          api: string | null
          created_at: string | null
          "horario envio": string | null
          id: number
          instancia: string | null
          phone: string | null
          REMARKETING: string | null
          status: string | null
        }
        Insert: {
          api?: string | null
          created_at?: string | null
          "horario envio"?: string | null
          id?: number
          instancia?: string | null
          phone?: string | null
          REMARKETING?: string | null
          status?: string | null
        }
        Update: {
          api?: string | null
          created_at?: string | null
          "horario envio"?: string | null
          id?: number
          instancia?: string | null
          phone?: string | null
          REMARKETING?: string | null
          status?: string | null
        }
        Relationships: []
      }
      recuperacao_mensagens: {
        Row: {
          id: string | null
          mensagem: string | null
          status: string
        }
        Insert: {
          id?: string | null
          mensagem?: string | null
          status: string
        }
        Update: {
          id?: string | null
          mensagem?: string | null
          status?: string
        }
        Relationships: []
      }
      registros_telefone: {
        Row: {
          api_ig: string | null
          telefone: number
        }
        Insert: {
          api_ig?: string | null
          telefone?: number
        }
        Update: {
          api_ig?: string | null
          telefone?: number
        }
        Relationships: []
      }
      remarketing1h12h: {
        Row: {
          "12h status": boolean | null
          "12hnovo status": boolean | null
          "1h status": boolean | null
          apikey: string | null
          "criado em": string | null
          id: number
          instancia: string | null
          "REMARKETING DIAS": string | null
          telefone: number
        }
        Insert: {
          "12h status"?: boolean | null
          "12hnovo status"?: boolean | null
          "1h status"?: boolean | null
          apikey?: string | null
          "criado em"?: string | null
          id?: number
          instancia?: string | null
          "REMARKETING DIAS"?: string | null
          telefone: number
        }
        Update: {
          "12h status"?: boolean | null
          "12hnovo status"?: boolean | null
          "1h status"?: boolean | null
          apikey?: string | null
          "criado em"?: string | null
          id?: number
          instancia?: string | null
          "REMARKETING DIAS"?: string | null
          telefone?: number
        }
        Relationships: []
      }
      rowid: {
        Row: {
          "1250S DATA&HR": string | null
          "1250S NO OF": string | null
          "1250S NO OF DT&HR": string | null
          "1250S OFERTA": string | null
          "2450S DATA&HR": string | null
          "2450S OFERTA": string | null
          "300S NO OF": string | null
          "300S NO OF DT&HR": string | null
          "300S OFERTA": string
          "300SDATA&HORA": string | null
          "5000S DATA&HR": string | null
          "5000S OFERTA": string | null
          "600S DATA&HR": string | null
          "600S NO OF": string | null
          "600S NO OF DT&HR": string | null
          "600S OFERTA": string | null
          telefone: string
        }
        Insert: {
          "1250S DATA&HR"?: string | null
          "1250S NO OF"?: string | null
          "1250S NO OF DT&HR"?: string | null
          "1250S OFERTA"?: string | null
          "2450S DATA&HR"?: string | null
          "2450S OFERTA"?: string | null
          "300S NO OF"?: string | null
          "300S NO OF DT&HR"?: string | null
          "300S OFERTA"?: string
          "300SDATA&HORA"?: string | null
          "5000S DATA&HR"?: string | null
          "5000S OFERTA"?: string | null
          "600S DATA&HR"?: string | null
          "600S NO OF"?: string | null
          "600S NO OF DT&HR"?: string | null
          "600S OFERTA"?: string | null
          telefone: string
        }
        Update: {
          "1250S DATA&HR"?: string | null
          "1250S NO OF"?: string | null
          "1250S NO OF DT&HR"?: string | null
          "1250S OFERTA"?: string | null
          "2450S DATA&HR"?: string | null
          "2450S OFERTA"?: string | null
          "300S NO OF"?: string | null
          "300S NO OF DT&HR"?: string | null
          "300S OFERTA"?: string
          "300SDATA&HORA"?: string | null
          "5000S DATA&HR"?: string | null
          "5000S OFERTA"?: string | null
          "600S DATA&HR"?: string | null
          "600S NO OF"?: string | null
          "600S NO OF DT&HR"?: string | null
          "600S OFERTA"?: string | null
          telefone?: string
        }
        Relationships: []
      }
      service_metrics: {
        Row: {
          created_at: string
          icon_color: string
          icon_name: string
          id: string
          name: string
          service_id: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          icon_color?: string
          icon_name?: string
          id?: string
          name: string
          service_id: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          icon_color?: string
          icon_name?: string
          id?: string
          name?: string
          service_id?: string
          updated_at?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_metrics_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "daily_services"
            referencedColumns: ["id"]
          },
        ]
      }
      servicos: {
        Row: {
          AddUpsellSeguidores: string | null
          DescricaoPacote: string | null
          descricaoUpsell: string | null
          id: number
          Pacote: string | null
          "rede social": string | null
          servico: string | null
          UpsellQntFinal: string | null
          ValorPacote: string | null
          ValorUpsell: string | null
        }
        Insert: {
          AddUpsellSeguidores?: string | null
          DescricaoPacote?: string | null
          descricaoUpsell?: string | null
          id?: number
          Pacote?: string | null
          "rede social"?: string | null
          servico?: string | null
          UpsellQntFinal?: string | null
          ValorPacote?: string | null
          ValorUpsell?: string | null
        }
        Update: {
          AddUpsellSeguidores?: string | null
          DescricaoPacote?: string | null
          descricaoUpsell?: string | null
          id?: number
          Pacote?: string | null
          "rede social"?: string | null
          servico?: string | null
          UpsellQntFinal?: string | null
          ValorPacote?: string | null
          ValorUpsell?: string | null
        }
        Relationships: []
      }
      stanzaId: {
        Row: {
          estagio: string | null
          Id: string
          idautomatico: string
          part1: string | null
          part2: string | null
          serviço: string | null
          telefone: number
        }
        Insert: {
          estagio?: string | null
          Id: string
          idautomatico?: string
          part1?: string | null
          part2?: string | null
          serviço?: string | null
          telefone: number
        }
        Update: {
          estagio?: string | null
          Id?: string
          idautomatico?: string
          part1?: string | null
          part2?: string | null
          serviço?: string | null
          telefone?: number
        }
        Relationships: []
      }
      template_remarketing: {
        Row: {
          "data de criação": string
          enviar: string | null
          id: string
          telefone: string | null
        }
        Insert: {
          "data de criação": string
          enviar?: string | null
          id?: string
          telefone?: string | null
        }
        Update: {
          "data de criação"?: string
          enviar?: string | null
          id?: string
          telefone?: string | null
        }
        Relationships: []
      }
      templatecomprou1007: {
        Row: {
          DISPAROU: string | null
          DISPAROUOFF: string | null
          id: string
          TELEFONE: number
        }
        Insert: {
          DISPAROU?: string | null
          DISPAROUOFF?: string | null
          id: string
          TELEFONE: number
        }
        Update: {
          DISPAROU?: string | null
          DISPAROUOFF?: string | null
          id?: string
          TELEFONE?: number
        }
        Relationships: []
      }
      testeenviotemplate: {
        Row: {
          disparou: string | null
          id: number
          telefone: number | null
        }
        Insert: {
          disparou?: string | null
          id: number
          telefone?: number | null
        }
        Update: {
          disparou?: string | null
          id?: number
          telefone?: number | null
        }
        Relationships: []
      }
      textos_redirecionamento: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          numero_id: string
          texto: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id?: string
          numero_id: string
          texto: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          numero_id?: string
          texto?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "textos_redirecionamento_numero_id_fkey"
            columns: ["numero_id"]
            isOneToOne: false
            referencedRelation: "numeros_redirecionados"
            referencedColumns: ["id"]
          },
        ]
      }
      tintim: {
        Row: {
          "Código da Conta": string | null
          "Conta ativa?": boolean | null
          ctwa_clid: string | null
          "Data da Primeira Mensagem": string | null
          "Data da Última Mensagem": string | null
          "Data da venda": string | null
          Estado: string | null
          "Etapa da Jornada": string | null
          "Facebook Pixel": number | null
          fbclid: string | null
          "ID da Campanha de Anúncio": number | null
          "Id da Campanha de Anúncio Google": string | null
          "ID do Anúncio": number | null
          "Id do Anúncio Google": string | null
          "ID do Conjunto de Anúncio": number | null
          "Id do Grupo de Anúncio Google": string | null
          "Link Rastreável": string | null
          "Nome da Campanha de Anúncio": string | null
          "Nome da Campanha do Anúncio Google": string | null
          "Nome da Conta": string | null
          "Nome do Anúncio": string | null
          "Nome do Anúncio Google": string | null
          "Nome do Conjunto de Anúncio": string | null
          "Nome do Contato": string | null
          "Nome do Grupo de Anúncio Google": string | null
          Origem: string | null
          País: string | null
          publicos: string | null
          rowid: string | null
          tintim_fbid: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_id: number | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: number | null
          "Valor da Venda": string | null
          "WhatsApp do Contato": number
        }
        Insert: {
          "Código da Conta"?: string | null
          "Conta ativa?"?: boolean | null
          ctwa_clid?: string | null
          "Data da Primeira Mensagem"?: string | null
          "Data da Última Mensagem"?: string | null
          "Data da venda"?: string | null
          Estado?: string | null
          "Etapa da Jornada"?: string | null
          "Facebook Pixel"?: number | null
          fbclid?: string | null
          "ID da Campanha de Anúncio"?: number | null
          "Id da Campanha de Anúncio Google"?: string | null
          "ID do Anúncio"?: number | null
          "Id do Anúncio Google"?: string | null
          "ID do Conjunto de Anúncio"?: number | null
          "Id do Grupo de Anúncio Google"?: string | null
          "Link Rastreável"?: string | null
          "Nome da Campanha de Anúncio"?: string | null
          "Nome da Campanha do Anúncio Google"?: string | null
          "Nome da Conta"?: string | null
          "Nome do Anúncio"?: string | null
          "Nome do Anúncio Google"?: string | null
          "Nome do Conjunto de Anúncio"?: string | null
          "Nome do Contato"?: string | null
          "Nome do Grupo de Anúncio Google"?: string | null
          Origem?: string | null
          País?: string | null
          publicos?: string | null
          rowid?: string | null
          tintim_fbid?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_id?: number | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: number | null
          "Valor da Venda"?: string | null
          "WhatsApp do Contato": number
        }
        Update: {
          "Código da Conta"?: string | null
          "Conta ativa?"?: boolean | null
          ctwa_clid?: string | null
          "Data da Primeira Mensagem"?: string | null
          "Data da Última Mensagem"?: string | null
          "Data da venda"?: string | null
          Estado?: string | null
          "Etapa da Jornada"?: string | null
          "Facebook Pixel"?: number | null
          fbclid?: string | null
          "ID da Campanha de Anúncio"?: number | null
          "Id da Campanha de Anúncio Google"?: string | null
          "ID do Anúncio"?: number | null
          "Id do Anúncio Google"?: string | null
          "ID do Conjunto de Anúncio"?: number | null
          "Id do Grupo de Anúncio Google"?: string | null
          "Link Rastreável"?: string | null
          "Nome da Campanha de Anúncio"?: string | null
          "Nome da Campanha do Anúncio Google"?: string | null
          "Nome da Conta"?: string | null
          "Nome do Anúncio"?: string | null
          "Nome do Anúncio Google"?: string | null
          "Nome do Conjunto de Anúncio"?: string | null
          "Nome do Contato"?: string | null
          "Nome do Grupo de Anúncio Google"?: string | null
          Origem?: string | null
          País?: string | null
          publicos?: string | null
          rowid?: string | null
          tintim_fbid?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_id?: number | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: number | null
          "Valor da Venda"?: string | null
          "WhatsApp do Contato"?: number
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number | null
          bank: string | null
          cashier: string | null
          created_at: string
          customer: string | null
          id: string
          image_url: string | null
          payment_date: string | null
          payment_type: string | null
          phone_number: string | null
          resolved: boolean | null
          resolved_by: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          amount?: number | null
          bank?: string | null
          cashier?: string | null
          created_at?: string
          customer?: string | null
          id?: string
          image_url?: string | null
          payment_date?: string | null
          payment_type?: string | null
          phone_number?: string | null
          resolved?: boolean | null
          resolved_by?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number | null
          bank?: string | null
          cashier?: string | null
          created_at?: string
          customer?: string | null
          id?: string
          image_url?: string | null
          payment_date?: string | null
          payment_type?: string | null
          phone_number?: string | null
          resolved?: boolean | null
          resolved_by?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_permissions: {
        Row: {
          created_at: string
          id: string
          permission_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          permission_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          permission_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      utm: {
        Row: {
          browser: string | null
          cidade: string | null
          client_code: number | null
          device_type: string | null
          estado: string | null
          event_id: string | null
          external_id: string | null
          fbc: string | null
          fbclid: string | null
          fbp: string | null
          id: string
          ip: string | null
          N8N_RETORNOU: string | null
          numero_redirecionado: string | null
          operating_system: string | null
          pagina: string | null
          pais: string | null
          rede_social: string | null
          rede_social_local: string | null
          screen_resolution: string | null
          telefone: string | null
          timestamp: string
          tintim_fbid: string | null
          user_agent: string | null
          utm_campaign: string
          utm_content: string
          utm_medium: string
          utm_source: string
          whatsapp_redirected: boolean
        }
        Insert: {
          browser?: string | null
          cidade?: string | null
          client_code?: number | null
          device_type?: string | null
          estado?: string | null
          event_id?: string | null
          external_id?: string | null
          fbc?: string | null
          fbclid?: string | null
          fbp?: string | null
          id?: string
          ip?: string | null
          N8N_RETORNOU?: string | null
          numero_redirecionado?: string | null
          operating_system?: string | null
          pagina?: string | null
          pais?: string | null
          rede_social?: string | null
          rede_social_local?: string | null
          screen_resolution?: string | null
          telefone?: string | null
          timestamp: string
          tintim_fbid?: string | null
          user_agent?: string | null
          utm_campaign: string
          utm_content: string
          utm_medium: string
          utm_source: string
          whatsapp_redirected?: boolean
        }
        Update: {
          browser?: string | null
          cidade?: string | null
          client_code?: number | null
          device_type?: string | null
          estado?: string | null
          event_id?: string | null
          external_id?: string | null
          fbc?: string | null
          fbclid?: string | null
          fbp?: string | null
          id?: string
          ip?: string | null
          N8N_RETORNOU?: string | null
          numero_redirecionado?: string | null
          operating_system?: string | null
          pagina?: string | null
          pais?: string | null
          rede_social?: string | null
          rede_social_local?: string | null
          screen_resolution?: string | null
          telefone?: string | null
          timestamp?: string
          tintim_fbid?: string | null
          user_agent?: string | null
          utm_campaign?: string
          utm_content?: string
          utm_medium?: string
          utm_source?: string
          whatsapp_redirected?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
