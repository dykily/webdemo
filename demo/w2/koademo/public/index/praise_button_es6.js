

 class PraiseButton {

    constructor(){
        this.count = 0;
        this.praiseBtn = document.createElement("button");
        this.canPraise = true;
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
        document.body.appendChild(ctx.praiseBtn);
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
    constructor(){
        super();
        this.praiseType = "大拇指";
        

    }
    renderBtn(){
        var ctx = this;
        ctx.praiseBtn.setAttribute("class","btnThumb");
        ctx.getPraise();
        document.body.appendChild(ctx.praiseBtn);
        ctx.praiseBtn.addEventListener('click', function(){
            ctx.praiseLimit(ctx.praise,ctx.canPraise);
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
        ctx.count = data.count;
        ctx.praiseBtn.innerHTML = "大拇指" + ctx.count;//更新 innerHTML
        ctx.praiseBtn.setAttribute("value", ctx.count);//更新 属性值 value
        return ctx.count;  
    }
    praiseLimit(fn,canPraise){//针对用户连续点击 做限制
        if(canPraise){
            fn.call(this,500);
        }else{
            alert("请不要重复点击")
        }
    }
    /**
     * 点赞+1 接口
     * @param {点赞间隔时间} delay 
     */
    async praise(delay){
        var data,ctx = this;
        await new Promise(function(resolve, reject){
            ctx.canPraise = false;
            axios.get("/addThumb").then(function(res){
                resolve(res.data)
                
            }).catch(function(e){
                console.log(e);
                reject(e)
                
            });
        }).then(function(res){
            data = res;
            ctx.count = data.count;
            ctx.praiseBtn.innerHTML = ctx.praiseType + ctx.count;//更新 innerHTML
            ctx.praiseBtn.setAttribute("value", ctx.count);//更新 属性值 value
        }).catch(function(e){
            console.log(e);
            
        });
        if(delay){
            setTimeout(function(){
                ctx.canPraise = true; 
            }, 1000);
        }else{
            ctx.canPraise = true; 
        }

        return ctx.count;
    }
    getPraiseType(){
        return this.praiseType;
    }
}


