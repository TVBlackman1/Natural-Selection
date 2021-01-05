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

        // if bacteria cant see food, it will explore terrain
        this.exploringTerrain = {
            ok: false,
            targetX: 0,
            targetY: 0,
            timeoutFunc: () => {}
        }

    }

    setNearestTarget() {
        const targetList =  this.targetList

        if(targetList.length === 0)
            return

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
            if (rangeToCurrent < rangeToNearest
            ) {
                return current
            } else return nearest
        }
        this.currentTarget = targetList.reduce(reducerNearTarget, targetList[0])

        // currentTarget - nearest food. If it is not in range of bacteria sense - its mean no one food exist in range
        // of bacteria sense
        if (this.currentTarget && range(this.currentTarget.x, this.currentTarget.y, this.x, this.y) > this.senseRange ** 2
        ) {
            this.currentTarget = null
        }

        if (this.currentTarget)
            this.currentTarget.addObserver(this)
    }

    exploreTerrain() {
        if(!this.exploringTerrain.ok) {
            this.startExploreTerrain()
        }

        this.goTo(this.exploringTerrain.targetX, this.exploringTerrain.targetY)
    }

    /**
     * Break explore terrain if food was found or other logical cases
     */
    breakExploreTerrain() {
        this.exploringTerrain.ok = false
        clearTimeout(this.exploringTerrain.timeoutFunc)
    }

    startExploreTerrain() {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        function getRandom(min, max) {
            return (Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        const angle = getRandom(0, 2 * Math.PI)
        const dx = Math.cos(angle) * 10000
        const dy = Math.sin(angle) * 10000

        this.exploringTerrain = {
            ok: true,
            targetX: this.x + dx,
            targetY: this.y + dy,
            timeoutFunc: setTimeout(this.breakExploreTerrain.bind(this), 8500)
        }
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

    onTargetDeath() {
        super.onTargetDeath();
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
        this.move(this.x + dx, this.y + dy)
    }

    move(x, y) {
        if(x < 0)
            x = 0
        if(y < 0)
            y = 0
        if(x > getLogicalNamespace().field.width - this.width)
            x = getLogicalNamespace().field.width - this.width
        if(y > getLogicalNamespace().field.height - this.height)
            y = getLogicalNamespace().field.height - this.height

        this.x = x
        this.y = y
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

        const coef = getRandom(0.8, 1.3)
        this.senseRange /= coef
        this.speed *= coef
        this.maxTimeWithoutFood /= coef
        this.timeWithoutFood = this.maxTimeWithoutFood
        // this.maxLivingTime *= getRandom(0.99, 1.01)
        // this.maxTimeWithoutFood *= getRandom(0.99, 1.01)
    }
}
