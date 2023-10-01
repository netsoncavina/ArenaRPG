<p align="center">
<img width="388" alt="image" src="https://github.com/netsoncavina/ArenaRPG/assets/1374081/4b90f063-6170-4d6d-ad74-837bbe27af28">
</p>

<p align="center">
<img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/netsoncavina/ArenaRPG?style=for-the-badge">
<img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
<img alt="NextJs" src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img alt="Chakra UI" src="https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white">
<img alt="Firebase" src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black">
<img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</p>

# Tabela de conteúdos

- [Tabela de conteúdos](#tabela-de-conteúdos)
- [Sobre o projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Funcionalidades Futuras](#funcionalidades-futuras)
- [Imagens](#imagens)
- [Instalação](#instalação)
- [Configuração do Firebase](#configuração-do-firebase)
- [Como Contribuir](#como-contribuir)
- [Autor](#autor)

# Sobre o projeto

Uma rede social versátil para entusiastas de RPG e diversos interesses. Os usuários podem criar comunidades exclusivas e compartilhar conteúdo sobre uma ampla variedade de tópicos, de jogos de interpretação de papéis a música, filmes e muito mais. Nossa plataforma promove a interação social, permitindo que os membros se conectem, compartilhem ideias e descubram novas paixões em um ambiente acolhedor e inclusivo. Junte-se a nós para explorar e celebrar seus interesses favoritos.

# Tecnologias Utilizadas

Frontend: Next.js (React) <br />
Backend/Firebase: Firebase Functions <br />
Banco de Dados: Firebase Firestore <br />
Autenticação: Firebase Authentication <br />
UI: Chakra UI <br />

# Funcionalidades

Atualmente o projeto conta com: <br />
Cadastro e Autenticação: O cadastro e autenticação é feito através do Firebase Authentication. O usuario pode optar por ser autenticado através de email e senha ou através de login com sua conta Google <br />
Criação de Comunidades: Uma vez logado, o usuario pode criar comunidades sobre o tema que preferir e decidir se é uma comunidade publica, privada ou restrita. <br />
Criação de Posts: Os usuarios podem criar posts dentro das comunidades, optando por adicionar imagens ou não <br />
Interação Social: Os usuarios podem interagir com os posts das comunidades através de likes e comentários. <br />
Feed personalizado: O feed de cada usuario é personalizado de acordo com as comunidades que ele segue. <br />
Feed Global: Caso o usuario não esteja logado, ele terá acesso ao feed global. <br />
Responsividade: O projeto é totalmente responsivo, podendo ser acessado de qualquer dispositivo. <br />

# Funcionalidades Futuras

Geração de campanhas de RPG através de IA <br />
Sistema de criação de salas de RPG <br />
Sistema de rolagem de dados <br />
Chat entre usuarios <br />
Tags para os posts <br />
Pesquisa de usuarios e comunidades <br />
Sistema de notificações <br />
Sistema de denuncias <br />
Sistema de moderação <br />
Sistema de reputação <br />

# Imagens

<img width="919" alt="image" src="https://github.com/netsoncavina/ArenaRPG/assets/1374081/d75e5d06-49ff-47e6-86e8-afd5fb9ad6a7">
<img width="931" alt="image" src="https://github.com/netsoncavina/ArenaRPG/assets/1374081/94056c72-2e48-4174-be3b-283b21a2cbcd">
<img width="920" alt="image" src="https://github.com/netsoncavina/ArenaRPG/assets/1374081/9f1e2f85-419d-4c38-96a9-8ea44d62f113">
<img width="918" alt="image" src="https://github.com/netsoncavina/ArenaRPG/assets/1374081/98f1916c-41b1-4c19-90a4-6d285ced50f2">
<p align="center">
<img width="165" alt="image" src="https://github.com/netsoncavina/ArenaRPG/assets/1374081/6f406b97-512b-4c8a-81f3-1844639b7c79">
<img width="175" alt="image" src="https://github.com/netsoncavina/ArenaRPG/assets/1374081/911e88ce-e1cd-4386-9755-b5ee3f281940">
<img width="171" alt="image" src="https://github.com/netsoncavina/ArenaRPG/assets/1374081/90c125a7-4c5d-45f3-8617-467f10565885">
</p>

# Instalação

<!-- https://github.com/netsoncavina/ArenaRPG.git -->

```bash
# Clone o repositório
$ git clone https://github.com/netsoncavina/ArenaRPG.git

# Acesse a pasta do projeto no prompt de comando
$ cd ArenaRPG

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```

Para o projeto funcionar corretamente, é necessário criar um projeto no Firebase e configurar as variáveis de ambiente no arquivo .env.local (na raiz do projeto)

# Configuração do Firebase

```bash
1. Crie um projeto no Firebase: https://console.firebase.google.com/
2. Configure o Firebase no projeto Next.js
3. Defina as variáveis de ambiente no arquivo .env.local

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY= seu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN= seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID= seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID= seu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID= seu_app_id
NEXT_PUBLIC_IS_DEVELOPMENT=true # true para desenvolvimento e false para produção
```

# Como Contribuir

Para contribuir com este projeto, siga estas etapas:

```
1. Faça um fork do projeto
2. Crie uma nova branch com sua funcionalidade: `git checkout -b minha-funcionalidade`
3. Faça commit das suas alterações: `git commit -m 'Adiciona nova funcionalidade'`
4. Envie suas alterações: `git push origin minha-funcionalidade`
5. Abra um Pull Request
```

# Autor

<p align="center">
 <img style="border-radius: 50%;" src="https://github.com/netsoncavina/NekoNinja/assets/1374081/11a7acad-3e08-4ae9-9043-e2f224200b38" width="100px;" alt=""/>
</p>

<p align="center">
Feito por Netson Cavina 👋🏽 Entre em contato!
</p>

[![Linkedin Badge](https://img.shields.io/badge/-Netson-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/netson-cavina-487736115/)
[![Gmail Badge](https://img.shields.io/badge/-netsoncavina@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:netsoncavina@gmail.com)](mailto:netsoncavina@gmail.com)
