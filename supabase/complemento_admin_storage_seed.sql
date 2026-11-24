-- ============================================================================
-- DOAHUB — COMPLEMENTO DE POLÍTICAS RLS, STORAGE E SEED INICIAL (DBDoaHub)
-- ============================================================================
-- Execute este script no SQL Editor do Supabase para configurar:
-- 1. Políticas RLS para Administradores e Representantes de ONGs
-- 2. Criação do Bucket Privado 'comprovantes' e regras seguras de Storage
-- 3. Inserção de dados iniciais (Seed) de ONGs e Campanhas Oficiais em São Paulo - SP
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. POLÍTICAS DE ROW LEVEL SECURITY (RLS) ADICIONAIS
-- ----------------------------------------------------------------------------

-- Habilita RLS nas tabelas principais
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ongs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campanhas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relatorios_impacto ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinacoes ENABLE ROW LEVEL SECURITY;

-- Helper Function para verificar se o usuário autenticado possui role de 'admin'
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.usuarios
    WHERE id = auth.uid() AND tipo = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1.1 Políticas para public.usuarios
DROP POLICY IF EXISTS "Usuários podem visualizar seus próprios perfis" ON public.usuarios;
CREATE POLICY "Usuários podem visualizar seus próprios perfis"
ON public.usuarios FOR SELECT
TO authenticated
USING (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios perfis" ON public.usuarios;
CREATE POLICY "Usuários podem atualizar seus próprios perfis"
ON public.usuarios FOR UPDATE
TO authenticated
USING (id = auth.uid());

-- 1.2 Políticas para public.ongs
-- Leitura pública para ONGs verificadas
DROP POLICY IF EXISTS "Qualquer pessoa pode visualizar ONGs verificadas" ON public.ongs;
CREATE POLICY "Qualquer pessoa pode visualizar ONGs verificadas"
ON public.ongs FOR SELECT
TO anon, authenticated
USING (is_verificada = true);

-- Admins e proprietários podem visualizar todas as ONGs (mesmo pendentes)
DROP POLICY IF EXISTS "Admins e donos podem ver suas ONGs" ON public.ongs;
CREATE POLICY "Admins e donos podem ver suas ONGs"
ON public.ongs FOR SELECT
TO authenticated
USING (usuario_id = auth.uid() OR public.is_admin());

-- Usuário tipo 'ong' pode cadastrar sua instituição
DROP POLICY IF EXISTS "Usuários tipo ong podem cadastrar instituicao" ON public.ongs;
CREATE POLICY "Usuários tipo ong podem cadastrar instituicao"
ON public.ongs FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = usuario_id 
  AND EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND tipo IN ('ong', 'admin'))
);

-- Usuários tipo 'admin' podem atualizar qualquer ONG (homologação/aprovação RF06)
DROP POLICY IF EXISTS "Admins podem atualizar qualquer ONG e donos editam a sua" ON public.ongs;
CREATE POLICY "Admins podem atualizar qualquer ONG e donos editam a sua"
ON public.ongs FOR UPDATE
TO authenticated
USING (usuario_id = auth.uid() OR public.is_admin())
WITH CHECK (usuario_id = auth.uid() OR public.is_admin());

-- 1.3 Políticas para public.campanhas
DROP POLICY IF EXISTS "Qualquer pessoa pode visualizar campanhas ativas" ON public.campanhas;
CREATE POLICY "Qualquer pessoa pode visualizar campanhas ativas"
ON public.campanhas FOR SELECT
TO anon, authenticated
USING (status = 'Ativa' OR public.is_admin() OR EXISTS (
  SELECT 1 FROM public.ongs WHERE ongs.id = campanhas.ong_id AND ongs.usuario_id = auth.uid()
));

DROP POLICY IF EXISTS "ONGs e Admins podem inserir campanhas" ON public.campanhas;
CREATE POLICY "ONGs e Admins podem inserir campanhas"
ON public.campanhas FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin() OR EXISTS (
    SELECT 1 FROM public.ongs WHERE ongs.id = campanhas.ong_id AND ongs.usuario_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "ONGs e Admins podem atualizar suas campanhas" ON public.campanhas;
CREATE POLICY "ONGs e Admins podem atualizar suas campanhas"
ON public.campanhas FOR UPDATE
TO authenticated
USING (
  public.is_admin() OR EXISTS (
    SELECT 1 FROM public.ongs WHERE ongs.id = campanhas.ong_id AND ongs.usuario_id = auth.uid()
  )
);

-- 1.4 Políticas para public.relatorios_impacto
DROP POLICY IF EXISTS "Leitura pública de relatórios de impacto" ON public.relatorios_impacto;
CREATE POLICY "Leitura pública de relatórios de impacto"
ON public.relatorios_impacto FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "ONGs e Admins criam relatorios de impacto" ON public.relatorios_impacto;
CREATE POLICY "ONGs e Admins criam relatorios de impacto"
ON public.relatorios_impacto FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin() OR EXISTS (
    SELECT 1 FROM public.ongs WHERE ongs.id = relatorios_impacto.ong_id AND ongs.usuario_id = auth.uid()
  )
);

-- 1.5 Políticas para public.destinacoes
DROP POLICY IF EXISTS "Usuários visualizam suas próprias destinações" ON public.destinacoes;
CREATE POLICY "Usuários visualizam suas próprias destinações"
ON public.destinacoes FOR SELECT
TO authenticated
USING (usuario_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Usuários podem registrar destinações" ON public.destinacoes;
CREATE POLICY "Usuários podem registrar destinações"
ON public.destinacoes FOR INSERT
TO authenticated
WITH CHECK (usuario_id = auth.uid());

DROP POLICY IF EXISTS "Usuários podem atualizar comprovantes de suas destinações" ON public.destinacoes;
CREATE POLICY "Usuários podem atualizar comprovantes de suas destinações"
ON public.destinacoes FOR UPDATE
TO authenticated
USING (usuario_id = auth.uid() OR public.is_admin());


-- ----------------------------------------------------------------------------
-- 2. BUCKET PRIVADO 'comprovantes' E POLÍTICAS DE STORAGE
-- ----------------------------------------------------------------------------

-- Criação do Bucket privado se ainda não existir
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'comprovantes',
  'comprovantes',
  false,
  10485760, -- 10MB
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET public = false;

-- Política de Upload: Dono da pasta (auth.uid()::text = (storage.foldername(name))[1]) ou admin
DROP POLICY IF EXISTS "Dono faz upload na sua pasta de comprovantes" ON storage.objects;
CREATE POLICY "Dono faz upload na sua pasta de comprovantes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'comprovantes'
  AND (
    (auth.uid())::text = (storage.foldername(name))[1]
    OR public.is_admin()
  )
);

-- Política de Leitura: Usuário acessa apenas seus próprios arquivos ou Admin
DROP POLICY IF EXISTS "Dono ou Admin visualiza arquivos de comprovante" ON storage.objects;
CREATE POLICY "Dono ou Admin visualiza arquivos de comprovante"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'comprovantes'
  AND (
    (auth.uid())::text = (storage.foldername(name))[1]
    OR public.is_admin()
  )
);

-- ----------------------------------------------------------------------------
-- 3. SEED INICIAL: ONGS VERIFICADAS EM SÃO PAULO E CAMPANHAS ATIVAS
-- ----------------------------------------------------------------------------

DO $$
DECLARE
  v_ong1_id UUID;
  v_ong2_id UUID;
  v_ong3_id UUID;
BEGIN
  -- 3.1 ONG 1: Instituto Criança Cidadã (Fundo Municipal ECA - FUMCAD SP)
  INSERT INTO public.ongs (
    nome, cnpj, email, telefone, website, estado, endereco, cidade, bio,
    fundo_tipo, fundo_cnpj, fundo_nome, is_verificada, meta_global, avatar_url
  ) VALUES (
    'Instituto Criança Cidadã',
    '03.456.789/0001-12',
    'contato@criancacidada.org.br',
    '(11) 3221-4500',
    'https://criancacidada.org.br',
    'SP',
    'Rua Vergueiro, 1200 - Liberdade',
    'São Paulo',
    'Promove reforço escolar, oficinas culturais e iniciação musical para crianças e adolescentes em situação de extrema vulnerabilidade social.',
    'ECA',
    '14.248.887/0001-08',
    'Fundo Municipal dos Direitos da Criança e do Adolescente de São Paulo (FUMCAD SP)',
    true,
    250000.00,
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop'
  )
  RETURNING id INTO v_ong1_id;

  -- Campanha 1
  INSERT INTO public.campanhas (
    ong_id, titulo, descricao, categoria, status, valor_arrecadado, meta, total_doadores,
    imagem_url, localizacao, data_lancamento, data_encerramento
  ) VALUES (
    v_ong1_id,
    'Música e Cidadania 2026',
    'Oferece instrumentos musicais e formação instrumental para 180 jovens na periferia de São Paulo via FUMCAD SP (DARF 3351).',
    'Educação',
    'Ativa',
    64200.00,
    100000.00,
    312,
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    'São Paulo - SP',
    '2026-01-15T00:00:00Z',
    '2026-12-31T23:59:59Z'
  );

  -- 3.2 ONG 2: Lar São Francisco da Longevidade (Fundo Municipal do Idoso - FMID SP)
  INSERT INTO public.ongs (
    nome, cnpj, email, telefone, website, estado, endereco, cidade, bio,
    fundo_tipo, fundo_cnpj, fundo_nome, is_verificada, meta_global, avatar_url
  ) VALUES (
    'Lar São Francisco da Longevidade',
    '52.987.654/0001-30',
    'acolhimento@larsaofrancisco.org.br',
    '(11) 2950-8899',
    'https://larsaofrancisco.org.br',
    'SP',
    'Av. General Ataliba Leonel, 2300 - Santana',
    'São Paulo',
    'Atendimento geriátrico multidisciplinar, fisioterapia preventiva e acolhimento humanizado para idosos de longa permanência.',
    'IDOSO',
    '19.789.263/0001-85',
    'Fundo Municipal do Idoso de São Paulo (FMID SP)',
    true,
    300000.00,
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=600&auto=format&fit=crop'
  )
  RETURNING id INTO v_ong2_id;

  -- Campanha 2
  INSERT INTO public.campanhas (
    ong_id, titulo, descricao, categoria, status, valor_arrecadado, meta, total_doadores,
    imagem_url, localizacao, data_lancamento, data_encerramento
  ) VALUES (
    v_ong2_id,
    'Fisioterapia e Mobilidade Ativa para Idosos',
    'Modernização da ala de reabilitação motora e aquisição de equipamentos ergonômicos com benefício fiscal (DARF 9090 / 6023).',
    'Saúde',
    'Ativa',
    82500.00,
    120000.00,
    195,
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop',
    'São Paulo - SP',
    '2026-02-01T00:00:00Z',
    '2026-12-31T23:59:59Z'
  );

  -- 3.3 ONG 3: Associação Viver Bem Gerações (Fundo Misto / Ambos: ECA e IDOSO)
  INSERT INTO public.ongs (
    nome, cnpj, email, telefone, website, estado, endereco, cidade, bio,
    fundo_tipo, fundo_cnpj, fundo_nome, is_verificada, meta_global, avatar_url
  ) VALUES (
    'Associação Viver Bem Gerações',
    '11.223.344/0001-55',
    'projetos@viverbemgeracoes.org.br',
    '(11) 3105-1122',
    'https://viverbemgeracoes.org.br',
    'SP',
    'Rua da Mooca, 850 - Mooca',
    'São Paulo',
    'Integração intergeracional com hortas comunitárias, oficinas de tecnologia para a terceira idade e alfabetização juvenil.',
    'AMBOS',
    '14.248.887/0001-08',
    'FUMCAD SP e FMID SP',
    true,
    180000.00,
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop'
  )
  RETURNING id INTO v_ong3_id;

  -- Campanha 3
  INSERT INTO public.campanhas (
    ong_id, titulo, descricao, categoria, status, valor_arrecadado, meta, total_doadores,
    imagem_url, localizacao, data_lancamento, data_encerramento
  ) VALUES (
    v_ong3_id,
    'Nutrição e Dignidade no Centro Histórico',
    'Distribuição diária de alimentação balanceada e acompanhamento nutricional para famílias e idosos vulneráveis.',
    'Alimentação',
    'Ativa',
    41000.00,
    75000.00,
    240,
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    'São Paulo - SP',
    '2026-03-01T00:00:00Z',
    '2026-12-31T23:59:59Z'
  );

  -- Relatório de Impacto Seed para prestação de contas
  INSERT INTO public.relatorios_impacto (
    ong_id, titulo, descricao, imagem_url, metricas, data_publicacao
  ) VALUES (
    v_ong1_id,
    'Relatório Anual de Impacto Social 2025/2026',
    'Prestação de contas auditada referente às destinações com incentivo fiscal recebidas via FUMCAD SP.',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
    '{"criancas_atendidas": 350, "refeicoes_servidas": 12000, "oficinas_realizadas": 48}'::jsonb,
    '2026-04-10T14:30:00Z'
  );

END $$;
