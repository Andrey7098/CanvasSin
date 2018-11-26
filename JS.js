window.onload = function(){
    var canvas = document.getElementById('can1');
    var ctx = canvas.getContext('2d');
    var x = 0;
    var timer;
    var amplitude = 30;
    var width = 3;
    DrowSin();
    function DrowSin(){
        y = (canvas.height/2) + amplitude*Math.sin(x);
        if(x >= canvas.width/15)    
        {
            x = 0;
            ctx.clearRect(0,0,canvas.width,canvas.height);
        }else
        {
        x = x + 0.05;
        }
        console.log(x);
        ctx.fillRect(width*x,y,2,2);
        timer = setTimeout(DrowSin,50);
            
        document.onkeydown = function(event){
            console.log(event);
            if(event.key == "ArrowUp"){
                amplitude = amplitude + 5;
            }
            if(event.key == "ArrowDown"){
                amplitude = amplitude - 5;
            }
            if(event.key == "ArrowRight"){
                width = width + 0.1;
            }
            if(event.key == "ArrowLeft"){
                width = width - 0.1;
            }      
        }
    }
}
