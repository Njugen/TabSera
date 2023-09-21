
import "./../styles/global_utils.module.scss";
import { iEditableTabItem } from "../interfaces/editable_tab_item";
import * as predef from "../styles/predef";
import { useEffect, useRef } from "react";
import randomNumber from "../tools/random_number";
import { iTabItem } from "../interfaces/tab_item";
import { useDispatch } from "react-redux";
import { updateWindowManager } from "../redux/actions/inEditFolderActions";

function EditableTabItem(props: iEditableTabItem): JSX.Element {
    const { id, windowId, onStop } = props;
    const fieldRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
 
    function saveToStore(e: any): void {
        const tabId = id ? id : randomNumber();
    
        const payload: iTabItem = {
            id: tabId,
            label: e.target.value,
            url: e.target.value,
        };

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
        setTimeout(() => {
            if(fieldRef.current) fieldRef.current.focus();
        }, 200);
    }, []);

    return (
        <input 
            autoFocus 
            ref={fieldRef} 
            type="text" 
            defaultValue={"https://"}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${predef.textfield_full} h-10 px-2 my-2 w-full text-sm text-tbfColor-darkergrey rounded-lg border border-tbfColor-middlegrey4`} 
        />
    ); 
}

export default EditableTabItem;