
import { supabase } from "../integrations/supabase/client";
import { RedirecionamentoNumero, TextoRedirecionamento } from "../types/utm";
import CacheService from "./CacheService";

export class PhoneRedirectionService {
  private async getTextosAtivosParaNumero(numeroId: string): Promise<TextoRedirecionamento[]> {
    try {
      // Check cache first
      const cacheKey = `textos_${numeroId}`;
      const cached = CacheService.get<TextoRedirecionamento[]>(cacheKey);
      
      if (cached) {
        console.log("[PhoneService] Using cached textos for numero:", numeroId);
        return cached;
      }

      const { data, error } = await supabase
        .from('textos_redirecionamento')
        .select('*')
        .eq('numero_id', numeroId)
        .eq('ativo', true);

      if (error) {
        console.error("Error fetching textos for numero:", error);
        return [];
      }

      const textos = data || [];
      
      // Cache for 30 minutes
      CacheService.set(cacheKey, textos, 30);
      
      return textos;
    } catch (error) {
      console.error("Error in getTextosAtivosParaNumero:", error);
      return [];
    }
  }

  private randomizarTexto(textos: TextoRedirecionamento[]): string {
    if (textos.length === 0) {
      return 'Olá! Tenho interesse. Sou o cliente XXX me manda as promoções por gentileza!! (obrigatório o envio desta mensagem para ser atendido)';
    }

    const index = Math.floor(Math.random() * textos.length);
    return textos[index].texto;
  }

  private selecionarNumeroPorPorcentagem(numeros: RedirecionamentoNumero[]): RedirecionamentoNumero {
    if (numeros.length === 0) return this.getFallbackNumber();
    if (numeros.length === 1) return numeros[0];

    const total = numeros.reduce((sum, num) => sum + num.porcentagem, 0);

    if (total === 0) {
      const index = Math.floor(Math.random() * numeros.length);
      return numeros[index];
    }

    const rand = Math.random() * total;
    let acc = 0;

    for (const numero of numeros) {
      acc += numero.porcentagem;
      if (rand <= acc) return numero;
    }

    // Fallback por segurança
    return numeros[numeros.length - 1];
  }

  public async getActivePhoneNumber(): Promise<RedirecionamentoNumero> {
    try {
      console.log("[PhoneService] Getting active phone number with cache...");
      
      // Check cache first
      const cacheKey = 'active_phone_numbers';
      const cachedNumbers = CacheService.get<RedirecionamentoNumero[]>(cacheKey);
      
      let activeNumbers: any[];
      
      if (cachedNumbers) {
        console.log("[PhoneService] Using cached phone numbers");
        activeNumbers = cachedNumbers;
      } else {
        const { data, error } = await supabase
          .from('numeros_redirecionados')
          .select('*')
          .eq('ativo', true)
          .order('created_at', { ascending: true });

        if (error || !data || data.length === 0) {
          console.warn("No active phone numbers found");
          return this.getFallbackNumber();
        }

        activeNumbers = data;
        
        // Cache for 30 minutes
        CacheService.set(cacheKey, activeNumbers, 30);
      }

      const numerosFormatados: RedirecionamentoNumero[] = activeNumbers.map(num => ({
        id: num.id,
        telefone: num.telefone,
        ativo: num.ativo,
        porcentagem: num.porcentagem,
        mensagem: ''
      }));

      const numeroSelecionado = this.selecionarNumeroPorPorcentagem(numerosFormatados);
      const textosAtivos = await this.getTextosAtivosParaNumero(numeroSelecionado.id);
      const texto = this.randomizarTexto(textosAtivos);

      return {
        ...numeroSelecionado,
        mensagem: texto,
        textos: textosAtivos
      };
    } catch (error) {
      console.error("Error getting active phone number:", error);
      return this.getFallbackNumber();
    }
  }

  private getFallbackNumber(): RedirecionamentoNumero {
    return {
      id: "fallback",
      telefone: "559180112820",
      ativo: true,
      porcentagem: 100,
      mensagem: "Olá! Tenho interesse. Sou o cliente XXX me manda as promoções por gentileza!! (obrigatório o envio desta mensagem para ser atendido)"
    };
  }
}

export default new PhoneRedirectionService();
