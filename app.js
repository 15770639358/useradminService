var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var usersRouter = require('./routes/users');
const indexRouter = require('./routes/index')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const authControl = require('./autoControl/index')



var app = express();

// app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// app.use((req,res,next) => {
//   let token = req.headers.authorization
//   let key = 'jwt'
//   if(req.url === '/login'){
//     next()
//     return
//   }
//   jwt.verify(token, key, (err, decode) => {
//     if(err){
//       res.send({
//         code: 400,
//         message : '登录状态失效',
//       })
//     }else{
//       next()
//     }
//   })
// })

// app.use(authControl);

// app.use(usersRouter)
app.use(indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8083, () => {
  console.log('启动成功')
})

module.exports = app;
