

class PraiseButton {

    constructor(){
        this.count = 0;
        this.praiseBtn = document.createElement("button");
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
        ctx.praiseBtn.innerHTML = "点赞->" + ctx.count;
        document.body.appendChild(ctx.praiseBtn);
        console.log("p");
        ctx.praiseBtn.addEventListener('click', function(){
            ctx.praise();
        })
    }
    praise(){
        var ctx = this;
        ctx.praiseBtn.innerHTML = "点赞->" + ++ctx.count;
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
        ctx.praiseBtn.innerHTML = "大拇指->" + ctx.count;
        document.body.appendChild(ctx.praiseBtn);
        ctx.praiseBtn.addEventListener('click', function(){
            ctx.praise();
        })
    }
    praise(){
        var ctx = this;
        ctx.praiseBtn.innerHTML = this.praiseType + "->" + ++ctx.count;
        return ctx.count;
    }
    getPraiseType(){
        return this.praiseType;
    }
}