const Sequelize = require("sequelize") //Importa o framework

const sequelize = new Sequelize('projeto', 'root', 'sesi123',{ //Se refere ao banco de dados
    host: "localhost",
    dialect: "mysql"
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}