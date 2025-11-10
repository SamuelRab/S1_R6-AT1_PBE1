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
  },

  alterarcliente: async (pNome, pCpf, pId) => {
    const sql = "UPDATE clientes SET nome=?, cpf=? WHERE id=?";
    const values = [pNome, pCpf, pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  excluirCliente: async (pId) => {
    const sql = "DELETE FROM clientes WHERE id=?;";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  }

};

module.exports = {clienteModel};