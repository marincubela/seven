const Sequelize = require('sequelize');
const db = require('../db/connect.js');

const Racun = db.define("racun", {
    id:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey: true
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    OIB: {
        type: Sequelize.DataTypes.STRING(11),
        unique: true,
        allowNull: false
    },
    admin:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false
    },
    lozinka: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,     
    }

})