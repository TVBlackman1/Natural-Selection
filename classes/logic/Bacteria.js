import {RealObject} from "./RealObject";

export class Bacteria extends RealObject {

    constructor() {
        super()

        this.target = null // RealObject class
        this.foodForSeed = 0
        this.speed = 0
        this.livingTime = 0
        this.timeWithoutFood = 0

    }
}
