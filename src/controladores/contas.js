const {contas, saques, depositos, transferencias, banco} = require("../bancodedados");
const bancodedados = require('../bancodedados')
let numeroGerado = 3

function listarcontas(req,res){
    const {senha_banco} = req.query
    
    if(!senha_banco){
        return res.status(403).json({mensagem:'Senha incorreta'})
    }
    if(banco.senha !== senha_banco){
        return res.status(403).json({mensagem: "Senha Incorreta"})
    }
    return res.json(contas)
}

function criarconta(req, res){
    
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body
    if(!nome || !cpf || !data_nascimento || !telefone || !email || !senha){
        return res.status(400).json({mensagem: 'Campos obrigatorios não informados'})
    }
    
    const procurarCpf  = contas.find((conta) => {
        return conta.usuario.cpf === cpf
    }) 

    const procurarEmail  = contas.find((conta) => {
        return conta.usuario.email === email
    }) 
    if(procurarCpf){
        return res.status(400).json({mensagem: 'CPF já cadastrado'})
    }
    if(procurarEmail){
        return res.status(400).json({mensagem: 'Email já cadastrado'})

    }

    const usuario = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    }
    const numero = JSON.stringify(++numeroGerado)

    contas.push({
        numero,
        saldo: 0,
        usuario
    })
    return res.json({ mensagem: 'Conta criada com sucesso'})
    
    };
    
    function atualizarUsuario(req,res){
         const {numeroDaConta} = req.params
         let {nome, cpf, data_nascimento, telefone, email,senha} = req.body
        const conta = contas.find((conta)=> conta.numero === numeroDaConta)

        if (!conta) {
            return res.status(404).json({Mensagem:'Conta não localizada'})
        }

        const procurarCpf  = contas.find((conta) => {
            return conta.usuario.cpf === cpf
        }) 
    
        const procurarEmail  = contas.find((conta) => {
            return conta.usuario.email === email
        }) 
        if(procurarCpf){
            return res.status(400).json({mensagem: 'CPF já cadastrado'})
        }
        if(procurarEmail){
            return res.status(400).json({mensagem: 'Email já cadastrado'})
    
        }
        conta.usuario={
            nome: nome || conta.usuario.nome,
            email: email || conta.usuario.email,
            cpf: cpf || conta.usuario.cpf,
            data_nascimento: data_nascimento || conta.usuario.data_nascimento,
            telefone: telefone || conta.usuario.telefone,
            senha: senha || conta.usuario.senha
        }

        return res.json('Conta atualizada com sucesso')
    }
 
    function excluirConta(req, res){
        const {numeroConta} = req.params
        const indice = contas.findIndex((conta) => {return conta.numero === numeroConta})
        if(indice === -1){
            return res.status(404).json({mensagem: 'Conta não encontrada'})
        }
        if(contas[indice].saldo > 0){
            return res.status(400).json({mensagem: 'Conta não pode ser excluida'})
        }
        contas.splice(indice, 1)
        return res.json('Conta excluída com sucesso')
    }

    function depositoConta(req, res){
        const {numero_conta, valor} = req.body
        const indice = contas.findIndex((conta) => {return conta.numero === numero_conta})
        
        if(indice === -1){
            return res.status(404).json({mensagem: 'Conta não encontrada'})
        }
        if (valor <= 0){
            return res.status(400).json({mensagem: 'Valor não autorizado'})
        }
            contas[indice].saldo += valor
        
            const fusoSP = new Date().setUTCHours(-4)
            const deposito = {
                data:new Date(fusoSP).toISOString().replace('T', " ").slice(0, 19),
                numero_conta,
                valor
            }
            depositos.push(deposito)

        return res.json('Depósito realizado com sucesso')

    }

    function sacarConta(req, res){
        const {numero_conta, valor} = req.body
        const indice = contas.findIndex((conta) => {return conta.numero === numero_conta})
         
        if(indice === -1){
            return res.status(404).json({mensagem: 'Conta não encontrada'})
        }
        if (valor <= 0){
            return res.status(400).json({mensagem: 'Valor não autorizado'})
        }
        if (contas[indice].saldo <= 0){
            return res.status(400).json({mensagem: 'Saque não autorizado'})
        }
        const {senhaUsuario} = req.query
            
            if(!senhaUsuario){
            return res.status(403).json({mensagem:'Senha incorreta'})
        }
       
            const fusoSP = new Date().setUTCHours(-4)
            const saque = {
                data:new Date(fusoSP).toISOString().replace('T', " ").slice(0, 19),
                numero_conta,
                valor
            }
            saques.push(saque)

        return res.json('Saque realizado com sucesso')

        }
        function tranferirSaldo(req, res){
            const {numero_conta_origem, valor, numero_conta_destino} = req.body
            
            const {senha} = req.body
            const numeroContaOrigem = bancodedados.contas.find(conta => conta.numero === numero_conta_origem)
            const numeroContaDestino = bancodedados.contas.find(conta => conta.numero === numero_conta_destino)
            if(!numeroContaOrigem){
                return res.status(404).json({mensagem: 'Conta não encontrada'})
            }
            if(!numeroContaDestino){
                return res.status(404).json({mensagem: 'Conta não encontrada'})
            }
            if(senha !== numeroContaOrigem.usuario.senha){
                return res.status(403).json({mensagem:'Senha incorreta'})
            }
            if(numeroContaOrigem.saldo <=0 ){
                return res.status(403).json({mensagem: 'Saldo indisponível'})
            }
            numeroContaOrigem.saldo -= valor
            numeroContaDestino.saldo += valor

            const fusoSP = new Date().setUTCHours(-4)
            const transferencia = {
                data:new Date(fusoSP).toISOString().replace('T', " ").slice(0, 19),
                numero_conta_origem,
                numero_conta_destino,
                valor
            }
        transferencias.push(transferencia)
        
        res.json("Transferêencia realizada com sucesso")
        }

    function saldoConta(req, res){
        const {numeroDaConta, senhaConta} = req.query
        const numero_conta = contas.find(conta => conta.numero === numeroDaConta)
        const senha_conta = contas.find(conta => conta.usuario.senha === senhaConta)


        if(!senhaConta){
            return res.status(403).json({mensagem:'Senha obrigatoria'})
        }
        if(!numeroDaConta){
            return res.status(403).json({mensagem:'Numero da conta obrigatoria'})
        }
        if(!numero_conta){
            return res.status(404).json({mensagem: 'Conta não encontrada'})
        }
        
        if(!senha_conta){
            return res.status(401).json({mensagem:'Senha incorreta'})
        }
       
        const saldo_conta = numero_conta.saldo
            
        res.json({"saldo": saldo_conta})
    }
    function emitirExtrato(req, res){
       

        const numeroDaConta = req.query.numero_conta
        const senha = req.query.senha
        const numero_conta = contas.find(conta => conta.numero === numeroDaConta)
        const senha_conta = contas.find(conta => conta.usuario.senha === senha)
        const saque = bancodedados.saques.filter(saques => saques.numero_conta === numeroDaConta)
        const deposito = bancodedados.depositos.filter(depositos => depositos.numero_conta === numeroDaConta)
        const transferenciasEnviadas = bancodedados.transferencias.filter(transferencias => transferencias.numero_conta_origem === numeroDaConta)
        const transferenciasRecebidas = bancodedados.transferencias.filter(transferencias => transferencias.numero_conta_destino === numeroDaConta)

        
        if(!senha){
            return res.status(403).json({mensagem:'Senha obrigatoria'})
        }
        if(!numeroDaConta){
            return res.status(403).json({mensagem:'Numero da conta obrigatoria'})
        }
        if(!numero_conta){
            return res.status(404).json({mensagem: 'Conta não encontrada'})
        }
        if(!senha_conta){
            return res.status(401).json({mensagem:'Senha incorreta'})
        }
        const extratoBancario = {
                deposito,
                saque,
                transferenciasEnviadas,
                transferenciasRecebidas
        }
        
        res.json(extratoBancario)
    }
           

module.exports = {listarcontas, criarconta, atualizarUsuario, excluirConta, depositoConta, sacarConta, tranferirSaldo, saldoConta, emitirExtrato}