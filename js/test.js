




// Тест модуль объекта liveQuery
// Объявляем объекты
var a=$('.class1 .class2');
var b=$('.class2 .class3');
var c=$('.class3 .class1');
var d=$('.class1 .class2 .class3');
//console.log (a);
//console.log ($('.class1'));
window.onload = function () {
//    console.log (a);

//    console.log (a);
//    console.log ($('.class2'));
    // Добавляем новые элементы в документ
    var element = document.createElement('div');
    element.innerHTML = 'Content for div starting here';
    element.setAttribute('class','class1');
    document.body.appendChild(element);

    // живая магия, объекты обновляют инфу по запросу в момент обращения!!!! т.е. они Живые ^_^
    console.log (a);
    console.log ($('.class1 .class2'));
    console.log (b);
    console.log (c);
    console.log (d);
//   console.log('123');
};