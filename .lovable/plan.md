

## Correção do `external_id`: IP sem pontos + code

**Objetivo**: Usar `ip.replace(/\./g, "") + webhookData.code` como `external_id` em todos os pontos, servindo como chave de deduplicação no Meta.

**Alterações em `src/pages/Index.tsx`**:

1. **Criar o `external_id` composto** (após obter `ip` e `webhookData`, ~linha 254):
   ```ts
   const externalId = ip.replace(/\./g, "") + webhookData.code;
   ```

2. **Linha 260** — Advanced Matching do Pixel:
   ```ts
   external_id: externalId,
   ```

3. **Linha 305** — Payload do webhook principal:
   ```ts
   external_id: externalId,
   ```

Três linhas alteradas, mesmo arquivo. O `external_id` será idêntico no Meta Pixel e no webhook, permitindo deduplicação correta.

