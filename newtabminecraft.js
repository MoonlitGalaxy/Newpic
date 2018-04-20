var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = 750 - paddleHeight;
var rightPressed = false;
var leftPressed = false;
var brickRow = 5;
var brickColumn = 9;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var score = 0;
var lives = 3;
var bricks = [];

for (var c = 0; c < brickColumn; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRow; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: true,
            value: r + 1
        }
    }
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

function keyDown(event) {
    switch (event.keyCode) {
        case 39:
            rightPressed = true;
            break;
        case 37:
            leftPressed = true;
            break;
        default:
        	break;
    }
}

function keyUp(event) {
    switch (event.keyCode) {
        case 39:
            rightPressed = false;
            break;
        case 37:
            leftPressed = false;
            break;
        default:
        	break;
    }
}

function checkCollision() {
    for (c = 0; c < brickColumn; c++) {
        for (r = 0; r < brickRow; r++) {
            if (bricks[c][r].status) {
                if (bricks[c][r].x < x + 15 && x - 15 < bricks[c][r].x + brickWidth && bricks[c][r].y < y + 15 && y - 15 < bricks[c][r].y + brickHeight) {
                    
                    if(--bricks[c][r].value == 0) {
                    	bricks[c][r].status = false;
                    }
                    dy = -dy;
                    if (++score == brickRow * brickColumn) {
                        alert("Congrats, You Win");
                        document.location.reload();
                    }
                }
            }
        }
    }
    if (x - 15 < 0) {
        dx = -dx;
    }
    if (x + 15 > 750) {
        dx = -dx;
    }
    if (y - 15 < 0) {
        dy = -dy;
    }
    if (y + 15 > 750) {
     	dy = -dy;
        lives--;
        if(lives <= 0) {
        	document.location.reload();
        }
    }


    if (paddleX < x + 15 && x - 15 < paddleX + paddleWidth && paddleY < y + 15 && y + 15 < paddleY + paddleHeight) {
        if (dy > 0) {
            dy = -dy;
        }
    }
}

function drawBrickColumns() {
    for (c = 0; c < brickColumn; c++) {
        for (r = 0; r < brickRow; r++) {
            if (bricks[c][r].status) {
            	context.fillStyle = "rgb(" + (35 * r + 100) + ", 0, 0)";
                bricks[c][r].x = c * (brickWidth  + 5)  + 15;
                bricks[c][r].y = r * (brickHeight + 30) + 50;
                context.fillRect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
            }
        }
    }
}

function drawBall(radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}

function moveBall() {
    x += dx;
    y += dy;
}

function drawPaddle() {
    context.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function movePaddle() {
    if (leftPressed) {
        paddleX -= 5;
    } else if (rightPressed) {
        paddleX += 5;
    }
}

function update() {
	context.fillStyle = "red";
    context.clearRect(0, 0, 750, 750);
    context.fillText("Lives: " + lives, 15, 35);
    context.fillText("Score: " + score, 600, 35);
    if (dx > 0) {
        dx += 0.001;
    } else {
        dx -= 0.001;
    }
    if (dy > 0) {
        dy += 0.001;
    } else {
        dy -= 0.001;
    }
    drawPaddle();
    drawBall(10);
    drawBrickColumns();
    movePaddle();
    moveBall();
    checkCollision();
    
    setTimeout(update, 15);
}

update();
