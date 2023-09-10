const Sequelize = require("sequelize") //Importa o framework

const sequelize = new Sequelize('cadastros', 'root', 'Dev0303!',{ //Se refere ao banco de dados
    host: "localhost",
    dialect: "mysql"
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}