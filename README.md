# 🧪 Teste Técnico — Refatoração Fullstack (Angular + PHP)


Bem-vindo(a) ao teste técnico!  
Este repositório contém um projeto propositalmente **mal estruturado** e com diversas **más práticas** tanto no **frontend (Angular)** quanto no **backend (PHP)**.

O objetivo deste teste **não é entregar uma feature nova**, mas sim **refatorar o projeto existente**, identificando e corrigindo problemas de estrutura, organização, legibilidade e boas práticas.

---

## 🎯 Objetivo

Avaliar sua capacidade de:

- Identificar más práticas e problemas técnicos em projetos existentes
- Refatorar código front e back para melhorar **qualidade, legibilidade, manutenibilidade e boas práticas**
- Separar responsabilidades, aplicar arquitetura mais limpa e moderna
- Garantir que a aplicação continue funcionando após as melhorias
- Escrever código de forma clara, coesa e consistente
- Garantir responsividade.

📬 Instruções de Entrega
- Crie um novo respositório utilizando este como template;
  <img width="1285" height="242" alt="image" src="https://github.com/user-attachments/assets/093203bc-88d3-4806-b688-877369d0bfec" />
- Clone o seu repositório gerado do template;
- Após concluir o teste, envie o link do seu repositório para a equipe técnica responsável pela avaliação


---

# Starian Checklist - Teste Técnico

## 📚 Descrição do Projeto

Este projeto é uma aplicação Full-Stack composta por um Backend em **Laravel** (PHP) e um Frontend em **Angular** (TypeScript), utilizando **Docker Compose** para orquestrar os serviços e um banco de dados MySQL. O objetivo é simular um gerenciador de tarefas simples.

## 💻 Tecnologias Utilizadas

* **Backend:** Laravel, PHP 8.x
* **Frontend:** Angular, TypeScript
* **Banco de Dados:** MySQL (Baseado na configuração do `docker-compose.yml`)
* **Containerização:** Docker, Docker Compose
* **Testes:** PHPUnit (Backend), Cypress (E2E), jest (Unitários/Integração - Frontend)

---

# Starian Checklist - Teste Técnico

## 📚 Descrição do Projeto

Este projeto é uma aplicação Full-Stack composta por um Backend em **Laravel** (PHP) e um Frontend em **Angular** (TypeScript), utilizando **Docker Compose** para orquestrar os serviços e um banco de dados MySQL/PostgreSQL. O objetivo é simular um gerenciador de tarefas simples.

## 💻 Tecnologias Utilizadas

* **Backend:** Laravel, PHP 8.x
* **Frontend:** Angular, TypeScript
* **Banco de Dados:** MySQL/PostgreSQL (Baseado na configuração do `docker-compose.yml`)
* **Containerização:** Docker, Docker Compose
* **Testes:** PHPUnit (Backend), Jest e Cypress (Frontend)

---

## 🚀 Instalação e Execução

Este projeto utiliza **Docker** e **Docker Compose** para configurar e gerenciar todos os ambientes, garantindo uma inicialização rápida e consistente.

### Pré-requisitos
Certifique-se de ter os seguintes softwares instalados em sua máquina:
* [**Docker**](https://docs.docker.com/get-docker/)
* [**Docker Compose**](https://docs.docker.com/compose/install/)

### Passos de Inicialização

1.  **Clonar o Repositório**
    Acesse o terminal e clone o projeto. Navegue até o diretório raiz do projeto, onde o arquivo `docker-compose.yml` está localizado.

    ```bash
    # Substitua [https://www.youtube.com/watch?v=xtwls2XmJUI](https://www.youtube.com/watch?v=xtwls2XmJUI) pela URL correta
    git clone [https://www.youtube.com/watch?v=xtwls2XmJUI](https://www.youtube.com/watch?v=xtwls2XmJUI)
    cd starian-checklist-teste-tecnico
    ```

2.  **Configurar Variáveis de Ambiente do Backend**
    O *backend* Laravel requer um arquivo `.env` para configurações.

    ```bash
    # Criar o arquivo .env a partir do exemplo fornecido
    cp backend/.env.example backend/.env
    ```

3.  **Construir e Iniciar os Contêineres**
    Este comando irá construir as imagens Docker, subir todos os serviços (incluindo o banco de dados) e rodá-los em segundo plano (`-d`). A flag `--build` garante que as imagens serão criadas do zero.

    ```bash
    docker compose up -d --build
    ```

4.  **Configurar o Banco de Dados (Migrações e Seeds)**
    Após os serviços estarem ativos, execute os seguintes comandos no terminal. Eles serão executados dentro do contêiner do *backend* (serviço `backend`).

    | Ação | Comando | Descrição |
        | :--- | :--- | :--- |
    | **Gerar App Key** | `docker compose exec backend php artisan key:generate` | Gera a chave de criptografia do Laravel. |
    | **Migrar e Popular o DB** | `docker compose exec backend php artisan migrate --seed` | Cria as tabelas do banco de dados e insere dados iniciais/de teste. |

### 🌐 Acesso à Aplicação

Os serviços estarão acessíveis nas seguintes portas:

* **Frontend (Angular):** [http://localhost:4200](http://localhost:4200)
* **Backend (Laravel API):** [http://localhost:8000/api](http://localhost:8000/api)

---

## ✅ Execução dos Testes Automatizados

Para verificar a qualidade e a funcionalidade da aplicação, utilize os comandos abaixo para rodar os testes de cada serviço.

### 🧪 Testes do Backend (PHPUnit)

Os testes do Laravel (PHPUnit) são executados dentro do contêiner do *backend* (`backend`):

```bash
docker compose exec laravel php artisan test
```

### 🧪 Testes do Frontend

Para executar os testes do *frontend*, certifique-se de que os contêineres do **backend** e **frontend** estejam em execução (`docker compose up -d`).

#### 1. Testes Unitários/Componentes (Jest)

Estes testes verificam a lógica interna dos componentes e serviços do Angular. São executados dentro do contêiner do *frontend* (`frontend`).

```bash
docker compose exec angular npm test
```

#### 2. Testes E2E (End-to-End) com Cypress

Estes testes simulam o fluxo do usuário na aplicação (requerem que todos os serviços estejam em execução).
```bash
cd frontend
npx cypress open
```