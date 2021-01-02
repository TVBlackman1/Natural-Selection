import {image} from "../../preset";
import {RealObject} from "../logic/RealObject";


export class ObjectPainter {

    // {CanvasRenderingContext2D} context - 2d context of canvas
    static context = null

    /**
     *
     * @param {RealObject} realObject
     * @constructor
     */
    static paint(realObject) {
        ObjectPainter.context.drawImage(
            image[realObject.constructor.name],
            realObject.x, realObject.y,
            realObject.width,
            realObject.height
        );
    }
}