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
let delay = 15;//ms

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
    constructor (x, y, radius, color, direction) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.direction = direction;
        

    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    checkCollision(nextPosX, nextPosY) {

        //On détermine les coordonnées des bords du canvas
        const leftEdge = 0 + ball.radius;//x = 10;
        const rightEdge = CANVAS_WIDTH - ball.radius; //x= 890;
        const topEdge = 0 + ball.radius;//y = 10;
        const bottomEdge = CANVAS_HEIGHT - ball.radius; //y = 590;

        //On compare les coordonnées du bord de la balle avec ceux des bords du canvas
        if (nextPosX <= leftEdge) return "left";
        if (nextPosX >= rightEdge) return "right";
        if (nextPosY <= topEdge) return "top";
        if (nextPosY >= bottomEdge) return "bottom";
    }

    setNextPosition() {
        const nextPosX = this.x - this.direction;
        const nextPosY = this.y + this.direction;

        const collision = this.checkCollision(nextPosX, nextPosY);

        if (collision === "left" || collision === "right") {
            this.direction = - this.direction;
           
        }
        if (collision === "top" || collision === "bottom") {
            this.direction = - this.direction;
        }

        this.x = nextPosX;
        this.y = nextPosY;
    }

    move() {
        this.setNextPosition();
        this.draw();
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
    paddle.draw();
    ball = new Ball(450, 11, 10, "#fff", 2);
    ball.draw();

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("mousemove", handleMouseMove);

    interval = setInterval(refreshCanvas, delay);
    
    
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
    ball.move();
}






window.addEventListener('load', init);   
