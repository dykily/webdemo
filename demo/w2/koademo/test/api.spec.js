const superagent = require("supertest");
const app = require("../app");

function request(){
    return superagent(app.listen());
}

describe("node接口测试",function(){
    it("测试查询点赞数量接口",function(done){
        request()
        .get("/thumb")
        .expect("Content-Type",/json/)
        .expect(200)
        .end(function(err,res){
            console.log(res);
            
            if(0 == res.body.ret){//返回 0 代表成功
                console.log("查询成功");
                
                done();
            }else{
                done(err);
            }
        })
    });

    it("测试点赞+1接口",function(done){
        request()
        .get("/addThumb")
        .expect("Content-Type",/json/)
        .expect(200)
        .end(function(err,res){
            console.log(res);
            
            if(0 == res.body.ret){//返回 0 代表成功
                console.log("点赞成功");
                done();
            }else{
                done(err);
            }
        })
    });
});