import PrimaryButton from './primary_button';
import styles from "../../styles/global_utils.module.scss";
import Dropdown from "./dropdown";
import iAddToWorkspacePopup from './../../interfaces/add_to_workspace_popup';
import GenericIconButton from "./generic_icon_button";

/*
    Popup where the user may choose where to add
    selected tabs (either to a new or existing workspace)
*/

const AddToWorkspacePopup = (props: iAddToWorkspacePopup): JSX.Element => {
    const { 
        title, 
        dropdownOptions, 
        type, 
        onNewWorkspace, 
        onExistingWorkspace, 
        onCancel 
    } = props;

    // Hide scrollbar when invoking component
    document.body.style.overflowY = "hidden";

    // Show scrollbar and close the popup
    const handleCancel = (): void => {
        document.body.style.overflowY = "scroll";
        onCancel();
    }

    // Decide how the slide-in features behaves
    const styleDirection = (): string => {
        let cssClasses = "";

        if(type === "slide-in"){
            cssClasses = `fixed flex ${styles.popup_container_transparent_bg} justify-center items-center top-0 left-0 w-full h-screen z-[1000]`;
        } else if(type === "popup"){
            cssClasses = `fixed flex ${styles.popup_container_default} justify-center top-0 left-0 w-screen h-screen z-[1000]`;
        }

        return cssClasses;
    }

    const renderWorkspaceSelection = (): JSX.Element => {
        return (
            <div className="mt-10 text-center w-[350px] px-8">
                <p className="text-lg text-black inline-block mb-4 font-semibold">
                    To an existing workspace
                </p>
                <Dropdown tag="select-workspace-dropdown" preset={dropdownOptions[0]} options={dropdownOptions} onCallback={onExistingWorkspace} />
            </div>
        );
    } 

    return (
        <div data-testid="add-to-workspace-popup" className={styleDirection()}>
            <div className="w-[992px] relative bg-white rounded-lg leading-7 text-md">
                <div id="popup-header" className="pl-8 pr-5 pb-5 pt-6 border-b border-tbfColor-lgrey w-full flex justify-between">
                    <h1 data-testid="manage-folder-title" className="text-3xl text-tbfColor-darkpurple font-light inline-block">
                        {title}
                    </h1>
                    <GenericIconButton icon="close" size={34} fill="rgba(0,0,0,0.2)" onClick={handleCancel} />
                </div>
                <div className="flex flex-col items-center pb-6">
                    {
                        dropdownOptions.length > 1 && renderWorkspaceSelection()
                    }
                    <div className="mt-5 text-center flex flex-col">
                        {
                            dropdownOptions.length > 1 && <p className="text-lg text-black block font-semibold">
                                Or
                            </p>
                        }
                        <div className="mb-6 mt-6">
                            <PrimaryButton disabled={false} text="To a new workspace" onClick={onNewWorkspace} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddToWorkspacePopup;