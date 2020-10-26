const todolist = document.querySelector('.todolist');
// Collect All child dom under the "dom" and return object 
// Key is first class name
// Value is DOM
function _DOM_SCRAPE(dom){
    let i;
    let obj={};
    if(!dom.hasChildNodes()){
        return 0;
    }
    for(i=0; i < dom.children.length; i++){
        Object.assign(obj,_DOM_SCRAPE(dom.children[i]))
        obj[dom.children[i].classList[0]] = dom.children[i];
    }
    return obj;
}
function _ADD_BTN(e){
    const txt = this['text-input'];
    const num = this['count']++;
    if(txt.value === ""){
        return false;
    } 
    const node=`
    <li class="${num} flex line-top">
        <div class="btn-check _col_xs-10 _center"><i class="far fa-check-circle"></i></div>
        <div class="bar-text _col_xs-80 _padding-left">${txt.value}</div>
        <div class="btn-delete _col_xs-10 _center"><i class="fas fa-times"></i></div>
    </li>
    `
    let li = document.createElement('li');
    let div_1 = document.createElement('div');
    let div_2 = document.createElement('div');
    let div_3 = document.createElement('div');
    let i_1 = document.createElement('i');
    let i_3 = document.createElement('i');
    
    li.classList.add(num);
    li.classList.add('flex');
    li.classList.add('line-top');
    div_1.classList.add('btn-check');
    div_1.classList.add('_col_xs-10');
    div_1.classList.add('_center');
    div_2.classList.add('bar-text');
    div_2.classList.add('_col_xs-80');
    div_2.classList.add('_padding-left');
    div_3.classList.add('btn-delete');
    div_3.classList.add('_col_xs-10');
    div_3.classList.add('_center');
    i_1.classList.add('far');
    i_1.classList.add('fa-check-circle');
    i_3.classList.add('fas');
    i_3.classList.add('fa-times');

    div_1.appendChild(i_1);
    div_2.innerHTML = txt.value;
    div_3.appendChild(i_3);
    li.appendChild(div_1);
    li.appendChild(div_2);
    li.appendChild(div_3);
    this['list'].appendChild(li);
    this[num] = li;
    txt.value="";
    txt.focus();
}
function keyUpHandler(e){
    if(e.keyCode === 13){
        const el = document.activeElement;
        const txt = this['text-input'];
        if(el === txt){
            if(txt.value !== ""){
                // List Add Function!!
                _ADD_BTN.bind(this)();
                return 0;
            }
        }  
    }
}
function _LIST_BTN(e){
    console.log(e.target);
}
function _LIST_INIT(dom){
    const DOM = _DOM_SCRAPE(dom);
    DOM['count']=0;

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

var DOM = _DOM_SCRAPE(todolist);

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




