const eventFlow = require('../dao/eventFlow')
const eventConfig = require('../eventConfig')

const getRequest = (insertId,name,req,res) => {
  eventConfig.forEach((event) => {
    if(event.name === name) {
      let { [event.functionName]:functionName } = require(event.functionAddress)
      functionName(req,res)
    }
  })
  eventFlow.setPointer(insertId,1,(data) => {})
}

module.exports = {getRequest}