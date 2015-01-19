var express = require('express');
var router = express.Router();
var mongoose=require('../mongoose');
var Movie=require('../models/movie');
var _=require('underscore')



/* GET home page. */
router.get('/', function(req, res) {
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    //res.send({movies:movies});
    res.render('index', {
      title: '首页',
      movies:movies
    });
  })
  //res.send('index');

});

router.get('/movie/:id',function(req,res){
  var id=req.params.id;
  Movie.findById(id,function(err,movie){
    if(err){
      cosole.log(err)
    }else{
      res.render('detail',{
        title:'详情页面'+movie.title,
        movie:movie
      })
    }
  })

})
router.get('/admin/movie',function(req,res){
  //res.send('test,test');
  res.render('admin',{
    title:'后台录入页',
    movie:{
      title:'',
      doctor:'',
      country:'',
      year:'',
      poster:'',
      flash:'',
      summary:'',
      language:''
    }
  })
})
//update
router.get('admin/update/:id',function(req,res){
  var id=req.params.id;
  if(id){
    Movie.findById(id,function(err,movie){
      if(err){
        console.log(err)
      }
      res.render('admin',{
        title:'更新后台录入页',
        movie:movie
      })
    })
  }
})
//post
router.post('/admin/movie/new',function(req,res){
  var id=req.body.movie._id;
  var movieObj=req.body.movie;
  var _movie;
  if(id!=='undefined'){
    Movie.findById(id,function(err,movie){
      if(err){
        console.log(err)
      }
      _movie= _.extend(movie,movieObj);
      _movie.save(function(err,movie){
        if(err){
          console.log(err)
        }
        res.redirect('/movie'+movie._id)
      })
    })
  }else{
    _movie=new Movie({
      title:movieObj.title,
      doctor:movieObj.doctor,
      country:movieObj.country,
      year:movieObj.year,
      poster:movieObj.poster,
      flash:movieObj.flash,
      summary:movieObj.summary,
      language:movieObj.language
    })
    _movie.save(function(err,movie){
      if(err){
        console.log(err)
      }
      res.redirect('/movie'+movie._id)
    })
  }
})
router.get('/admin/list',function(req,res){
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('list', {
      title: '列表页面',
      movies:movies
    });
  })

})



module.exports = router;
