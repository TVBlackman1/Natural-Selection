import {RealObject} from "./RealObject";
import {getLogicalNamespace} from "./LogicalNamespace";

export class Food extends RealObject {

    constructor() {
        super()

        this.width = 42
        this.height = 42

        getLogicalNamespace().objectLists.FoodList.push(this)

    }

    onDelete() {
        super.onDelete();
        const objects = getLogicalNamespace().objectLists.FoodList.objects

        const index = objects.indexOf(this);
        if (index > -1) {
            objects.splice(index, 1);
        }
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
        return food
    }
}
