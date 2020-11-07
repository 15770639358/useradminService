const mysql = require('mysql')


    config= {
        connectionLimit: 50,
        // host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'useradmin'
    }
  let pool = mysql.createPool(config)
  function getConnect(sql, sqlArr, callBack,func) {

        pool.getConnection((err, conn) => {
            if(err){
                console.log("数据库连接失败")
            }else{
              conn.query(sql, sqlArr, callBack)
              conn.release()
            }
        })
    }

    module.exports = {getConnect}
