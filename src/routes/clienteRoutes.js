const express = require('express');
const clienteRoutes = express.Router();

const {clienteController} = require('../controllers/clienteController');

clienteRoutes.get('/clientes', clienteController.buscarTodosclientes);
clienteRoutes.get('/clientes/:id', clienteController.buscarTodosclientes);
clienteRoutes.post('/clientes', clienteController.incluircliente);

module.exports = {clienteRoutes};