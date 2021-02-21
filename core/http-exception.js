class HttpException extends Error {
  constructor(message, errorCode, status) {
    super();
    this.message = message;
    this.errorCode = errorCode;
    this.status = status;
  }
}

class ParameterException extends HttpException {
  constructor(message = '参数错误', errorCode = '20000') {
    super();
    this.message = message;
    this.errorCode = errorCode;
    this.status = 400;
  }
}

class Success extends HttpException {
  constructor(message = 'ok', errorCode) {
    super();
    this.status = 201; // 查询成功200，操作成功201
    this.message = message;
    this.errorCode = errorCode || 0;
  }
}

class NotFound extends HttpException {
  constructor(message = '资源未找到', errorCode = '20000') {
    super();
    this.status = 404;
    this.message = message;
    this.errorCode = errorCode;
  }
}

class AuthFailed extends HttpException {
  constructor(message = '授权失败', errorCode = '20004') {
    super();
    this.status = 401;
    this.message = message;
    this.errorCode = errorCode;
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
};
