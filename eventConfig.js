const path = require('path')

module.exports = [
  {
    name: 'userLogin',
    url: '/login',
    functionAddress: path.join(__dirname,'service/userService'),
    functionName: 'loginService',
    roles:['admin','editor','reader'] // _ALL
  },
  {
    name: 'getUserInfo',
    url: '/info',
    functionAddress: path.join(__dirname,'service/userService'),
    functionName: 'getInfo',
    roles:['admin','editor','reader']
  },
  {
    name: 'getAllUserInfo',
    url: '/AllUser',
    functionAddress: path.join(__dirname,'service/userService'),
    functionName: 'getAllInfo',
    roles:['admin','editor','reader']
  },
  {
    name: 'getRoleIdByUserId',
    url: '/getRoleId',
    functionAddress: path.join(__dirname,'service/userService'),
    functionName: 'getRoleIdByUserId',
    roles:['admin','editor','reader']
  },
  {
    name: 'removeUserRole',
    url: '/removeUserRole',
    functionAddress: path.join(__dirname,'service/roleService'),
    functionName: 'removeUserRole',
    roles:['admin','editor']
  },
  {
    name: 'addUserRole',
    url: '/addUserRole',
    functionAddress: path.join(__dirname,'service/roleService'),
    functionName: 'addUserRole',
    roles:['admin','editor']
  },
  {
    name: 'getAllAuth',
    url: '/getAllAuth',
    functionAddress: path.join(__dirname,'service/roleService'),
    functionName: 'getAllAuto',
    roles:['admin','editor','reader']
  },
  {
    name: 'getAuthInfo',
    url: '/getAuthInfo',
    functionAddress: path.join(__dirname,'service/roleService'),
    functionName: 'getAuthInfo',
    roles:['admin','editor','reader']
  },
  {
    name: 'addAuth',
    url: '/addAuth',
    functionAddress: path.join(__dirname,'service/roleService'),
    functionName: 'addAuth',
    roles:['admin']
  },
  {
    name: 'removeAuth',
    url: '/removeAuth',
    functionAddress: path.join(__dirname,'service/roleService'),
    functionName: 'removeAuth',
    roles:['admin']
  },


  {
    name: 'getAllRoles',
    url: '/getAllRoles',
    functionAddress: path.join(__dirname,'service/roleServices'),
    functionName: 'getAllRoles',
    roles:['admin','editor','reader'] // _ALL
  },
  {
    name: 'getAuthByRoleId',
    url: '/getAuthByRoleId',
    functionAddress: path.join(__dirname,'service/roleServices'),
    functionName: 'getAuthByRoleId',
    roles:['admin','editor','reader'] // _ALL
  },
  {
    name: 'getAllAuths',
    url: '/getAllAuths',
    functionAddress: path.join(__dirname,'service/roleServices'),
    functionName: 'getAllAuth',
    roles:['admin','editor','reader'] // _ALL
  },
  {
    name: 'getAllRole',
    url: '/getAllRole',
    functionAddress: path.join(__dirname,'service/roleServices'),
    functionName: 'getAllRole',
    roles:['admin','editor','reader'] // _ALL
  },
  {
    name: 'addRoles',
    url: '/addRoles',
    functionAddress: path.join(__dirname,'service/roleServices'),
    functionName: 'addRoles',
    roles:['admin','editor','reader'] // _ALL
  },
  {
    name: 'removeRole',
    url: '/removeRole',
    functionAddress: path.join(__dirname,'service/roleServices'),
    functionName: 'removeRole',
    roles:['admin','editor','reader'] // _ALL
  },
  //getAllUser
  {
    name: 'getAllUser',
    url: '/getAllUser',
    functionAddress: path.join(__dirname,'service/userServices'),
    functionName: 'getAllUser',
    roles:['admin','editor','reader'] // _ALL
  },
  //removeUserRole
  {
    name: 'removeUserRole',
    url: '/removeUserRole',
    functionAddress: path.join(__dirname,'service/userServices'),
    functionName: 'removeRole',
    roles:['admin','editor','reader'] // _ALL
  },
  {
    name: 'addUserRoles',
    url: '/addUserRoles',
    functionAddress: path.join(__dirname,'service/userServices'),
    functionName: 'addRole',
    roles:['admin','editor','reader'] // _ALL
  },
  //getUserRole
  {
    name: 'getUserRole',
    url: '/getUserRole',
    functionAddress: path.join(__dirname,'service/userServices'),
    functionName: 'getUserRole',
    roles:['admin','editor','reader'] // _ALL
  },
  //getCountUser
  {
    name: 'getCountUser',
    url: '/getCountUser',
    functionAddress: path.join(__dirname,'service/userServices'),
    functionName: 'getCountUser',
    roles:['admin','editor','reader'] // _ALL
  },
  //addUser
  {
    name: 'addUser',
    url: '/addUser',
    functionAddress: path.join(__dirname,'service/userServices'),
    functionName: 'addUser',
    roles:['admin','editor','reader'] // _ALL
  }
]