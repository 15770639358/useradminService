const userdao = require('../dao/userdao')
const roledao = require('../dao/roledao')

//删除用户角色
const removeUserRole = (req,res) => {
  let userId = req.query.userId
  let roleId = req.query.roleId
  userdao.removeUserRole(userId, roleId, (data) => {
    if(data.fieldCount == 0){
      res.send({
        code:0,
        data:{
          msg: '删除成功'
        }
      })
    }
    else{
      res.send({
        code:1,
        data:{
          msg: '删除失败'
        }
      })
    }
  })
}

//增加用户角色
const addUserRole = (req,res) => {
  let userId = req.query.userId
  let roleId = req.query.roleId
  userdao.addUserRole(userId, roleId, (data) => {
    if(data.fieldCount == 0){
      res.send({
        code:0,
        data:{
          msg: '添加成功'
        }
      })
    }
    else{
      res.send({
        code:1,
        data:{
          msg: '添加失败'
        }
      })
    }
  })
}

//查询所有角色的权限信息
const getAllAuto = (req,res) => {
  roledao.getAllAuth((data) => {
    let roles = []
    let ids = []
    data.forEach(roleInfo => {
      if(!ids.includes(roleInfo.id)){
        let role = {id: '',rolename: '',auths: []}
        role.id = roleInfo.id
        role.rolename = roleInfo.rolename
        data.forEach(roleInfo2 => {
          if(roleInfo2.id === roleInfo.id){
            role.auths.push({authId: roleInfo2.authId, authname: roleInfo2.authname, authpath : roleInfo2.authpath})
          }
        })
        ids.push(roleInfo.id)
        roles.push(role)
      }
    })
    res.send({
      code: 0,
      data: roles
    })
  })
}

//查询所有权限信息
const getAuthInfo = (req, res) => {
  roledao.getAuthInfo((data) => {
    res.send({
      code:0,
      data:data
    })
  })
}

//添加权限
const addAuth = (req, res) => {
  let roleId = req.query.roleId
  let authId = req.query.authId
  roledao.addAuth(roleId,authId,(data) => {
    res.send({
      code:0,
      data:data
    })
  })
}

//删除权限
const removeAuth = async (req, res) => {
  let roleId = req.query.roleId
  let authId = req.query.authId
  let categorys = await roledao.getCategoryById(roleId)
  roledao.removeAuth(categorys[0].category+'%',authId,(data) => {
    res.send({
      code:0,
      data:data
    })
  })
}

//服务端调用
const getRolesByUsername = (username) => {
  return new Promise((resolve, reject) => {
    roledao.getRolesByUsername(username, (data) => {
      resolve(data)
    })
  })
}


module.exports = {removeUserRole, addUserRole, getAllAuto, getAuthInfo, addAuth, removeAuth, getRolesByUsername}