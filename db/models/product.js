const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    price: {
        type: Sequelize.INTEGER
    }
})


module.exports = Product
