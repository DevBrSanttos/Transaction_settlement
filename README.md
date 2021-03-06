# Transaction_settlement


## Passos para inicializar aplicação
### Recursos utilizados no desenvolvimento deste projeto
1. Este projeto foi desenvolvido utilizando containers docker em uma distribuição linux e para rodar o linux dentro do windowns foi instalado o WSL2. 
  Para mais informações consulte: [Document install WSL](https://docs.microsoft.com/pt-br/windows/wsl/install#manual-installation-steps)
2. Em seguida foi instalado o windowns terminal(opcional), afinal ele permite abrir terminais de Command Windows, PowerShell ou do Linux (WSL2).
  Para mais indormações consulte: [Install windowns terminal](https://docs.microsoft.com/pt-br/windows/terminal/install).
3. Abra o windowns terminal, Click no **+** e selecione Ubuntu
4. Instale o podman na distribuição linux: [Document install podman](https://podman.io/getting-started/installation) ou se preferir as instruções de instalação no Windows estão em: [Podman win WSL2](https://www.redhat.com/sysadmin/podman-windows-wsl2)
5. Para utilizar o equivalente ao “docker compose” com o podman instale o “podman compose”. github do projeto é: [Podman-compose](https://github.com/containers/podman-compose)

## Iniciar projeto
### Clonar o repositório
1. Escolha um diretório onde deseja colocar os projetos
2. Abra o gitBash na pasta
3. Utilize o comando `git clone https://github.com/DevBrSanttos/Transaction_settlement`
4. Abra o projeto dentro do VSCode
### Seller information
Desenvolvido uma API RestFull para realizar as funções de CRUD de um Seller
### - Via terminal WSL
1. Entre no diretorio seller_information. 
2. Instale as dependências do projeto com o comando `npm install`.
3. Volte em seu diretório raiz e rode o Docker com o comando `docker-compose up` ou `podman-compose up`
4. Entre no diretôrio seller_information
5. Rode o comando `npm start` para iniciar o projeto
6. Para acessar a API via swagger utilize o link: http://localhost:3000/v1/#/Sellers
7. Caso deseje rodar os testes automatizados localizados no diretôrio test rode o comando `npm run test`

### Tax calculator
Desenvolvido um microsserviço com rabbitMQ capaz de calcular imposto.
### - Via terminal WSL
1. Entre no diretorio tax_calculator. 
2. Instale as dependências do projeto com o comando `npm install`.
3. Volte em seu diretório raiz e inicialize o Docker com o comando `docker-compose up` ou `podman-compose up`
4. Entre no diretôrio tax_calculator
5. Rode o comando `node index.js` para iniciar o projeto
6. para acessar o rabbitMQ basta utilize o link: http://localhost:15672/#/ com user: **dev** e password: **123456**
7. Caso deseje rodar um código que publica mensagens e consome com o imposto calculado, basta em um novo terminal rodar o comando `npm run test`

### Settlement
Programa que une a API seller_information e o microsserviço Tax calculator, este receber as transações, e cria um arquivo final.
### - Via terminal WSL
1. Entre no diretorio settlement.
2. Instale as dependências do projeto com o comando `npm install`.
3. Rode o comando `npm start` para iniciar o projeto
#### Rodar todo projeto e completar o ciclo
1. Necessário está com o docker inicializado.
2. Rode todos os projetos
3. Para inserir dados de testes acesse as seguintes URL's:
- http://localhost:3000/v1/sellers//dummy-data para inserir sellers no banco de seller_information
- http://localhost:5000/v1/transactions/dummy-data para inserir transactions no banco de settlement
4. No postman insira a URL http://localhost:5000/v1/settlements/
- Esta URL possui o metodo GET e POST.
- Utilize o POST para iniciar o ciclo assim gerando um documento com os dados de sellerSettlement já processados no ciclo o documento estará no diretôrio settlement/src/arquives
- Utilize o GET para buscar todos os settlements já processados no ciclo.
5. Caso deseje excluir todos os dados de transaction, settlement e sellerSettlement acesse a URL http://localhost:5000/v1/deleteAll
