const Sequelize = require('sequelize');
const db = require('../db/connect.js');
const Racun = require('./Racun.js');

const Klijent  = db.define("tvrtka", {
    idKlijent:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey: true
    },
    Prezime: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    Ime: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,     
    },
    BrojKartice:{
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