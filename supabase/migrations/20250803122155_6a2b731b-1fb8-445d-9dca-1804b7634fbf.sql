
-- Adicionar colunas para armazenar dados do Facebook Pixel
ALTER TABLE utm 
ADD COLUMN IF NOT EXISTS external_id text,
ADD COLUMN IF NOT EXISTS event_id text;

-- Criar índice para melhor performance nas consultas por event_id
CREATE INDEX IF NOT EXISTS idx_utm_event_id ON utm(event_id);
