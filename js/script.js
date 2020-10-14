"use strict";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;
const ARROW_RIGHT = 39;
const ARROW_LEFT = 37;


let canvas;
let ctx;
let paddle; 
let ball;
let interval;
let speed = 15;

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
    };
    moveTo(handleType, direction) {
        const paddleOutOnRight = this.posX > canvas.width - this.width ;
        const paddleOutOnLeft = this.posX < 0;
        const isMouse = (handleType === "mouse");
        const speedInPixel = isMouse ? 25 : 80; //On rend le mouvement plus fluide lors d'une utilisation au clavier

        ctx.clearRect(this.posX, this.posY, this.width, this.height);

        if (direction === "right" && !paddleOutOnRight) {
            this.posX += speedInPixel;
        }
        if (direction === "left" && !paddleOutOnLeft) {
            this.posX -= speedInPixel;
        }

        this.draw();
    }
}

class Ball {
    constructor (x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    setNextPosition() {
        this.x += -2;
        this.y += 2;
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

    paddle = new Paddle(375, 570, 150, 30, "#fff");
    ball = new Ball(450, 11, 10, "#fff");

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("mousemove", handleMouseMove);

    interval = setInterval(refreshCanvas, speed);
    checkCollision();
}

function handleKeyDown(event) {

    if(event.keyCode === ARROW_RIGHT) {
        paddle.moveTo("arrow", "right");
    }
    if(event.keyCode === ARROW_LEFT) {
        paddle.moveTo("arrow", "left");
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

function refreshCanvas() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    paddle.draw();
    ball.draw();
    ball.setNextPosition();
}
//TODO: ne s'affiche pas dans la console
function checkCollision() {
    // if (ball.x === 0 + ball.radius) return "leftCollision";
    // if (ball.x === CANVAS_WIDTH - ball.radius) return "rightCollision";
    // if (ball.y === 0 + ball.radius) return "topCollision";
    // if (ball.y === CANVAS_HEIGHT - ball.radius) return "bottomCollision";
    if (ball.x < 0 + ball.radius) console.log("leftCollision");//x < 10
    if (ball.x > CANVAS_WIDTH - ball.radius) console.log("rightCollision"); // x > 890
    if (ball.y < 0 + ball.radius) console.log("topCollision");//y < 10
    if (ball.y > CANVAS_HEIGHT - ball.radius) console.log("bottomCollision");//y > 590
}
//TODO: appeler la fonction play() quelque part
function play() {
    const collision = checkCollision();
    if (collision === "bottomCollision") return gameOver();
    rebound(collision);
}

//TODO: function gameOver();
//TODO: function rebound(collision);

window.addEventListener('load', init);   
