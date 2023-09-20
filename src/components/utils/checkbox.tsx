import { useState, useEffect } from "react";
import CheckedIcon from "../../images/icons/checked_icon";
import { iCheckbox } from "../../interfaces/checkbox";

function Checkbox(props: iCheckbox): JSX.Element {
    const [checked, setChecked] = useState<boolean>(false);
    const { onCallback, label, dark } = props;

    function handleSwitch(): void {
        setChecked(checked === false ? true : false);
    }

    useEffect(() => {
        onCallback({state: checked});
    }, [checked])

    return (
        <div className={`flex items-center ${label ? "mx-5" : "ml-2 mr-0"}`}>
            {label && <span className={`inline-block mr-2 text-sm ${dark === true ? "text-white" : "text-black"}`}>{label}</span>}
            <button onClick={handleSwitch} className={`relative border border-tbfColor-middlegrey3 ${checked === true ? "bg-white" : "bg-white"} h-[1.1rem] w-[1.1rem]`}>
                {checked === true && <div className="absolute top-0 left-0"><CheckedIcon fill="#6D00C2" size={16} /></div>}
            </button>
        </div>
    ); 
}

export default Checkbox;