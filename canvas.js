let canvas;
let canvasContext;
let crtEffect;
let crtEffectAnimation;

window.onload = () => {
    canvas = document.getElementById("canvas");
    canvasContext = canvas.getContext("2d", { willReadFrequently: true });
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
        this.interval = 1000 / 60;
        this.timer = 0;
    }
    #drawScanlines() {
        for (let row = 0; row < this.#canvasHeight; row++) {
            let colors = this.#canvasContext.getImageData(0, row, this.#canvasWidth, 1);
            let scanlineSinWave = Math.abs(Math.sin(row * 0.9));
            for (let colorIndex = 0; colorIndex < colors["data"].length; colorIndex = colorIndex + 4) {
                colors["data"][colorIndex] = colors["data"][colorIndex] * scanlineSinWave + 1; //Red
                colors["data"][colorIndex + 1] = colors["data"][colorIndex + 1] * scanlineSinWave; //Green
                colors["data"][colorIndex + 2] = colors["data"][colorIndex + 2] * scanlineSinWave + 1; //Blue
                colors["data"][colorIndex + 3] = 255;

            }
            this.#canvasContext.putImageData(colors, 0, row)
        }
    }
    #drawBackground() {
        this.#canvasContext.fillStyle = 'blue';
        this.#canvasContext.fillRect(0, 0, this.#canvasWidth, this.#canvasHeight);
    } 
    #print(text) {
        let lines = text.split("\n");
        let textMetrics = this.#canvasContext.measureText(text);
        let textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
        let textWidth = textMetrics.width;
        this.#canvasContext.fillStyle = 'white';
        this.#canvasContext.filter = 'blur(0.1px)';
        this.#canvasContext.font = '25px Arial';
        for (let index = 0; index < lines.length; index++) {
            this.#canvasContext.fillText(lines[index], 2, (textHeight + (textHeight + 5) * index) + 5);
        }
    }
    animate(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        if (this.timer > this.interval) {
            this.#drawBackground();
            this.#print("~ UNDER CONSTRUCTION\n~ UNDER CONSTRUCTION\n~ UNDER CONSTRUCTION\n~\n~\n~\n~\n~\n~\n~\n~\n~\n~\n~\n~\n~\n~\n~\n~\n\"davy.txt\" [New File]");
            this.#drawScanlines();
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }

        crtEffectAnimation = requestAnimationFrame(this.animate.bind(this))
    }
}