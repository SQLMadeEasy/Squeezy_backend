var express = require('express');
var router = express.Router();
var seq= require('../db')

const { User } = require('../db/models/models_index')


/* GET users listing. */
router.get('/', function (req, res, next) {

    seq.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'").then(function (rows) {
        // console.log(rows)
        rows.forEach(array_table_name => {
            // console.log(array_table_name)
            seq.query(`SELECT *
  FROM information_schema.columns
 WHERE table_schema = 'public'
   AND table_name   = '${array_table_name[0]}'
     ;`).then(function (result) {
                result.forEach(row => {
                    // console.log(row)
                    if (row[0]) {
                        console.log(row[0].column_name)
                    }
                })
                
            });
        })
    });


   
    



        res.send("success")
});

module.exports = router;