"use strict";

class Game {
    constructor() {
        this.score = 0;
        this.scoreTag = document.querySelector('#score');
      
    }
    init() {
        court = new Canvas(900, 600, 30);
        
        window.addEventListener("keydown", court.handleControls);
        window.addEventListener("mousemove", court.handleControls);
    
        this.start();
    }

    start() {
        this.displayScore();
        
        ctx.clearRect(0, 0, court.width, court.height);

        paddle = new Paddle(375, 570, 150, 30, "#fff");
        paddle.draw();
        ball = new Ball(450, 10, 10, "#fff", 5);
        ball.draw();
    
        stopped = false;

        this.refresh();
    }
    refresh() {
        if (!stopped) {
            ctx.clearRect(ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2); // On ne rafraîchit que la portion de canvas contenant la balle
            paddle.draw();
            ball.move();
            animationID = requestAnimationFrame(this.refresh.bind(this));
        }
    }

    displayScore() {
        this.scoreTag.innerHTML = this.score; 
    }

    updateScore() {
        this.score++;
        this.displayScore();
    }

    gameOver() {
        console.log("Game Over");
        ctx.clearRect(0, 0, court.width, court.height);
        ctx.strokeStyle = "#fff";
        ctx.font = '6rem Arial';
        ctx.textAlign = "center";
        ctx.strokeText('Game Over', 446, 300);
    
        if (animationID) {
            cancelAnimationFrame(animationID);
        }
        stopped = true;
    }
}


class Canvas {
    constructor(width, height, borderWidth) {
        this.borderWidth = borderWidth;
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.border = "30px solid grey";
        this.canvas.style.margin = "50px auto";
        this.canvas.style.display = "block";
        this.canvas.style.backgroundColor = "black";
        document.body.appendChild(this.canvas);
        ctx = this.canvas.getContext('2d');
    }

    handleControls(event) {
        if (event.code === "ArrowRight" || event.code === "ArrowLeft" || event.type === "mousemove") {
            paddle.move(event);
        }
        if (event.code === "Space") {
            game.start();
        }     
    }

}

class Paddle {
    constructor(posX, posY, width, height, color) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color = color;

        this.speedInPixel = 80;
        this.leftEdge = 0;
        this.rightEdge = court.canvas.width - this.width;
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
            nextPosition = event.clientX - court.canvas.offsetLeft - court.borderWidth - this.width/2;
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
        this.rightEdge = court.canvas.width - this.radius; // x= 890;
        this.topEdge = 0 + this.radius; // y = 10;
        this.bottomEdge = court.canvas.height - this.radius; // y = 590;
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
            game.gameOver();
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
                game.updateScore();
                this.updateSpeed();
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

    updateSpeed() {
        if (game.score === 5 || game.score === 10) {
            this.speed += 3;
            this.setSpeedToDirection();
        }
    }

}


/* main.js*/

const game = new Game();

let score;
let court;
let paddle; 
let ball;
let ctx;
let animationID = 0;
let stopped;


window.addEventListener('load', game.init());   
