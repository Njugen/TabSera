
import { useState, useEffect, useRef } from "react";
import GenericIconButton from './generic_icon_button';
import PrimaryButton from './primary_button';
import GreyBorderButton from "./grey_border_button";
import Paragraph from './paragraph';
import FormField from "./form_field";
import * as predef from "../../styles/predef";
import Switcher from './switcher';
import Dropdown from './dropdown';
import { iPopup } from "../../interfaces/popup";
import styles from "./../../styles/global_utils.module.scss";
import WindowManager from './window_manager';
import randomNumber from "../../tools/random_number";
import { useDispatch, useSelector } from "react-redux";
import { createFolderAction, initInEditFolder, updateInEditFolder, updateFolderAction } from "../../redux/actions/FoldersActions";
import { iFolder } from "../../interfaces/folder";
import { iWindowItem } from "../../interfaces/window_item";
import MessageBox from './message_box';

function Popup(props: iPopup){
    const { onClose, folder, title, children } = props;
    const [slideDown, setSlideDown] = useState<boolean>(false);
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [modified, setModified] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const [inValidFields, setInValidFields] = useState<{ name: boolean, desc: boolean, windows: boolean }>({
        name: false,
        desc: false,
        windows: false
    });

    const popupRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();
    const folderData = useSelector((state: any) => state.InEditFolderReducers);
    //const allFoldersData = useSelector((state: any) => state.InEditFolderReducers);

    useEffect(() => {
        let payload: iFolder | undefined = folder;
   
        // Slide the popup down
        setSlideDown(true);

        // Generate random id and dispatch to store
        if(!payload){
            const randId = randomNumber();

            payload = {
                id: randId,
                name: "",
                desc: "",
                type: "expanded",
                viewMode: "grid",
                settings: {
                    startup_launch: false,
                    close_previous: false,
                    auto_add: false
                },
                windows: [/*{
                    id: 1,
                    tabs: [
                        {
                            id: 1,
                            label: "test tab",
                            url: "http://google.com"
                        }
                    ],
                    initExpand: true
                }*/],
            }
            setIsCreate(true);
        }
      
        dispatch(initInEditFolder(payload));

       
    }, []);

    function handleChangeField(key: string, value: any){
        if(modified === false && value !== undefined) setModified(true);
        dispatch(updateInEditFolder(key, value));
    }

    function scrollTop(): void {
        if (popupRef.current === null || popupRef.current?.scrollTop === undefined) return;
        popupRef.current.scrollTop = 0;
    }

    function validateForm(callback: () => void){
        const data = folderData.inEditFolder;

            const updatedFieldState = {
                name: false,
                desc: false,
                windows: false
            }
            if(data.name.length === 0){
                updatedFieldState.name = true;
            } 
            if(data.desc.length === 0){
                updatedFieldState.desc = true;
            } 
            
            if(data.windows && data.windows.length === 0) {
                updatedFieldState.windows = true;
            } 
            
            setInValidFields({...updatedFieldState});
            if(updatedFieldState.name === false && updatedFieldState.desc === false && updatedFieldState.windows === false){
                callback();
            } else {
                scrollTop();
            }
     
    }

    function handleClose(skipWarning?: boolean): void {
        if(modified === true && skipWarning !== true){
            setWarning(true);
        } else {
            setSlideDown(false);
            console.log(folderData);
            setWarning(false);
            setModified(false)
            setTimeout(() => onClose(), 500);
        }
    }

    function handleSave(): void {
        validateForm(() => {
            if(props.folder){
                dispatch(updateFolderAction(folderData.inEditFolder));
            } else {
                dispatch(createFolderAction(folderData.inEditFolder));
            }   
            handleClose(true);
        });
       
    }

    function updateSettings(key: string, value: any){
        if(!folderData || folderData.inEditFolder === null) return;

        return {
            ...folderData.inEditFolder?.settings,
            [key]: value
        };
    }

    return (<>
        {/*warning === true && <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full overflow-hidden bg-tbfColor-middlegrey2 z-[1000]">
            <div className="p-10 w-[500px] bg-tbfColor-darkpurple rounded-lg drop-shadow-2xl text-center leading-7 text-md">
                <p className="mb-8 text-white">
                    You have made changes to this form. Closing it will result in all changes being lost. Do you want to proceed?
                </p>
                <button onClick={() => setWarning(false)} className="hover:opacity-60 transition-all ease-in border-2 border-white bg-tbfColor-darkpurple text-white font-semibold px-3 py-2 mx-2 rounded-md">
                    No, keep editing
                </button>
                <button onClick={() => handleClose(true)} className="hover:opacity-60 transition-all ease-in border-2 border-white bg-white text-tbfColor-darkpurple font-semibold px-3 py-2 mx-2 rounded-md">
                    Yes, close this form
                </button>
            </div>
        </div>*/
        }
        {warning === true && 
            <MessageBox 
                title="Warning" 
                text="You have made changes to this form. Closing it will result in all changes being lost. Do you want to proceed?"
                primaryButton={{ text: "Yes, close this form", callback: () => handleClose(true) }}
                secondaryButton={{ text: "No, keep editing", callback: () => setWarning(false) }}    
            />
        }
        <div ref={popupRef} className={`${styles.popup_container} scroll-smooth overflow-y-scroll flex fixed top-0 left-0 justify-center items-center w-screen z-50 ${slideDown === false ? "transition-all ease-out h-0 duration-200" : "transition-all h-screen ease-in duration-75"}`}>
            
            <div className="relative bottom-12 h-screen w-[992px]">
           
                <div className={`w-full bg-white min-h-[200px] rounded-2xl absolute left-0  ${slideDown === false ? "top-[-200%] ease-out duration-300" : "top-[6rem] ease-in duration-300"}`}>
                
                    <div id="popup-header" className="pl-8 pr-5 pb-5 pt-6 border-b border-tbfColor-lgrey w-full flex justify-between">
                        <h1 className="text-3xl text-tbfColor-darkpurple font-light inline-block">
                            {title}
                        </h1>
                        <button>
                            <GenericIconButton icon="close" size={34} fill="rgba(0,0,0,0.2)" onClick={() => handleClose()} />
                        </button>
                    </div>
                    <div id="popup-body" className="px-8">
                        <p className="text-center pb-0 mt-8 mb-0 text-tbfColor-middlegrey2 italic">* mandatory field</p>
                        <FormField label="Name *" error={inValidFields.name} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu mauris dapibus orci aliquam consequat id lacinia lorem. In sed vulputate neque">
                            <input type="text" defaultValue={folderData.inEditFolder?.name} className={predef.textfield_full} onBlur={(e: any) => handleChangeField("name", e.target.value)} />
                        </FormField>
                        <FormField label="Description *" error={inValidFields.desc} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu mauris dapibus orci aliquam consequat id lacinia lorem. In sed vulputate neque">
                            <textarea maxLength={150} defaultValue={folderData.inEditFolder?.desc} className={predef.textarea_full} onBlur={(e: any) => handleChangeField("desc", e.target.value)}></textarea>
                        </FormField>
                       <FormField label="Launch at startup" description="E.g. the purpose of this folder...">
                            <Switcher value={folderData.inEditFolder?.settings.startup_launch} onCallback={(e: any) => handleChangeField("settings", updateSettings("startup_launch", e.state))} />
                        </FormField>
                        <FormField label="Close previous session" description="E.g. the purpose of this folder...">
                            <Switcher value={folderData.inEditFolder?.settings.close_previous} onCallback={(e: any) => handleChangeField("settings", updateSettings("close_previous", e.state))} />
                        </FormField>
                        <FormField label="Auto add activities" description="E.g. the purpose of this folder...">
                            <Switcher value={folderData.inEditFolder?.settings.auto_add} onCallback={(e: any) => handleChangeField("settings", updateSettings("auto_add", e.state))} />
                        </FormField>
                        <div className={`py-6 flex flex-row items-center`}>
                            <div className="w-full">
                                <h4 className={`font-semibold text-lg mb-1 ${inValidFields.windows === true && "text-red-500"}`}>Windows and tabs *</h4>
                                <p className={`text-sm leading-6 text-tbfColor-darkergrey text-start ${inValidFields.windows === true && "text-red-500"}`}>
                                You may add any number of windows and tabs as you like to this folder, but launching a folder with more than 25-30 tabs is not adviced as this might slow down your computer.
                                </p>
                                {/*<Paragraph lineheight="leading-6" size="text-sm" text="You may add any number of windows and tabs as you like to this folder, but launching a folder with more than 25-30 tabs is not adviced as this might slow down your computer." />*/}
                                <WindowManager />
                            </div>
                        </div>
                    </div>
                    <div id="popup-footer" className="px-8 py-8 flex justify-end">
                        <GreyBorderButton text="Cancel" onClick={handleClose} />
                        <PrimaryButton text={isCreate === true ? "Create" : "Save"} onClick={handleSave} />
                    </div>
                </div>
            </div>
        </div>
        </>
    ); 
}

export default Popup;