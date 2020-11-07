const Dep = require('./Dep')
//劫持监听insertIds队列
module.exports = class Obsever{
  constructor(data){
    this.data = data
    this.observer(data)
  }

  // 劫持监听data数据
  observer(array){
    const dep = new Dep()
    const arrayProto = Array.prototype;
    const arrayMethods = Object.create(arrayProto);
    const newArrProto = [];
    [
      'push',
      'pop',
      'shift',
      'unshift',
      'splice',
      'sort',
      'reverse'
    ].forEach(method => {
      // 原生Array的原型方法
      let original = arrayMethods[method];
      newArrProto[method] = function mutator() {
        // console.log('监听到数组的变化啦！');
        // 调用对应的原生方法并返回结果（新数组长度）
        Dep.target && dep.addWatcher(Dep.target)
        original.apply(this, arguments)
        dep.notify()
      }
    })
    array.__proto__ = newArrProto;
  }
}