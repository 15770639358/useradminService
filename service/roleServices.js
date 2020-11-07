const roleDaos = require('../dao/roleDaos')

//获取所有角色
let getAllRoles = async (req,res) => {
  let data = await roleDaos.getAllRoles()
  res.send({
    code: 0,
    data
  })
}

//根据角色id查询所有权限
let getAuthByRoleId = async (req,res) => {
  let roleId = req.query.id
  let roles = await roleDaos.getAuthByRoleId(roleId)
  let data = fromtData(roles)
  res.send({
    code: 0,
    data: data
  })
}

//查询所有权限
let getAllAuth = async (req,res) => {
  let auths = await roleDaos.getAllAuth()
  let data = fromtData(auths)
  res.send({
    code: 0,
    data: data
  })
}

function fromtData(roles) {
  let auths = []
  roles.forEach(role => {
    if((role.category+'').length === 2){
      let auth = {}
      auth.id = role.id
      auth.path = role.authpath
      auth.name = role.authname
      auth.category = role.category
      auth.child = []
      let a = filterChild(roles,auth,4)
      auths.push(a)
    }
  })
  return auths
}

let filterChild = (roles,authObj,limit) => {
  roles.forEach(role => {
    if((role.category+'').length === limit && (role.category+'').substring(0,limit-2) === (authObj.category+'').substring(0,limit-2)){
      let auth = {}
      auth.id = role.id
      auth.path = role.authpath
      auth.name = role.authname
      auth.category = role.category
      if(authHasChild(roles, auth.category, limit)){
        auth.child = []
      }
      let childAuth = filterChild(roles,auth,limit+2)
      authObj.child.push(childAuth)
    }
  })
  return authObj
}

let authHasChild = (roles, category, limit) => {

    return roles.some((role) => {return (role.category+'').length === limit + 2 && (role.category+'').substring(0,limit) === (category+'').substring(0,limit)})
}

module.exports = {getAllRoles, getAuthByRoleId, getAllAuth}