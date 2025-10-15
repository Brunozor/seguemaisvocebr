
-- Adicionar coluna fbc na tabela utm para armazenar o cookie _fbc do Facebook
ALTER TABLE public.utm 
ADD COLUMN fbc text;
