const Sequelize = require('sequelize');
const db = require('../db/connect.js');
const Rezervacija = require('./Rezervacija.js');

const Jednokratna = db.define("jednokratna", {
    idJednokratna:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey: true
    },
    vrijemePocetak:{
        type:Sequelize.DataTypes.DATE
    },
    vrijemeKraj:{
        type:Sequelize.DataTypes.DATE
    }

}, {
    tableName: "Jednokratna"
})

Jednokratna.belongsTo(Rezervacija, {
    foreignKey: 'rezervacijaId'
});
Jednokratna.sync().then(() => {
    console.log("Napravljena jednokratna rezervacija");
})

module.exports = Jednokratna;