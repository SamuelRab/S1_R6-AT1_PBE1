const pool = require("../config/db");

const clienteModel = {
  selecionarTodos: async () => {
    const sql = "SELECT * FROM clientes";
    const [rows] = await pool.query(sql);
    return rows;
  },

  selecionarPorId: async (pId) => {
    const sql = "SELECT * FROM clientes WHERE id = ?;";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  selecionarPorCPF: async (pCpf) => {
    const sql = 'SELECT * FROM clientes WHERE cpf = ?;';
    const values = [pCpf];
    const [rows] = await pool.query(sql, values);
    return rows;
},

  inserircliente: async (pNome, pCpf) => {
    const sql = "INSERT INTO clientes (nome, cpf) VALUES (?,?)";
    const values = [pNome, pCpf];
    const [rows] = await pool.query(sql, values);
    console.log(rows);
    return rows;
  }

};

module.exports = {clienteModel};