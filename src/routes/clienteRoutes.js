const express = require('express');
const clienteRoutes = express.Router();

const {clienteController} = require('../controllers/clienteController');

clienteRoutes.get('/clientes', clienteController.buscarTodosclientes);
clienteRoutes.get('/clientes/:id', clienteController.buscarTodosclientes);
clienteRoutes.post('/clientes', clienteController.incluircliente);
clienteRoutes.put('/clientes/:idCliente', clienteController.atualizarCliente);
clienteRoutes.delete('/clientes/:idCliente', clienteController.excluirCliente);

module.exports = {clienteRoutes};