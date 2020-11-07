const dbconfig = require('../utils/dbconfig')

//查询所有权限信息
let setRequest =  (params, func) => {
  let sql = 'insert into eventflow(name, data, date, point ) values (?,?,?,?)'
  let sqlArr = [params.name, JSON.stringify(params.data), params.date, 0]
  dbconfig.getConnect(sql,sqlArr, callBack(func))
}

let getRequest = (insertId, func) => {
  let sql = 'select * from eventflow where id = ?'
  let sqlArr = [insertId]
  dbconfig.getConnect(sql,sqlArr, callBack(func))
}

let setPointer = (insertId,point,func) => {  //0未执行,1执行成功,2执行失败
  let sql = 'update eventflow set point = ? where id = ? '
  let sqlArr = [point,insertId]
  dbconfig.getConnect(sql,sqlArr, callBack(func))
}
const callBack = (func) => {
  return (err, data) => {
    if (err) {
      console.log('数据库查询失败')
      return
    } else {
      func(data)
    }
  }
}
module.exports = {setRequest, getRequest, setPointer}