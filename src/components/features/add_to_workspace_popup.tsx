import PrimaryButton from '../utils/primary_button/primary_button';
import Dropdown from "../utils/dropdown/dropdown";
import iAddToWorkspacePopup from '../../interfaces/add_to_workspace_popup';
import GenericPopup from '../utils/generic_popup';
import { iDropdownSelected } from '../../interfaces/dropdown';
import { useEffect, useState } from 'react';

/*
    Popup where the user may choose where to add
    selected tabs (either to a new or existing workspace)
*/

const AddToWorkspacePopup = (props: iAddToWorkspacePopup): JSX.Element => {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        setShow(true)
    }, [])

    const { 
        dropdownOptions, 
        onNewWorkspace, 
        onExistingWorkspace, 
        onCancel,
    } = props;


    const handleToNewWorkspace = (): void => {
        onCancel();
        onNewWorkspace();
    }

    const handleAddToExistingWorkspace = (folder: iDropdownSelected): void => {
        onCancel();
        setShow(false);
        onExistingWorkspace(folder);
    }

    const closeButtonSpecs: any = {
        label: "Close",
        handler: onCancel
    }

    return (
        <GenericPopup title={"Add to workspace"} type="slide-in" show={show} cancel={closeButtonSpecs}>
            <div className="flex flex-col items-center pb-6">
                {
                    dropdownOptions.length > 1 && (
                        <div className="mt-10 text-center w-[350px] px-8">
                            <p className="text-lg text-black inline-block mb-4 font-semibold">
                                To an existing workspace
                            </p>
                            <Dropdown 
                                tag="select-workspace-dropdown" 
                                preset={dropdownOptions[0]} 
                                options={dropdownOptions} 
                                onCallback={handleAddToExistingWorkspace} 
                            />
                        </div>
                    )
                }
                <div className="mt-5 text-center flex flex-col">
                    {
                        dropdownOptions.length > 1 && 
                        <p className="text-lg text-black block font-semibold">
                            Or
                        </p>
                    }
                    <div className="mb-6 mt-6">
                        <PrimaryButton disabled={false} text="To a new workspace" onClick={handleToNewWorkspace} />
                    </div>
                </div>
            </div>
        </GenericPopup>
/*
        <div data-testid="add-to-workspace-popup" className={outerStyleDirection(type, show)}>
            <div className="relative top-0 md:bottom-12 h-screen w-[992px]">
                <div className={innerStyleDirection(type, show)}>
                    <div id="popup-header" className="pl-8 pr-5 pb-5 pt-6 border-b border-tbfColor-lgrey w-full flex justify-between">
                        <h1 data-testid="popup-title" className="text-3xl text-tbfColor-darkpurple font-light inline-block">
                            {title}
                        </h1>
                        <GenericIconButton icon="close" onClick={() => handleClose(onCancel)}>
                            <CloseIcon size={34} fill="rgba(0,0,0,0.2)" />
                        </GenericIconButton>
                    </div>
                    <div id="popup-body" className="px-8 pt-6">
                        <div className="flex flex-col items-center pb-6">
                            {
                                dropdownOptions.length > 1 && (
                                    <div className="mt-10 text-center w-[350px] px-8">
                                        <p className="text-lg text-black inline-block mb-4 font-semibold">
                                            To an existing workspace
                                        </p>
                                        <Dropdown 
                                            tag="select-workspace-dropdown" 
                                            preset={dropdownOptions[0]} 
                                            options={dropdownOptions} 
                                            onCallback={onExistingWorkspace} 
                                        />
                                    </div>
                                )
                            }
                            <div className="mt-5 text-center flex flex-col">
                                {
                                    dropdownOptions.length > 1 && 
                                    <p className="text-lg text-black block font-semibold">
                                        Or
                                    </p>
                                }
                                <div className="mb-6 mt-6">
                                    <PrimaryButton disabled={false} text="To a new workspace" onClick={onNewWorkspace} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="popup-footer" className="px-8 py-8 mt-4 flex justify-end border-t border-tbfColor-lgrey">
                        <PurpleBorderButton disabled={false} text="Cancel" onClick={() => handleClose(onCancel)} />
                        <PrimaryButton disabled={false} text={"blabla"} onClick={()=>{}} />
                    </div>
                </div>
            </div>
        </div>*/
    );
}

export default AddToWorkspacePopup;