const { Sequelize, Model } = require('sequelize');
const sequelize = require('../core/db');

const classicFileds = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.STRING,
  type: Sequelize.TINYINT,
};

// Movie 模型
class Movie extends Model {}

Movie.init(classicFileds, { sequelize, tableName: 'movie' });

// Sentence 模型
class Sentence extends Model {}

Sentence.init(classicFileds, { sequelize, tableName: 'sentence' });

// Music 模型
class Music extends Model {}

Music.init(Object.assign({ url: Sequelize.STRING }, classicFileds), {
  sequelize,
  tableName: 'music',
});
