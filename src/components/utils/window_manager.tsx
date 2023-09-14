import styles from "../../styles/global_utils.module.scss";
import { iFormField } from "../../interfaces/form_field";
import Paragraph from './paragraph';
import PrimaryButton from './primary_button';
import { useEffect, useState } from "react";
import WindowItem from "../window_item";
import { iTabItem } from "../../interfaces/tab_item";
import { iEditableTabItem } from "../../interfaces/editable_tab_item";
import { iWindowItem } from "../../interfaces/window_item";
import { useDispatch, useSelector } from "react-redux";
import { deleteFolderAction } from "../../redux/actions/FoldersActions";
import randomNumber from "../../tools/random_number";
import iWindowManager from "../../interfaces/window_manager";

function WindowManager(props: iWindowManager): JSX.Element {
    const [createWindow, setCreateWindow] = useState<boolean>(false);
    //const { } = props;

    const dispatch = useDispatch();
  //  const foldersData = useSelector((state: any) => state.FoldersReducers);

    const windows: Array<iWindowItem> = [];
 
    function handleCreateWindow(): void {
        setCreateWindow(true);
    }

    function renderActionButtons(): JSX.Element {
        return <div className="flex flex-row mt-10">
            <PrimaryButton text="Import session" onClick={handleCreateWindow} />
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
        // Dispatch this to store
        const randomId = randomNumber();
        return <WindowItem id={randomNumber()} tabs={[]} initExpand={true} />;
    }



    function renderContents(): JSX.Element {
        if(createWindow === true){
            return renderNewWindow();
        } else {
            if(windows.length === 0){
                return renderNewWindowMessage();
            } else {
                return <></>;
            }
        }
        
    }

    return (
        <div className="my-6 p-6 min-h-[200px] bg-tbfColor-lightgrey flex flex-col items-center justify-center">
            <button onClick={() => dispatch(deleteFolderAction(0))}>blablabla</button>
            { renderContents() }
            { renderActionButtons() }            
        </div> 
    ); 
}

export default WindowManager;