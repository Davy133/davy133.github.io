let canvas;
let canvasContext;
let crtEffect;
let crtEffectAnimation;
let text = "Davy133 - UNDER CONSTRUCTION";

window.onload = () => {
    canvas = document.getElementById("canvas");
    canvasContext = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    crtEffect = new CRTMonitorFX(canvasContext, canvas.width, canvas.height);
    crtEffect.animate(0);
}

window.addEventListener('resize', () => {
    cancelAnimationFrame(crtEffectAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    crtEffect = new CRTMonitorFX(canvasContext, canvas.width, canvas.height);
    crtEffect.animate(0);
})

class CRTMonitorFX {
    #canvasContext;
    #canvasWidth;
    #canvasHeight;
    constructor(canvasContext, canvasWidth, canvasHeight) {
        this.#canvasContext = canvasContext;
        this.#canvasWidth = canvasWidth;
        this.#canvasHeight = canvasHeight;
        this.counter = 0;
        this.buffer = "";
        this.lastTime = 0;
        this.interval = 1000/60;
        this.timer = 0;
    }
    #drawScanlines() {
        for (let row = 0; row < this.#canvasHeight; row++) {
            let colors = this.#canvasContext.getImageData(0, row, this.#canvasWidth, 1);
            for (let colorIndex = 0; colorIndex < colors["data"].length; colorIndex = colorIndex + 4) {
                colors["data"][colorIndex] = colors["data"][colorIndex] * Math.abs(Math.cos(row * 0.7)); //Red
                colors["data"][colorIndex + 1] = colors["data"][colorIndex + 1] * Math.abs(Math.sin(row * 0.7) * 1.1); //Green
                colors["data"][colorIndex + 2] = colors["data"][colorIndex + 2] * Math.abs(Math.cos(row * 0.7)); //Blue
            }
            this.#canvasContext.putImageData(colors, 0, row)
        }
    }
    #drawBackground() {
        this.#canvasContext.fillStyle = 'blue';
        this.#canvasContext.fillRect(0, 0, this.#canvasWidth, this.#canvasHeight);
    }
    #writeTextFromStartOfScreen(text) {
        this.#canvasContext.fillStyle = 'white';
        this.#canvasContext.font = '25px Arial';
        this.#canvasContext.fillText(text, 5, 25)
    }
    animate(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        if (this.timer > this.interval){
            this.#drawBackground();
            this.#writeTextFromStartOfScreen(this.buffer);
            if(this.counter >= text.length){
                this.counter=999999;
            }else{
                this.buffer = this.buffer.concat("",text.split("")[this.counter])
                this.counter++;
            }
            this.#drawScanlines();
            this.timer = 0;
        }else{
            this.timer += deltaTime;
        }
        
        crtEffectAnimation = requestAnimationFrame(this.animate.bind(this))
    }
}