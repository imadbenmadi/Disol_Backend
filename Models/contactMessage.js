const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const ContactMessage = sequelize.define("ContactMessage", {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = ContactMessage;
