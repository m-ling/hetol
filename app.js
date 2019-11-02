// 引入模块
const express=require('express');
const mysql=require('mysql');
const cors=require('cors');//解决跨域
const session=require('express-session');

// 连接池
var pool=mysql.createPool({
   host:'127.0.0.1',
   user:'root',
   password:'',
   port:'3306',
   database:'hotel',
   connectionLimit:15
})
var server=express();
// cors跨域
server.use(cors({
  //允许程序列表
  origin:["http://127.0.0.1:8080","http://localhost:8080"],
  credentials:true//每次请求需要验证
}))
//5.配置session模块
server.use(session({
  secret:'19980712',
  resave:true,//请求时更新数据
  saveUninitialized:true//保存初始数据
}))

// 静态目录
server.use(express.static('public'))
server.listen(4040);

/** 路由 */
server.get('/main',(req,res)=>{
  var hid=req.query.hid;
  var sql='select img_url from ht_main where hid=?'
  pool.query(sql,[hid],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      console.log(result);
      res.send({code:0,msg:'查询成功',url:result});
    }else{
      res.send({code:-1,msg:'查询失败'});
    }
  })
})

// 登录
server.get("/login",(req,res)=>{
  //(1)获取脚手架参数 uname upwd
  var hname = req.query.hname;
  var hpwd = req.query.hpwd;
  //(2)创建sql语句查询
  var sql = "SELECT hid FROM ht_user WHERE hname = ? AND hpwd = md5(?)";
  //(3)执行sql语句
  pool.query(sql,[hname,hpwd],(err,result)=>{
   if(err)throw err;
   //(4)获取执行结果
   //(5)判断查询是否成功 result.length
   if(result.length==0){
     res.send({code:-1,msg:"用户名或密码有误"})
   }else{
     //5.1:保存用户id在session对象中
     //result数据格式 [{id:1}]
    req.session.hid = result[0].id;
    res.send({code:1,msg:"登录成功"});
   }
   //(6)将结果返回脚手架
  })
  })

  // 注册
server.get('/reg',(req,res)=>{
  var hname = req.query.hname;
  var email = req.query.email;
  var phone = req.query.phone;
  var hpwd = req.query.hpwd;
  // var regObj=[hname,hpwd,email,phone]    
  var sql=`INSERT INTO ht_user values(null,?,md5(?),?,?,1)`;
  pool.query(sql,[hname,hpwd,email,phone],(err,result)=>{
    if(err)throw err;
    //(4)获取执行结果
    //(5)判断查询是否成功 result.length
    if(result.affectedRows>0){
      res.send({code:1,msg:"注册成功"})
    }else{
     res.send({code:1,msg:"注册失败"});
    }
    //(6)将结果返回脚手架
   })

  })





