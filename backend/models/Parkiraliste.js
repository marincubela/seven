const { STRING } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../db/connect.js');
const Tvrtka = require('./Tvrtka.js');

const Parkiraliste = db.define("Parkiraliste", {
    idParkiralista:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey: true
    },
    nazivParkiralista: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    brojMjesta:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    brojInvalidskihMjesta:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    tipParkiralista: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    koordinate: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    cijenaJednokratne: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    cijenaPonavljajuce: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    cijenaTrajne: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "Parkiraliste"
})

Parkiraliste.belongsTo(Tvrtka, {
    foreignKey: 'tvrtkaId',
});

Parkiraliste.sync().then(() => {
    console.log("Napravljeno parkiraliste");
})

module.exports = Parkiraliste;