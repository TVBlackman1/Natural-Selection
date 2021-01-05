import {image} from "../../imagesPreset";
import {RealObject} from "../logic/RealObject";
import {Bacteria} from "../logic/Bacteria";


export class ObjectPainter {

    // {CanvasRenderingContext2D} context - 2d context of canvas
    static context = null

    /**
     *
     * @param {RealObject} realObject
     * @constructor
     */
    static paint(realObject) {

        if (realObject instanceof Bacteria) {
            ObjectPainter.DrawBar(realObject, 'red', realObject.timeWithoutFood / realObject.maxTimeWithoutFood, realObject.height * 0.3)
            ObjectPainter.DrawBar(realObject, 'green', realObject.livingTime / realObject.maxLivingTime, realObject.height * 0.6)
        }
        ObjectPainter.context.drawImage(
            image[realObject.constructor.name],
            realObject.x, realObject.y,
            realObject.width,
            realObject.height
        );
    }

    static DrawBar(realObject, color, current, margin) {
        ObjectPainter.context.beginPath()
        ObjectPainter.context.fillStyle = 'black'
        ObjectPainter.context.rect(
            realObject.x, realObject.y - margin,
            realObject.width,
            realObject.height * 0.2
        );
        ObjectPainter.context.fill()
        ObjectPainter.context.closePath()

        ObjectPainter.context.beginPath()
        ObjectPainter.context.fillStyle = color
        ObjectPainter.context.rect(
            realObject.x, realObject.y - margin,
            realObject.width * (current),
            realObject.height * 0.2
        );
        ObjectPainter.context.fill()
        ObjectPainter.context.closePath()
    }
}