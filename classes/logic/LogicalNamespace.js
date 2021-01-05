import {ObjectList} from "./ObjectList";

class LogicalNamespace {
    constructor() {
        this.objectLists = {
            BacteriaGreenList: new ObjectList(),
            BacteriaRedList: new ObjectList(),
            FoodList: new ObjectList()
        }

        this.field = {
            width: 4800,
            height: 3200
        }
    }

}

let logicalNamespace = null

export const setLogicalNamespace = () => {
    logicalNamespace = new LogicalNamespace()
}

/**
 *
 * @returns {LogicalNamespace}
 */
export const getLogicalNamespace = () => (logicalNamespace)