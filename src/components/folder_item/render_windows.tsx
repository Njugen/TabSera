import WindowItem from "../window_item";
import { iWindowItem } from "../../interfaces/window_item";

const renderWindows = (windows: Array<iWindowItem>, viewMode: "list" | "grid"): Array<JSX.Element> => {
    const result: Array<JSX.Element> = windows.map((window, index): JSX.Element => (
        <WindowItem 
            tabsCol={viewMode === "list" ? 4 : 2} 
            disableTabMark={true} 
            disableTabEdit={true} 
            key={"window-" + index} 
            id={window.id} 
            tabs={window.tabs} 
        />
    ));

    return result;
}

export default renderWindows;