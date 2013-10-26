// liveQuery html function prototype
// прототип функции html объекта liveQuery
// меняет html у всех нодов коллекции нодов или возвращает html первого элемента коллекции нодов
// если коллекция нодов пуста - возвращает ложь
liveQuery.prototype.html = function(arg) {
    // обновляем информацию в объекте
    this.renew();
    // если есть аргумент
    if (arg!==undefined) {
        // проходим циклом по всем элементам
        for (var i=0, max_i=this.elements.length;i<max_i;i++){
            // устанавливаем устанавливаем для текущего элемента новое значение innerhtml
            this.elements[i].innerHTML=arg;
        }
        // возвращаем объект, самого себя, для цепочки вызова функций
        return this;
    }
    // если нет аргумента и есть хоть один нод текущем массиве нодов
    else if (this.elements.length>0){
        // Возвращаем html первого нода в массиве нодов
        return this.elements[0].innerHTML;
    }
    // иначе, если нечего устанавливать и нет элементов чтобы вернуть значение
    else {
        // возвращаем ложь
        return false;
    }
}
