function _CLASS_CHECK_ADD_REMOVE(elementName, className){
    var bool = elementName.classList.contains(className);
    if(!bool){
        elementName.classList.add(className);
        return;
    }
    elementName.classList.remove(className);
    return;
}