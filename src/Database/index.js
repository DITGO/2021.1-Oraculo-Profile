const { User } = require("../Model/User");
const config = require("./config/database");
const { Sequelize } = require("sequelize");
const { Department } = require("../Model/Department");
const { Level } = require("../Model/Level");
const { Section } = require("../Model/Section");

async function setupModels(db) {
  User.init(db);
  Department.init(db);
  Level.init(db);
  Section.init(db);

  User.associate(db.models);
  Department.associate(db.models);
  Level.associate(db.models);
  Section.associate(db.models);
}

async function setupSequelize(config) {
  require("dotenv").config();
  console.info(`connecting to ${process.env.DATABASE_URL}`);
  return new Sequelize(process.env.DATABASE_URL, {
    define: {
      timestamps: true,
      underscored: true,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

async function configure(auth, db) {
  return new Promise((resolve, reject) => {
    auth.then(() => {
      setupModels(db);
      resolve(0);
    });
  });
}

async function initializeDatabase() {
  const db = await setupSequelize(config);
  const auth = db.authenticate();
  return configure(auth, db);
}

module.exports = {
  initializeDatabase,
};
