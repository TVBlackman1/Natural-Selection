import {Bacteria} from "./Bacteria";
import {BacteriaGreen} from "./BacteriaGreen";
import {getLogicalNamespace} from "./LogicalNamespace";

export class BacteriaRed extends Bacteria {

    constructor() {
        super()

        this.target = BacteriaGreen
        this.foodForSeed = 3
        this.speed = 1
        this.livingTime = 70
        this.timeWithoutFood = 12

        getLogicalNamespace().objectLists.BacteriaRedList.push(this)


    }
}
