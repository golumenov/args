// Реализация функции $('.class1 .class2') посредством функции getElementsByClassName
// Работает в следующих браузерах: Chrome, Firefox (Gecko) 3.0, Internet Explorer 9.0, Opera, Safari

var $ = function()
	{
	var elements, arr, type;
	var output_elements = [];
	var temp_elements = [];
	// объявляем счетчик рекурсивного вложения функции
	if (!arguments[2])
		{
		var counter=1;	
		}
	else
		{
		var counter=arguments[2];	
		}
	// Если есть аргументы для разбора
	if (arguments.length>0)
		{
		arr = arguments[0].trim().split(' ');
		type = arr[0].charAt(0);			
		arr[0].slice(1)
		//Если тип аргумента .classname
		if(type == '.') 
			{
			//Если запускается в первый раз, то берем выборку по всему документу
			if(counter==1)
				{
				output_elements=document.getElementsByClassName(arr[0].slice(1));
				}
			// Если запускается не в первый раз и есть контекст для поиска
			else if (arguments[1] && arguments[1].length>0)
				{
				// определяем контекст поиска
				elements=arguments[1];
				// проходим по всем элементам контекста
				for (var i=0, max_i=elements.length;i<max_i;i++)
					{
					// если нашли класс в контексте
					if (elements[i].getElementsByClassName(arr[0].slice(1)).length>0)
						{
						// объявляем текущий элемент
						temp_elements=elements[i].getElementsByClassName(arr[0].slice(1));
						// собираем массив элементов для вывода или следующего поиска
						for (var j=0, max_j=temp_elements.length;j<max_j;j++)
							{
							output_elements.push(temp_elements[j]);
							}
						}
					}
				}
			else
				{
				return [];	
				}
			}
		// заготовка для #idname
		else if(type == '#') 
			{
			//elements.getElementById(arr[0].slice(1));
			}
		// заготовка для tagname
		else
			{
			//elements.getElementsByTagName(arr[0]);	
			}
		// проверяем, есть ли еще классы для поиска (следующий уровень вложенности)
		if (arr.length>1)
			{
			arr.shift();
			arr=arr.join(' ');
			counter++;
			// запускаем рекурсивно с новым контекстом, элементами для поиска и счетчиком вложенности рекурсии
			output_elements=$(arr,output_elements,counter);
			}
		return output_elements;			
		}
	else
		{
		return [];
		}
	};

// тестируем	
window.onload = function ()
	{
	// для одного класса
	var t=$('.class1');
	for (var i=0;i<t.length;i++)
		{
		t[i].setAttribute('style','background: #00ff00;');
		}
	// для двух классов
	var t=$('.class1 .class2');
	for (var i=0;i<t.length;i++)
		{
		t[i].setAttribute('style','background: #ff0000;');
		}

	// для трех классов
	var t=$('.class1 .class2 .class3');
	for (var i=0;i<t.length;i++)
		{
		t[i].setAttribute('style','background: #0000ff;');
		}
	}