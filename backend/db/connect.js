const {Sequelize} = require('sequelize');
//ovo je samo testna baza! 
module.exports = new Sequelize('postgres:postgres:bazepodataka@127.0.0.1:5432/progi-test')