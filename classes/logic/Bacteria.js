import {RealObject} from "./RealObject";
import {getLogicalNamespace} from "./LogicalNamespace";

export class Bacteria extends RealObject {

    constructor() {
        super()

        this.width = 52
        this.height = 52

        this.currentSpeedX = 0
        this.currentSpeedY = 0

        this.currentTarget = null // RealObject class
        this.targetList = null
        this.senseRange = 200

        this.foodForSeed = 0
        this.currentFoodForSeed = 0
        this.speed = 0
        this.livingTime = 0
        this.timeWithoutFood = 0
        this.maxLivingTime = 0
        this.maxTimeWithoutFood = 0
        this.exploringTerrain = {}

    }

    setNearestTarget() {
        // const targetList = getLogicalNamespace().objectLists.FoodList.objects
        const targetList =  this.targetList

        const range = (x1, y1, x2, y2) => ( (x1-x2)**2 + (y1-y2)**2 ) // without sqrt, dont matter

        const this_in = this
        /**
         *
         * @param {RealObject} nearest
         * @param {RealObject} current
         */
        const reducerNearTarget = (nearest, current) => {
            let rangeToCurrent = range(current.x, current.y, this_in.x, this_in.y)
            let rangeToNearest = range(nearest.x, nearest.y, this_in.x, this_in.y)
            if (rangeToCurrent < rangeToNearest && rangeToCurrent <= this.senseRange ** 2
            ) {
                return current
            } else return nearest
        }
        this.currentTarget = targetList.reduce(reducerNearTarget, targetList[0])

        // targetList[0] - nearest by default. If no one closer, we should to check is targetList[0] in sense range
        if (this.currentTarget === targetList[0] &&
            range(this.currentTarget.x, this.currentTarget.y, this_in.x, this_in.y) > this.senseRange ** 2
        ) {
            this.currentTarget = null
        }

        if (this.currentTarget)
            this.currentTarget.addObserver(this)
    }

    exploreTerrain() {
        const range = (x1, y1, x2, y2) => ( (x1-x2)**2 + (y1-y2)**2 ) // without sqrt, dont matter

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        // this.goTo(1280 / 2, 720 / 2)
        // if (range(1280 / 2, 720 / 2, this.x, this.y) < (this.senseRange ** 2) / 2) {
            // this.goTo(getRandomInt(0, 1200 - this.width), getRandomInt(0, 800 - this.height))
        // }]
        function onExploringEnd() {
            this.exploringTerrain.ok = false
        }

        if(!this.exploringTerrain.ok) {
            this.exploringTerrain.ok = true
            this.exploringTerrain.targetX = getRandomInt(0, 1200 - this.width)
            this.exploringTerrain.targetY = getRandomInt(0, 800 - this.height)

            this.exploringTerrain.timeoutFunc = setTimeout(onExploringEnd.bind(this), 3000)
        }

        this.goTo(this.exploringTerrain.targetX, this.exploringTerrain.targetY)
    }

    breakExploreTerrain() {
        this.exploringTerrain.ok = false
        clearTimeout(this.exploringTerrain.timeoutFunc)
    }

    goTo(x, y) {
        const angle =  Math.atan((y - this.y) / (x - this.x) )
            * Math.sign(x - this.x)
            * Math.sign(y - this.y)

        const dx = Math.cos(angle) * this.speed * Math.sign(x - this.x)
        const dy = Math.sin(angle) * this.speed * Math.sign(y - this.y) // speed should be

        this.currentSpeedX += 0.03 * Math.sign(dx)
        if(Math.abs(this.currentSpeedX) > Math.abs(dx) && Math.sign(this.currentSpeedX) === Math.sign(dx))
            this.currentSpeedX = dx

        this.currentSpeedY += 0.03 * Math.sign(dy)
        if(Math.abs(this.currentSpeedY) > Math.abs(dy) && Math.sign(this.currentSpeedY) === Math.sign(dy))
            this.currentSpeedY = dy

        this.shift(this.currentSpeedX, this.currentSpeedY)
    }

    changeTarget() {
        super.changeTarget();
        // this.setNearestTarget()
        this.currentTarget = null
    }

    tryEat() {
        const range = (x1, y1, x2, y2) => ( (x1-x2)**2 + (y1-y2)**2 ) // without sqrt, dont matter
        if (range(this.x, this.y, this.currentTarget.x, this.currentTarget.y) < this.width * this.width) {
            this.currentTarget.onDelete()

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
        this.setNearestTarget()

        if(this.currentTarget) {
            this.breakExploreTerrain()
            this.goTo(this.currentTarget.x, this.currentTarget.y)
            this.tryEat()
        }
        else {
            this.exploreTerrain()
        }

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
        child.senseRange = this.senseRange
        child.speed = this.speed
        child.maxLivingTime = this.maxLivingTime
        child.maxTimeWithoutFood = this.maxTimeWithoutFood
        child.mutate()
        return child
    }

    mutate() {
        function getRandom(min, max) {
            return (Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        const coef = getRandom(0.8, 1.2)
        this.speed *= coef
        this.maxTimeWithoutFood /= (coef * 0.98)
        this.timeWithoutFood = this.maxTimeWithoutFood
        // this.maxLivingTime *= getRandom(0.99, 1.01)
        // this.maxTimeWithoutFood *= getRandom(0.99, 1.01)
    }
}
