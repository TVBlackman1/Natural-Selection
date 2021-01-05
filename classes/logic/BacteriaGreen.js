import {Bacteria} from "./Bacteria";
import {Food} from "./Food";
import {getLogicalNamespace} from "./LogicalNamespace";

export class BacteriaGreen extends Bacteria {

    constructor() {
        super()

        this.foodForSeed = 3
        this.speed = 1
        this.senseRange = 330


        this.maxLivingTime = 10000
        this.maxTimeWithoutFood = 1410

        this.livingTime = this.maxLivingTime
        this.timeWithoutFood = this.maxTimeWithoutFood

        this.targetList = getLogicalNamespace().objectLists.FoodList.objects

        // console.log(this.x, this.y, this.width, this.height)
        getLogicalNamespace().objectLists.BacteriaGreenList.push(this)

    }

    onDelete() {
        super.onDelete();
        const objects = getLogicalNamespace().objectLists.BacteriaGreenList.objects

        const index = objects.indexOf(this);
        if (index > -1) {
            objects.splice(index, 1);
        }
    }
}
