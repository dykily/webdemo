import Thumb from './praise_button_es6';
import t1 from './test';


import "../css/index.css";
import "../css/index2.css";

t1(1);
$.extend({  
    Thumb: function(ele){
        return new Thumb(ele);
    },
});
class ButtonHelloElement extends HTMLButtonElement {
    constructor() {
        super();
        var ele = this;
        var ctx = this;
        this.btn = $.Thumb(ele);
        this.addEventListener('click', function(){
            ctx.btn.praiseLimit(ctx.btn.praise);
        })
    }
}
customElements.define('x-praise', ButtonHelloElement, { extends: 'button' })

