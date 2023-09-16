
import "./../styles/global_utils.module.scss";
import Checkbox from "./utils/checkbox";
import { iEditableTabItem } from "../interfaces/editable_tab_item";
import * as predef from "../styles/predef";
import { useEffect, useRef } from "react";
import randomNumber from "../tools/random_number";
import { iTabItem } from "../interfaces/tab_item";
import { useDispatch, useSelector } from "react-redux";
import { updateInEditFolder, updateWindowManager } from "../redux/actions/FoldersActions";

function EditableTabItem(props: iEditableTabItem): JSX.Element {
    const { id, windowId, onStop } = props;
    const fieldRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const folderData = useSelector((state: any) => state.InEditFolderReducers);


    function saveToStore(e: any): void {
        const tabId = id ? id : randomNumber();
        console.log("WID", windowId);
        const payload: iTabItem = {
            id: tabId,
            label: e.target.value,
            url: e.target.value,
        };
   
        // Dispatch
        // - use tabId and windowId to locate and replace the tab
        dispatch(updateWindowManager(windowId, payload)); 
        onStop();
    }

    function handleBlur(e: any): void {
        saveToStore(e);
    }

    function handleKeyDown(e: any): void {
        if (e.key === 'Enter' || e.keyCode === 13) {
            saveToStore(e);
        }
    }

    useEffect(() => {
        // Fetch info from store
        
        setTimeout(() => {
            if(fieldRef.current) fieldRef.current.focus();
        }, 200);
    }, []);

    return (
        /*<div className="hover:bg-tbfColor-lighterpurple hover:text-tbfColor-darkpurple tab-item border-tbfColor-middlegrey4 hover:border-tbfColor-lightpurple border my-1 flex items-center justify-between">            
        </div>*/
        <input 
            autoFocus 
            ref={fieldRef} 
            type="text" 
            defaultValue={"https://"}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={predef.textfield_full} 
        />
    ); 
}

export default EditableTabItem;