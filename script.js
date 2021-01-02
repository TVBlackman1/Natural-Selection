import {Canvas} from "./classes/present/Canvas";
import {setLogicalNamespace} from "./classes/logic/LogicalNamespace";
import {LogicalProcess} from "./classes/logic/LogicalProcess";

window.onload = () => {
    setLogicalNamespace()
    const logicalProcess = new LogicalProcess()
    logicalProcess.started = true
    logicalProcess.start()

    const canvas = new Canvas()
    canvas.start()
}