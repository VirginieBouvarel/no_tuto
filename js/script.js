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
      
        window.addEventListener("keydown", this.handleControls.bind(this));
        window.addEventListener("mousemove", this.handleControls.bind(this));
              
    }

    start() {
        this.reset();
        this.stopped = false;
        this.displayScore();
        this.court.draw("paddle");
        this.court.draw("ball");
        this.refresh();
    }

    reset() {
        this.court.clear("canvas");
        this.score = 0;
        this.paddle.x = 375;
        this.paddle.y = 570;
        this.ball.x = 450;
        this.ball.y = 10; 
        this.ball.speedInPixel = 5;
        this.directionX = - this.speedInPixel;
        this.directionY = this.speedInPixel;   
    }
    
    handleControls(event) {
        if (event.type === "keydown" || event.type === "mousemove") {
            if(!this.stopped) {
                this.court.clear("paddle");
                this.trip.resetCoordinates("paddle", event);
                this.court.draw("paddle");
            }   
        }
        if (event.code === "Space") {
            this.start();
        }     
    }

    refresh() {
        if (!this.stopped) {
            this.court.clear("ball"); 
            let collisionTest = this.trip.resetCoordinates("ball");
    
            if (collisionTest === "bottom") {
                this.gameOver();
            } else {
                if (collisionTest === "paddle") {
                    this.updateScore();
                    this.updateSpeed();
                }

                this.court.draw("ball");
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
            this.ball.speedInPixel += 3;
            this.ball.setSpeedToDirection();
        }
    }

    gameOver() {
        console.log("Game Over");
        this.court.displayGameOver();
        if (this.animationID) {
            cancelAnimationFrame(this.animationID);
        }
        this.stopped = true;
    }
}
  
class Trip {
    constructor(paddle, ball, canvas) {
        this.paddle = paddle;
        this.ball = ball;
        this.canvas = canvas;

        this.paddleLeftEdge =  0;
        this.paddleRightEdge = this.canvas.canvas.width - this.paddle.width;

        this.ballLeftEdge = this.ball.radius;
        this.ballRightEdge = this.canvas.canvas.width - this.ball.radius;
        this.ballTopEdge = this.ball.radius;;
        this.ballBottomEdge = this.canvas.canvas.height - this.ball.radius;
    }

    resetCoordinates(target, event) {
        let newCoordinates = this.calculateNextPosition(target, event);

        let collisionTest = this.detectCollision(target, newCoordinates);

        if (target === "paddle") {
            this.paddle.x = collisionTest === "left" ? this.paddleLeftEdge 
                          : collisionTest === "right" ? this.paddleRightEdge 
                          : newCoordinates.x;
        }else {
            if (collisionTest === "bottom") { 
                return collisionTest;
            } else {
                // Si la balle dépasse le canvas on inverse le sens pour générer l'effet de rebond
                if (collisionTest === "left" || collisionTest === "right") {
                    this.ball.directionX = - this.ball.directionX;
                }
                if (collisionTest === "top" || collisionTest === "paddle"){
                    this.ball.directionY = - this.ball.directionY;
                }
                
                this.ball.x += this.ball.directionX;
                this.ball.y += this.ball.directionY;

                return collisionTest;
            }
        }
        
    }

    calculateNextPosition(target, event) {
        let nextX;
        let nextY;
        
        if (target === "paddle") {
            if (event.type === "keydown") {
                nextX = event.code === "ArrowRight" ? this.paddle.x + this.paddle.speedInPixel : this.paddle.x - this.paddle.speedInPixel;
            } else {// event.type === "mousemove"
                nextX = event.clientX - this.canvas.canvas.offsetLeft - this.canvas.borderWidth - this.paddle.midWidth;
            }
            nextY = this.paddle.y;
           
        } else { //target === "ball"
            nextX = this.ball.x + this.ball.directionX;
            nextY = this.ball.y + this.ball.directionY;  
        } 

        return {x: nextX, y: nextY};
    }

    detectCollision(target, newCoordinates) {

        if (target === "paddle") {
            if (newCoordinates.x < this.paddleLeftEdge) return "left";
            if (newCoordinates.x > this.paddleRightEdge) return "right";
        } else {
            const isOnPaddle = newCoordinates.x >= this.paddle.x && newCoordinates.x <= this.paddle.x + this.paddle.width && newCoordinates.y >= this.ballBottomEdge - this.paddle.height;
            
            if (newCoordinates.x <= this.ballLeftEdge) return "left";
            if (newCoordinates.x >= this.ballRightEdge) return "right";
            if (newCoordinates.y <= this.ballTopEdge) return "top";
            if (newCoordinates.y >= this.ballBottomEdge) return "bottom";
            if (isOnPaddle) return "paddle";
        }
        return "ok";

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
                this.ctx.clearRect(this.ball.x - this.ball.radius, this.ball.y - this.ball.radius, this.ball.radius * 2, this.ball.radius * 2);
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

        this.speedInPixel = 80;
        this.midWidth = this.width/2;
    }
}

class Ball {
    constructor (x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedInPixel = speed;
     
        this.directionX = - this.speedInPixel;
        this.directionY = this.speedInPixel;

    }
    setSpeedToDirection() {
        this.directionX = this.directionX > 0 ? this.speedInPixel : - this.speedInPixel;
        this.directionY = this.directionY > 0 ? this.speedInPixel : - this.speedInPixel;
    }

}



window.addEventListener('load', function() {
    const game = new Game();
    game.start();
});   
