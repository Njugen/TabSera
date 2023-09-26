import { useState, useEffect, useRef } from "react";
import GenericIconButton from './generic_icon_button';
import PrimaryButton from './primary_button';
import GreyBorderButton from "./grey_border_button";
import FormField from "./form_field";
import * as predef from "../../styles/predef";
import Switcher from './switcher';
import { iPopup } from "../../interfaces/popup";
import styles from "../../styles/global_utils.module.scss";
import WindowManager from './window_manager';
import randomNumber from "../../tools/random_number";
import { useDispatch, useSelector } from "react-redux";
import { initInEditFolder, updateInEditFolder} from "../../redux/actions/inEditFolderActions";
import { createFolderAction, updateFolderAction } from "../../redux/actions/folderCollectionActions";
import { iFolder } from "../../interfaces/folder";
import MessageBox from './message_box';
import { setShowFolderChangeWarning } from "../../redux/actions/warningActions";

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
    const folderData = useSelector((state: any) => state.InEditFolderReducer);
    const folderCollection = useSelector((state: any) => state.FolderCollectionReducer);
    const warningActions = useSelector((state: any) => state.WarningActionsReducer);

    useEffect(() => {
        let payload: iFolder | undefined = folder;
   
        setSlideDown(true);
     
        if(!payload){
            const randId = randomNumber();

            payload = {
                id: randId,
                name: "",
                desc: "",
                type: "expanded",
                viewMode: "grid",
                marked: false,
                settings: {
                    startup_launch: false,
                    close_previous: false,
                    auto_add: false
                },
                windows: [],
            }
            setIsCreate(true);
        }

        setOriginWindows(JSON.stringify(payload.windows));
        dispatch(initInEditFolder(payload));

       
    }, []);

    function windowListChanged(): boolean {
        const presetWindows: string = originWindows;
        const modifiedWindows: string = JSON.stringify(folderData?.windows);

        if(!modifiedWindows || !presetWindows) return false;
        if(originWindows !== JSON.stringify(folderData?.windows)){
            return true;
        }

        return false;
    }

    useEffect(() => {
        if(windowListChanged() === true){
            setModified(true);
        }
    }, [folderData]);

    function handleChangeField(key: string, value: any){
        if(!folderData) return;
        
        if(modified === false && JSON.stringify(folderData[key]) !== JSON.stringify(value)) setModified(true);
        dispatch(updateInEditFolder(key, value));
    }

    function scrollTop(): void {
        if (popupRef.current === null || popupRef.current?.scrollTop === undefined) return;
        popupRef.current.scrollTop = 0;
    }

    function validateForm(callback: () => void){
        const data = folderData;

            const updatedFieldState = {
                name: false,
                windows: false
            }
            if(data.name.length === 0){
                updatedFieldState.name = true;
            } 

            if(data.windows && data.windows.length === 0) {
                updatedFieldState.windows = true;
            } 
            
            setInValidFields({...updatedFieldState});
            
            if(updatedFieldState.name === false && updatedFieldState.windows === false){
                callback();
            } else {
                scrollTop();
            }
     
    }

    function handleClose(skipWarning?: boolean): void {

        if((modified === true && skipWarning !== true)){
            dispatch(setShowFolderChangeWarning(true));
        } else {
            setSlideDown(false);
            
            dispatch(setShowFolderChangeWarning(false));
            setModified(false)
            setOriginWindows("");
            setIsCreate(false);
        
            setTimeout(() => onClose(), 500);
        }
    }

    function handleSave(): void {
        validateForm(() => {
            if(props.folder){
                // Find out if process is merge or edit
                const targetIndex = folderCollection.findIndex((target: any) => target.id === props.folder?.id);

                if(targetIndex === -1){
                    dispatch(createFolderAction(folderData));
                } else {
                    dispatch(updateFolderAction(folderData));
                }
            } else {
                dispatch(createFolderAction(folderData));
            }   

            handleClose(true);
        });
       
    }

    function updateSettings(key: string, value: any){
        if(!folderData || folderData === null) return;

        return {
            ...folderData?.settings,
            [key]: value
        };
    }

    return (<>
        {warningActions.showFolderChangeWarning === true && 
            <MessageBox 
                title="Warning" 
                text="You have made changes to this form. Closing it will result in all changes being lost. Do you want to proceed?"
                primaryButton={{ text: "Yes, close this form", callback: () => handleClose(true) }}
                secondaryButton={{ text: "No, keep editing", callback: () => dispatch(setShowFolderChangeWarning(false)) }}    
            />
        }
        <div ref={popupRef} className={`${styles.popup_container} scroll-smooth overflow-y-scroll flex fixed top-0 left-0 justify-center items-center w-screen z-50 ${slideDown === false ? "transition-all ease-out h-0 duration-200" : "transition-all h-screen ease-in duration-75"}`}>
            
            <div className="relative bottom-12 h-screen w-[992px]">
           
                <div className={`w-full bg-white min-h-[200px] rounded-lg absolute left-0  ${slideDown === false ? "top-[-200%] ease-out duration-300" : "top-[6rem] ease-in duration-300"}`}>
                
                    <div id="popup-header" className="pl-8 pr-5 pb-5 pt-6 border-b border-tbfColor-lgrey w-full flex justify-between">
                        <h1 className="text-3xl text-tbfColor-darkpurple font-light inline-block">
                            {title}
                        </h1>
                        <button>
                            <GenericIconButton icon="close" size={34} fill="rgba(0,0,0,0.2)" onClick={() => handleClose()} />
                        </button>
                    </div>
                    <div id="popup-body" className="px-8 pt-6">
                    
                        <FormField label="Name *" error={inValidFields.name} description="Give a name to this workspace. A sensible name may help your workflow when relevant tabs are needed.">
                            <input type="text" defaultValue={folderData?.name} className={predef.textfield_full} onBlur={(e: any) => handleChangeField("name", e.target.value)} />
                        </FormField>
                        <FormField label="Description" description="Describe the purpose of this workspace.">
                            <textarea defaultValue={folderData?.desc} className={predef.textarea_full} onBlur={(e: any) => handleChangeField("desc", e.target.value)}></textarea>
                        </FormField>
                       <FormField label="Launch at startup" description="Automatically open all windows and tabs in this workspace when starting the browser. This will override browser defaults.">
                            <Switcher value={folderData?.settings.startup_launch} onCallback={(e: any) => handleChangeField("settings", updateSettings("startup_launch", e.state))} />
                        </FormField>
                        <FormField label="Close existing session" description="Close all windows and tabs when launching this folder">
                            <Switcher value={folderData?.settings.close_previous} onCallback={(e: any) => handleChangeField("settings", updateSettings("close_previous", e.state))} />
                        </FormField>
                        <FormField label="Incognito" description="Launch this folder in incognito">
                            <Switcher value={folderData?.settings.launch_incognito} onCallback={(e: any) => handleChangeField("settings", updateSettings("launch_incognito", e.state))} />
                        </FormField>
                        <div className={`py-6 flex flex-row items-center`}>
                            <div className="w-full">
                                <h4 className={`font-semibold text-lg mb-1 ${inValidFields.windows === true && "text-red-500"}`}>Windows and tabs *</h4>
                                <p className={`text-sm leading-6 text-tbfColor-darkergrey text-start ${inValidFields.windows === true && "text-red-500"}`}>
                                    You may add any number of windows and tabs as you like to this workspace, although a maximum of 25-30 tabs is recommended. 
                                </p>
                                {/*<Paragraph lineheight="leading-6" size="text-sm" text="You may add any number of windows and tabs as you like to this folder, but launching a folder with more than 25-30 tabs is not adviced as this might slow down your computer." />*/}
                                <WindowManager />
                            </div>
                        </div>
                    </div>
                    <div id="popup-footer" className="px-8 py-8 flex justify-end">
                        <GreyBorderButton disabled={false} text="Cancel" onClick={handleClose} />
                        <PrimaryButton disabled={false} text={isCreate === true ? "Create" : "Save"} onClick={handleSave} />
                    </div>
                </div>
            </div>
        </div>
        </>
    ); 
}

export default ManageFolderPopup;