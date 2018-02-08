var canvas = document.getElementById("canvas-one");
var ctx = canvas.getContext("2d");

var startButt = document.getElementById("start-button");
var stopButt = document.getElementById("stop-button");

var radius = 50;
var requestID;

var expand = true;
var opacityChange = true;

var circleAnimation = function() {
    stopIt();

    var drawCircle = function() {
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
        changeRadius();
        ctx.fillStyle = "rgba(0, 0, 0, " + genOpacity() +")";
        ctx.fill();
    };

    var changeRadius = function() {
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
        requestID = window.requestAnimationFrame(drawCircle);
    };

    var genOpacity = function() {
        return radius / 450;
    };

    drawCircle();
};

var stopIt = function() {
    window.cancelAnimationFrame(requestID);
};

var startIt = function() {
    requestID = window.requestAnimationFrame(circleAnimation);
};

startButt.addEventListener('click', startIt, true);
stopButt.addEventListener('click', stopIt, true);
canvas.addEventListener('click', startIt, true);

startIt();