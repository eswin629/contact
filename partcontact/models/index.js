const { Sequelize, DataTypes } = require("sequelize");

//sql server
const sequelize = new Sequelize("NodeDB", "Eswin1205", "123456", {
  dialect: "mssql",
  dialectOptions: {
    // Observe the need for this nested `options` field for MSSQL
    options: {
      // Your tedious options here
      useUTC: false,
      dateFirst: 1,
    },
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contact = require("./contact")(sequelize, Sequelize);
module.exports = db;
