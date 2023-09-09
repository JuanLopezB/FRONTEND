const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

const jwt = require('jsonwebtoken');



router.get('/', (req, res) => {
    mysqlConnection.query('select * from agenda.user', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Error al listar usuarios: ' + err);
        }
    })
});

router.post('/singin', (req, res) =>{
    console.log(req.body);
});

//pendiente revisar para continuar con el login...

module.exports = router;