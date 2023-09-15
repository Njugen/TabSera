import { useRef, useState, useEffect } from "react";
import styles from "./../../styles/global_utils.module.scss";
import OpenBrowserIcon from "../../images/icons/open_browser_icon";
import SettingsIcon from "../../images/icons/settings_icon";
import TrashIcon from "../../images/icons/trash_icon";
import ExpandIcon from "../../images/icons/expand_icon";
import CollapseIcon from "../../images/icons/collapse_icon";
import Paragraph from '../../components/utils/paragraph';
import CheckedIcon from "../../images/icons/checked_icon";
import { iCheckbox } from "../../interfaces/checkbox";

function Checkbox(props: iCheckbox): JSX.Element {
    const [checked, setChecked] = useState<boolean>(false);
    const { onCallback, label, dark } = props;

    function handleSwitch(): void {
        setChecked(checked === false ? true : false);
    }

    useEffect(() => {  
        console.log("CHECKBOX");
    },[])

    useEffect(() => {
        onCallback({state: checked});
    }, [checked])

    return (
        <div className={`flex items-center ${label && "mx-5"}`}>
            {label && <span className={`inline-block mr-2 text-sm ${dark === true ? "text-white" : "text-black"}`}>{label}</span>}
            <button onClick={handleSwitch} className={`relative border border-tbfColor-middlegrey2 ${checked === true ? "bg-tbfColor-lightpurple" : "bg-white"} h-[1.1rem] w-[1.1rem]`}>
                {checked === true && <div className="absolute top-0 left-0"><CheckedIcon fill="#fff" size={16} /></div>}
            </button>
        </div>
    ); 
}

export default Checkbox;