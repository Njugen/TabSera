import { useEffect } from "react";
import PrimaryButton from './primary_button';
import GreyBorderButton from "./grey_border_button";
import styles from "../../styles/global_utils.module.scss";
import Dropdown from "./dropdown";
import iAddToWorkspacePopup from './../../interfaces/add_to_workspace_popup';

function AddToWorkspacePopup(props: iAddToWorkspacePopup): JSX.Element {
    const { title, dropdownOptions, onNewWorkspace, onExistingWorkspace, onCancel } = props;

    useEffect(() => {
        document.body.style.overflowY = "hidden";
    }, []);

    function handleCancel(): void {
        document.body.style.overflowY = "scroll";
        onCancel();
    }

    return (<div className={`fixed flex ${styles.popup_container} justify-center items-center top-0 left-0 w-full h-screen overflow-y-scroll z-[1000]`}>
    <div className="pl-8 pr-5 pb-10 pt-6 w-[800px] min-h-[300px] bg-white rounded-lg drop-shadow-2xl leading-7 text-md">
        <div className="flex justify-center">
            <h1 className="text-3xl text-tbfColor-darkpurple font-light inline-block">
                { title }
            </h1>
        </div>
        <div className="flex flex-col items-center">
            <div className="w-[350px] mt-10 text-center">
                <p className="text-lg text-black inline-block mb-4 font-semibold">
                    To an existing workspace
                </p>
                <Dropdown tag="select-workspace-dropdown" preset={dropdownOptions[0]} options={dropdownOptions} onCallback={onExistingWorkspace} />
            </div>
            <div className="w-[350px] mt-5 text-center flex flex-col">
                <p className="text-lg text-black block mb-6 mt-2 font-semibold">
                    Or
                </p>
                <div className="">
                    <PrimaryButton disabled={false} text="To a new workspace" onClick={onNewWorkspace} />
                </div>
                <div className="mt-20">
                    <GreyBorderButton disabled={false} text="Cancel" onClick={handleCancel} />
                </div>
            </div>
        </div>
    </div>
</div>);
}

export default AddToWorkspacePopup;