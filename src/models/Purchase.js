const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Purchase = sequelize.define('purchase', {
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //notes from class to bring product and user ID
    // userId
    // productId
});

module.exports = Purchase;