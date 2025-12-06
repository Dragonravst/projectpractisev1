const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Post = require('./Post')(sequelize, Sequelize);
db.Tag = require('./Tag')(sequelize, Sequelize);

// Associations
db.User.hasMany(db.Post, { foreignKey: 'userId', as: 'posts' });
db.Post.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.Post.belongsToMany(db.Tag, { through: 'PostTags', as: 'tags' });
db.Tag.belongsToMany(db.Post, { through: 'PostTags', as: 'posts' });

module.exports = db;