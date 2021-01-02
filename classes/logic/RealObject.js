export class RealObject {
    constructor() {
        this.x = 0
        this.y = 0
        this.width = 30
        this.height = 30
        this.angle = 0 // 0 - 359
        this.eaten = false

        /**
         *
         * @type {RealObject[]}
         */
        this.observers = []
    }

    update() {
    }

    onDelete() {
        this.observers.forEach((realObject) => {
            realObject.changeTarget()
        })
    }

    changeTarget() {}

    /**
     *
     * @param {RealObject} realObject
     */
    addObserver(realObject) {
        this.observers.push(realObject)
    }
}