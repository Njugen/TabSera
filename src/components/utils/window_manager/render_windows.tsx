
import { iFolderItem } from "../../../interfaces/folder_item";
import { iWindowItem } from "../../../interfaces/window_item";
import WindowItem from "../../window_item";

// Add a new window
const renderNewWindow = (folderData: any, inCreationId: number): JSX.Element => {
    // Get the current set of windows and return windows that matches inCreationId
    const window: Array<number> = folderData?.windows.filter((target: iWindowItem) => {
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

const renderWindows = (folderData: iFolderItem, createWindow: boolean, inCreationId: number): Array<JSX.Element> | JSX.Element => {
    const existingWindows = folderData?.windows;
    const existingWindowsElements: Array<JSX.Element> = existingWindows?.map((item: iWindowItem) => {
        return (
            <WindowItem 
                tabsCol={2} 
                disableMark={false} 
                disableEdit={false} 
                key={item.id} 
                id={item.id} 
                tabs={item.tabs} 
                initExpand={item.initExpand} 
            />
        )
    });
    
    if(createWindow === true && inCreationId > 0){
        const newWindow: JSX.Element = renderNewWindow(folderData, inCreationId);
        return [...existingWindowsElements, newWindow];
    } else {
        if (existingWindowsElements?.length > 0){
            return [...existingWindowsElements];
        } else {
            return <></>;
        }
    }
}

export default renderWindows;