const userdao = require('../dao/userdao')
const jwt = require('jsonwebtoken')

//登录
const loginService =  (req, res) => {
    let username = req.body.username
    let password = req.body.password
    userdao.getUserBylogin(username,password,(data) => {
        let token = getToken(req)
           if(data[0]){
                res.send({
                code: 0,
                message : '登录成功',
                data: {
                    name: data[0].username,
                    id: data[0].id
                },
                token:token
            })
        }
        else{
            res.send({
                code: 400,
                message : '登录失败(用户名或密码错误)',
                data: data[0]
            })
        }    
    })
}

//获取用户信息
const getInfo = (req,res) => {
    let id = req.query.id
    userdao.getUserInfoById(id, (data) => {
        let roles = []
        data.forEach(userInfo => {
            if(!roles.includes(userInfo.rolename)){
                roles.push(userInfo.rolename)
            }
        });
        try {
          res.send({
            code:0,
            data:{
              roles:roles,
              name:data[0].username,
              avatar: ''
            }
          })
        }catch {
          res.send({
            code: 404,
            message: '用户信息查询失败'
          })
        }
    })
}

//查询所有用户信息
const getAllInfo = (req,res) => {
    userdao.getAllUserInfo((data) => {
      let users = []
      let ids = []
      data.forEach(userInfo => {
        if(!ids.includes(userInfo.id)){
          let user = {id: '',username: '',roles: []}
          user.id = userInfo.id
          user.username = userInfo.username
          data.forEach(userInfo2 => {
            if(userInfo2.id === userInfo.id){
              user.roles.push({id: userInfo2.roleId,name: userInfo2.rolename})
            }
          })
          ids.push(userInfo.id)
          users.push(user)
        }
      })
        res.send({
            code: 0,
            data: users
        })
    })
}

//根据id查询用户角色id
const getRoleIdByUserId = (req,res) => {
  let id = req.query.id
  userdao.getRoleIdByUserId(id, (data) => {
    let roleId = []
    data.forEach(role => {
      roleId.push(role.roleId)
    })
    res.send({
      code:0,
      data:{
        roleId
      }
    })
  })
}



const getToken = (req) => {
    let content = {name:req.body.username}
    let key = 'jwt'
    let token = jwt.sign(content,key,{expiresIn: 60*60*5})
    return token
}


module.exports = {loginService,getInfo,getAllInfo,getRoleIdByUserId}