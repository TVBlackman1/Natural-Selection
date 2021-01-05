import {Canvas} from "./classes/present/Canvas";
import {setLogicalNamespace, getLogicalNamespace} from "./classes/logic/LogicalNamespace";
import {LogicalProcess} from "./classes/logic/LogicalProcess";
import {BacteriaGreen} from "./classes/logic/BacteriaGreen";
import {Bacteria} from "./classes/logic/Bacteria";

window.onload = () => {
    console.log(new Date().toLocaleTimeString())
    setLogicalNamespace()
    const logicalProcess = new LogicalProcess()
    logicalProcess.started = true
    logicalProcess.start()


    const canvas = new Canvas()
    canvas.start()

    let $statistic = document.querySelector('.info')
    let $counts = $statistic.querySelectorAll('.info-value')
    let $bacteriaRedCount = $counts[0]
    let $bacteriaGreenCount = $counts[1]
    let $foodCount = $counts[2]

    let timeLineInformation = {
        bacteriaRedCount: [],
        bacteriaGreenCount: [],
        foodCount: []
    }

    window.statistic = timeLineInformation

    window.showStatistic = () => {
        console.log(timeLineInformation.bacteriaRedCount)
        console.log(timeLineInformation.bacteriaGreenCount)
        console.log(timeLineInformation.foodCount)
    }

    setInterval(() => {
        timeLineInformation.bacteriaRedCount.push(getLogicalNamespace().objectLists.BacteriaRedList.objects.length)
        timeLineInformation.bacteriaGreenCount.push(getLogicalNamespace().objectLists.BacteriaGreenList.objects.length)
        timeLineInformation.foodCount.push(getLogicalNamespace().objectLists.FoodList.objects.length)

        $bacteriaRedCount.innerHTML = getLogicalNamespace().objectLists.BacteriaRedList.objects.length
        $bacteriaGreenCount.innerHTML = getLogicalNamespace().objectLists.BacteriaGreenList.objects.length
        $foodCount.innerHTML = getLogicalNamespace().objectLists.FoodList.objects.length


    }, 18000)
}