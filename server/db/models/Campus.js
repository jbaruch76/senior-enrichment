const db = require('/home/josh/senior-enrichment/server/db/index.js');
const Sequelize = db.Sequelize;

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: null
  },

  description: {
    type: Sequelize.TEXT
  }

});

module.exports = Campus;

