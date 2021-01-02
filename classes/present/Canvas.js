import {image} from "../../preset";
import {ObjectPainter} from "./ObjectPainter";
import {ObjectList} from "../logic/ObjectList";
import {getLogicalNamespace} from "../logic/LogicalNamespace";

export class Canvas {

    constructor() {
        this.canvas = document.getElementById("canvas")
        this.context = this.canvas.getContext('2d')

        ObjectPainter.context = this.context

        this.logicalNamespace = getLogicalNamespace()


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

        const countLogicalLists = Object.keys(this.logicalNamespace.objectLists).length
        for (let i = 0; i < countLogicalLists; i++) {
            let list = Object.values(this.logicalNamespace.objectLists)[i].objects
            // console.log(list)
            let countObjects = list.length
            // console.log(countObjects)
            for (let j = 0; j < countObjects; j++) {
                let object = list[j]
                // console.log(object)
                // console.log(object.constructor.name);
                ObjectPainter.paint(object)
            }
        }

    }

    start() {
        setInterval(this.paint, 30)
    }
}