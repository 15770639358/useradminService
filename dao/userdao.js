const app = require("../app");
const dbconfig = require('../utils/dbconfig')

let sqlData = ''
//登录
let getUserBylogin = (username, password, func) => {   
    let sql = 'select * from user where username = ? and password =?'
    let sqlArr = [username, password]
    dbconfig.getConnect(sql,sqlArr,callBack(func))
}

//根据ID获取用户信息
let getUserInfoById = (id, func) => {
    let sql = 'select u.*,ur.roleId,r.rolename from user u ,userrole ur, role r where u.id = ur.userId and ur.roleId = r.id and u.id = ?'
    let sqlArr = [id]
    dbconfig.getConnect(sql, sqlArr ,callBack(func))
}

//查询所有用户信息
let getAllUserInfo = (func) => {
    let sql = 'select u.*,ur.roleId,r.rolename from user u ,userrole ur, role r where u.id = ur.userId and ur.roleId = r.id'
    let sqlArr = []
    dbconfig.getConnect(sql, sqlArr ,callBack(func))
}

//根据id查询用户角色id
let getRoleIdByUserId = (id, func) => {
  let sql = 'select roleId from userrole where userId = ?'
  let sqlArr = [id]
  dbconfig.getConnect(sql, sqlArr, callBack(func))
}

//添加用户角色
let addUserRole = (userId,roleId, func) => {
  let sql = 'insert into userrole(userId, roleId) values (?,?)'
  let sqlArr = [userId, roleId]
  dbconfig.getConnect(sql, sqlArr, callBack(func))
}

//删除用户角色
let removeUserRole = (userId,roleId, func) => {
  let sql = 'delete from userrole where userId = ? and roleId = ?'
  let sqlArr = [userId, roleId]
  dbconfig.getConnect(sql, sqlArr, callBack(func))
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
module.exports = {getUserBylogin, getUserInfoById, getAllUserInfo, getRoleIdByUserId, addUserRole, removeUserRole}