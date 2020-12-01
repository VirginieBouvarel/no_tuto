"use strict";

class Game {
    constructor(bricksNumber) {
        this.startMsg = document.querySelector('.start-msg');
        this.scoreTag = document.querySelector('#score');
        this.score = 0;
        this.bricksNumber = 21;
        this.stopped = true;
        this.animationID;

        this.court = new Canvas(900, 600, 50);
        this.paddle = new Paddle(375, 570, 150, 30, "#fff", this.court.ctx, this.court.borderWidth);
        this.ball = new Ball(450, 560, 10, "#fff", 5, this.court.ctx, this.paddle);

        this.buildBricksArray();

        window.addEventListener("keydown", this.handleControls.bind(this));
        window.addEventListener("mousemove", this.handleControls.bind(this));
              
    }

    init() {
        this.displayScore();
        this.paddle.draw();
        this.ball.draw();
    }

    start() {
        this.reset();
        this.stopped = false;
        this.displayScore();
        this.toggleStartMsg();
        this.paddle.draw();
        this.ball.draw();
        this.refresh();
    }

    reset() {
        this.court.clear();
        this.paddle.reset();
        this.ball.reset();
        this.score = 0;
       
    }
    
    handleControls(event) {
        if (event.type === "keydown" || event.type === "mousemove") {
            if(!this.stopped) {
                this.paddle.move(event);  
            }   
        }
        if (event.code === "Space") {
            this.start();
        }     
    }

    refresh() {
        if (!this.stopped) {
            let collision = this.ball.move();
    
            if (collision.bottom) {
                this.gameOver();
            } else {
                if (collision.paddle) {
                    this.updateScore();
                    this.updateSpeed();
                }
            }
            this.animationID = requestAnimationFrame(this.refresh.bind(this));
        }
    }

    toggleStartMsg() {
        this.startMsg.classList.toggle('hidden');
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
        this.toggleStartMsg();  
        if (this.animationID) {
            cancelAnimationFrame(this.animationID);
        }
        this.stopped = true;
    }

    buildBricksArray() {
        const colors = ["#FF1493", "#FF8C00", "#9ACD32", "00CED1", "BA55D3"];
        const colorIndex = Math.floor(Math.random() * colors.length);

        const bricks = [];
        const columns = 7;
        const rows = 3;
        const margin = 30;
        const width = 150;
        const height = 30;
        const marginRight
        let x = 0;
        let y = 0;

        for(let i = 0; i < rows; i ++) {
            y += margin;

            for (let i = 0; i < columns; i++) {
                x = margin + ((width + marginRight) * i);
                bricks.push(new Brick(x, y, width, height, colors[colorIndex], this.court));
            }  
        }
        console.log(bricks);
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
        this.ctx = this.canvas.getContext('2d');
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  
    }

    displayGameOver() {
        this.clear();
        this.ctx.strokeStyle = "#fff";
        this.ctx.font = '6rem Arial';
        this.ctx.textAlign = "center";
        this.ctx.strokeText('Game Over', 446, 300);
    }
}

class Paddle {
    constructor(x, y, width, height, color, ctx, canvasBorder) {
        this.x = x;
        this.y = y;
        this.xInitial = x;
        this.yInitial = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.ctx = ctx;
        this.canvasBorder = canvasBorder;

        this.speedInPixel = 80;
        this.midWidth = this.width/2;
        this.leftEdge =  0;
        this.rightEdge = this.ctx.canvas.width - this.width;

    }

    clear() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.closePath();
    }

    resetCoordinates(event) {
        let nextX;
        
        if (event.type === "keydown") {
            nextX = event.code === "ArrowRight" ? this.x + this.speedInPixel : this.x - this.speedInPixel;
        } else {// event.type === "mousemove"
            nextX = event.clientX - this.ctx.canvas.offsetLeft - this.canvasBorder - this.midWidth;
        }
        
        if (nextX < this.leftEdge) nextX = this.leftEdge;;
        if (nextX > this.rightEdge) nextX = this.rightEdge;

        this.x = nextX;
     
    }

    move(event) {
        this.clear();
        this.resetCoordinates(event);
        this.draw();
    }

    reset() {
        this.x = this.xInitial;
        this.y = this.yInitial;
    }
}

class Ball {
    constructor (x, y, radius, color, speed, ctx, paddle) {
        this.x = x;
        this.y = y;
        this.xInitial = x;
        this.yInitial = y;
        this.speedInPixel = speed;
        this.speedInPixelInitial = speed;
        this.radius = radius;
        this.color = color;
        this.ctx = ctx;
        this.paddle = paddle;


        this.directionX = - this.speedInPixel;
        this.directionY = this.speedInPixel;
        this.leftEdge = this.radius;
        this.rightEdge = this.ctx.canvas.width - this.radius;
        this.topEdge = this.radius;
        this.bottomEdge = this.ctx.canvas.height - this.radius;

    }

    clear() {
        this.ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    resetCoordinates() {
        let newCoordinates = this.calculateNextPosition();

        let collision = this.detectCollision(newCoordinates);

        if (!collision.bottom) { 
            // Si la balle dépasse le canvas on inverse le sens pour générer l'effet de rebond
            if (collision.left || collision.right) {
                this.directionX = - this.directionX;
            }
            if (collision.top || collision.paddle){
                this.directionY = - this.directionY;
            }
            
            this.x += this.directionX;
            this.y += this.directionY;
        }
        return collision;
    }

    calculateNextPosition() {
        return {x: this.x + this.directionX, y: this.y + this.directionY};
    }

    detectCollision(newCoordinates) {
        return {
            left: newCoordinates.x <= this.leftEdge,
            right: newCoordinates.x >= this.rightEdge,
            top: newCoordinates.y <= this.topEdge,
            bottom: newCoordinates.y >= this.bottomEdge,
            paddle: newCoordinates.x >= this.paddle.x && newCoordinates.x <= this.paddle.x + this.paddle.width && newCoordinates.y >= this.bottomEdge - this.paddle.height
        }
    }

    move() {
        this.clear();
        let collision = this.resetCoordinates();
        this.draw();
        return collision;
    }

    reset() {
        this.x = this.xInitial;
        this.y = this.yInitial; 
        this.speedInPixel = this.speedInPixelInitial;
        this.directionX = - this.speedInPixel;
        this.directionY = this.speedInPixel;     
    }

    setSpeedToDirection() { 
        this.directionX = this.directionX > 0 ? this.speedInPixel : - this.speedInPixel;
        this.directionY = this.directionY > 0 ? this.speedInPixel : - this.speedInPixel;
    }

}

class Brick {
    constructor(x, y, width, height, color, court) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.court = court;
    }

    clear() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.closePath();
    }
}

window.addEventListener('load', function() {
    const game = new Game();
    game.init();

    
}); 