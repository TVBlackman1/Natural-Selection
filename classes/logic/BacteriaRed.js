import {Bacteria} from "./Bacteria";

export class BacteriaRed extends Bacteria {

    constructor() {
        super()

        this.target = null
        this.foodForSeed = 3
        this.speed = 1
        this.livingTime = 70
        this.timeWithoutFood = 12

    }
}
