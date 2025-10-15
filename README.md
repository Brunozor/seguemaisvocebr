DetectaZap
Visão Geral
DetectaZap é uma aplicação desenvolvida para monitoramento e rastreamento de interações via WhatsApp, com foco em gerar dados estratégicos para integrações com plataformas da Meta, como Facebook e Instagram.

A ferramenta tem como objetivo fornecer insights valiosos sobre o comportamento dos usuários, facilitando a análise de conversas, identificação de padrões de atendimento, performance de campanhas e eficiência em canais de comunicação automatizados.

Ideal para empresas, agências e profissionais que buscam tomadas de decisão baseadas em dados e desejam aprimorar a jornada do cliente dentro do ecossistema de mensagens da Meta.

Tecnologias Utilizadas
O DetectaZap é construído com tecnologias modernas e altamente performáticas:

Vite – Ferramenta de bundling leve e rápida para desenvolvimento frontend.

React – Biblioteca JavaScript para construção de interfaces de usuário interativas.

TypeScript – Superset do JavaScript que adiciona tipagem estática ao projeto.

shadcn-ui – Conjunto de componentes UI acessíveis e personalizáveis.

Tailwind CSS – Framework de utilitários CSS para criação rápida de layouts responsivos.

Como Executar o Projeto Localmente
Para rodar o DetectaZap em seu ambiente local, siga os passos abaixo. É necessário ter o Node.js e o npm instalados (recomenda-se o uso do nvm):

sh
Copiar
Editar
# 1. Clone o repositório com a URL fornecida
git clone <SEU_GIT_URL>

# 2. Acesse a pasta do projeto
cd detectazap

# 3. Instale as dependências do projeto
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
A aplicação estará disponível em um ambiente de desenvolvimento com recarregamento automático, permitindo visualizar mudanças em tempo real.

Publicação e Hospedagem
A aplicação pode ser publicada em qualquer plataforma de hospedagem compatível com projetos Node.js. Para isso:

Compile o projeto para produção com o comando:

sh
Copiar
Editar
npm run build
Faça o deploy do conteúdo da pasta dist para o seu provedor de hospedagem (como Vercel, Netlify, Firebase Hosting ou servidores personalizados).

Integração com Domínios Personalizados
Você pode configurar um domínio personalizado ao fazer o deploy do projeto. A maioria dos serviços de hospedagem modernos permite isso diretamente via painel de controle, apontando seu domínio para o endereço de IP ou endpoint do serviço.
