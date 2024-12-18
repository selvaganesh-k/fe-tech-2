const { Sequelize } = require('sequelize');
const db = require('../config/db');
const { DataTypes } = Sequelize;
const User = require('./UserModel');

const Order = db.define('orders', {
    oid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'uid'
        }
    },
    order_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Received', 'Shipping', 'Done', 'Cancelled', 'Complaint'), // Consider using ENUM for predefined statuses
        allowNull: false,
        defaultValue: 'Received'
    }
}, {
    tableName: 'orders',
    timestamps: true, 
});

Order.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});
module.exports = Order;