import {ObjectList} from "./ObjectList";

class LogicalNamespace {
    constructor() {
        this.objectLists = {}
        this.objectLists.BacteriaGreenList = new ObjectList()
        this.objectLists.BacteriaRedList = new ObjectList()
        this.objectLists.FoodList = new ObjectList()
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