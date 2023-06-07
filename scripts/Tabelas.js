const db = require('./db')
const { DataTypes } = require('sequelize');

const Usuario = db.sequelize.define('Usuario', {
    idUser: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    tableName: 'Usuario', // Nome da tabela no banco de dados
    timestamps: false // Define se serão utilizados campos de timestamps (createdAt, updatedAt)
  });


  const Alunos = db.sequelize.define('Alunos', {
    idAluno : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nome: {
      type: DataTypes.STRING(100)
    },
    dtNascimento: {
      type: DataTypes.DATE
    },
    serie: {
      type: DataTypes.STRING(10)
    },
    sexo: {
      type: DataTypes.CHAR
    },
    rm: {
      type: DataTypes.INTEGER(4),
      unique: true
    }
  }, {
    tableName: 'Alunos',
    timestamps: false
  });

  module.exports = {
    Alunos,
    Usuario
  };
