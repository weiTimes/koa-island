const { Sequelize } = require('sequelize');
const { dbName, host, port, user, password } = require('../config').database;

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql', // 连接的数据库类型，想要连接mysql，就需要安装它的驱动程序 `mysql2`
  host,
  port,
  logging: true, // 在控制台显示操作数据库的sql
  timezone: '+8:00', // 北京时间
  define: {
    timestamps: true, // 自动生成时间字段 create_time, update_time
    paranoid: true, // delete_time
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true, // 使用下划线命名规范
  },
});

sequelize.sync({
  force: false, // 强制先删除数据库，仅用在开发环境；或者可以使用数据迁移（成本高、有风险）
});

module.exports = sequelize;
