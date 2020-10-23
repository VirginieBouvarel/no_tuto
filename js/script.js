"use strict";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;

let canvas;
let ctx;
let paddle; 
let ball;
let interval;
let delay = 10; // ms


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
        const speedInPixel = isMouse ? 7 : 80; // On rend le mouvement plus fluide lors d'une utilisation au clavier
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
    constructor (x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.directionX = -2;
        this.directionY = 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    checkCollision(nextPosX, nextPosY) {
        // On détermine les coordonnées des bords du canvas en fonction du rayon de la balle
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

        const collision = this.checkCollision(nextPosX, nextPosY);

        if (collision === "bottom") {
            gameOver();
        }
        if (collision === "left" || collision === "right") {
            this.directionX = - this.directionX;
        }
        if (collision === "top" || collision ===  "paddle") {
            this.directionY = - this.directionY;
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
    ball = new Ball(450, 10, 10, "#fff");
    ball.draw();

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("mousemove", handleMouseMove);

    interval = setInterval(refreshCanvas, delay); 
}

function handleKeyDown(event) {

    if(event.code === "ArrowRight") {
        paddle.moveTo("arrow", "right");
    }
    if(event.code === "ArrowLeft") {
        paddle.moveTo("arrow", "left");
    }
    if (event.code === "Space") {
        init();
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

function gameOver() {
    console.log("Game Over");
    clearInterval(interval);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.strokeStyle = "#fff";
    ctx.font = '6rem Arial';
    ctx.textAlign = "center";
    ctx.strokeText('Game Over', 446, 300);
}


window.addEventListener('load', init);   
