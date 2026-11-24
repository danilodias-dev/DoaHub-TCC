# DoaHub — Plataforma de Solidariedade Transparente e Dedução Fiscal

[![React 19](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.1.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![TCC 2026](https://img.shields.io/badge/TCC-ETEC%20Abdias%20do%20Nascimento-059669?style=for-the-badge)](https://www.cps.sp.gov.br/)

> **Marketplace social *non-custodial* que conecta doadores e empresas a Organizações da Sociedade Civil (OSCs/ONGs) homologadas, descomplicando e incentivando a destinação fiscal direta do Imposto de Renda aos Fundos Públicos Governamentais.**

---

## 📌 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Arquitetura Non-Custodial (Sem Custódia Financeira)](#-arquitetura-non-custodial-sem-custódia-financeira)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Stack Tecnológica](#-stack-tecnológica)
- [Arquitetura de Pastas](#-arquitetura-de-pastas)
- [Segurança e Conformidade com a LGPD](#-segurança-e-conformidade-com-a-lgpd)
- [Pré-requisitos e Instalação Local](#-pré-requisitos-e-instalação-local)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Equipe e Contexto Acadêmico](#-equipe-e-contexto-acadêmico)

---

## 💡 Sobre o Projeto

No Brasil, a legislação tributária permite que cidadãos e empresas destinem parcelas do seu **Imposto de Renda devido** diretamente para Fundos dos Direitos da Criança e do Adolescente (**ECA**) e Fundos dos Direitos do Idoso (**FMI**). Apesar do alto potencial financeiro, mais de 95% desse montante legal deixa de chegar ao Terceiro Setor anualmente por:

1. **Assimetria de Informação e Burocracia:** Falta de conhecimento dos prazos, alíquotas e do procedimento operacional junto à Receita Federal do Brasil (RFB).
2. **Insegurança do Doador:** Receio de cair na malha fina ou dúvidas quanto à idoneidade e homologação jurídica das ONGs beneficiárias.
3. **Falta de Prestação de Contas:** Ausência de mecanismos integrados para visualização do impacto social gerado pelo recurso destinado.

O **DoaHub** foi concebido para resolver essas fricções, operando como uma infraestrutura digital de mediação transparente, educativa e auditável.

---

## 🏛️ Arquitetura Non-Custodial (Sem Custódia Financeira)

O diferencial arquitetural basilar do **DoaHub** é seu modelo **estritamente *non-custodial***:

```
[ Doador / Empresa ]
        │
        ├── (1) Simulação tributária e limites legais no DoaHub (client-side)
        │
        ├── (2) Geração de parâmetros da Guia DARF oficial / Dados Bancários
        │
        ▼
[ Sistema Bancário / Receita Federal do Brasil ] ──▶ [ Fundos Públicos (FUMCAD / FMID) ]
        │                                                           │
        │ (3) Pagamento direto sem intermediação                   │ Repasse auditado
        ▼                                                           ▼
[ Comprovante Oficial ] ──▶ [ DoaHub: Repositório Seguro ] ──▶ [ ONGs Homologadas ]
```

- **Zero Intermediação Financeira:** A plataforma **não coleta, não processa, não liquida e não retém** dinheiro em contas intermediárias.
- **Isenção de Taxas Administrativas:** Elimina spreads bancários ou cobrança de porcentagens sobre as doações, maximizando o repasse ao projeto social.
- **Roteamento Fiscal Direto:** O valor é recolhido pelo contribuinte diretamente ao ente público via **Documento de Arrecadação de Receitas Federais (DARF)** ou via depósito identificado em conta bancária oficial vinculada ao CNPJ do respectivo Conselho Municipal (CMDCA/CMI).

---

## ⚙️ Funcionalidades Principais

### 1. Vitrine e Descoberta de Causas (RF01)
- Catálogo interativo de Organizações da Sociedade Civil (OSCs) previamente verificadas e campanhas ativas.
- Filtros por ODS/causa social (Educação, Saúde, Combate à Fome, Meio Ambiente) e localização geográfica.
- Visualização das metas financeiras, valor arrecadado e quantitativo de apoiadores em tempo real via Supabase.

### 2. Simulador Tributário e Roteamento Fiscal (RF02 / RF04)
- **Cálculo *Client-Side* de Limites de Dedução:**
  - **Pessoa Física (IRPF):**
    - *Declaração de Ajuste Anual (DAA):* Até **3%** para Fundos da Criança e do Adolescente (DARF código `3351`) e até **3%** para Fundos do Idoso (DARF código `9090`), totalizando até **6%** do imposto devido.
    - *No Ano-Calendário:* Até **6%** global com recolhimento antecipado (códigos `3351` e `6023`).
  - **Pessoa Jurídica (IRPJ - Lucro Real):** Até **1%** para Fundos da Infância e até **1%** para Fundos do Idoso (total de **2%** do imposto sobre a renda devido), com abatimento no LALUR/ECF.
- **Card de Instruções DARF:** Geração guiada do passo a passo para preenchimento no PGD da Receita Federal, cópia de linhas digitáveis e botão para registro direto no histórico.

### 3. Repositório Documental e Prestação de Contas (RF05 / RF07)
- Área autenticada do doador com resumo anual consolidado e monitoramento do teto de dedução.
- Upload seguro de comprovantes de pagamento (`.pdf` ou imagens) vinculados às destinações registradas.
- Download dos arquivos mediante URLs assinadas temporárias (*Signed URLs*), garantindo a integridade dos dados e o descarte de links públicos permanentes.
- Consulta de Relatórios de Impacto Social publicados pelas instituições com métricas quantitativas estruturadas em JSONB.

### 4. Módulo Administrativo e Homologação (RF06 - RBAC)
- **Painel Geral (`/admin/dashboard`):** Monitoramento das destinações globais, volumes separados por fundo público (ECA vs. Idoso) e métricas cadastrais.
- **Fila de Homologação (`/admin/homologacao`):** Interface para auditoria jurídica e técnica das instituições cadastras, permitindo aprovação ou recusa com persistência no banco.
- **Relatórios de Auditoria (`/admin/relatorios`):** Emissão de relatórios consolidados para prestação de contas aos Conselhos Municipais e órgãos fiscalizadores.

---

## 💻 Stack Tecnológica

| Camada | Tecnologia | Versão | Descrição |
| :--- | :--- | :--- | :--- |
| **Interface / Core** | [React](https://react.dev/) | `^19.2.4` | Biblioteca declarativa de UI com componentes funcionais e hooks |
| **Build Tool** | [Vite](https://vite.dev/) | `^8.1.5` | Bundler e ambiente de desenvolvimento ultrarrápido |
| **Estilização** | [TailwindCSS](https://tailwindcss.com/) | `^3.4.19` | Framework CSS utilitário configurado no padrão *Editorial Empathy* |
| **Animações** | [Framer Motion](https://www.framer.com/motion/) | `^12.38.0` | Transições de página e micro-interações fluidas |
| **Roteamento** | [React Router DOM](https://reactrouter.com/) | `^7.18.0` | Gestão de rotas client-side com controle de acesso RBAC |
| **Backend as a Service** | [Supabase](https://supabase.com/) | `@supabase/supabase-js ^2.118.0` | Camada de autenticação, API RESTful auto-gerada e Storage |
| **Banco de Dados** | [PostgreSQL](https://www.postgresql.org/) | `15+` | Banco relacional com integridade referencial e triggers |
| **Segurança de Dados**| **Row Level Security (RLS)** | Nativo | Políticas granulares de autorização em nível de linha no SQL |
| **Storage de Documentos** | **Supabase Storage** | Privado | Bucket privado `comprovantes` com isolamento por usuário |
| **Visualização de Dados** | [Recharts](https://recharts.org/) | `^3.8.1` | Gráficos declarativos de arrecadação e metas |
| **Ícones** | [Lucide React](https://lucide.dev/) | `^1.7.0` | Conjunto consistente de ícones vetoriais |
| **Hospedagem & CI/CD** | [Vercel](https://vercel.com/) | Edge Network | Deploy contínuo integrado a branches do Git |

---

## 📂 Arquitetura de Pastas

A estrutura de código em `src/` adota o padrão de separação de responsabilidades em camadas desacopladas:

```
DoaHub_Frontend_TCC/
├── public/                     # Ativos estáticos públicos (favicons, manifests, SVGs)
├── src/
│   ├── assets/                 # Imagens e vetores compilados pelo bundler
│   ├── components/             # Componentes modulares e reutilizáveis de UI
│   │   ├── admin/              # Componentes de suporte aos painéis administrativos
│   │   │   └── tabs/           # Abas modulares do painel (Campanhas, Relatórios, etc.)
│   │   ├── auth/               # Seletor de perfis e componentes de autenticação
│   │   ├── simulador/          # Componentes especializados do simulador (DarfInstructionCard)
│   │   ├── ui/                 # Elementos atômicos (Botões Premium, Modais, Cards, Toast)
│   │   └── ProtectedRoute.jsx  # Wrapper RBAC para controle de acesso por perfil
│   ├── contexts/               # Gerenciamento de estado global via Context API
│   │   ├── AuthContext.jsx     # Estado de sessão, perfil do usuário e hooks de auth
│   │   ├── CampaignContext.jsx # Estado reativo de campanhas e métricas do catálogo
│   │   └── DonorContext.jsx    # Estado das destinações, histórico e comprovantes
│   ├── data/                   # Constantes e catálogo de Fundos Públicos Governamentais
│   │   ├── constants.js        # Definições globais de navegação e limites
│   │   ├── fiscalFunds.js      # CNPJs oficiais, bancos e contas dos Fundos ECA/Idoso
│   │   └── mockData.js         # Dados de fallback e testes de regressão visual
│   ├── layouts/                # Wrappers estruturais de página
│   │   ├── AdminLayout.jsx     # Estrutura base para telas administrativas
│   │   ├── AuthLayout.jsx      # Estrutura centralizada para login/cadastro
│   │   ├── DashboardLayout.jsx # Estrutura do painel de controle do doador/ONG
│   │   ├── Footer.jsx          # Rodapé institucional unificado
│   │   ├── MainLayout.jsx      # Layout padrão de páginas públicas
│   │   ├── NavHeader.jsx       # Barra de navegação responsiva com perfis
│   │   └── index.js            # Barril de exportação dos layouts
│   ├── lib/                    # Inicialização e singletons de bibliotecas externas
│   │   └── supabase.js         # Cliente singleton do Supabase com validação de env
│   ├── pages/                  # Views associadas às rotas da aplicação
│   │   ├── admin/              # Visões de administração (Dashboard, Homologação, Relatórios)
│   │   ├── auth/               # Telas de Login e Cadastro
│   │   ├── doador/             # Telas do doador (Home, Explorar, Detalhes, Histórico)
│   │   ├── ong/                # Telas da instituição (Onboarding, Dashboard, Perfil)
│   │   ├── public/             # Telas públicas (Landing, Quem Somos, Transparência, Simulador)
│   │   └── shared/             # Telas compartilhadas entre perfis (Configurações)
│   ├── services/               # Camada de abstração e comunicação com a API/Supabase
│   │   ├── authService.js      # Operações de autenticação e busca de perfil
│   │   ├── campaignService.js  # Consultas relacionais e mutações de campanhas
│   │   ├── destinacaoService.js# Registro e auditoria de destinações fiscais
│   │   ├── ongService.js       # Listagem, homologação (RF06) e cadastro de ONGs
│   │   ├── storageService.js   # Upload privado e geração de URLs assinadas
│   │   └── index.js            # Ponto único de exportação dos serviços
│   ├── utils/                  # Funções puras, formatadores e lógica fiscal
│   │   ├── fiscalRules.js      # Cálculos de deduções fiscais para PF e PJ
│   │   ├── motion.js           # Tokens de animação e transições do Framer Motion
│   │   └── receiptGenerator.js # Funções auxiliares para comprovantes
│   ├── App.jsx                 # Configuração de rotas da aplicação e providers
│   ├── index.css               # Folha de estilos base com diretivas do TailwindCSS
│   └── main.jsx                # Ponto de entrada do React DOM
├── supabase/                   # Scripts de infraestrutura e banco de dados
│   └── complemento_admin_storage_seed.sql # RLS, bucket privado e seed de ONGs oficiais
├── .env.example                # Documentação das variáveis de ambiente necessárias
├── eslint.config.js            # Configurações do linter ESLint v9
├── index.html                  # Arquivo HTML principal do SPA
├── package.json                # Manifesto de dependências e scripts do Node.js
├── postcss.config.js           # Configurações do pipeline PostCSS
├── tailwind.config.js          # Configuração de temas e tokens do TailwindCSS
├── vercel.json                 # Regras de roteamento e reescrita de rotas para Vercel
└── vite.config.js              # Configuração do Vite e divisão manual de chunks
```

---

## 🔒 Segurança e Conformidade com a LGPD

O projeto incorpora os preceitos de **Privacy by Design** e **Security by Default** em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018):

1. **Processamento Financeiro Volátil (*In-Memory*):** O simulador de Imposto de Renda efetua os cálculos exclusivamente na memória do navegador do cliente. Nenhuma informação declaratória sobre patrimônio ou faturamento corporativo é enviada para os servidores da plataforma.
2. **Isolamento de Dados com Row Level Security (RLS):** Cada consulta no banco de dados é filtrada diretamente pelo PostgreSQL. Usuários só conseguem visualizar ou alterar registros vinculados ao seu respectivo `auth.uid()`, salvo administradores devidamente validados pela função de segurança `is_admin()`.
3. **Storage Blindado com URLs Assinadas:** Os comprovantes anexados são armazenados em um bucket estritamente privado. O download dos arquivos ocorre somente mediante a criação de *Signed URLs* temporárias (validade de 60 segundos), prevenindo o vazamento ou indexação pública de documentos comprobatórios.
4. **Controle de Acesso Baseado em Papéis (RBAC):** Rotas sensíveis são protegidas no frontend pelo componente `ProtectedRoute` e espelhadas pelas restrições relacionais no banco (`tipo IN ('doador', 'ong', 'admin')`).

---

## 🚀 Pré-requisitos e Instalação Local

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão `18.x` ou superior.
- Gerenciador de pacotes `npm` (ou `pnpm`/`yarn`).
- Uma conta ou instância ativa no [Supabase](https://supabase.com/).

### Passo a Passo

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/Danilo-Dias-Soares/DoaHub_Frontend_TCC.git
   cd DoaHub_Frontend_TCC
   ```

2. **Instalar Dependências:**
   ```bash
   npm install
   ```

3. **Configurar as Variáveis de Ambiente:**
   Copie o arquivo de exemplo e crie o `.env.local` na raiz do projeto:
   ```bash
   cp .env.example .env.local
   ```
   Abra o arquivo `.env.local` e preencha com suas credenciais do projeto Supabase:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua_anon_key_publica_aqui
   ```

4. **Executar o Script SQL no Supabase:**
   Acesse o painel do seu projeto no Supabase, abra o **SQL Editor** e execute o conteúdo do arquivo:
   `supabase/complemento_admin_storage_seed.sql`
   *Esse script cria as políticas RLS para administradores e ONGs, provisiona o bucket privado `comprovantes` e insere os dados de teste (Seed) com 3 ONGs oficiais vinculadas ao FUMCAD SP e FMID SP.*

5. **Iniciar o Servidor de Desenvolvimento:**
   ```bash
   npm run dev
   ```
   A aplicação estará acessível localmente no endereço indicado no terminal (por padrão: `http://localhost:5173`).

---

## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento com Hot Module Replacement (HMR). |
| `npm run build` | Compila os arquivos para produção com otimização e separação de chunks no diretório `dist/`. |
| `npm run preview` | Executa localmente o build de produção para testes de validação final. |
| `npm run lint` | Executa o ESLint para validação de sintaxe e padrões de código React. |

---

## 👥 Equipe e Contexto Acadêmico

Este projeto foi desenvolvido como **Trabalho de Conclusão de Curso (TCC)** para obtenção do título de Técnico em Desenvolvimento de Sistemas na **ETEC Abdias do Nascimento** — Centro Estadual de Educação Tecnológica Paula Souza (CEETEPS).

- **Instituição:** ETEC Abdias do Nascimento (São Paulo – SP)
- **Ano de Conclusão:** 2026
- **Orientador:** Prof. José Renato Guedes

### Autores (em ordem alfabética):
- **Cauã Mazala Ribeiro**
- **Danilo Dias Soares**
- **Davi Delgado Tamashiro**
- **Gabriela Batista Reis**
- **João Lucas de Jesus Silva**
- **João Vitor Souza Magalhães**

---

<div align="center">
  <p>Feito com dedicação e compromisso social em prol do fortalecimento do Terceiro Setor brasileiro. 💚</p>
  <p><strong>DoaHub © 2026</strong></p>
</div>
