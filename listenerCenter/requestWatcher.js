const Observe = require('./Obsever')
const Dep = require('./Dep')
const requestQueue = require('./requestQueue')

new Observe(requestQueue.requestArr)

module.exports = class RequestWatcher{
  constructor(insertId,cb) {
    this.insertId = insertId
    this.cb = cb
    this.setRequestQueue()
  }
  dispenceRequest(){
    this.cb()
  }
  setRequestQueue() {
    Dep.target = this
    requestQueue.requestArr.push(this.insertId)
    Dep.target = null
  }
}

