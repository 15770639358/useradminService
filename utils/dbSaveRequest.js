const eventConfig = require('../eventConfig')
const timeParsers = require('./timeparser')
const eventFlow = require('../dao/eventFlow')

const saveRequest = async (req,res) => { // 存 & 给变量池
  let insertId = ''
  let data = ''
  let url = req.path
  let name = ''
  eventConfig.forEach((event) => {
    if(event.url === url) {
      name = event.name
    }
  })
  if(req.method === 'GET'){
    data = req.query
  }else {
    data = req.body
  }
  let date = timeParsers.timeParser(new Date())
  //存入数据库
  // eventFlow.setRequest({name, data, date},  (data) => {
  //   insertId = data.insertId
  // })
  return new Promise((resolve, reject) => {
    eventFlow.setRequest({name, data, date},  (data) => {
        insertId = data.insertId
        resolve({insertId, name})
      })
  })

}


module.exports = {saveRequest}