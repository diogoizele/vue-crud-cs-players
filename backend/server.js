const pg = require("pg");
const express = require("express");

const app = express();
const port = 4040;

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST");
  next();
});
app.listen(port, () => console.log("Server is running on port 4040..."));

const pgConfig = {
  host: "localhost",
  user: "postgres",
  database: "cs_database",
  password: "pgadmin",
  port: 5433,
};
const queryListPlayer =
  "SELECT j.nickname, to_char(j.data_nascimento, 'yyyy-mm-dd') as data_nascimento,  j.qtd_estrela, p.codigo, p.nome, p.descricao, j.senha, to_char(j.data_cadastro, 'yyyy-mm-dd') as data_cadastro FROM tb_jogador j, tb_patente p where j.patente_codigo=p.codigo order by j.data_cadastro asc";
const queryListPatent =
  "SELECT patent.codigo, patent.nome, patent.descricao from tb_patente patent order by patent.codigo asc";

const postgres = new pg.Pool(pgConfig);

app.get("/", (req, res) => res.send("WebServer Funcionando"));
app.get("/listPlayers", (req, res) => {
  postgres.connect((err, client, done) => {
    if (err) {
      console.log(`Não conseguiu acessar o Banco de dados: ${err}`);
      res.status(400).send(`{${err}}`);
    } else {
      client.query(queryListPlayer, (err, result) => {
        done();
        if (err) {
          console.log(err);
          res.status(400).send(`{${err}}`);
        } else {
          res.status(200).send(result.rows);
          console.log(res, result);
        }
      });
    }
  });
});
app.get("/listPatents", (req, res) => {
  postgres.connect((err, client, done) => {
    if (err) {
      console.log(`Não conseguiu acessar o Banco de dados: ${err}`);
      res.status(400).send(`{${err}}`);
    } else {
      client.query(queryListPatent, (err, result) => {
        done();
        if (err) {
          console.log(err);
          res.status(400).send(`{${err}}`);
        } else {
          res.status(200).send(result.rows);
          console.log(res.result);
        }
      });
    }
  });
});
