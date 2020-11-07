const dbconfig = require('../utils/dbconfig')

//查询所有角色
let getAllRoles = () => {
  let sql = 'select * from role'
  let sqlArr = []
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}

//根据角色id查询所有权限
let getAuthByRoleId = (roleId) => {
  let sql = 'select au.* from authority au,role r, roleauto ro where r.id = ro.roleid and ro.authId = au.id and r.id = ?'
  let sqlArr = [roleId]
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}

//查询所有权限
let getAllAuth = () => {
  let sql = 'select * from authority'
  let sqlArr = []
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
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
module.exports = {getAllRoles, getAuthByRoleId, getAllAuth}