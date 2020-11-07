var express = require('express');
var router = express.Router();

const dbSaveRequest = require('../utils/dbSaveRequest')
const requestWatcher = require('../listenerCenter/requestWatcher')
const distributeCenters = require('../redirectCenter/distributeCenter')

//拦截所有http请求
router.all('*',async (req,res) => { // 收数据 & 发给前端
  //将请求数据插入数据库
  let {insertId,name} = await dbSaveRequest.saveRequest(req,res)

  new requestWatcher(insertId, () => {
    //分发中心
    console.log('执行'+insertId+'请求')
    distributeCenters.getRequest(insertId,name,req,res)
  })
})
module.exports = router;
