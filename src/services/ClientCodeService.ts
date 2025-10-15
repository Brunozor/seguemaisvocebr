import { supabase } from "../integrations/supabase/client";
import CacheService from "./CacheService";

export class ClientCodeService {
  public async generateClientCode(): Promise<number> {
    try {
      console.log("[ClientCode] Iniciando geração do client_code...");

      // 1. Tenta pegar do cache
      let cachedCodes = CacheService.get<number[]>("recent_client_codes");

      if (cachedCodes && cachedCodes.length > 0) {
        const nextCode = this.calculateNextCode(cachedCodes);
        this.updateCache(nextCode, cachedCodes);
        return nextCode;
      }

      // 2. Se não tem cache, busca últimos no Supabase
      const { data: recentCodes, error } = await supabase
        .from("utm")
        .select("client_code, timestamp")
        .not("client_code", "is", null)
        .order("timestamp", { ascending: false })
        .limit(10);

      if (error) {
        console.error("[ClientCode] Erro ao buscar códigos:", error);
        return this.getContingencyCode();
      }

      const codes = (recentCodes ?? [])
        .map(r => r.client_code)
        .filter(Boolean) as number[];

      const nextCode = codes.length > 0 ? this.calculateNextCode(codes) : 1;
      this.updateCache(nextCode, codes);

      console.log("[ClientCode] Código final:", nextCode);
      return nextCode;
    } catch (err) {
      console.error("[ClientCode] Erro na geração:", err);
      return this.getContingencyCode();
    }
  }

  private calculateNextCode(codes: number[]): number {
    const maxCode = Math.max(...codes, 0);
    let nextCode = maxCode + 1;

    if (nextCode > 999) nextCode = 1;

    if (codes.includes(nextCode)) {
      return this.findNextAvailableCode(codes, nextCode);
    }

    return nextCode;
  }

  private findNextAvailableCode(codes: number[], start: number): number {
    let candidate = start;
    for (let i = 0; i < 999; i++) {
      if (!codes.includes(candidate)) return candidate;
      candidate = candidate >= 999 ? 1 : candidate + 1;
    }
    return this.getContingencyCode();
  }

  private updateCache(newCode: number, oldCodes: number[]) {
    const updatedCodes = [newCode, ...oldCodes].slice(0, 10);
    CacheService.set("recent_client_codes", updatedCodes, 10);
  }

  private getContingencyCode(): number {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100);
    const fallback = parseInt(
      timestamp.toString().slice(-2) + random.toString().padStart(2, "0").slice(-1)
    );
    return (fallback % 999) + 1;
  }
}

export default new ClientCodeService();
