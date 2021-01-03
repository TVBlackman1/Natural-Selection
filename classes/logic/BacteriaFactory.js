import {Bacteria} from "./Bacteria";


export class BacteriaFactory {

    /**
     *
     * @param BacteriaClass - class, not object.
     */
    static createBacteria(BacteriaClass) {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        let bacteria = new BacteriaClass()
        bacteria.x = getRandomInt(0, 1200 - bacteria.width)
        bacteria.y = getRandomInt(0, 800 - bacteria.height)
        return bacteria
    }

    /**
     *
     * @param BacteriaClass - class, not object.
     * @param {number} count - count of bacterias
     */
    static generateNBacteria(BacteriaClass, count) {
        for(let i = 0; i < count; i++) {
            BacteriaFactory.createBacteria(BacteriaClass)
        }
    }
}