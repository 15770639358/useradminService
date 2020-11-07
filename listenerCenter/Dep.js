const requestQueue = require('./requestQueue')

module.exports = class Dep{
  constructor() {
    this.subs = []
  }
  addWatcher(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach((watcher, index) => {
      if(watcher.insertId === requestQueue.requestArr[0]){
        watcher.dispenceRequest()
        this.subs.splice(index, 1)
        requestQueue.requestArr.shift()
      }
    })
  }
}