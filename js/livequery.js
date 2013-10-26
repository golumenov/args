/*
 LiveQuery alpha version

 Live Javascript query to htmlcollection translator
 liveQueryObject=$(query,context);
 query - query on css
 context - query context
 Return live nodes object

 */
// Объявляем безымянную функцию () как функцию принимающую объект window в качестве аргумента
// Второй аргумент - защита от более раннего объявления undefined
(function(window,undefined) {
    var document=window.document,
    // Объявляем liveQuery как функцию принимающую 2 аргумента (запрос,контекст)
        liveQuery=function (query,context) {
            // Инициализируем и возвращаем новый объект liveQuery
            return new liveQuery.fn.init(query,context);
        };
    // Описываем прототип объекта liveQuery
    liveQuery.fn=liveQuery.prototype = {
        // Конструктор
        constructor: liveQuery,
        // Запрос, который разбираем в нем определяются правила поиска
        query: undefined,
        // Контекст
        context: undefined,
        // Текущий массив элементов
        elements: Array,
        // Инициализация
        init: function (query,context) {
            //! Проверить значение query reg-expom
            this.query=query;
            //! Проверить контекст
            this.context=context;
            // Обновляем информацию о массиве нодов
            this.elements=this.renew(query,context);
            // возвращаем объект, самого себя, для цепочки вызова функций
            return this;
        },
        // Объект в массив
        toArray: function () {
            // обновляем массив нодов
            this.elements=this.renew();
            // возвращаем массив нодов
            return this.elements;
        },
        // Функция геттер, возвращает integer - количество элементов массива нодов на данный момент, паралельно придает "бодряков=)" объекту.
        // Т.е. каждый раз, когда к объекту обращаются, объект заново запускает функцию поиска элементов, пересчитывает их и возвращает количество элементов
        get length () {
            // обновляем массив нодов
            this.elements=this.renew();
            // возвращаем количество элементов в массиве
            return this.elements.length;
        },
        // Функция, производит поиск по объектам HtmlCollection
        // принимает query - запрос на поиск css style
        // context - контекст поиска
        // counter - счетчик вложений.
        // возвращает массив нодов
        //! Убрать счетчик
        renew: function(query,context) {
            // Массив запросов
            query = typeof query !== 'undefined' ? query : this.query;
//            console.log(arguments);
            var queryArray = [],
                // Текущий запрос
                currentQuery,
                // Тип текущего запроса
                currentQueryType,
                // Массив нодов для вывода из функции
                outputNodesArray = [],
                // Временный массив для перебора
                telements = [];
            // Если есть аргументы для разбора
            if (query.length>0) {
                // Разбиваем запрос на массив запросов, разделитель пробел
                queryArray = query.trim().split(' ');
                // Определяем текущий запрос
                currentQuery=queryArray[0];
                // Определяем тип текущего запроса (первый знак строки текущего запроса)
                currentQueryType = currentQuery.charAt(0);
                // Если тип аргумента .classname
                if(currentQueryType == '.') {
                    // Обрезаем первый символ "." у текущего запроса
                    currentQuery=currentQuery.slice(1);
                    // Если контекст поиска пуст, то ищем во всем документе
                    if(context===undefined) {
                        context=document;
                        // Приравниваем массив для вывода массиву нодов html коллекции
                        outputNodesArray=Array.prototype.slice.call(context.getElementsByClassName(currentQuery));
                    }
                    // Иначе, если есть контекст для поиска
                    else {
                        // проходим по всем элементам контекста
                        for (var i=0, max_i=context.length;i<max_i;i++) {
                            // Если по текущему запросу есть элементы в текущем контексте
                            if (context[i].getElementsByClassName(currentQuery).length>0) {
                                // Помещаем во временный массив массив нодов по текущему запросу в текущем контексте
                                telements=Array.prototype.slice.call(context[i].getElementsByClassName(currentQuery));
                                // Проходим по временному массиву
                                for (var j= 0, max_j=telements.length;j<max_j;j++) {
                                    // Добавляем в массив для вывода из функции новый элемент
                                    outputNodesArray.push(telements[j]);
                                }
                            }
                        }
                    }
                }
                // если тип элемента #idname
                else if(currentQueryType == '#') {
                    //elements.getElementById(arr[0].slice(1));
                }
                // если тип элемента tagname
                else {
                    //elements.getElementsByTagName(arr[0]);
                }
                // проверяем, есть ли еще запросы для поиска (следующий уровень вложенности)
                if (queryArray.length>1) {
                    // сдвигаем массив элементов на 1
                    queryArray.shift();
                    // объединяем массив в строку
                    queryArray=queryArray.join(' ');
                    // запускаем рекурсивно с новым контекстом, элементами для поиска и счетчиком вложенности рекурсии
                    // получаем массив для вывода
                    outputNodesArray=this.renew(queryArray,outputNodesArray);
                }
                // Возвращаем массив нодов
                return outputNodesArray;
            }
            // Если нет элементов для разбора
            else {
                // Возвращаем пустой массив
                return [];
            }
        }
    };
    liveQuery.fn.init.prototype = liveQuery.fn;
    // Объявляем $ как синоним liveQuery
    window.liveQuery = window.$ = liveQuery;
// Конец объявления безымянной функции, вызываем саму себя и передаем объект window в качестве аргумента
})(window);