
import "./../styles/global_utils.module.scss";
import { iEditableTabItem } from "../interfaces/editable_tab_item";
import * as predef from "../styles/predef";
import { useEffect, useRef, useState } from "react";
import randomNumber from "../tools/random_number";
import { iTabItem } from "../interfaces/tab_item";
import { useDispatch, useSelector } from "react-redux";
import { updateWindowManager } from "../redux/actions/inEditFolderActions";

/*
    A textfield, which lets the user set/update a url for a tab.
*/

function EditableTabItem(props: iEditableTabItem): JSX.Element {
    const { id, windowId, preset, onStop } = props;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const fieldRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    
    // Save the changes to redux once verified.
    // Show error message, and prevent saving if field is invalid.
    function saveToStore(e: any): void {
        const tabId = id ? id : randomNumber();
    
        if(!verifyValue(e.target.value)){
            setErrorMessage("A tab needs to have a valid URL, e.g. https://google.com/...");
        } else {

            setErrorMessage(null);
            const payload: iTabItem = {
                id: tabId,
                label: e.target.value,
                url: e.target.value,
                marked: e.target.marked
            };

            dispatch(updateWindowManager(windowId, payload)); 
            onStop();
        }
    }

    // Once the user clicks outside the field, then save it.
    function handleBlur(e: any): void {
        //console.log("E", e.relatedTarget.tagName !== "BUTTON");
        if(e.relatedTarget?.tagName?.toLowerCase() !== "button") saveToStore(e);
    }

    // Save the field once the user hits "Enter" on the keyboard
    function handleKeyDown(e: any): void {
        if (e.key === 'Enter' || e.keyCode === 13) {
            saveToStore(e);
        }
    }

    // Verify the textfield value
    function verifyValue(input: string): boolean {
        const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

        return regex.test(input);
    }

    // Automatically focus on the textfield once this component has rendered.
    useEffect(() => {
        setTimeout(() => {
            if(fieldRef.current) fieldRef.current.focus();
        }, 200);
    }, []);

    return (
        <div className="my-2">
            <input 
                autoFocus 
                ref={fieldRef} 
                type="text" 
                defaultValue={preset ? preset : "https://"}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`${predef.textfield_full} h-[42px] px-2 w-full text-sm text-tbfColor-darkergrey rounded-lg border border-tbfColor-middlegrey4`} 
            />
            {errorMessage && <span className="text-semibold text-red-500 text-sm">{errorMessage}</span>} 
        </div>
    ); 
}

export default EditableTabItem;