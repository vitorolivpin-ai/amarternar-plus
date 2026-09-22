# AMARternar+ 💕

> O AMARternar+ é um aplicativo de apoio informativo e de organização da rotina para lactantes, com foco na amamentação e no retorno ao trabalho.

🔗 **Acesse:** https://amarternar-plus.vercel.app

## Sobre o Projeto

O **AMARternar+** é uma aplicação web/mobile que oferece suporte completo para mães lactantes, incluindo:

- 🔐 Autenticação com cadastro, login e modo visitante
- ✉️ Confirmação de e-mail no cadastro
- 🔑 Redefinição de senha ("Esqueci minha senha")
- 🧭 Onboarding com perguntas sobre a rotina e sugestões personalizadas
- 👤 Perfil com nome, avatar ou foto
- 📍 Mapa de locais próximos (hospitais, bancos de leite, UBS)
- 📋 Kanban para organização de tarefas
- 📚 Biblioteca com conteúdos de fontes oficiais
- ⚖️ Direitos da lactante (CLT, INSS, Lei 10.048)
- 🍼 Registro de ordenha com cálculo inteligente
- 💼 Guia de retorno ao trabalho
- 💗 Cuidados inteligentes
- 🆘 Números de emergência
- 🛡️ Tela de privacidade e dados, de acordo com a LGPD
- 🌐 Interface em português e inglês

## Tecnologias

- React 18
- Vite
- Tailwind CSS
- Zustand (estado)
- Recharts (gráficos)
- Lucide React (ícones)
- Supabase Auth (autenticação e confirmação de e-mail)
- Vercel (hospedagem)

## Instalação

```bash
npm install
npm run dev
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com:

```bash
VITE_SUPABASE_URL=sua_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=sua_publishable_key
```

Os valores ficam no painel do Supabase, em **Project Settings → API Keys**.

> ⚠️ Nunca use a chave `secret` ou `service_role` no front-end. O arquivo `.env` não deve ser enviado ao GitHub.

Na Vercel, cadastre as mesmas variáveis em **Settings → Environment Variables** e faça um novo deploy.

## Configuração do Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Em **Authentication → Sign In / Providers → Email**, mantenha **Confirm email** ativado.
3. Em **Authentication → URL Configuration**:
   - **Site URL:** `https://amarternar-plus.vercel.app`
   - **Redirect URLs:** `https://amarternar-plus.vercel.app/**`
4. Em **Authentication → Emails → SMTP Settings**, configure um SMTP próprio. O envio padrão do Supabase só funciona para membros da equipe do projeto.
5. Em **Authentication → Emails → Templates**, personalize os e-mails **Confirm signup** e **Reset Password** em português.

## Fluxo de autenticação

| Ação | Como funciona |
|---|---|
| Cadastro | A usuária informa nome, e-mail e senha, e recebe um link de confirmação |
| Login | Só é permitido depois que o e-mail é confirmado |
| Reenviar confirmação | Disponível na tela "Confirme seu e-mail" |
| Esqueci minha senha | Envia um link para criar uma nova senha |
| Visitante | Acesso sem cadastro; nenhum dado vai para a nuvem |
| Sair | Encerra a sessão no Supabase e limpa os dados do navegador |

## Privacidade e dados (LGPD)

| Onde fica | Quais dados |
|---|---|
| ☁️ Supabase (nuvem, servidores no Canadá) | Nome, e-mail, senha criptografada, data de criação e último acesso |
| 📱 Navegador da usuária (localStorage) | Perfil, foto/avatar, rotina, tarefas, registros de ordenha, idioma e aceite de privacidade |

- O e-mail é usado apenas para confirmar a conta e redefinir a senha.
- Não há envio de propaganda nem compartilhamento com terceiros.
- A usuária pode apagar os dados do aparelho na tela **Privacidade e dados**.
- Para pedir acesso, correção ou exclusão da conta: **amarternarplus@gmail.com**.

## Estrutura do projeto
src/
├── components/
│ ├── Biblioteca.jsx
│ ├── CuidadosInteligentes.jsx
│ ├── Dashboard.jsx
│ ├── Direitos.jsx
│ ├── Emergencias.jsx
│ ├── Login.jsx
│ ├── MapaLocais.jsx
│ ├── Onboarding.jsx
│ ├── Ordenha.jsx
│ ├── Perfil.jsx
│ ├── Privacidade.jsx
│ ├── RetornoTrabalho.jsx
│ └── Tarefas.jsx
├── App.jsx
├── store.js
└── supabaseClient.js


## Deploy

O deploy é feito automaticamente pela **Vercel** a cada commit na branch `main`.

## Aviso

O AMARternar+ tem caráter informativo e de organização da rotina. Ele não substitui orientação médica, de enfermagem ou jurídica. Em caso de dúvidas sobre saúde, procure um profissional ou uma unidade de saúde.

## Licença

MIT
