const Sequelize = require('sequelize');
const db = require('../db/connect.js');
const Racun = require('./Racun.js');
Tvrtka.belongsTo(Racun);
const Tvrtka = db.define("tvrtka", {
    idTvrtka:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey: true
    },
    naziv: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    adresa: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,     
    }

}, {
    tableName: "Klijent"
})

Racun.sync().then(() => {
    console.log("Napravljena tvrtka");
})

module.exports = Tvrtka;