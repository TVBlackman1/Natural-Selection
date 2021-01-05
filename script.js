import {Canvas} from "./classes/present/Canvas";
import {setLogicalNamespace, getLogicalNamespace} from "./classes/logic/LogicalNamespace";
import {LogicalProcess} from "./classes/logic/LogicalProcess";
import {BacteriaGreen} from "./classes/logic/BacteriaGreen";
import {Bacteria} from "./classes/logic/Bacteria";

window.onload = () => {

    console.log(new Date().toLocaleTimeString())
    setLogicalNamespace()
    let objectLists = getLogicalNamespace().objectLists

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
        bacteriaRed: {
            count: [],
            speed: [],
            senseRange: [],
            maxTimeWithoutFood: []
        },
        bacteriaGreen: {
            count: [],
            speed: [],
            senseRange: [],
            maxTimeWithoutFood: []
        },
        food: {
            count: []
        },
        timeInterval: 3000
    }

    window.statistic = timeLineInformation

    setInterval(() => {
        timeLineInformation.bacteriaRed.count.push(objectLists.BacteriaRedList.objects.length)
        timeLineInformation.bacteriaGreen.count.push(objectLists.BacteriaGreenList.objects.length)
        timeLineInformation.food.count.push(objectLists.FoodList.objects.length)

        let getAverage = (array) => {
            let sumSpeed = 0
            let sumSense = 0
            let sumMaxTimeWithoutFood = 0
            array.forEach((elem) => {
                sumSpeed += elem.speed
                sumSense += elem.senseRange
                sumMaxTimeWithoutFood += elem.maxTimeWithoutFood
            })
            return {
                speed: sumSpeed / array.length,
                senseRange: sumSense / array.length,
                maxTimeWithoutFood: sumMaxTimeWithoutFood / array.length,
            }
        }

        const redAverages = getAverage(objectLists.BacteriaRedList.objects)
        const greenAverages = getAverage(objectLists.BacteriaGreenList.objects)

        timeLineInformation.bacteriaRed.speed.push(redAverages.speed)
        timeLineInformation.bacteriaGreen.speed.push(greenAverages.speed)

        timeLineInformation.bacteriaRed.senseRange.push(redAverages.senseRange)
        timeLineInformation.bacteriaGreen.senseRange.push(greenAverages.senseRange)

        timeLineInformation.bacteriaRed.maxTimeWithoutFood.push(redAverages.maxTimeWithoutFood)
        timeLineInformation.bacteriaGreen.maxTimeWithoutFood.push(greenAverages.maxTimeWithoutFood)


        $bacteriaRedCount.innerHTML = objectLists.BacteriaRedList.objects.length
        $bacteriaGreenCount.innerHTML = objectLists.BacteriaGreenList.objects.length
        $foodCount.innerHTML = objectLists.FoodList.objects.length


    }, timeLineInformation.timeInterval)

    let dlAnchorElem = document.getElementById('btn-download');
    dlAnchorElem.setAttribute("download", "scene.json");

    dlAnchorElem.addEventListener('click', () => {
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(timeLineInformation));
        dlAnchorElem.setAttribute("href", dataStr);
    })
}