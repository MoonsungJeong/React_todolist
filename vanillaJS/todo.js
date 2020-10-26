var todolist = document.querySelector('.todolist');
// Collect All child dom under the "dom" and return object 
// Key is first class name
// Value is DOM
function _DOM_SCRAPE(dom){
    var i;
    var obj={};
    if(!dom.hasChildNodes()){
        return 0;
    }
    for(i=0; i < dom.children.length; i++){
        Object.assign(obj,_DOM_SCRAPE(dom.children[i]))
        obj[dom.children[i].classList[0]] = dom.children[i];
    }
    return obj;
}
function keyUpHandler(e){
    if(e.keyCode === 13){
        var el = document.activeElement;
        var txt = this['text-input'];
        if(el === txt){
            if(txt.value !== ""){
                // List Add Function!!
                //
                return 0;
            }
        }  
    }
}
function _ADD_BTN(e){
    console.log(this['text-input']);
}
function _LIST_BTN(e){
    console.log(e.target);
}
function _LIST_INIT(dom){
    var DOM = _DOM_SCRAPE(dom);
    dom.addEventListener('keyup',keyUpHandler.bind(DOM),false);
    DOM['btn-add'].addEventListener('click',_ADD_BTN.bind(DOM), false);

    DOM['btn-list'].addEventListener('click',_LIST_BTN, false);
    DOM['btn-complete-all'].addEventListener('click',_LIST_BTN, false);
    DOM['all'].addEventListener('click',_LIST_BTN, false);
    DOM['active'].addEventListener('click',_LIST_BTN, false);
    DOM['completed'].addEventListener('click',_LIST_BTN, false);
    DOM['btn-clear'].addEventListener('click',_LIST_BTN, false);
}
_LIST_INIT(todolist);

//var DOM = _DOM_SCRAPE(todolist);

/* var DOM = _DOM_SCRAPE(todolist);
function ring(){
    return this.all;
}
var tc = ring.bind(DOM);
console.log(tc());
function card(){
    console.log(this.all);
}
var gc = card.bind(DOM);
gc(); */




