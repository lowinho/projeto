const db = require('./db')

const Categoria = db.sequelize.define('posts', {
    nome: {
        type: db.Sequelize.STRING
    },
    slug: {
        type: db.Sequelize.TEXT
    },
    date: {
        type: db.Sequelize.DATE
    }
})

// Categoria.create({
//     nome: 'César',
//     slug: 'asdpoksdpokasdpokaspasdokas',
//     date: '07/05/2020'
// })

// Categoria.sync({ force: true }) // só executa esse comando uma vez, quando criar o model

module.exports = Categoria


// Configuração do Mongoose

// const mongoose = require('mongoose')
// const Schema = mongoose.Schema;

// const Categoria = new Schema({

//     nome: {
//         type: String,
//         required: true
//     },
//     slug: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         required: Date.now()
//     },

// })

// mongoose.model('categoroias', Categoria)