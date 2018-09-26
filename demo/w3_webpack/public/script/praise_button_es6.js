
import axios from './axios.min.js';
 class PraiseButton {

    constructor(ele){
        this.count = 0;
        this.praiseBtn = ele;
        this.renderBtn();
    }
    getPraise(){
        return this.count;  
    }
    getBtn(){
        return this.praiseBtn;  
    }
    renderBtn(){
        var ctx = this;
        ctx.praiseBtn.innerHTML = "点赞" + ctx.count;
        ctx.praiseBtn.addEventListener('click', function(){
            ctx.praise();
        })
    }
    praise(){
        var ctx = this;
        ctx.praiseBtn.innerHTML = "点赞" + ++ctx.count;
        return ctx.count;
    }
}

class Thumb extends PraiseButton{
    constructor(ele){
        super(ele);
        this.praiseType = "大拇指";
        

    }
    renderBtn(){
        var ctx = this;
        ctx.praiseBtn.setAttribute("class","btnThumb");
        ctx.getPraise();
        ctx.praiseBtn.addEventListener('click', function(){
            ctx.praiseLimit.call(ctx,ctx.praise);
        })
    }
    /**
     * 获取点赞总数接口
     */
    async getPraise(){// 从后台获取点赞数
        var data,ctx = this;
        await new Promise(function(resolve, reject){
            
            axios.get("/thumb").then(function(res){
                resolve(res.data)
                
            }).catch(function(e){
                console.log(e);
                reject(e)
                
            });
        }).then(function(res){
            data = res;
        }).catch(function(e){
            console.log(e);
            
        });
        console.log(ctx.praiseBtn);
        ctx.count = data.count;
        ctx.praiseBtn.innerHTML = "大拇指" + ctx.count;//更新 innerHTML
        ctx.praiseBtn.setAttribute("value", ctx.count);//更新 属性值 value
        return ctx.count;  
    }
    praiseLimit(fn){//针对用户连续点击 做限制
        var ctx = this;
        if(this.timer){
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(function(){
            fn.call(ctx);
        },500)
    }
    /**
     * 点赞+1 接口
     * 
     */
    async praise(){
        var data,ctx = this;
        await new Promise(function(resolve, reject){
            axios.get("/addThumb").then(function(res){
                resolve(res.data)
                
            }).catch(function(e){
                console.log(e);
                reject(e)
                
            });
        }).then(function(res){
            data = res;
            ctx.count = data.count;
            console.log(ctx.praiseBtn.innerHTML);
            
            ctx.praiseBtn.innerHTML = ctx.praiseType + ctx.count;//更新 innerHTML
            ctx.praiseBtn.setAttribute("value", ctx.count);//更新 属性值 value
        }).catch(function(e){
            console.log(e);
            
        });

        return ctx.count;
    }
    getPraiseType(){
        return this.praiseType;
    }
}

export default Thumb


