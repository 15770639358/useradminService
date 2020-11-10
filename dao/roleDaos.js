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

//查询所有角色
let getAllRole = () => {
  let sql = 'select * from role'
  let sqlArr = []
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}

//查询category的子权限查询category的子权限
let getChildCategory = (category) => {
  let sql = 'select category from role WHERE category like ? order by category'
  let sqlArr = [category]
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}

//查询category的子权限查询category的子权限
let addCategory = (rolename, category) => {
  let sql = 'insert into role(rolename, category) values (?, ?)'
  let sqlArr = [rolename, category]
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}

//删除角色及其所有子角色
let removeRole = (category) => {
  let sql = 'delete from role where category like ?'
  let sqlArr = [category]
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}

//查询当前角色及其所有子角色的category
let getAllcategory = (category) => {
  let sql = 'select id from role where category like ?'
  let sqlArr = [category]
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}

//删除角色的所有权限
let removeRoleAuth = (roleId) => {
  let sql = 'delete from roleauto where roleId = ?'
  let sqlArr = [roleId]
  return new Promise((resolve, reject) => {
    dbconfig.getConnect(sql, sqlArr, callBack((data) =>{ resolve(data) }))
  })
}

//根据category 查询用户id select * from userrole where roleId in (select id from role where category like '11%')
let getUserIdByCategory = (category) => {
  let sql = 'select id from userrole where roleId in (select id from role where category like ?)'
  let sqlArr = [category]
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
module.exports = {getAllRoles, getAuthByRoleId, getAllAuth, getAllRole, getChildCategory, addCategory, removeRole, getAllcategory, removeRoleAuth, getUserIdByCategory}