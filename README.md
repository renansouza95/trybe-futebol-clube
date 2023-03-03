## Sobre

Este projeto foi desenvolvido como parte da avaliação do módulo Back-End no curso de Desenvolvimento Web da escola Trybe.
  O `TFC` é um site informativo sobre partidas e classificações dos times em um campeonato de futebol! ⚽️

A Trybe forneceu um front-end pronto e me foi solicitado desenvolver uma API em TypeScript, utilizando modelo de POO e o método TDD, e também integrar - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados modelado através do Sequelize.

### Habilidades desenvolvidas

- Conhecimentos em Docker, React, Node, TypeScript, Express e MySQL;
- Programação Orientada a Objetos;
- Conceitos de modelagem de banco de dados;
- Uso do ORM Sequelize;
- Escrita de testes de integração em TypeScript utilizando as bibliotecas mocha, chai e sinon;
- Integração de Frontend, usando React, com Backend;
- Investigação de códigos existentes para concluir o projeto;
- Raciocínio Lógico.

### Para executar o projeto localmente

#### Configurações mínimas requeridas para a máquina local rode o projeto

  - Sistema Operacional Distribuição Unix
  - Node versão 16  
  - Docker
  - Docker-compose versão 1.29.2

  Clone o projeto
```
  git clone git@github.com:renansouza95/trybe-futebol-clube.git
```
Entre no diretório do projeto
```
  cd trybe-futebol-clube
```
Instale as dependências com o comando
```
  npm run install:apps
```
Para subir e iniciar os containers docker execute o comando
```
  npm run compose:up
```
Após a confirmação de conclusão do processo de criação dos containers com sucesso, ex:
```
Creating db ... done
Creating app_backend ... done
Creating app_frontend ... done
```
Abra seu navegador e insira o endereço "http://localhost:3000/" no browser.

#### Obs1:
  Para rodar testes de cobertura no seu back-end, utilize dentro do diretório trybe-futebol-clube/app/backend o comando: 
  ```
  npm run test:coverage
  ```
#### Obs2:

  Para adicionar uma partida é necessário login (email do usuário) e senha, portanto a pessoa deverá estar logada para fazer as alterações. Existem seeders que povoam o banco de dados, então você pode ter acesso aos dados de login e senha de usuários pré-existentes.
