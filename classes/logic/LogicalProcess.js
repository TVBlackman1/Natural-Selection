import {getLogicalNamespace} from "./LogicalNamespace";
import {Food} from "./Food";
import {BacteriaGreen} from "./BacteriaGreen";
import {BacteriaRed} from "./BacteriaRed";
import {BacteriaFactory} from "./BacteriaFactory";
import {FoodFactory} from "./FoodFactory";

export class LogicalProcess {

    constructor() {
        this.logicalNamespace = getLogicalNamespace()
        this.objectLists = this.logicalNamespace.objectLists

        this.started = false

    }

    executeLogicalIteration() {
        this.objectLists.BacteriaGreenList.objects.forEach((bacteriaGreen) => {
            bacteriaGreen.update()
        })
        this.objectLists.BacteriaRedList.objects.forEach((bacteriaRed) => {
            bacteriaRed.update()
        })
    }

    start() {
        FoodFactory.generateNFood(Food, 20)

        FoodFactory.StartGenerateFood(Food, 38, 500, 1550)

        BacteriaFactory.generateNBacteria(BacteriaGreen, 300)
        BacteriaFactory.generateNBacteria(BacteriaRed, 50)

        setInterval(() => {
            this.executeLogicalIteration()

        }, 30)
    }
}