"use strict";

class Game {
    constructor() {
        this.scoreTag = document.querySelector('#score');
        this.score = 0;
        this.stopped = true;
        this.animationID;
        
        this.paddle = new Paddle(375, 570, 150, 30, "#fff");
        this.ball = new Ball(450, 10, 10, "#fff", 5);
        this.court = new Canvas(900, 600, 30, this.paddle, this.ball);
        this.trip = new Trip(this.paddle, this.ball, this.court);
        

        this.court.draw("paddle");
        this.court.draw("ball");

        window.addEventListener("keydown", this.handleControls);
        window.addEventListener("mousemove", this.handleControls);
    }

    start() {
        this.reset();
        this.stopped = false;
        this.displayScore();
        this.refresh();
    }
    reset() {
        this.court.clear("canvas");
        this.score = 0;
        this.paddle.x = 375;
        this.paddle.y = 570;
        this.ball.x = 450;
        this.ball.y = 10;
        
    }
    
    handleControls(event) {
        if (event.code === "ArrowRight" || event.code === "ArrowLeft" || event.type === "mousemove") {
            this.trip.resetCoordinates("paddle", event);
            this.court.redraw("paddle");
        }
        if (event.code === "Space") {
            this.start();
        }     
    }
    refresh() {
        if (!this.stopped) {
            let collisionTest = this.trip.resetCoordinates("ball");
    
            if (collisionTest === "bottom") {
                this.stopped;
            } else {
                if (collisionTest === "paddle") {
                    this.updateScore();
                    this.updateSpeed();
                }

                this.court.redraw("ball");
            }
            this.animationID = requestAnimationFrame(this.refresh.bind(this));
        }
    }

    displayScore() {
        this.scoreTag.innerHTML = this.score; 
    }

    updateScore() {
        this.score++;
        this.displayScore();
    }
    updateSpeed() {
        if (this.score === 5 || this.score === 10) {
            this.ball.speed += 3;
            this.ball.setSpeedToDirection();
        }
    }

    gameOver() {
        console.log("Game Over");
        this.court.displayGameOver();
        if (animationID) {
            cancelAnimationFrame(animationID);
        }
        this.stopped = true;
    }
}
  
class Trip {
    constructor(paddle, ball, canvas) {
        this.paddle = paddle;
        this.ball = ball;
        this.canvas = canvas;
        this.leftEdge = 0;
        this.rightEdge = this.canvas.width;
        this.topEdge = 0;
        this.bottomEdge = this.canvas.height;
    }

    resetCoordinates(target, event) {
        if (target === "paddle") {
            let nextX;
        
            if (event.type === "keydown") {
                nextX = event.code === "ArrowRight" ? this.x + this.speedInPixel : this.x - this.speedInPixel;
            } else {// event.type === "mousemove"
                nextX = event.clientX - canvasOffsetLeft - canvasBorderWidth - this.midWidth;
            }

            if (nextX >= this.leftEdge && nextX <= this.rightEdge) this.x = nextX;
            if (nextX < this.leftEdge) this.x = this.leftEdge;
            if (nextX > this.rightEdge) this.x = this.rightEdge;

    
        } else { //target === "ball"
            let nextX = this.x + this.directionX;
            let nextY = this.y + this.directionY;

            let collision = this.detectCollision(nextX, nextY, paddle);

            if (collision === "bottom") { 
                return "bottom";
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
                    return "paddle";
                }
                

                this.x += this.directionX;
                this.y += this.directionY;
            }
        }

    }

detectCollision(nextX, nextY, paddle) {
    const isOnPaddle = nextX >= paddle.posX && nextX <= paddle.posX + paddle.width && nextY >= this.bottomEdge - paddle.height;

    if (nextX <= this.leftEdge) return "left";
    if (nextX >= this.rightEdge) return "right";
    if (nextY <= this.topEdge) return "top";
    if (nextY >= this.bottomEdge) return "bottom";
    if (isOnPaddle) return "paddle";
}
    
}
class Canvas {
    constructor(width, height, borderWidth, paddle, ball) {
        this.paddle = paddle;
        this.ball = ball;
        this.borderWidth = borderWidth;

        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.border = "30px solid grey";
        this.canvas.style.margin = "50px auto";
        this.canvas.style.display = "block";
        this.canvas.style.backgroundColor = "black";
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }

    clear(target) {
        switch(target) {
            case "paddle":
                this.ctx.clearRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
            break;
            case "ball":
                this.ctx.clearRect(this.ball.x, this.ball.y, this.ball.radius, this.ball.radius);
            break;
            default:
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            break;
        }
    }
    draw(target) {
        this.ctx.beginPath();
        if (target === "paddle") {
            this.ctx.fillStyle = this.paddle.color;
            this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
        } else {
            this.ctx.fillStyle = this.ball.color;
            this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI*2);
            this.ctx.fill();
        }
        this.ctx.closePath();
    }
    redraw(target) {
        this.clear(target);
        this.draw(target);  
    }
    displayGameOver() {
        this.clear("canvas");
        this.ctx.strokeStyle = "#fff";
        this.ctx.font = '6rem Arial';
        this.ctx.textAlign = "center";
        this.ctx.strokeText('Game Over', 446, 300);
    }
    

}

class Paddle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        // this.canvasWidth = canvasWidth;

        this.type = "paddle";
        this.speedInPixel = 80;
        this.midWidth = this.width/2;
        // this.leftEdge = 0;
        // this.rightEdge = canvasWidth - this.width; 
    }
}
class Ball {
    constructor (x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.midWidth = radius;
        this.color = color;
        this.speed = speed;
        // this.canvasWidth = canvasWidth;
        // this.canvasHeight = canvasHeight;

        this.type = "ball";
        this.directionX = - this.speed;
        this.directionY = this.speed;

        // this.leftEdge = 0 + this.radius; // x = 10;
        // this.rightEdge = this.canvasWidth - this.radius; // x= 890;
        // this.topEdge = 0 + this.radius; // y = 10;
        // this.bottomEdge = this.canvasHeight - this.radius; // y = 590;
    }
    setSpeedToDirection() {
        this.directionX = this.directionX > 0 ? this.speed : - this.speed;
        this.directionY = this.directionY > 0 ? this.speed : - this.speed;
    }

    

}


/* main.js*/


window.addEventListener('load', function() {
    const game = new Game();
    game.start();
});   
