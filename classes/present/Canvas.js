import {image} from "../../preset";

export class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.context = this.canvas.getContext('2d')

        this.backgroundTexture = image.background

        this.paint = this.paint.bind(this)
    }

    paint() {
        this.context.drawImage(
            this.backgroundTexture,
            0, 0,
            this.canvas.width,
            this.canvas.height
        );
    }

    start() {
        setInterval(this.paint, 30)
    }
}