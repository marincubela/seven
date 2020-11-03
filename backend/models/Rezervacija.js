const Sequelize = require('sequelize');
const db = require('../db/connect.js');
const Klijent = require('./Klijent.js');
const Parkiraliste = require('./Parkiraliste.js');
const Vozilo = require('./Vozilo.js');

const Rezervacija  = db.define("rezervacija", {
    idRezervacija:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: "Rezervacija"
})

Rezervacija.belongsTo(Klijent);
Rezervacija.belongsTo(Vozilo);
Rezervacija.belongsTo(Parkiraliste);
Rezervacija.sync().then(() => {
    console.log("Napravljena rezervacija");
})

module.exports = Rezervacija;