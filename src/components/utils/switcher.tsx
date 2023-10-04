import { useState, useEffect } from "react";
import styles from "./../../styles/global_utils.module.scss";
import { iSwitcher } from "../../interfaces/switcher";

function Switcher(props: iSwitcher): JSX.Element {
    
    const [switchOn, setSwitchOn] = useState<boolean | null>(null);
    const { onCallback, label, dark, value } = props;

    function handleSwitch(): void {
        setSwitchOn(switchOn === false ? true : false);
    }

    useEffect(() => {
        console.log(switchOn);
        if(value !== null) onCallback({state: switchOn});
    }, [switchOn])

    useEffect(() => {
        setSwitchOn(props.value);
    }, [props.value]);

    return (
        <div className={`flex items-center ${label && "mx-5"}`}>
            {label && <span className={`inline-block mr-2 text-sm ${dark === true ? "text-white" : "text-black"}`}>{label}</span>}
            <button onClick={handleSwitch} className={`hover:opacity-70 rounded-3xl py-0 px-2 inline-block w-14 h-7 items-center ${switchOn === true || props.value === true ? "transition-all ease-in duration-100 left-0 bg-tbfColor-lighterpurple2 border border-tbfColor-lightpurple" : "transition-all ease-out duration-100 left-full bg-tbfColor-middlegrey border border-tbfColor-middlegrey2"}`}>
                <div className={`h-4 w-6 relative`}>
                    <div className={`w-4 h-4 block rounded-3xl absolute top-0 ${switchOn === true || props.value === true ? "transition-all ease-in duration-100 left-full bg-tbfColor-lightpurple" : "transition-all ease-out duration-100 left-0 bg-tbfColor-middlegrey3"}`}>
                        
                    </div>
                </div>
            </button>
        </div>
    ); 
}

export default Switcher;