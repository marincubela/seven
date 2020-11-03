const Sequelize = require('sequelize');
const db = require('../db/connect.js');
const Racun = require('./Racun.js');

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
    tableName: "Tvrtka"
})

Tvrtka.belongsTo(Racun);

Tvrtka.sync().then(() => {
    console.log("Napravljena tvrtka");
})

module.exports = Tvrtka;