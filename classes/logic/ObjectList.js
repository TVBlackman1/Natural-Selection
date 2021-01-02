import {RealObject} from "./RealObject";


export class ObjectList {
    constructor() {


        /**
         *
         * @type {RealObject[]}
         */
        this.objects = []
    }

    /**
     *
     * @param {RealObject} realObject
     */
    push(realObject) {
        this.objects.push(realObject)
    }
}