var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('./mongoose');
var Movie=require('./models/movie');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();//实例化了Express并赋值给我们的app变量


// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));//寻找views的目录
app.set('view engine', 'jade');//用什么模板引擎来处理这些views

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
/*可改成app.use(express.urlencoded());
这是为了忽略一些App运行过程中Node窗口里面的警告信息。
主要是一些Express和它的插件未来可能的修改。
如果你不做这个修改，程序运行时你会收到一堆某某函数即将过期的警告。
然后增加if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  这样在开发过程中你可以做一些错误检查。
}*/
app.use(bodyParser.json());//将表单服务格式化
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/*告诉Express把public/目录下的静态文件作为顶层目录的文件来托管。
比如你的图片目录存放在c:\node\nodetest1\public\images\里，
但是实际访问地址是http://localhost:3000/images/。*/
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});




// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}*/

// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});*/


module.exports = app;
