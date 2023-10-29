const {listarcontas, criarconta, atualizarUsuario, excluirConta, depositoConta, sacarConta, tranferirSaldo, saldoConta, emitirExtrato} = require("./controladores/contas");
const express = require('express')
const rota = express()

rota.get('/contas', listarcontas)
rota.post('/contas', criarconta)
rota.put('/contas/:numeroDaConta/usuario', atualizarUsuario) 
rota.delete('/contas/:numeroConta', excluirConta)
rota.post('/transacoes/depositar', depositoConta)
rota.post('/transacoes/sacar', sacarConta)
rota.post('/transacoes/transferir', tranferirSaldo)
rota.get('/contas/saldo', saldoConta)
rota.get('/contas/extrato', emitirExtrato)

module.exports = rota