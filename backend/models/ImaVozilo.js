const Sequelize = require('sequelize');
const db = require('../db/connect.js');
const Klijent = require('./Klijent.js');
const Vozilo = require('./Vozilo.js');

const ImaVozilo  = db.define("ImaVozilo", {
}, {
    tableName: "ImaVozilo"
})

Klijent.belongsToMany(Vozilo, {
    through: ImaVozilo, 
    foreignKey: 'klijentId',
});

Vozilo.belongsToMany(Klijent, {
    through: ImaVozilo,
    foreignKey: 'voziloId',
});

ImaVozilo.sync().then(() => {
    console.log("Napravljen ImaVozilo");
})

module.exports = ImaVozilo;