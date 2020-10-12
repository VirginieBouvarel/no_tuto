"use strict";

window.onload = function () {
   
    const CANVAS_WIDTH = 900;
    const CANVAS_HEIGHT = 600;
    const ARROW_RIGHT = 39;
    const ARROW_LEFT = 37;
    
    let canvas;
    let ctx;
    let paddle; 
    
    class Paddle {
        constructor(posX, posY, width, height, color) {
            this.posX = 375;
            this.posY = 570;
            this.width = 150;
            this.height = 30;
            this.color = "#fff";
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.posX, this.posY, this.width, this.height);
        };
        moveTo(handleType, direction) {
            const paddleOutsideCanvas = (this.posX < 0 || this.posX > canvas.width - this.width );
            const isMouse = (handleType === "mouse");
            const speedInPixel = isMouse ? 5 : 50; //On rend le mouvement plus fluide lors d'une utilisation au clavier

            ctx.clearRect(this.posX, this.posY, this.width, this.height);

            if (direction === "right" && !paddleOutsideCanvas) {
                this.posX += speedInPixel;
            }
            if (direction === "left" && !paddleOutsideCanvas) {
                this.posX -= speedInPixel;
            }

            this.draw();
        }
    }
    
    function init() {
        //On crée le canvas
        canvas = document.createElement('canvas');
        //On définit les paramètres du canvas
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        canvas.style.border = "30px solid grey";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "black";
        //On affiche le canvas dans la page
        document.body.appendChild(canvas);
        //On définit le contexte de dessin
        ctx = canvas.getContext('2d');
        //On dessine la raquette
        paddle = new Paddle();
        paddle.draw();
        //On écoute les touches fléchées ou les mouvement de la souris pour diriger le paddle
        window.addEventListener("keydown", handleKeyDown);
        canvas.addEventListener("mousedown", handleMouseMove);
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