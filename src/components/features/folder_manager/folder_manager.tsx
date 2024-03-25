import { useState, useEffect, useRef } from "react";
import GenericIconButton from '../../utils/generic_icon_button';
import PrimaryButton from '../../utils/primary_button/primary_button';
import PurpleBorderButton from "../../utils/purple_border_button";
import FormField from "../../utils/form_field";
import * as predef from "../../../styles/predef";
import { iPopup } from "../../../interfaces/popup";

import randomNumber from "../../../tools/random_number";
import { initInEditFolder, updateInEditFolder} from "../../../redux/actions/inEditFolderActions";
import { iFolderItem } from "../../../interfaces/folder_item";
import MessageBox from '../../utils/message_box';
import { useDispatch, useSelector } from "../../../redux/mocked_hooks";
import { setShowFolderChangeWarning } from "../../../redux/actions/warningActions";
import { createFolderAction, updateFolderAction } from "../../../redux/actions/folderCollectionActions";
import { setCurrentlyEditingTab } from "../../../redux/actions/miscActions";
import CloseIcon from "../../../images/icons/close_icon";
import { innerStyleDirection, outerStyleDirection } from "./style_directions";
import windowListChanged from "./window_list_changed";
import WindowManager from "../window_manager/window_manager";

/*
    A popup providing oversight of a folder's settings and available windows/tabs.
    The settings may be changed by the user, which then gets applied to redux storage

    Warning messages may be added using the <Messagebox /> component. New fields can be added
    preferably by using the <FormField /> component. See examples in render() function.
*/

const FolderManager = (props: iPopup): JSX.Element => {
    const { onClose, type, folder, title } = props;
    const [show, setShow] = useState<boolean>(false);
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [modified, setModified] = useState<boolean>(false);
    const [originWindows, setOriginWindows] = useState<string>("");
    const [inValidFields, setInValidFields] = useState<{ name: boolean, windows: boolean }>({
        name: false,
        windows: false
    });

    const dispatch = useDispatch();

    // Read necessary data from redux. These data are are used in this component
    // for various tasks. Values may be dispatched back to these redux states for use in other multilevel components
    const state = useSelector((state: any) => state)

    useEffect(() => {
        // Hide the sidebar of the body. A sidebar of this component is used instead.
        document.body.style.overflowY = "hidden";

        // Information about the folder. If undefined, there are no preset information
        let folderSpecs: iFolderItem | undefined = folder;
        
        // Apply slide down effect once this popup is launched
        setShow(true);
     
        // folderSpecs is undefined, this means this popup is used for creating a new folder.
        // Otherwise, a folder is being edited.
        if(!folderSpecs){
            const randId = randomNumber();
            folderSpecs = {
                id: randId,
                name: "",
                desc: "",
                type: "expanded",
                viewMode: "grid",
                marked: false,
                windows: [],
            }
            setIsCreate(true);
        }

        // Track the preset windows of this payload. Used to track new/removed windows
        setOriginWindows(JSON.stringify(folderSpecs.windows));

        // Tell redux this popup is active and a create/edit process is ongoing.
        dispatch(initInEditFolder(folderSpecs));
    }, []);

    useEffect(() => {
        const inEditWindows: string = state.InEditFolderReducer?.windows;
        const listChanged: boolean = windowListChanged(originWindows, inEditWindows);

        if(listChanged === true){
            setModified(true);
        }
    }, [state.InEditFolderReducer]);
    
    // Handle changes to a field
    // - key: a string to identify the changed field
    // - value: the new value of this field
    const handleChangeField = (key: string, value: string): void => {
        if(!state.InEditFolderReducer) return;
        
        if(modified === false && JSON.stringify(state.InEditFolderReducer[key]) !== JSON.stringify(value)) setModified(true);

        // Inform redux about the field change
        dispatch(updateInEditFolder(key, value));
    }



    // Read the updated form changes from redux, and determine
    // whether or not they are valid. If not, mark the affected fields
    // as invalid. Otherwise, send a callback to proceed.
    const validateForm = (callback: () => void): void => {
        const data = state.InEditFolderReducer;

        const updatedFieldState = {
            name: false,
            windows: false
        }

        if(data.name.length === 0){
            updatedFieldState.name = true;
        } 

        if((data.windows && data.windows.length === 0) || state.MiscReducer.isEditingTabs > 0) {
            updatedFieldState.windows = true;
        } 
        
        if(updatedFieldState.name === false && updatedFieldState.windows === false){
            callback();
        } else {
            setInValidFields({...updatedFieldState});
          
        }
    }

    // Perform tasks and close this form popup
    const handleClose = (skipWarning?: boolean): void => {
        chrome.storage.sync.get("cancellation_warning_setting", (data) => {
            if((modified === true && skipWarning !== true) && data.cancellation_warning_setting === true){
                // Show a warning when a form has been modified AND when settings explicitly permits it.
                dispatch(setShowFolderChangeWarning(true));
            } else {
                // Perform tasks and close the popup form.
                setShow(false);
                dispatch(setShowFolderChangeWarning(false));
                setModified(false)
                setOriginWindows("");
                setIsCreate(false);
                document.body.style.overflowY = "scroll";

                setTimeout(() => {
                    dispatch(setCurrentlyEditingTab(false));
                    onClose()
                }, 500);
            }
        })
    }

    // Validate and save the data to redux, then close the popup form.
    const handleSave = (): void => {
        validateForm(() => {
            if(props.folder){
                // Find out if process is merge or edit
                const targetIndex = state.FolderCollectionReducer.findIndex((target: any) => target.id === props.folder?.id);

                if(targetIndex === -1){
                    dispatch(createFolderAction(state.InEditFolderReducer));
                } else {
                    dispatch(updateFolderAction(state.InEditFolderReducer));
                }
                
            } else {
                dispatch(createFolderAction(state.InEditFolderReducer));
            }   
      
            handleClose(true);
        });
       
    }

    // Close error/warning messages, but remain in the popup
    const handleKeepEditing = (): void => {
        document.body.style.overflowY = "hidden";
        dispatch(setShowFolderChangeWarning(false))
    }

    return (<>
        {state.WarningActionsReducer?.showFolderChangeWarning === true && 
            <MessageBox 
                title="Warning" 
                text="You have made changes to this form. Closing it will result in all changes being lost. Do you want to proceed?"
                primaryButton={{ 
                    text: "Yes, close this form", 
                    callback: () => handleClose(true) 
                }}
                secondaryButton={{ 
                    text: "No, keep editing", 
                    callback: () => handleKeepEditing()
                }}    
            />
        }
       
        <div data-testid={"folder-manager-popup"} className={outerStyleDirection(type, show)}>   
            <div className="relative top-0 md:bottom-12 h-screen w-[992px]">
                <div className={innerStyleDirection(type, show)}>  
                    <div id="popup-header" className="pl-8 pr-5 pb-5 pt-6 border-b border-tbfColor-lgrey w-full flex justify-between">
                        <h1 data-testid="popup-title" className="text-3xl text-tbfColor-darkpurple font-light inline-block">
                            {title}
                        </h1>
                        <GenericIconButton icon="close" onClick={handleClose}>
                            <CloseIcon size={34} fill="rgba(0,0,0,0.2)" />
                        </GenericIconButton>
                    </div>
                    <div id="popup-body" className="px-8 pt-6">
                        <FormField label="Name *" error={inValidFields.name} description="Give a name to this workspace. A sensible name may help your workflow when relevant tabs are needed.">
                            <input 
                                data-testid="name-field" 
                                id="name-field" 
                                type="text" 
                                defaultValue={state.InEditFolderReducer?.name} 
                                className={predef.textfield_full} 
                                onBlur={(e: any) => handleChangeField("name", e.target.value)} 
                            />
                        </FormField>
                        <FormField label="Description" description="Describe the purpose of this workspace.">
                            <textarea 
                                data-testid="desc-field" 
                                id="desc-field" 
                                defaultValue={state.InEditFolderReducer?.desc} 
                                className={predef.textarea_full} 
                                onBlur={(e: any) => handleChangeField("desc", e.target.value)}
                            ></textarea>
                        </FormField>
                        <div className={`py-6 flex flex-row items-center`}>
                            <div className="w-full">
                                <h4 className={`font-semibold text-lg mb-1 ${inValidFields.windows === true && "text-red-500"}`}>Windows and tabs *</h4>
                                <p className={`text-sm leading-6 text-tbfColor-darkergrey text-start ${inValidFields.windows === true && "text-red-500"}`}>
                                    You may add as windows and tabs to this workspace as you like to this workspace, although a maximum of 25-30 tabs is recommended. 
                                </p>
                                <WindowManager />
                            </div>
                        </div>
                    </div>
                    <div id="popup-footer" className="px-8 py-8 mt-4 flex justify-end border-t border-tbfColor-lgrey">
                        <PurpleBorderButton disabled={false} text="Cancel" onClick={handleClose} />
                        <PrimaryButton disabled={false} text={isCreate === true ? "Create" : "Save"} onClick={handleSave} />
                    </div>
                </div>
            </div>
        </div>
        </>
    ); 
}

export default FolderManager;