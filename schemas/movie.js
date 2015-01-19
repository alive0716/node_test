/**
 * Created by chenyun on 15-1-18.
 */
/**
 * Created by chenyun on 15-1-18.
 */
var mongoose=require('mongoose');
var MovieSchema=new mongoose.Schema({
    doctor:String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})
//为模式添加方法
//每次加载之前添加此方法
MovieSchema.pre('save',function(){
    if(this.isNew){
        this.meta.createAt=this.Date.now();
    }else{
        this.meta.updateAt=Date.now();
    }
    now()//继续往下执行
})

//添加静态方法，不直接与数据库进行交互，实例化以后执行
MovieSchema.statics={
    fetch:function(cb){
        return this.find({}).sort('meta.updateAt').exec(cb)
    },
    findById:function(id,cb){
        return this.findOne({_id:id}).sort('meta.updateAt').exec(cb)
    }
}
module.exports=MovieSchema;