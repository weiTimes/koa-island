/*
 * @Author: yewei
 * @Date: 2021-02-23 21:22:17
 * @Last Modified by: yewei
 * @Last Modified time: 2021-02-24 22:05:46
 *
 * 处理微信相关的业务逻辑
 */
const { default: axios } = require('axios');
const util = require('util');

const { generateToken } = require('../../core/utils');
const AuthToken = require('../../middlewares/auth-token');
const User = require('../../models/user');

class WxManager {
  static async codeToToken(code) {
    // code, appid, appsecret
    const wxConfig = global.config.wx;

    // format 可以将变量插入到 authCode2Session 中的占位符中
    const url = util.format(
      wxConfig.authCode2Session,
      wxConfig.appid,
      wxConfig.appSecret,
      code
    );

    const res = await axios.get(url);

    if (res.status !== 200) {
      throw new global.errors.AuthFailed('openid获取失败');
    }

    const errorCode = res.data.errcode;

    if (errorCode && errorCode !== 0) {
      throw new global.errors.AuthFailed(`openid获取失败: ${errorCode}`);
    }

    // 用户档案
    // 1. openid => uid: openid比较长，查询效率不高；openid机密性较高，在客户端和服务端间传递容易造成 openid 泄漏。
    // 2. 将 openid 写入数据库
    // 3. 生成 jwt token 并返回
    let user = await User.getUserByOpenid(res.data.openid);

    if (!user) {
      user = await User.createUserByOpenid(res.data.openid);
    }

    // 使用 uid 生成 jwt token
    return generateToken(user.id, AuthToken.USER);
  }
}

module.exports = WxManager;
