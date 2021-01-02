import {getLogicalNamespace} from "./LogicalNamespace";
import {Food} from "./Food";

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
                console.log(object.constructor.name);
            }
        }
    }

    start() {
        setInterval(() => {
            Food.createNewFood()
            console.log("created new food")
        }, 1500)

        setInterval(() => {
            this.executeLogicalIteration()

        }, 100)
    }
}