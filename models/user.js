const { Sequelize, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = require('../core/db');

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new global.errors.AuthFailed('账号不存在');
    }

    const isCorrect = await bcrypt.compareSync(plainPassword, user.password);

    if (!isCorrect) {
      throw new global.errors.AuthFailed('密码不正确');
    }

    return user;
  }

  // 查询数据库中具有相同 openid 的用户
  static async getUserByOpenid(openid) {
    const user = await User.findOne({ where: { openid } });

    return user;
  }

  // 使用 openid 创建一个用户
  static async createUserByOpenid(openid) {
    return await User.create({ openid });
  }
}

// 生成表
User.init(
  {
    // id 编号系统：
    // 1. 自增
    // 2. 自己设计：id用数字类型；不用随机字符串。 => 由于不知道上一个用户的id，所以需要先查询一遍数据库，找到上一个用户的id；并发量大的情况，可能会导致id计算重复；
    // : 不管怎么设计，有一定规律的都可能猜到用户的id；接口权限来对用户的信息进行保护
    id: {
      type: Sequelize.INTEGER, // 整型相比字符串查询性能更好
      primaryKey: true, // 主键：不能为空、唯一性
      autoIncrement: true, // id自增，不用随机shu
    },
    username: Sequelize.STRING,
    email: {
      type: Sequelize.STRING(128),
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10);
        const cryptPwd = bcrypt.hashSync(val, salt);

        this.setDataValue('password', cryptPwd);
      },
    },
    // 每个小程序对应一个openid，如果需要知道多个小程序货公众号的同一个用户，可以获取他的unionId
    openid: {
      type: Sequelize.STRING(64),
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'user',
  }
);

module.exports = User;
