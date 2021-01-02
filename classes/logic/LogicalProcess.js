import {getLogicalNamespace} from "./LogicalNamespace";
import {Food} from "./Food";
import {BacteriaGreen} from "./BacteriaGreen";

export class LogicalProcess {

    constructor() {
        this.logicalNamespace = getLogicalNamespace()
        this.objectLists = this.logicalNamespace.objectLists

        this.started = false

    }

    executeLogicalIteration() {
        // setInterval(() => {
        //     Food.createNewFood()
        //     console.log("created new food")
        // }, 1500)

        this.objectLists.BacteriaGreenList.objects.forEach((bacteriaGreen) => {
            bacteriaGreen.update()
        })
        this.objectLists.BacteriaGreenList.objects.forEach((bacteriaGreen) => {
            bacteriaGreen.update()
        })

        const countLogicalLists = Object.keys(this.logicalNamespace.objectLists).length
        for (let i = 0; i < countLogicalLists; i++) {
            let list = Object.values(this.logicalNamespace.objectLists)[i]
            let countObjects = list.length
            for (let j = 0; j < countObjects; j++) {
                let object = list[j]
                // console.log(object.constructor.name);
            }
        }
    }

    start() {
        for(let i = 0; i < 13; i++) {
            Food.createNewFood()
        }

        setInterval(() => {
            Food.createNewFood()
        }, 300)

        for(let i = 0; i < 3; i++) {
            BacteriaGreen.createNewBacteria()
        }

        setInterval(() => {
            this.executeLogicalIteration()

        }, 30)
    }
}