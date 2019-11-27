var express = require('express');
var router = express.Router();
var seq= require('../db')

const { User } = require('../db/models/models_index')


/* GET users listing. */
router.get('/', async function (req, res, next) {
    const tableNamesQueryResult = await seq.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
        const currDBSchema = {}
        for (const array_table_name of tableNamesQueryResult) {
            const table_name = array_table_name[0]
            currDBSchema[table_name] = {}
            const tableColumnsQueryResult = await seq.query(`SELECT *
                    FROM information_schema.columns
                    WHERE table_schema = 'public'
                    AND table_name   = '${table_name}'
                ;`)
            for (const column of tableColumnsQueryResult[0]) {
                if (column.data_type === 'character varying') {
                    column.data_type = 'string'
                } 
                if (column.data_type === 'timestamp with time zone') {
                    column.data_type = 'datetime'
                }
                currDBSchema[table_name][column.column_name] = column.data_type
            }
        }
        res.json(currDBSchema)
});

//TODO: replace with a get, currently body isn't being sent with get

router.post('/run_query', async (req, res, next) => {
    try{
        const data = await seq.query(req.body.query)
        res.json(data[0])
    } catch (err) {
        next(err)
    }
 
})

module.exports = router;