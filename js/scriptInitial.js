"use strict";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;
const CANVAS_BORDER_WIDTH = 30;

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

        this.speedInPixel = 80;
        this.leftEdge = 0;
        this.rightEdge = CANVAS_WIDTH - this.width;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
        ctx.closePath();
    }

    move(event) {
        ctx.clearRect(this.posX, this.posY, this.width, this.height);

        let nextPosition;
        
        if (event.type === "keydown") {
            nextPosition = event.code === "ArrowRight" ? this.posX + this.speedInPixel : this.posX - this.speedInPixel;
        } else {// event.type === "mousemove"
            nextPosition = event.clientX - canvas.offsetLeft - CANVAS_BORDER_WIDTH - this.width/2;
        }

        if (nextPosition >= this.leftEdge && nextPosition <= this.rightEdge) this.posX = nextPosition;
        if (nextPosition < this.leftEdge) this.posX = this.leftEdge;
        if (nextPosition > this.rightEdge) this.posX = this.rightEdge;

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

        this.leftEdge = 0 + this.radius; // x = 10;
        this.rightEdge = CANVAS_WIDTH - this.radius; // x= 890;
        this.topEdge = 0 + this.radius; // y = 10;
        this.bottomEdge = CANVAS_HEIGHT - this.radius; // y = 590;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    checkCollision(nextPosX, nextPosY) {
        const isOnPaddle = nextPosX >= paddle.posX && nextPosX <= paddle.posX + paddle.width && nextPosY >= this.bottomEdge - paddle.height;

        if (nextPosX <= this.leftEdge) return "left";
        if (nextPosX >= this.rightEdge) return "right";
        if (nextPosY <= this.topEdge) return "top";
        if (nextPosY >= this.bottomEdge) return "bottom";
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
        this.directionX = this.directionX > 0 ? this.speed : - this.speed;
        this.directionY = this.directionY > 0 ? this.speed : - this.speed;
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

    window.addEventListener("keydown", handleControls);
    window.addEventListener("mousemove", handleControls);

    startPong();
}

function handleControls(event) {

    if (event.code === "ArrowRight" || event.code === "ArrowLeft" || event.type === "mousemove") {
        paddle.move(event);
    }
    if (event.code === "Space") {
        startPong();
    }     
}

function startPong() {
    numberOfPaddleCollision = 0;
    displayScore();
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    paddle = new Paddle(375, 570, 150, 30, "#fff");
    paddle.draw();
    ball = new Ball(450, 10, 10, "#fff", 5);
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
    if (numberOfPaddleCollision === 5 || numberOfPaddleCollision === 10) {
        ball.speed += 3;
        ball.setSpeedToDirection();
    }
}

window.addEventListener('load', init);   
