import { useState, useEffect, useRef } from "react";
import GenericIconButton from './generic_icon_button';
import PrimaryButton from './primary_button';
import PurpleBorderButton from "./purpleBorderButton";
import FormField from "./form_field";
import * as predef from "../../styles/predef";
import { iPopup } from "../../interfaces/popup";
import styles from "../../styles/global_utils.module.scss";
import WindowManager from './window_manager';
import randomNumber from "../../tools/random_number";
//import { useDispatch, useSelector } from "react-redux";
import { initInEditFolder, updateInEditFolder} from "../../redux/actions/inEditFolderActions";
//import { createFolderAction, updateFolderAction } from "../../redux/actions/state.FolderCollectionReducerActions";
import { iFolder } from "../../interfaces/folder";
import MessageBox from './message_box';
import { useDispatch, useSelector } from "../../redux/mocked_hooks";
import { setShowFolderChangeWarning } from "../../redux/actions/warningActions";
import { createFolderAction, updateFolderAction } from "../../redux/actions/folderCollectionActions";

//import { useDispatch, useSelector } from "react-redux";

/*
    A popup providing oversight of a folder's settings and available windows/tabs.
    The settings may be changed by the user, which then gets applied to redux storage

    Warning messages may be added using the <Messagebox /> component. New fields can be added
    preferably by using the <FormField /> component. See examples in render() function.
*/



function ManageFolderPopup(props: iPopup): JSX.Element {
    const { onClose, folder, title } = props;
    const [slideDown, setSlideDown] = useState<boolean>(false);
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [modified, setModified] = useState<boolean>(false);
    const [originWindows, setOriginWindows] = useState<string>("");
    const [inValidFields, setInValidFields] = useState<{ name: boolean, windows: boolean }>({
        name: false,
        windows: false
    });

    const popupRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    // Read necessary data from redux. These data are are used in this component
    // for various tasks. Values may be dispatched back to these redux states for use in other multilevel components
    const state = useSelector((state: any) => state)

    useEffect(() => {
        // Information about the folder. If undefined, there are no preset information
        let payload: iFolder | undefined = folder;
        
        // Apply slide down effect once this popup is launched
        setSlideDown(true);
     
        // Payload is undefined, this means this popup is used for creating a new folder.
        // Otherwise, a folder is being edited.
        if(!payload){
            const randId = randomNumber();
            payload = {
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
        setOriginWindows(JSON.stringify(payload.windows));

        // Tell redux this popup is active and a create/edit process is ongoing.
        dispatch(initInEditFolder(payload));
    }, []);

    useEffect(() => {
        // Hide the sidebar of the body. A sidebar of this component is used instead.
        document.body.style.overflowY = "hidden";
    }, []);

    // Check whether or not the set of windows has been modified
    function windowListChanged(): boolean {
        const presetWindows: string = originWindows;
        const modifiedWindows: string = JSON.stringify(state.InEditFolderReducer?.windows);

        if(!modifiedWindows || !presetWindows) return false;
        if(originWindows !== JSON.stringify(state.InEditFolderReducer?.windows)){
            return true;
        }

        return false;
    }

    useEffect(() => {
        if(windowListChanged() === true){
            setModified(true);
        }
    }, [state.InEditFolderReducer]);

    // Handle changes to a field
    // - key: a string to identify the changed field
    // - value: the new value of this field
    function handleChangeField(key: string, value: any){
        if(!state.InEditFolderReducer) return;
        
        if(modified === false && JSON.stringify(state.InEditFolderReducer[key]) !== JSON.stringify(value)) setModified(true);

        // Inform redux about the field change
        dispatch(updateInEditFolder(key, value));
    }

    function scrollTop(): void {
        if (popupRef.current === null || popupRef.current?.scrollTop === undefined) return;
        popupRef.current.scrollTop = 0;
    }

    // Read the updated form changes from redux, and determine
    // whether or not they are valid. If not, mark the affected fields
    // as invalid. Otherwise, send a callback to proceed.
    function validateForm(callback: () => void){
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

            setInValidFields({...updatedFieldState});
            
            if(updatedFieldState.name === false && updatedFieldState.windows === false){
                callback();
            } else {
                scrollTop();
            }
     
    }

    // Perform tasks and close this form popup
    function handleClose(skipWarning?: boolean): void {
       // console.log("HANDLE CLOSE 1");
        chrome.storage.sync.get("cancellation_warning_setting", (data) => {
           // console.log("HANDLE CLOSE 2");
           //console.log("cancellation state", data.cancellation_warning_setting);
           //console.log("modified", modified);
           //console.log("warning", skipWarning);
            if((modified === true && skipWarning !== true) && data.cancellation_warning_setting === true){
                //console.log("DDDDDDDDDD");
                // Show a warning when a form has been modified AND when settings explicitly permits it.
                dispatch(setShowFolderChangeWarning(true));
            } else {
                // Perform tasks and close the popup form.
                setSlideDown(false);
                
                dispatch(setShowFolderChangeWarning(false));
                setModified(false)
                setOriginWindows("");
                setIsCreate(false);
                
                setTimeout(() => {
                    // Restore the body's scroll bar
                    document.body.style.overflowY = "scroll";
                    onClose()
                }, 500);
            }
        })
    }

    // Validate and save the data to redux, then close the popup form.
    function handleSave(): void {
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
    function handleKeepEditing(): void {
        document.body.style.overflowY = "hidden";
        dispatch(setShowFolderChangeWarning(false))
    }

    return (<>
        {state.WarningActionsReducer?.showFolderChangeWarning === true && 
            <MessageBox 
                title="Warning" 
                text="You have made changes to this form. Closing it will result in all changes being lost. Do you want to proceed?"
                primaryButton={{ text: "Yes, close this form", callback: () => handleClose(true) }}
                secondaryButton={{ text: "No, keep editing", callback: () => handleKeepEditing()}}    
            />
        }
        <div ref={popupRef} className={`${styles.popup_container} scroll-smooth overflow-y-scroll flex fixed top-0 left-0 justify-center items-center w-screen z-50 ${slideDown === false ? "transition-all ease-out h-0 duration-200" : "transition-all h-screen ease-in duration-75"}`}>
            
            <div data-testid="manage-folder-popup" className="relative bottom-12 h-screen w-[992px]">
           
                <div className={`w-full bg-white min-h-[200px] rounded-lg absolute left-0  ${slideDown === false ? "top-[-200%] ease-out duration-300" : "top-[6rem] ease-in duration-300"}`}>
                
                    <div id="popup-header" className="pl-8 pr-5 pb-5 pt-6 border-b border-tbfColor-lgrey w-full flex justify-between">
                        <h1 data-testid="manage-folder-title" className="text-3xl text-tbfColor-darkpurple font-light inline-block">
                            {title}
                        </h1>
                        <GenericIconButton icon="close" size={34} fill="rgba(0,0,0,0.2)" onClick={() => handleClose()} />
                    </div>
                    <div id="popup-body" className="px-8 pt-6">
                        <FormField label="Name *" error={inValidFields.name} description="Give a name to this workspace. A sensible name may help your workflow when relevant tabs are needed.">
                            <input data-testid="name-field" id="name-field" type="text" defaultValue={state.InEditFolderReducer?.name} className={predef.textfield_full} onBlur={(e: any) => handleChangeField("name", e.target.value)} />
                        </FormField>
                        <FormField label="Description" description="Describe the purpose of this workspace.">
                            <textarea data-testid="desc-field" id="desc-field" defaultValue={state.InEditFolderReducer?.desc} className={predef.textarea_full} onBlur={(e: any) => handleChangeField("desc", e.target.value)}></textarea>
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
                    <div id="popup-footer" className="px-8 py-8 flex justify-end">
                        <PurpleBorderButton disabled={false} text="Cancel" onClick={handleClose} />
                        <PrimaryButton disabled={false} text={isCreate === true ? "Create" : "Save"} onClick={handleSave} />
                    </div>
                </div>
            </div>
        </div>
        </>
    ); 
}

export default ManageFolderPopup;