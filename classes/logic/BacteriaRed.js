import {Bacteria} from "./Bacteria";
import {BacteriaGreen} from "./BacteriaGreen";
import {getLogicalNamespace} from "./LogicalNamespace";

export class BacteriaRed extends Bacteria {

    constructor() {
        super()

        this.foodForSeed = 3
        this.speed = 1.32

        this.maxLivingTime = 10000
        this.maxTimeWithoutFood = 310

        this.livingTime = this.maxLivingTime
        this.timeWithoutFood = this.maxTimeWithoutFood

        this.targetList = getLogicalNamespace().objectLists.BacteriaGreenList.objects


        getLogicalNamespace().objectLists.BacteriaRedList.push(this)


    }

    onDelete() {
        super.onDelete();
        const objects = getLogicalNamespace().objectLists.BacteriaRedList.objects

        const index = objects.indexOf(this);
        if (index > -1) {
            objects.splice(index, 1);
        }
    }
}
