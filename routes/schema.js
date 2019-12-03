var express = require('express');
var router = express.Router();
var seq= require('../db')
const Sequelize = require('sequelize')

const { User } = require('../db/models/models_index')


/* GET users listing. */
router.get('/', async function (req, res, next) {
    const tableNamesQueryResult = await seq.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public'   AND table_schema NOT IN(
          'pg_catalog', 
          'information_schema', 
          'management', 
          'postgraphile_watch',
          'spatial_ref_sys',
          'pg_buffercache',
          'raster_columns',
          'raster_overviews',
          'pg_stat_statements',
          'geography_columns',
          'geometry_columns'
          ) and table_name != '_Migration'`)
        const currDBSchema = {}
        for (const object_table_name of tableNamesQueryResult[0]) {
            const table_name = object_table_name.table_name
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
        console.log(tableNamesQueryResult)
        res.json(currDBSchema)
});

//TODO: replace with a get, currently body isn't being sent with get

router.post('/run_query', async (req, res, next) => {
    //For individual credentials passed in body

    if (req.body.databaseName) {
        const dbPassword = req.body.databasePassword || ''
        const userDB = new Sequelize(req.body.databaseName, req.body.databaseUser, dbPassword, {
            host: req.body.hostname,
            dialect: 'postgres',
            port: 5432,
        });
        try {
            const data = await userDB.query(req.body.query)
            userDB.close()
            res.json(data[0])
        } catch (err) {
            next(err)
        }
    } else {
        try {
            const data = await seq.query(req.body.query)
            res.json(data[0])
        } catch (err) {
            next(err)
        }

    }


    //for connection string passed in body: 

    // const userDB = new Sequelize(
    //     req.body.external_database_connection_string || 'postgres://squeezy_backend:0kCVXH7KkqbSKkjTdPvo9mw53DncCppx@postgres.render.com/squeezy_backend_608m?ssl=true',
    //     {
    //         logging: true
    //     }
    // )


 
})

module.exports = router;