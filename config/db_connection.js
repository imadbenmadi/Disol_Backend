const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

// sequelize
//     .sync({ force: false })
//     .then(() => {
//         console.log("Database synchronized");
//     })
//     .catch((error) => {
//         console.error("Failed to synchronize database:", error);
//     });
sequelize
    .authenticate()
    .then(() => {
        console.log("Database connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
module.exports = sequelize;