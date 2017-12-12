const db = require('/home/josh/senior-enrichment/server/db/index.js');
const Sequelize = db.Sequelize;

const Student = db.define('student', {

  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },

  gpa: {
    type: Sequelize.DECIMAL,
    validate: {
      max: 4,
      min: 0
    }
  },

  name: {
    type: Sequelize.VIRTUAL,
    get () {
      return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
    }
  }
});

module.exports = Student;
