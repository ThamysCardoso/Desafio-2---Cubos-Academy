# Desafio-2-Cubos-Academy

Este projeto foi desenvolvido como forma de avaliação para a conclusão do modulo 2 do curso de Desenvolvimento BackEnd da Cubos Academy.
  
  **Meu papel era construir uma RESTful API que permita:**
-   Listagem de contas bancárias
-   Criar conta bancária
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depositar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário

  **Para iniciar foi criado um arquivo chamado bancodedados**
  Nele ficava armazenado as informações que seriam chamadas como saque, depositos, contas e transferências.
  
  **Depois foi desenvolvido uma pasta para servidor, um index e uma pasta de rotas**
  Na pasta de rotas ficaram salvas as rotas necessarias para chamar as funções criadas dentro do arquivo contas que executam os comandos necessarios.

   **Para executar o projeto é necessario o uso das rotas desenvolvidas no aplicativo Insomnia**

  # **Arquivo Contas**
Dentro da pasta de controladores, há o arquivo contas onde estão organizadas em funções os comandos de saque, deposito, transferência e extrato

**Contas**
Para manutenção das contas, foram criadas funções para lista, criar, atualizar e excluir contas.

 **Deposito**
  Foi desenvolvida uma função para realização de depositos nas contas.
  
  **Saque**
  Foi desenvolvida uma função para realização de saques nas contas.
  
  **Transferencia**
  Foi desenvolvida uma função para realização de transferencias nas contas.
  
  **Saldo**
  Foi desenvolvida uma função para verificação de saldos nas contas.
  
 **Extrato**
  Foi desenvolvido uma função que realiza a emissão dee extratos das contas criadas, desde saques, depositos e transferências para a conta e da conta para outra.

  **Em todas as transações realizadas nas contas é possível observar a verificação de numero da conta e sehha para garantir a segurança dos dados do cliente**

 
