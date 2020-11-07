const dbconfig = require('../utils/dbconfig')

//查询角色所有权限
let getAllAuth = (func) => {
  let sql = 'SELECT r.*, au.id as authId, au.authpath, au.authname, au.category from role r, roleauto ra, authority au where r.id = ra.roleId and ra.authId= au.id'
  let sqlArr = []
  dbconfig.getConnect(sql, sqlArr, callBack(func))
}

//增加权限
let addAuth = (roleId, authId, func)  => {
  let sql = 'insert into roleauto(roleId, authId) values (?,?)'
  let sqlArr = [roleId, authId, func]
  dbconfig.getConnect(sql, sqlArr, callBack(func))
}

//删除权限
let removeAuth = (roleId, authId, func) => {
  let sql = 'delete from roleauto where roleId = ? and authId = ?'
  let sqlArr = [roleId, authId, func]
  dbconfig.getConnect(sql, sqlArr, callBack(func))
}

//查询所有权限信息
let getAuthInfo =  (func) => {
  let sql = 'select * from authority'
  let sqlArr = []
  dbconfig.getConnect(sql,sqlArr, callBack(func))
}

//更据用户名返回权限
let getRolesByUsername = (username,func) => {
  let sql = 'select r.rolename from user u, userrole ur, role r WHERE u.id = ur.userId and ur.roleId = r.id and u.username = ?'
  let sqlArr = [username]
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
module.exports = {getAllAuth,getAuthInfo, addAuth, removeAuth, getRolesByUsername}