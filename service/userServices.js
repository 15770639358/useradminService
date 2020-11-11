const userDaos = require('../dao/userDaos')

let getAllUser = async (req,res) => {
  let users = await  userDaos.getAllUser()
  res.send({
    code: 0,
    data: users
  })
}

let removeRole = async (req,res) => {
  let userId = req.body.userId
  let roleId = req.body.roleId
  let users = await  userDaos.removeRole(userId,roleId)
  res.send({
    code: 0,
    data: users
  })
}

let addRole = async (req,res) => {
  let userId = req.body.userId
  let roleId = req.body.roleId
  let data = await  userDaos.addRole(userId,roleId)
  res.send({
    code: 0,
    data: data
  })
}
//getUserRole
let getUserRole = async (req,res) => {
  let userId = req.body.userId
  let data = await  userDaos.getUserRole(userId)
  res.send({
    code: 0,
    data: data
  })
}
//getCountUser
let getCountUser = async (req,res) => {
  let username = req.body.username
  let data = await  userDaos.getCountUser(username)
  res.send({
    code: 0,
    data: data
  })
}

//addUser
let addUser = async (req,res) => {
  let username = req.body.username
  let data = await  userDaos.addUser(username)
  res.send({
    code: 0,
    data: data
  })
}
//updatePassword
let updatePassword = async (req,res) => {
  let userId = req.body.userId
  let password = req.body.password
  let data = await  userDaos.updatePassword(userId,password)
  res.send({
    code: 0,
    data: data
  })
}
module.exports = {getAllUser,removeRole, addRole, getUserRole, getCountUser, addUser, updatePassword}