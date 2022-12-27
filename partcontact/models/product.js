module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define("contact", {
    company_id: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
  });

  return Contact;
};
