window.onload = function(){
    var canvas = document.getElementById('can1');
    var ctx = canvas.getContext('2d');
    
    
    var width = canvas.width;//Ширина канваса
    var height = canvas.height;//Высота канваса
    
    
    var arrayQuantityPointX = [];//Пустой массив координат X
    var arrayQuantityPointY = [];//Пустой массив координат Y
    
//    console.log(arrayQuantityPointX);
//    console.log(arrayQuantityPointY);
    Axis();//Вызываем функцию отрисовки координатной сетки
    //Функция отрисовки координат
    function Axis(){
            var LengthRangeY = 50;//Ширина Y в пикселах
            var CountLinesY = width/LengthRangeY;//Получаем количество линий Y
            Math.trunc(CountLinesY);//Округляем до целого
            var X = 0;//Переменая для сдвига следующей линии по координате X
            ctx.strokeStyle = "rgba(136, 136, 136, 0.3)";
            for(var i = 0;i < CountLinesY;i++){
                X = X + LengthRangeY;//Сдвигаем линию
                ctx.moveTo(X,0);//указываем начальную координату линии
                ctx.lineTo(X,height);//Указываем конечную координату линии
                ctx.stroke();//Рисуем линию
            }
            ctx.beginPath();
            var LengthRangeX = 20;//Ширина X в пикселах
            var CountLinesX = height/LengthRangeX;//Получаем количество линий Y
            Math.trunc(CountLinesX);//Округляем до целого
            var Y = 0;//Переменая для сдвига следующей линии по координате Y
            for(var i = 0;i < CountLinesX;i++){
                Y = Y + LengthRangeX;//Сдвигаем линию
                ctx.moveTo(0,Y);//указываем начальную координату линии
                ctx.lineTo(width,Y);//Указываем конечную координату линии
                ctx.stroke();//Рисуем линию
            }
        } 
    
    //При нажатии на кнопку (Отправить) выполнять следующую анонимную функцию.
    document.getElementById("add").onclick = drawing; 
    function drawing(){
        document.getElementById("update").onclick = function(){
            ctx.clearRect(0,0,width,height);//отчищаем кэнвас
            drawing();
        }
        var quantityPoint = document.getElementById("AmountPoint").value;//Берем значение(целочисленное) из input
        Axis();//Рисуем сетку
        Paint();//Рисуем график
        //Функция рисования графика
        function Paint(ScaleX = 1,ScaleY = 10){
            for(var i = 0;i < quantityPoint;i++){
    //            (i/width)*((width/quantityPoint)*width) = (i/quantityPoint)*width
                arrayQuantityPointX[i] = (i/quantityPoint)*width;//Заполняем массив X
                arrayQuantityPointY[i] = (canvas.height/2) + ScaleY*Math.sin(arrayQuantityPointX[i]*ScaleX);// Заполняем массив Y
                ctx.fillRect(arrayQuantityPointX[i],arrayQuantityPointY[i],2,2);//Выводим на экран точку
            }
        }
    

       

        var amplitude = 10;//Амплитуда синусойды
        var Period = 1;//Период синусойды


        document.onkeydown = Developments;// При нажатии на клавишы выполняем функцию Developments
        function Developments(event){
//            console.log(amplitude);
//            console.log(Period);
            if(event.key == "ArrowUp")//Стрелка вверх
            {
                ctx.clearRect(0,0,width,height);
                if(amplitude < height/2){
                amplitude = amplitude + 1;
                }
                Axis();
                Paint(Period,amplitude);
            }
            if(event.key == "ArrowDown")//Стрелка вниз
            {
                ctx.clearRect(0,0,width,height);
                if(amplitude > 0){
                amplitude = amplitude - 1;
                }
                Axis();
                Paint(Period,amplitude);

            }
            if(event.key == "ArrowRight")//Стрелка вправо
            {
                ctx.clearRect(0,0,width,height);
                if(Period > 0.5){
                    Period = Period - 0.01;
                }else if(Period < 0.5 && Period > 0.3){
                    Period = Period - 0.005;
                }else if(Period <= 0.3 && Period > 0){
                    Period = Period - 0.002;
                }else{
                    Period = Period;
                }
                Axis();
                Paint(Period,amplitude);
            }
            if(event.key == "ArrowLeft")//Стрелка влево
            {
                ctx.clearRect(0,0,width,height);
                if(Period > 0.5){
                    Period = Period + 0.01;
                }else if(Period < 0.5 && Period > 0.3){
                    Period = Period + 0.005;
                }else{
                    Period = Period + 0.002;
                }
                Axis();
                Paint(Period,amplitude);
            }      
        }
    }
}
