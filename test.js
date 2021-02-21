class A {
  constructor() {
    this.nameA = 'a';
  }
  validateA() {
    console.log('A');
  }
}

class B extends A {
  constructor() {
    super();
    this.nameB = 'b';
  }

  validateB() {
    console.log('B');
  }
}

class C extends B {
  constructor() {
    super();
    this.nameC = 'c';
  }

  validateC() {
    console.log('C');
  }
}

/**
 * 找到实例原型链上所有包含传入属性前缀、方法前缀的名称
 *
 * @param {*} instance 实例
 * @param {*} fieldPrefix 属性前缀
 * @param {*} funcPrefix 方法前缀
 */
function findMembers(instance, fieldPrefix, funcPrefix) {
  const results = [];

  while (instance) {
    let names = Reflect.ownKeys(instance);

    names = names.filter(_shouldKeep);

    results.push(...names);

    instance = instance.__proto__;
  }

  function _shouldKeep(name) {
    if (name.startsWith(fieldPrefix) || name.startsWith(funcPrefix)) {
      return true;
    }
    return false;
  }

  return results;
}

var c = new C();

// 编写一个函数findMembers
const members = findMembers(c, 'name', 'validate');
console.log(members);
