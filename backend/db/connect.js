const {Sequelize} = require('sequelize');

module.exports = new Sequelize('postgres:postgres:bazepodataka@127.0.0.1:5432/progi-test')