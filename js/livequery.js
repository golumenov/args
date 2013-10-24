/*
 LiveQuery alpha version

 Live Javascript query to htmlcollection translator
 liveQueryObject=$(query,context);
 query - query on css
 context - query context
 Return live nodes object

 */
// Объявляем безымянную функцию () как функцию принимающую объект window в качестве аргумента
(function(window,undefined) {
    var document=window.document,
    //Объявляем переменную liveQuery как функцию принимающую 2 аргумента (запрос,контекст)
        liveQuery=function (query,context) {
            //Инициализируем и возвращаем новый объект liveQuery
            return new liveQuery.fn.init(query,context);
        };
    //Описываем прототип объекта liveQuery
    liveQuery.fn=liveQuery.prototype = {
        //Конструктор
        constructor: liveQuery,
        //Запрос
        query: undefined,
        //Контекст
        context: document,
        //Текущий массив элементов
        elements: Array,
        //Количество элементов
//        get length() {
//            this.renew();
//            return this.elements.length;
//        },
        //Инициализация
        init: function (query,context) {
            this.query=query;
            this.context=context;
            this.elements=this.renew(query,context);
            return this;
        },
        toArray: function () {
            this.elements=this.renew(this.query,this.context);
            return this.elements;
        },
        get length () {
            this.elements=this.renew(this.query,this.context);
            return this.elements.length;
        },
        renew: function(query,context,counter) {
//            console.log(query);
//            console.log(context);
            var arr,
                type,
                output_elements = [],
                telements = [],
                ttelements = [],
                t_counter;
            // объявляем счетчик рекурсивного вложения функции
            if (!counter) {
                t_counter=1;
            } else {
                t_counter=counter;
            }
            // Если есть аргументы для разбора
            if (query.length>0) {
                arr = query.trim().split(' ');
                type = arr[0].charAt(0);
                //Если тип аргумента .classname
                if(type == '.') {
                    //Если запускается в первый раз, то берем выборку по всему документу
                    if(t_counter==1) {
                        output_elements=Array.prototype.slice.call(document.getElementsByClassName(arr[0].slice(1)));
                    }
                    // Если запускается не в первый раз и есть контекст для поиска
                    else if (context.length>0) {
                        // определяем контекст поиска
                        telements=context;
                        // проходим по всем элементам контекста
                        for (var i=0, max_i=telements.length;i<max_i;i++) {
                            if (telements[i].getElementsByClassName(arr[0].slice(1)).length >0) {
                                // в один массив а не в массив массивов
                                ttelements=Array.prototype.slice.call(telements[i].getElementsByClassName(arr[0].slice(1)));
                                for (var j= 0, max_j=ttelements.length;j<max_j;j++) {
                                    output_elements.push(ttelements[j]);
                                }


                            }
                        }
                    } else {
                        return [];
                    }
                }
                // заготовка для #idname
                else if(type == '#') {
                    //elements.getElementById(arr[0].slice(1));
                }
                // заготовка для tagname
                else {
                    //elements.getElementsByTagName(arr[0]);
                }
                // проверяем, есть ли еще классы для поиска (следующий уровень вложенности)
                if (arr.length>1) {
                    arr.shift();
                    arr=arr.join(' ');
                    t_counter++;
                    // запускаем рекурсивно с новым контекстом, элементами для поиска и счетчиком вложенности рекурсии
                    output_elements=this.renew(arr,output_elements,t_counter);
                }
                return output_elements;
            } else {
                return [];
            }
        }
    };
    liveQuery.fn.init.prototype = liveQuery.fn;
    window.liveQuery = window.$ = liveQuery;
// Конец объявления безымянной функции, вызываем саму себя и передаем объект window в качестве аргумента
})(window);