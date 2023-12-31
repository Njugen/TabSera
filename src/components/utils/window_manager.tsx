import PrimaryButton from './primary_button';
import { useEffect, useState } from "react";
import WindowItem from "../window_item";
import { iWindowItem } from "../../interfaces/window_item";
import { useSelector } from "react-redux";
import randomNumber from "../../tools/random_number";
import iWindowManager from "../../interfaces/window_manager";

/*
    Section for managing windows and tabs, primarily used
    within folder configuration popups

    
*/

function WindowManager(props: iWindowManager): JSX.Element {
    const [createWindow, setCreateWindow] = useState<boolean>(false);
    const [inCreationId, setIncreationId] = useState<number>(-1);

    const folderData = useSelector((state: any) => state.InEditFolderReducer);
    const windows: Array<iWindowItem> = [];

    // Add a new window with a random id
    function handleCreateWindow(): void {
        setIncreationId(randomNumber());
        setCreateWindow(true);
    }

    // Once the inEdit reducer changes, stop creating window
    useEffect(() => {
        setIncreationId(-1);
        setCreateWindow(false);
    }, [folderData]);

    function renderActionButtons(): JSX.Element {
        return <div className="flex flex-row mt-10">
           {/* <PrimaryButton disabled={false} text="Import session" onClick={() => {}} />  */}
            <PrimaryButton disabled={false} text="New window" onClick={handleCreateWindow} />            
        </div>
    }

    function renderNewWindowMessage(): JSX.Element {
        return <>
            <p className="leading-7 block text-center text-sm">
                A folder needs to contain at least one window. Please, create a new window or import windows from your current session.
            </p>
        </>
    }

    function renderNewWindow(): JSX.Element {
        const window = folderData?.windows.filter((target: iWindowItem) => {
           return target.id === inCreationId
        });
      
        if(window && window.length === 0){
            return <WindowItem key={"new-window"} tabsCol={2} disableMark={true} disableEdit={false} id={inCreationId} tabs={[]} initExpand={true} />;
        } else {
            return <></>;
        }
    }

    function renderWindows(): Array<JSX.Element> {
        const existingWindows = folderData?.windows;
        const existingWindowsElements: Array<JSX.Element> = existingWindows?.map((item: iWindowItem) => <WindowItem tabsCol={2} disableMark={false} disableEdit={false} key={item.id} id={item.id} tabs={item.tabs} initExpand={item.initExpand} />);
        
        if(createWindow === true && inCreationId > 0){
            return [...existingWindowsElements, renderNewWindow()];
        } else {
            if (existingWindowsElements?.length > 0){
                return [...existingWindowsElements];
            } else if (windows.length === 0){
                return [renderNewWindowMessage()];
            } else {
                return [];
            }
        }
        
    }

    return (
        <div data-testid="window-manager" className="my-6 py-6 min-h-[200px] flex flex-col items-center justify-center">
            { renderWindows() }
            { renderActionButtons() }            
        </div> 
    ); 
}

export default WindowManager;