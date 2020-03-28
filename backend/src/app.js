const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json()); // Avisar que esta usando json
app.use(routes);
app.use(errors());

module.exports = app;

/*
 * rotas / recursos
*/

/**
 * Métodos HTTP
 * Get: buscar uma informação no back-end
 * Post: Criar uma informa no back-end
 * Put: Alter uma informação no back-end
 * Delete: Deletar uma informação no back-end
 */

/**
 * Tipos de parametros
 * 
 * Query Params: Parâmetros nomeados enviados na rota após '?' (Filtros, paginação)
 * Route Params: Parâmetros utilizados para iniciar recursos
 * Request Body: Corpo da requisição, utilizado para criar e alterar recursos
 */

/**
 * SQL: SQLite, MySQL...
 * NoSQL: MongpDB, CouchDB...
 */

 /**
  * Driver: SELECT * FROM users
  * Query Build: table('users').from('*')
  */