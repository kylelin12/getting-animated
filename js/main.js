var canvas = document.getElementById("canvas-one");
var ctx = canvas.getContext("2d");

var startButt = document.getElementById("start-button");
var stopButt = document.getElementById("stop-button");
var toggleButt = document.getElementById("toggle-type-button");

var radius = 50;
var requestID;

// Circles
var expand = true;
var opacityChange = true;

var typeToggle = 0;
var xCor = 0;
var yCor = 0;

var xVelocity = 13;
var yVelocity = 17;

var circleAnimation = function() {
    stopIt();

    var drawCircle = function() {
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
        changeRadius();
        ctx.fillStyle = genRGBAColor();
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

    var genRGBAColor = function() {
        var opacity = radius / 450;
        var color = 255 - (opacity * 255);
        var result = "rgba( " + color + ", " + color + ", " + color +", " + opacity + ")"
        return result;
    };

    drawCircle();
};

var dvdAnimation = function() {
    stopIt();

    var wDis = 93;
    var hDis = 48;

    var drawDVD = function() {
        for (var i = 0; i < 1; i++) {
            xCor += xVelocity;
            yCor += yVelocity;

            if (xCor + wDis >= canvas.width) { // Hit right
                xVelocity = -xVelocity;
            }
            if (yCor + hDis >= canvas.height) { // Hit bottom
                yVelocity = -yVelocity;
            }
            if (xCor == 0) {
                xVelocity = -xVelocity; // Hit left
            }
            if (yCor == 0) {
                yVelocity = -yVelocity; // Hit top
            }
        }

        clearIt();
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00AEEF";
        ctx.fillRect(xCor, yCor, wDis, hDis);

        requestID = requestAnimationFrame(drawDVD);
    }

    drawDVD();
};

var clearIt = function() {
    ctx.clearRect(0, 0 , canvas.width, canvas.height);
    switch(typeToggle) {
        case 0: // Circle
            break;
        case 1: // DVD Screensaver
            ctx.fillStyle = "#000000";
    }
};

var stopIt = function() {
    window.cancelAnimationFrame(requestID);
};

var toggleIt = function() {
    stopIt();
    clearIt();
    switch(typeToggle) {
        case 0: // Circle
            typeToggle = 1;
            break;
        case 1: // DVD Screensaver
            typeToggle = 0;
            break;
    }
    startIt();
}

var startIt = function() {
    switch(typeToggle) {
        case 0: // Circle
            requestID = window.requestAnimationFrame(circleAnimation);
            break;
        case 1: // DVD Screensaver
            requestID = window.requestAnimationFrame(dvdAnimation);
            break;
    }
};

startButt.addEventListener('click', startIt, true);
stopButt.addEventListener('click', stopIt, true);
toggleButt.addEventListener('click', toggleIt, true);
canvas.addEventListener('click', startIt, true);

startIt();