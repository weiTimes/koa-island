const { LinValidator, Rule } = require('../../core/validator2');
const User = require('../../models/user');
const { LoginType } = require('../lib/enum');
const { isThisType } = require('../lib/helps');

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();

    this.id = [new Rule('isInt', '需要是正整数', { min: 1 })];
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super();

    this.email = [new Rule('isEmail', '邮箱不符合规范')];
    this.password1 = [
      new Rule('isLength', '密码最少5个字符，最多32个字符', {
        min: 5,
        max: 32,
      }),
      new Rule(
        'matches',
        '密码不符合规范',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
      ),
    ];
    this.password2 = this.password1;
    this.username = [
      new Rule('isLength', '昵称不符合规范', {
        min: 4,
        max: 32,
      }),
    ];
  }

  validatePassword(vals) {
    const password1 = vals.body.password1;
    const password2 = vals.body.password2;

    if (password1 !== password2) {
      throw new Error('两次密码不一致');
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email;
    const user = await User.findOne({ where: { email } });

    if (user) {
      throw new Error('该邮箱已存在');
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super();

    this.account = [
      new Rule('isLength', '不符合账号规则', { min: 4, max: 32 }),
    ];
    // 密码可选，根据登录方式决定：web登录、微信登录、手机号登录...
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', { min: 6, max: 128 }),
    ];
    // this.type = [];
  }

  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type必须传递');
    }

    if (!isThisType.call(LoginType, vals.body.type)) {
      throw new Error('type参数不合法');
    }
  }
}

module.exports = {
  TokenValidator,
  PositiveIntegerValidator,
  RegisterValidator,
};
