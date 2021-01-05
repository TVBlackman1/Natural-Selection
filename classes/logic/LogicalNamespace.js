import {ObjectList} from "./ObjectList";

class LogicalNamespace {
    constructor() {
        this.objectLists = {
            BacteriaGreenList: new ObjectList(),
            BacteriaRedList: new ObjectList(),
            FoodList: new ObjectList()
        }

        this.field = {
            width: 7600,
            height: 6000
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