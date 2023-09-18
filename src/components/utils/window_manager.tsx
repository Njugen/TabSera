import PrimaryButton from './primary_button';
import { useEffect, useState } from "react";
import WindowItem from "../window_item";
import { iWindowItem } from "../../interfaces/window_item";
import { useSelector } from "react-redux";
import randomNumber from "../../tools/random_number";
import iWindowManager from "../../interfaces/window_manager";

function WindowManager(props: iWindowManager): JSX.Element {
    const [createWindow, setCreateWindow] = useState<boolean>(false);
    const [inCreationId, setIncreationId] = useState<number>(-1);

    const folderData = useSelector((state: any) => state.InEditFolderReducers);
    const windows: Array<iWindowItem> = [];

    function handleCreateWindow(): void {
        setIncreationId(randomNumber());
        setCreateWindow(true);
    }

    useEffect(() => {
        setIncreationId(-1);
        setCreateWindow(false);
    }, [folderData]);

    function renderActionButtons(): JSX.Element {
        return <div className="flex flex-row mt-10">
            <PrimaryButton text="Import session" onClick={() => {}} />
            <PrimaryButton text="New window" onClick={handleCreateWindow} />            
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
        const window = folderData.inEditFolder?.windows.filter((target: iWindowItem) => {
           return target.id === inCreationId
        });
      
        if(window && window.length === 0){
            return <WindowItem key={"new-window"} disableEdit={false} id={inCreationId} tabs={[]} initExpand={true} />;
        } else {
            return <></>;
        }
    }



    function renderContents(): Array<JSX.Element> {
        const existingWindows = folderData.inEditFolder?.windows;
        const existingWindowsElements: Array<JSX.Element> = existingWindows?.map((item: iWindowItem) => <WindowItem disableEdit={false} key={item.id} id={item.id} tabs={item.tabs} initExpand={item.initExpand} />);
        
        if(createWindow === true && inCreationId > 0){
            return [...existingWindowsElements, renderNewWindow()];
        } else {
            if (existingWindowsElements?.length > 0){
                return [...existingWindowsElements];
            } else if (windows.length === 0){
                return [renderNewWindowMessage()];
            } else {
                return [<>abc</>];
            }
        }
        
    }

    return (
        <div className="my-6 p-6 min-h-[200px] bg-tbfColor-lightgrey flex flex-col items-center justify-center">
            { renderContents() }
            { renderActionButtons() }            
        </div> 
    ); 
}

export default WindowManager;