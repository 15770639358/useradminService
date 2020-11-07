const app = require('../app')
const jwt = require('jsonwebtoken')
const evevtConfig = require('../eventConfig')
const roleService = require('../service/roleService')

module.exports = function (req,res,next) {
  let token = req.headers.authorization
  let key = 'jwt'
  if(req.url === '/login'){
    next()
    return
  }
  jwt.verify(token, key, async (err, decode) => {
    if(err){
      res.send({
        code: 400,
        message : '登录状态失效',
      })
    }else{
      let roles = await getRoleName(decode.name)
      if(roles.includes('admin')){
        next()
        return
      }else {
        evevtConfig.forEach(service => {
          if(req.path === service.url){
             if( roles.some(role => service.roles.includes(role))) {
               next()
               return
             }else {
               res.send({
                 code: 400,
                 message: '权限不足'
               })
             }
          }
        })
      }
    }
  })
}

async function getRoleName(username) {
  let roles = []
  let rolesList = await roleService.getRolesByUsername(username)
  rolesList.forEach(role => {
    roles.push(role.rolename)
  })
  return roles
}