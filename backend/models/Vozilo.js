const Sequelize = require('sequelize');
const db = require('../db/connect.js');
const Racun = require('./Racun.js');

const Vozilo = db.define("vozilo", {
    idVozilo:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey: true
    },
    nazivVozila: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    boja: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,     
    },
    registracija: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: true     
    }

}, {
    tableName: "Vozilo"
})

Vozilo.sync().then(() => {
    console.log("Napravljeno vozilo");
})

module.exports = Vozilo;