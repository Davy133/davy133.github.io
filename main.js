let canvas;
let ctx;
let oldMonitor;
let oldMonitorAnimation;

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    oldMonitor = new OldMonitorEffect(ctx, canvas.width, canvas.height)
    oldMonitor.animate()
}

window.addEventListener('resize', () => {
    clearTimeout(oldMonitorAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    oldMonitor = new OldMonitorEffect(ctx, canvas.width, canvas.height)
    oldMonitor.animate()
})

class OldMonitorEffect {
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.text = "Hello World  ";
    }
    #draw(filterGridSize, text, textAlign, chromaticOffset, positionX, positionY) {
        this.#ctx.fillStyle = "black";
        this.#ctx.fillRect(0, 0, this.#width, this.#height);
        this.#generateTextWithChromaticAberration(text, textAlign, chromaticOffset, positionX, positionY)
        this.#generatePixelGridFilter(filterGridSize)
    }
    #generatePixelGridFilter(pixelSideSize) {

        let pixelGridColumnQuantity = (this.#height / pixelSideSize);
        let pixelGridRowQuantity = (this.#width / pixelSideSize);
        for (let column = 0; column < pixelGridColumnQuantity; column++) {
            for (let row = 0; row < pixelGridRowQuantity; row++){
                let pixelWidthOffset = row * pixelSideSize;
                let pixelHeightOffset = column * pixelSideSize * 2;
                this.#ctx.beginPath();
                this.#ctx.rect(pixelWidthOffset, pixelHeightOffset, pixelSideSize, pixelSideSize * 2);
                this.#ctx.stroke();
            }
        }
    }
    #generateTextWithChromaticAberration(text, textAlign, chromaticOffset, positionX, positionY) {
        this.#ctx.filter = 'blur(4px)';
        this.#ctx.font = "100px Arial";
        this.#ctx.textAlign = textAlign;
        this.#ctx.fillStyle = "blue";
        this.#ctx.fillText(text, positionX - chromaticOffset, positionY - chromaticOffset);
        this.#ctx.fillStyle = "cyan";
        this.#ctx.fillText(text, positionX + chromaticOffset, positionY + chromaticOffset);
        this.#ctx.fillStyle = "white";
        this.#ctx.fillText(text, positionX, positionY);
        this.#ctx.filter = 'none';
    }
    animate() {
        if (this.text == "Hello, I am Davy  ") {
            this.text = "Hello, I am Davy_";
            this.#draw(4, this.text, "center", 2, this.#width / 2, this.#height / 2);
        } else {
            this.text = "Hello, I am Davy  ";
            this.#draw(4, this.text, "center", 2, this.#width / 2, this.#height / 2);
        }
        oldMonitorAnimation = setTimeout(this.animate.bind(this), 500)
    }
}
