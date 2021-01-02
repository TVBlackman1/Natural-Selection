import {Bacteria} from "./Bacteria";
import {BacteriaGreen} from "./BacteriaGreen";
import {getLogicalNamespace} from "./LogicalNamespace";

export class BacteriaRed extends Bacteria {

    constructor() {
        super()

        this.foodForSeed = 3
        this.speed = 1
        this.livingTime = 70
        this.timeWithoutFood = 12

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