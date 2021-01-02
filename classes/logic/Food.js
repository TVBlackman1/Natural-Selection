import {RealObject} from "./RealObject";
import {getLogicalNamespace} from "./LogicalNamespace";

export class Food extends RealObject {

    constructor() {
        super()

        getLogicalNamespace().objectLists.FoodList.push(this)

    }

    static createNewFood() {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        let food = new Food()
        food.x = getRandomInt(0, 1200 - food.width)
        food.y = getRandomInt(0, 800 - food.height)
        console.log(food.x, food.y)
        return food
    }
}
