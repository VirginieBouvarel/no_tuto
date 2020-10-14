"use strict";

window.onload = function () {
   
    const CANVAS_WIDTH = 900;
    const CANVAS_HEIGHT = 600;
    const ARROW_RIGHT = 39;
    const ARROW_LEFT = 37;

    let canvas;
    let ctx;
    let paddle; 
    let ball;
    let interval

    class Paddle {
        constructor(posX, posY, width, height, color) {
            this.posX = posX;
            this.posY = posY;
            this.width = width;
            this.height = height;
            this.color = color;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.posX, this.posY, this.width, this.height);
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
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        move() {
            interval = setInterval(this.redraw.bind(this), 10);
        }
        redraw() {
            this.x += -2;
            this.y += 1;
            this.draw();
        }
        stop() {
            clearInterval(interval);
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
        ball.move();

        window.addEventListener("keydown", handleKeyDown);
        canvas.addEventListener("mousemove", handleMouseMove);
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

    init();
}