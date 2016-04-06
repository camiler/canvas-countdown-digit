/**
 * Created by wyliyue on 2015/11/10.
 */
(function(){
    var digit = window.digit;
    var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

    var config = {
        HEIGHT: document.body.offsetHeight,
        WIDTH: document.body.offsetWidth,
        RADIUS: 8,
        LEFT: 300,
        TOP: 200
    }

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var num = 10;

    var timer = setInterval(function(){
        render(context);

    },900);

    function render(ctx){
        ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
        if( num == 0 ){
            showBang(ctx);
            clearInterval(timer);
        }else{
            var margin = config.RADIUS * 8;
            if( num >9 ){
                renderDigit(config.LEFT, config.TOP, num/10, context);
                margin = config.RADIUS*16;
            }
            renderDigit(config.LEFT+margin, config.TOP, num%10, context);
            num--;
        }
    }

    function renderDigit(x,y,num,ctx){
        for(var i=0; i < digit[num].length; i++){
            for(var j=0; j < digit[num][i].length; j++){
                if(digit[num][i][j] == 1){
                    ctx.beginPath();
                    ctx.fillStyle = colors[ Math.floor( Math.random()*colors.length ) ];
                    ctx.arc(x+2*j*(config.RADIUS+1)+config.RADIUS+1,
                            y+2*i*(config.RADIUS+1)+config.RADIUS+1, config.RADIUS, 0, 2*Math.PI);
                    ctx.closePath();
                    ctx.fill();
                }
            }
        }
    }
    function getBangBalls(x,y,num,ctx){
        var balls = [];
        for(var i=0; i < digit[num].length; i++){
            for(var j=0; j < digit[num][i].length; j++){

                if(digit[num][i][j] == 1){
                    var aBall = {
                        x:x+2*j*(config.RADIUS+1)+config.RADIUS+1,
                        y:y+2*i*(config.RADIUS+1)+config.RADIUS+1,
                        z:100,
                        vx:Math.floor( Math.random()*60-30 ),
                        vy:Math.floor( Math.random()*50-25 ),
                        r: config.RADIUS,
                        color: colors[ Math.floor( Math.random()*colors.length ) ]
                    }

                    balls.push( aBall )
                }
            }
        }

        return balls;

    }

    var ballTimer;
    function showBang(ctx){
        var balls = getBangBalls(config.LEFT+10*(config.RADIUS+1),config.TOP+10*(config.RADIUS+1), 10, ctx);
        ballTimer = setInterval(function(){
            updateBalls(balls,ctx);
        },50);
    }

    function updateBalls(balls,ctx){
        ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
        for(var i=0; i< balls.length; i++){
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;
            balls[i].r += Math.random();
            balls[i].z -= Math.random()*10;

            ctx.beginPath();
            ctx.fillStyle = balls[i].color;
            ctx.arc(balls[i].x,balls[i].y,balls[i].r, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();

            if(balls[i].y >= ctx.canvas.height-balls[i].r || balls[i].y <= balls[i].r ||
                balls[i].x >= ctx.canvas.width-balls[i].r || balls[i].x <= balls[i].r ||
                balls[i].z <= 0){

                balls.splice(i,1);
            }

        }
        if(balls.length == 0){
            ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
            clearInterval(ballTimer);
            setInterval(function(){
                renderDigit(config.LEFT-config.RADIUS * 16, config.TOP, 11, ctx);
                renderDigit(config.LEFT, config.TOP, 12, ctx);
                renderDigit(config.LEFT+config.RADIUS * 16, config.TOP, 13, ctx);
            },50);
        }

    }

})();