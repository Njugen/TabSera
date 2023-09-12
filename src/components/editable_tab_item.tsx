
import "./../styles/global_utils.module.scss";
import Checkbox from "./utils/checkbox";
import { iEditableTabItem } from "../interfaces/editable_tab_item";
import * as predef from "../styles/predef";
import { useEffect, useRef } from "react";

function EditableTabItem(props: iEditableTabItem): JSX.Element {
    const { onSave } = props;
    const fieldRef = useRef<HTMLInputElement>(null);

    function handleBlur(): void {
        onSave({"blablabla": "blablabla"});
    }

    function handleKeyDown(e: any): void {
        if (e.key === 'Enter' || e.keyCode === 13) {
            onSave({"blablabla": "blablabla"});
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if(fieldRef.current) fieldRef.current.focus();
        }, 200)
       
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