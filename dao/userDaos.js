const dbconfig = require('../utils/dbconfig')

//查询所有角色
let getAllUser = () => {
  let sql = 'select * from user'
  let sqlArr = []
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}

//删除用户角色
let removeRole = (userId,roleId) => {
  let sql = 'delete from userrole where userId = ? and roleId = ?'
  let sqlArr = [userId,roleId]
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}

//添加用户角色
let addRole = (userId,roleId) => {
  let sql = 'insert into userrole(userId, roleId) values(?,?)'
  let sqlArr = [userId,roleId]
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}
//查询当前用户已有角色 select ur.roleId from user u, userrole ur WHERE u.id = ur.userId and u.id = 1
let getUserRole = (userId) => {
  let sql = 'select ur.roleId from user u, userrole ur WHERE u.id = ur.userId and u.id = ?'
  let sqlArr = [userId]
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}
//查询是否有当前用户名
let  getCountUser = (username) => {
  let sql = 'select count(1) as count from user where username = ?'
  let sqlArr = [username]
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}
//添加用户
let addUser = (username) => {
  let sql = 'insert into user(username, password) values (?,?)'
  let sqlArr = [username,'e10adc3949ba59abbe56e057f20f883e']
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}

//修改密码
let updatePassword = (userId, password) => {
  let sql = 'update user set password = ? where id = ?'
  let sqlArr = [password, userId]
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}

//删除用户其所有角色
let removeUserAllRole = (userId) => {
  let sql = 'delete from userrole where userId = ?'
  let sqlArr = [userId]
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}

//删除用户
let delUser = (userId) => {
  let sql = 'delete from user where id = ?'
  let sqlArr = [userId]
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
module.exports = {getAllUser,removeRole, addRole, getUserRole, getCountUser, addUser, updatePassword,removeUserAllRole, delUser}