import {Bacteria} from "./Bacteria";
import {Food} from "./Food";
import {getLogicalNamespace} from "./LogicalNamespace";

export class BacteriaGreen extends Bacteria {

    constructor() {
        super()

        this.foodForSeed = 3
        this.speed = 0.9

        this.maxLivingTime = 10000
        this.maxTimeWithoutFood = 240

        this.livingTime = this.maxLivingTime
        this.timeWithoutFood = this.maxTimeWithoutFood

        console.log(this.x, this.y, this.width, this.height)
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

    static createNewBacteria() {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        let bacteria = new BacteriaGreen()
        bacteria.x = getRandomInt(0, 1200 - bacteria.width)
        bacteria.y = getRandomInt(0, 800 - bacteria.height)
        return bacteria
    }
}
