import PrimaryButton from "../../utils/primary_button/primary_button";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import randomNumber from "../../../tools/random_number";
import iWindowManager from "../../../interfaces/window_manager";
import WindowList from './sections/window_list';

/*
    Section for managing windows and tabs, primarily used
    within folder configuration popups

    
*/

const WindowManager = (props: iWindowManager): JSX.Element => {
    const [createWindow, setCreateWindow] = useState<boolean>(false);
    const [inCreationId, setIncreationId] = useState<number>(-1);

    const folderData = useSelector((state: any) => state.InEditFolderReducer);

    // Once the inEdit reducer changes, stop creating window
    useEffect(() => {
        setIncreationId(-1);
        setCreateWindow(false);
    }, [folderData]);

    // Add a new window with a random id
    const handleCreateWindow = (): void => {
        setIncreationId(randomNumber());
        setCreateWindow(true);
    }

    return (
        <div data-testid="window-manager" className="my-6 py-6 min-h-[200px] flex flex-col items-center justify-center">
            {<WindowList folder={folderData} createWindow={createWindow} inCreationId={inCreationId} />}
            { 
                <div className="flex flex-row mt-10">
                    <PrimaryButton disabled={false} text="New window" onClick={handleCreateWindow} />            
                </div> 
            }            
        </div> 
    ); 
}

export default WindowManager;