const {clienteModel} = require('../models/clienteModel');

const clienteController = {

    buscarTodosclientes:async (req, res) => {
        try {
            const resultado = await clienteModel.selecionarTodos();
            if(resultado.length === 0){
                return res.status(200).json({message:'A tabela selecionada não contem dados'});
            }
            res.status(200).json({message:'Dados recebidos', data:resultado})
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor.', errorMessage: error.message});
        }
    },
    buscarclientePorID: async (req, res)=> {
        try {
        const id = Number(req.params.id);
        if(!id || !Number.isInteger(id)){
            return req.status(400).json({message: 'Forneça um Identificador (ID) válido'});
        }
        const resultado = await clienteModel.selecionarPorId(id);
        res.status(200).json({message: 'Resultado dos dados listados', data:resultado});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
        }
    },

    incluircliente: async (req, res) =>{
        try {
            const {nome, cpf} = req.body;
            if(!String(nome)|| nome.length < 3 || cpf<= 0){
                return res.status(400).json({message: 'Dados Inválidos'});
            }
            const resultadoId =  await clienteModel.selecionarPorCPF(cpf);
            if(resultadoId.length === 1){
                return res.status(409).json({message: 'Esse CPF ja existe. Tente Outro'});
            }

            const resultado = await clienteModel.inserircliente(nome, cpf);

            if(resultado.affectedRows === 1 &&  resultado.insertId != 0){
                res.status(201).json({message: 'Registro incluido com sucesso', result: resultado})
            }else{
                throw new Error ('Ocorrou um erro ao inclur o registro');
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({message:'Ocorreu um erro no servidor', errorMessage: error.message});
        }
    }

    };
module.exports = {clienteController};