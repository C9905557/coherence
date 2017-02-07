var timeoutMinutes = 15;
var clockObj = null;

function startCk() {
    setBell(timeoutMinutes);
    if( !clockObj ) {
        clockObj = new CreateClock();
        clockObj.displayClock();
    }
};

function setBell( timeout ) {
    setTimeout(function(){
        var audio = new Audio('http://soundbible.com//mp3/Zen Buddhist Temple Bell-SoundBible.com-331362457.mp3');
        audio.play();
     }, timeoutMinutes*60*1000 + 10*1000 +1);
    <!-- http://soundbible.com//mp3/Bleep-SoundBible.com-1927126940.mp3 -->
    <!-- <embed src="specPlayer.swf" flashvars="song=/mp3/Zen Buddhist Temple Bell-SoundBible.com-331362457.mp3" quality="high" bgcolor="#FFFFFF" name="specPlayer" allowscriptaccess="sameDomain" allowfullscreen="true" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" width="185" height="85" align="middle"> -->
}

function CreateClock() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90
    //var hour = 6 ; //now.getHours();
    var minute = 59 //now.getMinutes();
    var second = 49 //now.getSeconds();
    var showMinuteHand = false;

    this.displayClock = function () {
        setInterval(drawClock, 1000);
    } ;


    drawClock = function () {
      drawFace(ctx, radius);
      drawNumbers(ctx, radius);
      drawTime(ctx, radius);
    }


    drawFace = function (ctx, radius) {
      var grad;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2*Math.PI);
      ctx.fillStyle = '#808080' //'white';
      ctx.fill();
      grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
      grad.addColorStop(0, '#333');
      grad.addColorStop(0.5, 'white');
      grad.addColorStop(1, '#333');
      ctx.strokeStyle = grad;
      ctx.lineWidth = radius*0.1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
      ctx.fillStyle = '#333';
      ctx.fill();
    }


    drawNumbers = function (ctx, radius) {
      var ang;
      var num;
      ctx.font = radius*0.15 + "px arial";
      ctx.textBaseline="middle";
      ctx.textAlign="center";
      for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
      }
    }


    drawTime = function (ctx, radius){
        //var now = new Date();
        //var hour = 6 ; //now.getHours();
        //var minute = 59 //now.getMinutes();
        //var second = 50 //now.getSeconds();
        second = second + 1 ;
        if( second == 60 ) {
            second = 0 ;
            showMinuteHand = true;
            minute = minute + 1 ;
            if( minute == 60 ) minute = 0 ;
        }
        //hour
        //hour=hour%12;
        //hour=(hour*Math.PI/6)+ (minute*Math.PI/(6*60))+ (second*Math.PI/(360*60));
        //drawHand(ctx, hour, radius*0.5, radius*0.07, 0);//
        //minute
        if( showMinuteHand ) {
            minutea=(minute*Math.PI/30); //+(second*Math.PI/(30*60));
            drawHand(ctx, minutea, radius*0.8, radius*0.07, 0);
        }
        // second
        seconda=(second*Math.PI/30);
        drawHand(ctx, seconda, radius*0.9, radius*0.02, "#FF0000");
    }


    drawHand = function (ctx, pos, length, width, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0,0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }
}
