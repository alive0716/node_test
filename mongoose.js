var mongoose=require('mongoose');

    mongoose.connect("mongodb://localhost/mytest");//只需一次连接即可
//  mongoose.connect("mongodb://user:pass[@localhost](/user/localhost):port/database");//需要验证账户
    var db=mongoose.connection;
    db.on('error',console.error.bind(console,"connection error数据库连接失败"))
    db.once('open',function callback(){
        console.log('connection succss数据库连接成功')
    })
module.exports=mongoose;