import { iFolderItem } from "../../../../interfaces/folder_item";
import { iWindowItem } from "../../../../interfaces/window_item";
import WindowItem from "../../../features/window_item";

interface INewWindow {
    folder: iFolderItem,
    inCreationId: number
}

// Add a new window
const NewWindow = (props: INewWindow): JSX.Element => {
    const { folder, inCreationId} = props;

    // Get the current set of windows and return windows that matches inCreationId
    const window: Array<iWindowItem> = folder.windows.filter((target: iWindowItem) => {
       return target.id === inCreationId
    });
  
    // If no windows with such id exists, then create a new one with that id
    if(window && window.length === 0){
        return (
            <WindowItem 
                key={"new-window"} 
                tabsCol={2} 
                disableMark={true} 
                disableEdit={false} 
                id={inCreationId} 
                tabs={[]} 
                initExpand={true} 
            />
        );
    } else {
        return <></>;
    }
}

export { INewWindow, NewWindow }