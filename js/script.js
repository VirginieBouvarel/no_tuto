"use strict";

class Game {
    constructor() {
        this.startMsg = document.querySelector('.start-msg');
        this.scoreTag = document.querySelector('#score');
        this.score = 0;
        this.stopped = true;
        this.animationID;

        this.court = new Canvas(900, 600, 50);
        this.paddle = new Paddle(375, 570, 150, 30, "#fff", this.court.ctx, this.court.borderWidth);
        
        this.ball = new Ball(450, 560, 10, "#fff", 5, this.court.ctx, this.paddle, this.bricks);
 
        

        window.addEventListener("keydown", this.handleControls.bind(this));
        window.addEventListener("mousemove", this.handleControls.bind(this));
              
    }

    init() {
        this.bricks = this.buildBricksArray();    
        this.displayScore();
        this.displayBricks();  
        this.paddle.draw();
        this.ball.draw();
    }

    start() {
        this.stopped = false;
        this.toggleStartMsg(); 
        this.refresh();
    }

    reset() {
        this.court.clear();  
        this.score = 0; 
        this.paddle.reset();
        this.ball.reset();
        this.bricks = this.buildBricksArray();

        this.displayScore();
        this.displayBricks();
        this.paddle.draw();
        this.ball.draw(); 
    }
    
    handleControls(event) {
        if (event.type === "keydown" || event.type === "mousemove") {
            if(!this.stopped) {
                this.paddle.move(event);  
            }   
        }
        if (event.code === "Space") { 
            if (this.score > 0) {
                this.reset();
            }
            this.start();
        }     
    }

    refresh() {
        if (!this.stopped) {
            let collision = this.ball.move(this.bricks);
    
            if (collision.bottom) {
                this.gameOver();
            } else {
                if (collision.brick.index > -1) {
                    this.deleteBrick(collision.brick.index);
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
        const colors = ["#FF1493", "#FF8C00", "#9ACD32", "#00CED1", "#BA55D3", "#FFD700", "#FF4500"];
        const bricks = [];

        const columns = 7;
        const rows = 3;
        const rowMarginLeft = 72;
        const marginBetweenRows = 60;
        const marginBetweenBricks = 10;
        const width = 98;
        const height = 30;
        
        let x = 0;
        let y = 30;

        for(let i = 0; i < rows; i ++) {

            for (let i = 0; i < columns; i++) {
                x = rowMarginLeft + ((width + marginBetweenBricks) * i);
                bricks.push(new Brick(x, y, width, height, colors[Math.floor(Math.random() * colors.length)], this.court.ctx));
            }  

            y += marginBetweenRows;
        }
        console.log(bricks);
        return bricks;
    }

    displayBricks() {
        for (let i = 0; i < this.bricks.length; i++) {
            this.bricks[i].draw();
        }
    }

    deleteBrick(index) {
       this.bricks.splice(index, 1);
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
        this.directionY = - this.speedInPixel;
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

    resetCoordinates(bricks) {
        let newCoordinates = this.calculateNextPosition();

        let collision = this.detectCollision(newCoordinates, bricks);

        if (!collision.bottom) { 
            // Si la balle dépasse le canvas on inverse le sens pour générer l'effet de rebond
            if (collision.left || collision.right ||collision.brick.left ||collision.brick.right) {
                this.directionX = - this.directionX;
            }
            if (collision.top || collision.paddle || collision.brick.top ||collision.brick.bottom){
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

    detectCollision(newCoordinates, bricks) {
        return {
            left: newCoordinates.x <= this.leftEdge,
            right: newCoordinates.x >= this.rightEdge,
            top: newCoordinates.y <= this.topEdge,
            bottom: newCoordinates.y >= this.bottomEdge,
            paddle: newCoordinates.x >= this.paddle.x && newCoordinates.x <= this.paddle.x + this.paddle.width && newCoordinates.y >= this.bottomEdge - this.paddle.height,
            brick: this.detectBrickCollision(newCoordinates, bricks)
        }
    }

    detectBrickCollision(newCoordinates, bricks) {
          //on initialise un objet impact: {brick: index = -1, top: false, right: false, bottom: false, left: true, impact:true}, les valeurs par défaut indiquent une absence d'impact
        const impact = {
            index: -1, //en-dehors de bricks
            top:false,
            right:false,
            bottom:false,
            left:false
        }
        //Parcours le tableau de briques
        for (let i = 0; i < bricks.length; i++) {
             //Pour chaque brique on verifie si elle remplie les conditions d'une collision avec un des bords, si oui on modifie impact 
            if (newCoordinates.y + this.radius === bricks[i].y && newCoordinates.x >= bricks[i].x && newCoordinates.x <= bricks[i].x + bricks[i].width) {
                impact.top = true;
            }
            if (newCoordinates.y - this.radius === bricks[i].y + bricks[i].height && newCoordinates.x >= bricks[i].x && newCoordinates.x <= bricks[i].x + bricks[i].width) {
                impact.bottom = true;
            }
            if (newCoordinates.x - this.radius === bricks[i].x + bricks[i].width & newCoordinates.y >= bricks[i].y && newCoordinates.y <= bricks[i].y + bricks[i].height) {
                impact.right = true;
            }
            if (newCoordinates.x + this.radius === bricks[i].x && newCoordinates.y >= bricks[i].y && newCoordinates.y <= bricks[i].y + bricks[i].height) {
                impact.left = true;
            }
            if(impact.top || impact.right || impact.bottom || impact.left) {
                impact.index = i;
                break; //une seule collision possible à chaque mouvement de ball
            }
        }

        //Dans tous les cas on retourne l'objet
        return impact;
    }

    move(bricks) {
        this.clear();
        let collision = this.resetCoordinates(bricks);
        this.draw();
        return collision;
    }

    reset() {
        this.x = this.xInitial;
        this.y = this.yInitial; 
        this.speedInPixel = this.speedInPixelInitial;
        this.directionX = this.speedInPixel;
        this.directionY = - this.speedInPixel;     
    }

    setSpeedToDirection() { 
        this.directionX = this.directionX > 0 ? this.speedInPixel : - this.speedInPixel;
        this.directionY = this.directionY > 0 ? this.speedInPixel : - this.speedInPixel;
    }

}

class Brick {
    constructor(x, y, width, height, color, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.ctx = ctx;
        this.edges = []


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

/*
"#FF1493" rose
"#FF8C00" orange
"#9ACD32" vert
"#00CED1" cyan
"#BA55D3" violet
"#FFD700" jaune
"#FF4500" bleu
*/