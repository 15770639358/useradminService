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

//查询所有角色
let getAllRole = async (req,res) => {
  let auths = await roleDaos.getAllRole()
  let data = fromtData(auths)
  res.send({
    code: 0,
    data: data
  })
}

//添加角色
let addRoles = async (req, res) => {
  let category = req.body.category
  let rolename = req.body.rolename
  let addCategory = null
  console.log(rolename);
  //select * from role WHERE category like '13__'
  //查询category的子权限查询category的子权限
  let categorys = await roleDaos.getChildCategory(category+'__')
  let categs = []
  categorys.forEach(categ => {
    categs.push(categ.category)
  })
  categs = categs.sort( (a,b) => {
    return b-a
  })
  if(categs.length > 0){
    addCategory = categs[0] + 1
  }else {
    addCategory = category * 100 + 10
  }
  let data = await roleDaos.addCategory(rolename, addCategory)
  if(data.affectedRows !== 0){
    res.send({
      code: 0,
      message: '添加成功'
    })
  }else {
    res.send({
      code: 500,
      message: '添加失败'
    })
  }
}

//删除角色removeRole
let removeRole = async (req,res) => {
  let category = req.body.category
  //判断当前角色及其子角色是否有用户
  let userIds = await roleDaos.getUserIdByCategory(category+'%')
  if(userIds.length !== 0){
    res.send({
      code: 500,
      message: '当前角色下有用户，不可删除'
    })
    return
  }
  let ids = await roleDaos.getAllcategory(category+'%')
  for (const categ of ids) {
    await roleDaos.removeRoleAuth(categ.id)
  }
  let data = await roleDaos.removeRole(category+'%')
  if(data.affectedRows !== 0){
    res.send({
      code: 0,
      message: '删除成功',
    })
  }else {
    res.send({
      code: 500,
      message: '删除失败'
    })
  }
}


// 格式化数据
function fromtData(roles) {
  let auths = []
  roles.forEach(role => {
    if((role.category+'').length === 2){
      let auth = {}
      for(let key in role) {
        auth[key] = role[key]
      }
      // auth.id = role.id
      // auth.path = role.authpath
      // auth.name = role.authname
      // auth.category = role.category
      if(authHasChild(roles, auth.category, 2)) {
        auth.child = []
      }
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
      for(let key in role) {
        auth[key] = role[key]
      }
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

module.exports = {getAllRoles, getAuthByRoleId, getAllAuth, getAllRole, addRoles, removeRole}