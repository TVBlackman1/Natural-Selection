import {Bacteria} from "./Bacteria";
import {Food} from "./Food";
import {getLogicalNamespace} from "./LogicalNamespace";

export class BacteriaGreen extends Bacteria {

    constructor() {
        super()

        this.target = Food
        this.foodForSeed = 3
        this.speed = 1
        this.livingTime = 70
        this.timeWithoutFood = 12

        getLogicalNamespace().objectLists.BacteriaGreenList.push(this)

    }
}
