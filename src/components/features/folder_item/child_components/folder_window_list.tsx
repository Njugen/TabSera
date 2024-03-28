import WindowItem from "../../window_item";
import { iWindowItem } from "../../../../interfaces/window_item";

interface IFolderWindowListProps {
    windows: Array<iWindowItem>,
    viewMode: "list" | "grid"
}

// Render a list of all windows in the folder. The window components are adjusted to suit folder behaviour
const FolderWindowList = (props: IFolderWindowListProps): JSX.Element => {
    const { windows, viewMode } = props;

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

    return <>{result}</>;
}

export default FolderWindowList;