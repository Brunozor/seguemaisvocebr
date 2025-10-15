
-- Habilitar RLS na tabela utm se ainda não estiver habilitado
ALTER TABLE public.utm ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir INSERT público (qualquer usuário pode inserir dados UTM)
CREATE POLICY "Allow public insert on utm" 
ON public.utm 
FOR INSERT 
WITH CHECK (true);

-- Criar política para permitir SELECT público (qualquer usuário pode visualizar dados UTM)
CREATE POLICY "Allow public select on utm" 
ON public.utm 
FOR SELECT 
USING (true);

-- Criar política para permitir UPDATE público se necessário
CREATE POLICY "Allow public update on utm" 
ON public.utm 
FOR UPDATE 
USING (true);
