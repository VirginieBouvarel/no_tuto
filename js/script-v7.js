/* version ok avant ajout modif gestion souris*/

"use strict";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;
const score = document.querySelector('#score');

let canvas;
let ctx;
let paddle; 
let ball;
let numberOfPaddleCollision = 0;
let animationID = 0;
let stopped;



class Paddle {
    constructor(posX, posY, width, height, color) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
        ctx.closePath();
    }

    moveTo(handleType, direction) {
        const isMouse = (handleType === "mouse");
        const speedInPixel = isMouse ? 10  : 80; // On rend le mouvement plus fluide lors d'une utilisation au clavier
        const canvasLeftEdge =  0;
        const canvasRightEdge =  CANVAS_WIDTH - this.width;
        let nextPosition;

        ctx.clearRect(this.posX, this.posY, this.width, this.height);
        
        if (direction === "right") {
            nextPosition = this.posX + speedInPixel;
            if (nextPosition > canvasRightEdge) {
                this.posX = canvasRightEdge; // s'arrête à la limite du bord droit
            } else {
                this.posX += speedInPixel;
            }

        } else { // direction === "left"
            nextPosition = this.posX - speedInPixel;
            if (nextPosition < canvasLeftEdge) {
                this.posX = canvasLeftEdge; // s'arrête à la limite du bord gauche
            } else {
                this.posX -= speedInPixel;
            }

        }
        this.draw();
    }
}

class Ball {
    constructor (x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.directionX = - this.speed;
        this.directionY = this.speed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    checkCollision(nextPosX, nextPosY) {
        // On détermine les coordonnées des zones de contact entre la balle et le bord du canvas en tenant compte du rayon de la balle
        const leftEdge = 0 + ball.radius; // x = 10;
        const rightEdge = CANVAS_WIDTH - ball.radius; // x= 890;
        const topEdge = 0 + ball.radius; // y = 10;
        const bottomEdge = CANVAS_HEIGHT - ball.radius; // y = 590;
        const isOnPaddle = nextPosX >= paddle.posX && nextPosX <= paddle.posX + paddle.width && nextPosY >= bottomEdge - paddle.height;

        if (nextPosX <= leftEdge) return "left";
        if (nextPosX >= rightEdge) return "right";
        if (nextPosY <= topEdge) return "top";
        if (nextPosY >= bottomEdge) return "bottom";
        if (isOnPaddle) return "paddle";
    }

    setNextPosition() {
        let nextPosX = this.x + this.directionX;
        let nextPosY = this.y + this.directionY;

        let collision = this.checkCollision(nextPosX, nextPosY);

        if (collision === "bottom") {
            gameOver();
        } else {
            // Si la balle dépasse le canvas on inverse le sens pour générer l'effet de rebond
            if (collision === "left" || collision === "right") {
                this.directionX = - this.directionX;
            }
            if (collision === "top"){
                this.directionY = - this.directionY;
            }
            if (collision === "paddle") {
                this.directionY = - this.directionY;
                updateScore();
                updateSpeed();
            }

            this.x += this.directionX;
            this.y += this.directionY;
        }
    }

    move() {  
        this.setNextPosition();
        this.draw();
    }

    setSpeedToDirection() {
        if (this.directionX > 0) {
            this.directionX = this.speed;
        }else {
            this.directionX = - this.speed;
        }
        if (this.directionY > 0) {
            this.directionY = this.speed;
        }else {
            this.directionY = - this.speed;
        }
    }

}

function init() {
    canvas = document.createElement('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    canvas.style.border = "30px solid grey";
    canvas.style.margin = "50px auto";
    canvas.style.display = "block";
    canvas.style.backgroundColor = "black";
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("mousemove", handleMouseMove);

    startPong();
}

function handleKeyDown(event) {
    if(event.code === "ArrowRight") {
        paddle.moveTo("arrow", "right");
    }
    if(event.code === "ArrowLeft") {
        paddle.moveTo("arrow", "left");
    }
    if (event.code === "Space") {
        startPong();
    }
}
    
function handleMouseMove(event) {
    if(event.movementX > 0) {
        paddle.moveTo("mouse", "right");
    }
    if(event.movementX < 0) {
        paddle.moveTo("mouse", "left");
    }
    
}


function startPong() {
    numberOfPaddleCollision = 0;
    displayScore();
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    paddle = new Paddle(375, 570, 150, 30, "#fff");
    paddle.draw();
    ball = new Ball(450, 10, 10, "#fff", 2);
    ball.draw();

    stopped = false;
    refreshCanvas();
}

function refreshCanvas() {
    if (!stopped) {
        ctx.clearRect(ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2); // On ne rafraîchit que la portion de canvas contenant la balle
        paddle.draw();
        ball.move();
        animationID = requestAnimationFrame(refreshCanvas);
    }
}

function gameOver() {
    console.log("Game Over");
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.strokeStyle = "#fff";
    ctx.font = '6rem Arial';
    ctx.textAlign = "center";
    ctx.strokeText('Game Over', 446, 300);

    if (animationID) {
        cancelAnimationFrame(animationID);
    }
    stopped = true;
}

function displayScore() {
    score.innerHTML = numberOfPaddleCollision;
}

function updateScore() {
    numberOfPaddleCollision++;
    displayScore();
}

function updateSpeed() {
    if (numberOfPaddleCollision === 10) {
        ball.speed += 2;
        ball.setSpeedToDirection();
    }
    if (numberOfPaddleCollision === 5) {
        ball.speed += 1;
        ball.setSpeedToDirection();
    }
}

window.addEventListener('load', init);   
