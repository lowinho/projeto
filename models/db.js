const Sequelize = require('sequelize');
const sequelize = new Sequelize('blog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log('Conectado ao MySQL com sucesso')
}).catch((erro) => {
    console.log('Erro ao se conectar ao MySQL', erro)
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}