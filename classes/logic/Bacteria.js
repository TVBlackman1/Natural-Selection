import {RealObject} from "./RealObject";
import {getLogicalNamespace} from "./LogicalNamespace";

export class Bacteria extends RealObject {

    constructor() {
        super()

        this.width = 52
        this.height = 52

        this.target = null // RealObject object
        this.foodForSeed = 0
        this.currentFoodForSeed = 0
        this.speed = 0
        this.livingTime = 0
        this.timeWithoutFood = 0
        this.maxLivingTime = 0
        this.maxTimeWithoutFood = 0

    }

    setNearestTarget() {
        const targetList = getLogicalNamespace().objectLists.FoodList.objects

        const range = (x1, y1, x2, y2) => ( (x1-x2)**2 + (y1-y2)**2 ) // without sqrt, dont matter

        const this_in = this
        /**
         *
         * @param {RealObject} nearest
         * @param {RealObject} current
         */
        const reducerNearTarget = (nearest, current) => {
            if(range(nearest.x, nearest.y, this_in.x, this_in.y) > range(current.x, current.y, this_in.x, this_in.y)) {
                return current
            } else return nearest
        }
        this.target = targetList.reduce(reducerNearTarget, targetList[0])
        if (this.target)
            this.target.addObserver(this)
    }

    goToTarget() {
        if(!this.target) return

        const angle =  Math.atan((this.target.y - this.y) / (this.target.x - this.x) ) * Math.sign(this.target.x - this.x) * Math.sign(this.target.y - this.y)
        // const dx = Math.cos(angle) * this.speed
        // const dy = Math.sin(angle) * this.speed

        const dx = Math.cos(angle) * this.speed * Math.sign(this.target.x - this.x)
        const dy = Math.sin(angle) * this.speed * Math.sign(this.target.y - this.y)

        // console.log(angle, dx, dy)
        //
        this.shift(dx, dy)
        this.eat()
    }

    changeTarget() {
        super.changeTarget();
        // this.setNearestTarget()
        this.target = null
    }

    eat() {
        const range = (x1, y1, x2, y2) => ( (x1-x2)**2 + (y1-y2)**2 ) // without sqrt, dont matter
        if (range(this.x, this.y, this.target.x, this.target.y) < this.width * this.width) {
            this.target.onDelete()
            // console.log("eat")
            this.timeWithoutFood = this.maxTimeWithoutFood
            this.currentFoodForSeed++
            if(this.currentFoodForSeed === this.foodForSeed) {
                this.currentFoodForSeed = 0
                this.createChild()
            }
        }
    }

    shift(dx, dy) {
        this.x += dx
        this.y += dy
    }

    update() {
        super.update()
        // if(!this.target) {
            this.setNearestTarget()
        // }
        this.goToTarget()
        this.livingTime--;
        this.timeWithoutFood--;
        if(this.livingTime <= 0 || this.timeWithoutFood <= 0) {
            this.onDelete()
        }
    }

    createChild() {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        let child = new this.constructor()
        child.x = this.x + getRandomInt(-this.width, this.width)
        child.y = this.y + getRandomInt(-this.height, this.height)
        child.speed = this.speed
        child.maxLivingTime = this.maxLivingTime
        child.maxTimeWithoutFood = this.maxTimeWithoutFood
        child.mutate()
        return child
    }

    mutate() {
        function getRandom(min, max) {
            // min = Math.ceil(min);
            // max = Math.floor(max);
            return (Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        this.speed *= getRandom(0.8, 1.1)
        this.maxLivingTime *= getRandom(0.99, 1.01)
        this.maxTimeWithoutFood *= getRandom(0.99, 1.01)
    }
}
