let canvas;
let ctx;
let oldMonitor;
let oldMonitorAnimation;

window.onload = function(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    oldMonitor = new OldMonitorEffect(ctx,canvas.width,canvas.height)
    oldMonitor.animate()
}

window.addEventListener('resize',()=>{
    clearTimeout(oldMonitorAnimation);
   // cancelAnimationFrame(oldMonitorAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    oldMonitor = new OldMonitorEffect(ctx,canvas.width,canvas.height)
    oldMonitor.animate()
})

class OldMonitorEffect{
    #ctx;
    #width;
    #height;
    constructor(ctx,width,height){
        this.#ctx =ctx;
        this.#width=width;
        this.#height=height;
        this.text = "Hello World  ";
    }
    #draw(filterGridSize,text,textAlign,chromaticOffset,positionX,positionY){
        this.#ctx.fillStyle = "black";
        this.#ctx.fillRect(0, 0, this.#width, this.#height);
        this.#generateTextWithChromaticAberration(text,textAlign,chromaticOffset,positionX,positionY)
        this.#generatePixelGridFilter(filterGridSize)
    }
    #generatePixelGridFilter(pixelSideSize) {
      
        let pixelGridColumnQuantity = (this.#height / pixelSideSize);
        let pixelGridRowQuantity = (this.#width / pixelSideSize);
        for (let column = 0; column < pixelGridColumnQuantity; column++) {
            for (let row = 0; row < pixelGridRowQuantity; row++) {
                let pixelWidthOffset = row * pixelSideSize;
                let pixelHeightOffset = column * pixelSideSize * 2;
                this.#ctx.beginPath();
                this.#ctx.rect(pixelWidthOffset, pixelHeightOffset, pixelSideSize, pixelSideSize * 2);
                this.#ctx.stroke();
            }
        }
    }
    #generateTextWithChromaticAberration(text,textAlign,chromaticOffset,positionX,positionY){
        this.#ctx.filter = 'blur(4px)';
        this.#ctx.font = "100px Arial";
        this.#ctx.textAlign = textAlign;
        this.#ctx.fillStyle = "#fc1408";
        this.#ctx.fillText(text, positionX - chromaticOffset, positionY - chromaticOffset);
        this.#ctx.fillStyle = "#08c3fc";
        this.#ctx.fillText(text, positionX + chromaticOffset, positionY + chromaticOffset);
        this.#ctx.fillStyle = "#ffffff";
        this.#ctx.fillText(text, positionX, positionY);
        this.#ctx.filter = 'none';
    }
    
    async animate(){
        if(this.text == "Hello, I am Davy  "){
            this.text = "Hello, I am Davy_";
            this.#draw(4,this.text,"center",2,this.#width/2,this.#height/2);
        }else{
            this.text = "Hello, I am Davy  ";
            this.#draw(4,this.text,"center",2,this.#width/2,this.#height/2);
        }
        oldMonitorAnimation = setTimeout(this.animate.bind(this),500)
        //oldMonitorAnimation = requestAnimationFrame(this.animate.bind(this));
    }
    // function generateTextWithChromaticAberration(ctx, text, chromaticOffset, textAlign) {
//     ctx.filter = 'blur(4px)';
//     ctx.font = "100px Arial";
//     ctx.textAlign = textAlign;
//     ctx.fillStyle = "#fc1408";
//     ctx.fillText(text, (canvas.width / 2) - chromaticOffset, (canvas.height / 2) - chromaticOffset);
//     ctx.fillStyle = "#08c3fc";
//     ctx.fillText(text, (canvas.width / 2) + chromaticOffset, (canvas.height / 2) + chromaticOffset); 0
//     ctx.fillStyle = "#ffffff";
//     ctx.fillText(text, (canvas.width / 2), (canvas.height / 2));
//     ctx.filter = 'none';
// }
    // function generatePixelGridFilter(ctx, pixelSideSize) {
    //     pixelSideSize;
    //     pixeGridColumnQuantity = (canvas.height / pixelSideSize)
    //     pixelGridRowQuantity = (canvas.width / pixelSideSize);
    //     for (let column = 0; column < pixeGridColumnQuantity; column++) {
    //         for (let row = 0; row < pixelGridRowQuantity; row++) {
    //             pixelWidthOffset = row * pixelSideSize;
    //             pixelHeightOffset = column * pixelSideSize * 2;
    //             ctx.beginPath();
    //             ctx.rect(pixelWidthOffset, pixelHeightOffset, pixelSideSize, pixelSideSize * 2);
    //             ctx.stroke();
    //         }
    //     }
    // }
}

// let canvas;
// let ctx;
// let animationRequestAAAAA;
// window.onload = function(){
//     canvas = document.getElementById("canvas");
//     ctx = canvas.getContext("2d");
//     canvas.width = document.body.clientWidth;
//     canvas.height = document.body.clientHeight;
//     draw();
// }
// window.addEventListener('resize', () => {
//     window.cancelAnimationFrame(animationRequestAAAAA)
//     canvas.width = document.body.clientWidth;
//     canvas.height = document.body.clientHeight;
//     draw();
// })
// text = "Hello World!  "
// async function draw(){
//     ctx.fillStyle = "blue";
//     ctx.strokeStyle = "black";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     generateTextWithChromaticAberration(ctx,text, 3, "center")
//     if(text == "Hello World!  "){
//         text = "Hello World!_"
//     }else{
//         text = "Hello World!  "
//     }
//     generatePixelGridFilter(ctx, 4);
//     await new Promise(r => setTimeout(r,300));
//     animationRequestAAAAA = requestAnimationFrame(draw);
// }

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

