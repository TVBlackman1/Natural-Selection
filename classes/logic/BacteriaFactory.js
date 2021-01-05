import {Bacteria} from "./Bacteria";
import {getLogicalNamespace} from "./LogicalNamespace";


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
        bacteria.mutate()
        bacteria.x = getRandomInt(0, getLogicalNamespace().field.width - bacteria.width)
        bacteria.y = getRandomInt(0, getLogicalNamespace().field.height - bacteria.height)
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