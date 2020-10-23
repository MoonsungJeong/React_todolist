var DOM = document.querySelector(".todolist");
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
var el = _DOM_SCRAPE(DOM);

