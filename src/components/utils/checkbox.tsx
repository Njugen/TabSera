import { useState, useEffect } from "react";
import CheckedIcon from "../../images/icons/checked_icon";
import { iCheckbox } from "../../interfaces/checkbox";

/*
    Customized checkbox

    This checkbox provides a modified check icon. Functionality
    remains the same as browser's default
*/

function Checkbox(props: iCheckbox): JSX.Element {
    const { onCallback, label } = props;
    
    // Keep track of wether or not this boxbox has been checked
    const [checked, setChecked] = useState<boolean>(false);
    

    function handleChecked(): void {
        // Check/uncheck this box
        const updatedState = checked === false ? true : false;
        setChecked(updatedState);

        // Send the new state of this box to the parent component 
        onCallback({state: updatedState});
    }

    useEffect(() => {
        // Once props.checked is available or changed by the parent component, set this state
        // accordingly
        setChecked(props.checked);
    }, [props.checked])

    return (
        <div className={`flex items-center ${label ? "mx-5" : "ml-2 mr-0"}`}>
            {label && <span data-testid="checkbox-label" className={`inline-block mr-2 text-sm text-black`}>{label}</span>}
            <button onClick={handleChecked} className={`relative border border-tbfColor-middlegrey3 ${checked === true ? "bg-white" : "bg-white"} h-[1.1rem] w-[1.1rem]`}>
                {checked === true && <div className="absolute top-0 left-0"><CheckedIcon fill="#6D00C2" size={16} /></div>}
            </button>
        </div>
    ); 
}

export default Checkbox;