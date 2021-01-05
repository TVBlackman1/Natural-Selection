import {image} from "../../imagesPreset";
import {ObjectPainter} from "./ObjectPainter";
import {ObjectList} from "../logic/ObjectList";
import {getLogicalNamespace} from "../logic/LogicalNamespace";

export class Canvas {

    constructor() {
        this.logicalNamespace = getLogicalNamespace()

        this.canvas = document.getElementById("canvas")

        this.canvas.width = this.logicalNamespace.field.width
        this.canvas.height = this.logicalNamespace.field.height

        this.context = this.canvas.getContext('2d')

        ObjectPainter.context = this.context

        this.backgroundTexture = image.background

        this.paint = this.paint.bind(this)
    }


    paint() {
        // this.context.scale(1, 1);

        this.context.drawImage(
            this.backgroundTexture,
            0, 0,
            this.canvas.width,
            this.canvas.height
        );


        const countLogicalLists = Object.keys(this.logicalNamespace.objectLists).length
        for (let i = 0; i < countLogicalLists; i++) {
            let list = Object.values(this.logicalNamespace.objectLists)[i].objects
            let countObjects = list.length
            for (let j = 0; j < countObjects; j++) {
                let object = list[j]
                ObjectPainter.paint(object)
            }
        }

        // this.context.setTransform(1, 0, 0, 1, 0, 0);
    }

    start() {
        setInterval(this.paint, 30)
    }
}