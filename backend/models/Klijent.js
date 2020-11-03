const Sequelize = require('sequelize');
const db = require('../db/connect.js');
const Racun = require('./Racun.js');

const Klijent  = db.define("klijent", {
    idKlijent:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey: true
    },
    prezime: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    ime: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,     
    },
    brojKartice:{
        type:Sequelize.DataTypes.INTEGER,
        unique: true
    }
}, {
    tableName: "Klijent"
})

Racun.hasOne(Klijent);
Klijent.belongsTo(Racun);
Klijent.sync().then(() => {
    console.log("Napravljen Klijent");
})

module.exports = Klijent;