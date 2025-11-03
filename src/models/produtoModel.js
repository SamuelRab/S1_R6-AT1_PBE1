const pool = require("../config/db");

const produtoModel = {
  /**
   * Seleciona todos os produtos cadastrados na tabela
   * @async
   * @function selecionarTodos
   * @returns Retorna o resultado com um array de objetos, cada objeto representa um registro na tabela.
   *
   * @example
   * const produtos = await produtoModel.selecionarTodos();
   * console.log(produtos);
   * // Saída esperada
   * [
   *    {id_produto: 1, descricao: 'teclado', valor: 150.00}
   *    {id_produto:2, descricao: 'mouse', valor: 399.99}
   * ]
   */

  // Selecionar todos os produtos
  selecionarTodos: async () => {
    const sql = "SELECT * FROM produtos";
    const [rows] = await pool.query(sql);
    return rows;
  },

  /**
   * Seleciona um produto de acordo com o id_produto especificado
   * @async
   * @param {number} pId Identificador que deve ser pesquisado no banco de dados
   * @returns {Promise<Array<Object>}
   *
   * @example
   * const produto = await produtoModel.selceionarPorId(1);
   * console.log(produto);
   * //Saída esperada
   * [
   *     {id_produto: 1, descricao: 'teclado', valor: 150.00}
   * ]
   */

  selecionarPorId: async (pId) => {
    const sql = "SELECT * FROM produtos WHERE id_produto = ?;";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  /**
   * Inclui um item novo no banco de dados
   * @param {String} pDescricao 
   * @param {Number} pValor 
   * @returns {Promise<Object>} Retorna um objeto contendo propriedades que representam as informações do comando executado.
   * @example
   * const produto = await produtoModel.inserirProduto('Produto teste', 16.90);
   * // Saída
   * "result": {
		"fieldCount": 0,
		"affectedRows": 1,
		"insertId": 7,
		"info": "",
		"serverStatus": 2,
		"warningStatus": 0,
		"changedRows": 0
	  }
   */

  inserirProduto: async (pDescricao, pValor) => {
    const sql = "INSERT INTO produtos (descricao, valor) VALUES (?,?)";
    const values = [pDescricao, pValor];
    const [rows] = await pool.query(sql, values);
    console.log(rows);
    return rows;
  },

  /**
   * Altera um item existenteno banco de dados
   * @param {Number} pId
   * @param {String} pDescricao 
   * @param {Number} pValor 
   * @returns {Promise<Object>} Retorna um objeto contendo propriedades que representam as informações do comando executado.
   * @example
   * const produto = await produtoModel.alterarProduto(1, 'Produto teste', 16.90);
   * // Saída
   * "result": {
		"fieldCount": 0,
		"affectedRows": 1,
		"insertId": 7,
		"info": "",
		"serverStatus": 2,
		"warningStatus": 0,
		"changedRows": 0
	  }
   */

  alterarProduto: async (pId, pDescricao, pValor) => {
    const sql = "UPDATE produtos SET descricao=?, valor=? WHERE id_produto=?";
    const values = [pDescricao, pValor, pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  deleteProduto: async(pId) => {
    const sql="DELETE FROM produtos WHERE id_produto = ?;";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  }
};

module.exports = {produtoModel};
