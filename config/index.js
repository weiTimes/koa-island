module.exports = {
  appKey: 'Y5lm3gRu9Kk0rR1d',
  env: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '19950705',
  },
  security: {
    secretKey: 'ywhoo', // 可生成一个足够复杂的随机字符串
    expiresIn: 60 * 60 * 24 * 30, // 一个小时 60min * 60send
  },
  wx: {
    appid: 'wxa1d7031acfe4fa1c',
    appSecret: '4afa5da9e7781c34df8d914d4a7a9df3',
    authCode2Session:
      'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
  },
};
