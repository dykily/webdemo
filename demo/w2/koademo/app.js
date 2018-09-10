

var Koa = require("koa");
var axios = require("axios");
var Router = require("koa-router");
const reqUrl = require("./config").reqUrlProxy;
const static = require('koa-static');

var app = new Koa();
var router = new Router();
// 配置静态web服务的中间件
app.use(static(__dirname+'/public'));
router.get("/",async function (ctx) {
    ctx.body = "hi koa";
})
router.get("/index/index",async function (ctx) {
   
    ctx.redirect('/index/index.html');
})
//代理java后台接口 查询点赞数的总数
router.get("/thumb",async function (ctx) {
    
    var data;
    await axios.get(reqUrl+"/Thumb/thumb.do").then(function(res){

        data = res.data;
        
    });
    ctx.body = data;
})
//代理java后台接口 点赞+1
router.get("/addThumb",async function (ctx) {
    
    var data;
    await axios.get(reqUrl+"/Thumb/addThumb.do").then(function(res){

        data = res.data;
        
    });
    ctx.body = data;
})
app.use(router.routes()).use(router.allowedMethods());

app.listen(8000);
module.exports = app;
