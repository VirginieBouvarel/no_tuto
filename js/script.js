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
    constructor (x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.nextPosX = this.x - 2;
        this.nextPosY = this.y + 2;
    }

   
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    checkCollision() {
        //On détermine les coordonnées des bords du canvas en fonction du rayon de la balle
        const leftEdge = 0 + ball.radius;//x = 10;
        const rightEdge = CANVAS_WIDTH - ball.radius; //x= 890;
        const topEdge = 0 + ball.radius;//y = 10;
        const bottomEdge = CANVAS_HEIGHT - ball.radius; //y = 590;

        if (this.nextPosX <= leftEdge) return "left";
        if (this.nextPosX >= rightEdge) return "right";
        if (this.nextPosY <= topEdge) return "top";
        if (this.nextPosY >= bottomEdge) return "bottom";
    }

    setNextPosition() {

        //TODO: trouver le moyen d'incrémenter nextPosX et nextPosY  de 2 à chaque tour, en respectant le signe: si x va dans le sens x+2 alors nextposx = x + 2 mais si x va dans le sens x-2 alors nextPosX = x - 2. incrémenter = ajouter, il faut toujours ajouter 2 mais en + ou 2 en - selon le cas ---> + 2 ou + (-2) = + 2 ou - 2 en utilisant toujours l'incrémentation. du coup nextPosX = x + ?, ? étant soit +2 soit - 2
        const collision = this.checkCollision();

        if (collision === "left") {
            console.log("collision left");
            this.nextPosX = this.x + 2;
        }
        if (collision === "right") {
            console.log("collision right");
            this.nextPosX = this.x - 2;
        }
        if (collision === "top") {
            console.log("collision top");
            this.nextPosY = this.y + 2;
        }
        if (collision === "bottom") {
            console.log("collision bottom");
            this.nextPosY = this.y - 2;
        }

        this.x = this.nextPosX;
        this.y = this.nextPosY;
   
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
