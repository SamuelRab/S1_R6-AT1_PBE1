const { clienteModel } = require("../models/clienteModel");

const clienteController = {
  buscarTodosclientes: async (req, res) => {
    try {
      const resultado = await clienteModel.selecionarTodos();
      if (resultado.length === 0) {
        return res
          .status(200)
          .json({ message: "A tabela selecionada não contem dados" });
      }
      res.status(200).json({ message: "Dados recebidos", data: resultado });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: error.message,
      });
    }
  },
  buscarclientePorID: async (req, res) => {
    try {
      const id = Number(req.query.id);
      if (!id || !Number.isInteger(id)) {
        return res
          .status(400)
          .json({ message: "Forneça um Identificador (ID) válido" });
      }
      const resultado = await clienteModel.selecionarPorId(id);
      res
        .status(200)
        .json({ message: "Resultado dos dados listados", data: resultado });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: error.message,
      });
    }
  },

  incluircliente: async (req, res) => {
    try {
      const { nome, cpf } = req.body;
      if (!nome || nome.trim().length < 3 || !cpf || cpf.trim().length < 11) {
        return res.status(400).json({ message: "Dados inválidos" });
      }
      const resultadoId = await clienteModel.selecionarPorCPF(cpf);
      if (resultadoId.length === 1) {
        return res
          .status(409)
          .json({ message: "Esse CPF ja existe. Tente Outro" });
      }

      const resultado = await clienteModel.inserircliente(nome, cpf);

      if (resultado.affectedRows === 1 && resultado.insertId != 0) {
        res.status(201).json({
          message: "Registro incluido com sucesso",
          result: resultado,
        });
      } else {
        throw new Error("Ocorrou um erro ao inclur o registro");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: error.message,
      });
    }
  },

  atualizarCliente: async (req, res) => {
    try {
      const id = Number(req.params.idCliente);
      const { nome, cpf } = req.body;

    

      console.log(nome, cpf, id);
      if (
        !id ||
        isNaN(id) ||
        !nome ||
        nome.trim().length < 3 ||
        !cpf ||
        cpf.length != 11
      ) {
        return res
          .status(400)
          .json({ message: "Verifique os dados enviados e tente novamente" });
      }

      const clienteAtual = await clienteModel.selecionarPorId(id);
      if (clienteAtual.length === 0) {
        throw new Error("Registro não localizado");
      }

      const novaNome = nome ?? clienteAtual[0].nome;
      const novaCpf = cpf ?? clienteAtual[0].cpf;
      const resultado = await clienteModel.alterarcliente(
        novaNome,
        novaCpf,
        id
      );

      if (resultado.affectedRows === 0) {
        throw new Error("Ocorreu um erro ao atualizar o Cliente");
      }

      res
        .status(200)
        .json({ message: "Registro atualizado com sucesso", data: resultado });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: error.message,
      });
    }
  },

  excluirCliente: async (req, res) => {
    try {
      const id = Number(req.params.idCliente);
      if (!id || !Number.isInteger(id)) {
        return res.status(400).json({ message: "Forneça um ID válido" });
      }

      const ClienteSelecionado = await clienteModel.selecionarPorId(id);
      if (ClienteSelecionado.length === 0) {
        throw new Error("Registro não localizado");
      } else {
        const resultado = await clienteModel.excluirCliente(id);
        if (resultado.affectedRows === 1) {
          res
            .status(200)
            .json({ message: "Cliente excluído com sucesso", data: resultado });
        } else {
          throw new Error("Não foi possível excluir o Cliente");
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: error.message,
      });
    }
  },
};
module.exports = { clienteController };
