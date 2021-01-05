import {Food} from "./Food";
import {getLogicalNamespace} from "./LogicalNamespace";


export class FoodFactory {
    static interval = null

    /**
     *
     * @param FoodClass - class, not object.
     */
    static createFood(FoodClass) {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        let food = new FoodClass()
        food.x = getRandomInt(0, getLogicalNamespace().field.width - food.width)
        food.y = getRandomInt(0, getLogicalNamespace().field.height - food.height)
        return food
    }

    /**
     *
     * @param FoodClass - class, not object.
     * @param {number} count - count of foods
     */
    static generateNFood(FoodClass, count) {
        for(let i = 0; i < count; i++) {
            FoodFactory.createFood(FoodClass)
        }
    }

    /**
     *
     * @param FoodClass - class, not object.
     * @param {number} count - count of foods in iteration
     * @param {number} interval - time interval
     * @constructor
     */
    static StartGenerateFood(FoodClass, count, interval) {
        FoodFactory.interval = setInterval(() => {
            FoodFactory.generateNFood(FoodClass, count)
        }, interval)
    }

    static EndGenerateFood() {
        clearInterval(FoodFactory.interval)
    }
}