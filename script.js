import {Canvas} from "./classes/present/Canvas";
import {setLogicalNamespace, getLogicalNamespace} from "./classes/logic/LogicalNamespace";
import {LogicalProcess} from "./classes/logic/LogicalProcess";
import {BacteriaGreen} from "./classes/logic/BacteriaGreen";
import {Bacteria} from "./classes/logic/Bacteria";

window.onload = () => {
    setLogicalNamespace()
    const logicalProcess = new LogicalProcess()
    logicalProcess.started = true
    logicalProcess.start()


    const canvas = new Canvas()
    canvas.start()

    let plot = document.querySelector("#info").plot(data, options).data("plot");


    setInterval(() => {
        const list = getLogicalNamespace().objectLists.BacteriaGreenList.objects

        const speedData = {}
        for(let i = -1; i < 5; i += 0.2)
            speedData[i] = (
                list.reduce((accumulate, bacteria)=> {
                    if(bacteria instanceof Bacteria)
                        if (Math.abs(bacteria.speed - i) <= 0.1) {
                            return accumulate + 1
                        }
                    return accumulate
                }, 0))

        // -1 to 5

        // let graphic = d3.line(Object.keys(speedData), Object.values(speedData))
    }, 1500)
}