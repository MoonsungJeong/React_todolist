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
    const num = ++this['count'];
    if(txt.value === ""){
        return false;
    } 
    /*
    const node=`
    <li class="${num} flex line-top">
        <div class="btn-check _col_xs-10 _center no_check"><i class="far fa-check-circle"></i></div>
        <div class="bar-text _col_xs-80 _padding-left">${txt.value}</div>
        <div class="btn-delete _col_xs-10 _center"><i class="fas fa-times"></i></div>
    </li>`
    */
    let li = document.createElement('li');
    let div_1 = document.createElement('div');
    let div_2 = document.createElement('div');
    let div_3 = document.createElement('div');
    let i_1 = document.createElement('i');
    let i_3 = document.createElement('i');
    
    li.classList.add(num);
    li.classList.add('item');
    li.classList.add('flex');
    li.classList.add('line-top');

    div_1.classList.add('btn-check');
    div_1.classList.add('_col_xs-10');
    div_1.classList.add('_center');
    div_1.classList.add('no_check');
    div_1.addEventListener('click',_CLICK_BTN.bind(this), false);
    
    div_2.classList.add('bar-text');
    div_2.classList.add('_col_xs-80');
    div_2.classList.add('_padding-left');
    
    div_3.classList.add('btn-delete');
    div_3.classList.add('_col_xs-10');
    div_3.classList.add('_center');
    div_3.classList.add('_opacity02');
    div_3.addEventListener('click',_DELETE_BTN.bind(this), false);
    
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
    this['btn-add'].style.opacity="0.5";

    this['btn-complete-all'].replaceChild(_CREATE_COMPLETE_BTN_NOCHECK(),this['btn-complete-all'].firstChild);
    _CLASS_CHECK_REMOVE(this['btn-complete-all'],"check");
    _LIST_COUNT.bind(this)();
}
function keyUpHandler(e){
    const txt = this['text-input'];
    if(txt.value !== ""){
        if(e.keyCode === 13){
            // List Add Function!!
            _ADD_BTN.bind(this)();
            this['btn-add'].style.opacity="0.5";
            return 0;
        }
        this['btn-add'].style.opacity="1"; 
        return 0;         
    }
    this['btn-add'].style.opacity="0.5";
}
function _CLICK_BTN(e){
    let node = e.target;
    let items = this['list'].children;
    if(!node.hasChildNodes()) 
        node = node.parentNode;
    _CLASS_CHECK_ADD_REMOVE(node,"no_check");
    _CLASS_CHECK_ADD_REMOVE(node,"check");
    _CLASS_CHECK_ADD_REMOVE(node.nextElementSibling,"check");
    
    for(i=0; i < items.length; i++){
        if(!items[i].firstChild.classList.contains("check")){
            this['btn-complete-all'].replaceChild(_CREATE_COMPLETE_BTN_NOCHECK(),this['btn-complete-all'].firstChild);
            _CLASS_CHECK_REMOVE(this['btn-complete-all'],"check");
            return;
        }
    }
    this['btn-complete-all'].replaceChild(_CREATE_COMPLETE_BTN_CHECK(),this['btn-complete-all'].firstChild);        
    _CLASS_CHECK_ADD(this['btn-complete-all'],"check");
    return;
}
function _DELETE_BTN(e){
    if (confirm("Are you Sure?")) {
        let node = e.target;
        if(!node.hasChildNodes()) 
            node = node.parentNode;
        node.parentNode.remove();

        _LIST_COUNT.bind(this)();
    }
}
function _COMPLETE_BTN(e){
    let btn = this['btn-complete-all'];
    let bool = btn.classList.contains("check");
    let items = this['list'].children;
    if(!items.length) return;
    if(!bool){
        for(i=0; i < items.length; i++){
            _CLASS_CHECK_REMOVE(items[i].children[0],"no_check");
            _CLASS_CHECK_ADD(items[i].children[0],"check");
            _CLASS_CHECK_ADD(items[i].children[1],"check");
        }
        _CLASS_CHECK_ADD_REMOVE(btn,"check");
        btn.replaceChild(_CREATE_COMPLETE_BTN_CHECK(),btn.firstChild)
        return;
    }
    for(i=0; i < items.length; i++){
        _CLASS_CHECK_REMOVE(items[i].children[0],"check");
        _CLASS_CHECK_REMOVE(items[i].children[1],"check");
        _CLASS_CHECK_ADD(items[i].children[0],"no_check");
    }
    _CLASS_CHECK_ADD_REMOVE(btn,"check");
    btn.replaceChild(_CREATE_COMPLETE_BTN_NOCHECK(),btn.firstChild)    
    return;
}
//_LIST_COUNT.bind(this)();
function _LIST_COUNT(e){
    if(!this['list'].children.length){
        //list is empty
        this['btn-complete-all'].style.opacity="0.5";
        this['btn-complete-all'].replaceChild(_CREATE_COMPLETE_BTN_NOCHECK(),this['btn-complete-all'].firstChild);//btn-complete icon change
        _CLASS_CHECK_REMOVE(this['btn-complete-all'],"check");
        return;   
    }
    //list is not empty
    this['btn-complete-all'].style.opacity="1";
    return;
}
function _LIST_BTN(e){
    console.log(e.target);
}
function _LIST_INIT(dom){
    const DOM = _DOM_SCRAPE(dom);
    DOM['count']=0;
    DOM['text-input'].addEventListener('keyup',keyUpHandler.bind(DOM), false);
    DOM['btn-add'].addEventListener('click',_ADD_BTN.bind(DOM), false);
    DOM['btn-complete-all'].addEventListener('click',_COMPLETE_BTN.bind(DOM), false);
    ////////////////////////////////////////////////////////////
    DOM['btn-list'].addEventListener('click',_LIST_BTN, false);
    DOM['all'].addEventListener('click',_LIST_BTN, false);
    DOM['active'].addEventListener('click',_LIST_BTN, false);
    DOM['completed'].addEventListener('click',_LIST_BTN, false);
    DOM['btn-clear'].addEventListener('click',_LIST_BTN, false);
}
_LIST_INIT(todolist);


