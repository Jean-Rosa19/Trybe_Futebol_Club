# Trybe Futebol Club:

## Desenvolvimento

Essa aplicação tem como objetivo ser um site informativo sobre partidas e classificações de futebol. Você pode consultar como está o andamento de partidas, se estiver logado pode adicionar ou editar uma partida.

## Instalação e execução:

1 - Clone o repositório:
git clone git@github.com:tryber/sd-024-a-trybe-futebol-clube.git

2 - Na raíz do projeto, suba os containers do frontend (app_frontend), backend (app_backend) e o banco de dados (db) com o comando:
npm run compose:up

Os containers estão mapeados nas seguintes portas:

app_frontend: 3000
app_backend: 3001
db: 3002
Para parar os containers, na pasta raiz do projeto execute o comando:

npm run compose:down

3 - Acessando o Frontend
Para acessar o frontend, vá em seu navegador acesse a rota:

http://localhost:3000

4 - Usuários para fazer login
Nessa aplicação é necessário fazer o login com um email e senha. A tabela abaixo disponibiliza usuários pré-cadastrados para o acesso:

Email	Senha
admin@admin.com	secret_admin
user@user.com	secret_user
