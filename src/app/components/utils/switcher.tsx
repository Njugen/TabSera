import { useRef, useState, useEffect } from "react";
import styles from "./../../styles/global_utils.module.scss";
import OpenBrowserIcon from "../../images/icons/open_browser_icon";
import SettingsIcon from "../../images/icons/settings_icon";
import TrashIcon from "../../images/icons/trash_icon";
import ExpandIcon from "../../images/icons/expand_icon";
import CollapseIcon from "../../images/icons/collapse_icon";
import Paragraph from '../../components/utils/paragraph';

function Switcher(props: iSwitcher): JSX.Element {
    const [switchOn, setSwitchOn] = useState<boolean>(false);
    const { onCallback, label, dark } = props;

    function handleSwitch(): void {
        setSwitchOn(switchOn === false ? true : false);
    }

    useEffect(() => {
        onCallback({state: switchOn});
    }, [switchOn])

    return (
        <div className={`flex items-center ${label && "mx-5"}`}>
            {label && <span className={`inline-block mr-2 text-sm ${dark === true ? "text-white" : "text-black"}`}>{label}</span>}
            <button onClick={handleSwitch} className={`hover:opacity-70 rounded-3xl py-0 px-2 inline-block w-14 h-7 items-center ${switchOn === true ? "transition-all ease-in duration-100 left-0 bg-tbfColor-lighterpurple2 border border-tbfColor-lighterpurple2" : "transition-all ease-out duration-100 left-full bg-tbfColor-middlegrey border border-tbfColor-middlegrey4"}`}>
                <div className={`h-4 w-6 relative`}>
                    <div className={`w-4 h-4 block rounded-3xl absolute top-0 ${switchOn === true ? "transition-all ease-in duration-100 left-0 bg-tbfColor-lightpurple" : "transition-all ease-out duration-100 left-full bg-tbfColor-middlegrey3"}`}>
                        
                    </div>
                </div>
            </button>
        </div>
    ); 
}

export default Switcher;