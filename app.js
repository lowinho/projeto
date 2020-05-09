const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require('./routes/admin')
const path = require('path')
const Categoria = require('./models/Categoria')
    // const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()

// BANCO DE DADOS

// Sequelize

// Mongoose
// moongose.Promise = global.Promise;
// moongose.connect('mongodb://localhost/blogapp').then(() => {
//         console.log('Conectado ao mongoDB').catch((erro) => {
//             console.log('Erro ao se conectar'+ erro)
//         })
//     })
// Public
app.use(express.static(path.join(__dirname, 'public')))

// Configurações 

//Session
app.use(session({ // configuração da Session
    secret: 'cursodenode',
    resave: true,
    saveUninitialized: true
}))

//Flash
app.use(flash()) // configuração do flash

//Middleware
app.use((req, res, next) => { // configuração da Middleware
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next();
})

// Body Parser
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

//Rotas

app.get('/', (req, res) => {
    res.send('Rota principal')
})

app.get('/posts', (req, res) => {
    res.send('Lista de Posts')
})

app.use('/admin', admin)


//PORTA
const PORT = 8089
app.listen(PORT, () => {
    console.log('Servidor Rodando na url http://localhost:8089')
})