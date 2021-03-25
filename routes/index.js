var express = require('express');
var router = express.Router();

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "hans",
    password: "hans",
    database: "empleados",
    port: 5433
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/empleados', async function(req,res,next) {
  
  const empleados = await knex.raw('select * from empleados');
  console.log(empleados.rows);
  res.json({data:empleados.rows});
})
/* POST home page. */

router.post('/empleados', async function (req, res,next) {
  console.log(req.body);

  const empleados = await knex.raw(`INSERT INTO empleados (nombre,edad,sueldo) VALUES ('${req.body.nombre}','${req.body.edad}' ,'${req.body.sueldo}' )`);

  res.json({data: "INSERT_OK"});
})

/* DELETE home page. */

router.delete('/empleados/:idEmpleado', async function (req, res,next) {
  console.log(req.params);
  const empleados = await knex.raw(`DELETE FROM empleados WHERE id=${req.params.idEmpleado}`);
  res.json({data: "DELETE_OK"});
})





module.exports = router;

