var canvas = document.getElementById("canvas-one");
var ctx = canvas.getContext("2d");

var startButt = document.getElementById("start-button");
var stopButt = document.getElementById("stop-button");

var radius = 50;
var requestID;

var expand = true;
var opacitychange = true;

var circleanimation = function() {
    stopit();

    var drawcircle = function() {
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
        changeradius();
        ctx.fillStyle = "rgba(0, 0, 0, " + genopacity() +")";
        ctx.fill();
    };

    var changeradius = function() {
        if (expand == true) {
            radius++;
            if (radius > 450) {
                expand = false;
            }
        } else {
            radius--;
            if (radius < 1) {
                expand = true;
            }
        }
        console.log(requestID);
        requestID = window.requestAnimationFrame(drawcircle);
    };

    var genopacity = function() {
        return radius / 450;
    };

    drawcircle();
};

var stopit = function() {
    window.cancelAnimationFrame(requestID);
};

var startit = function() {
    requestID = window.requestAnimationFrame(circleanimation);
};

startButt.addEventListener('click', startit, true);
stopButt.addEventListener('click', stopit, true);
canvas.addEventListener('click', startit, true);

startit();