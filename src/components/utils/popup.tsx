
import { useState, useEffect } from "react";
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

function Popup(props: iPopup){
    const { onClose, folder, title, children } = props;
    const [slideDown, setSlideDown] = useState<boolean>(false);
    const [isCreate, setIsCreate] = useState<boolean>(false);

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

    useEffect(() => {

    }, [folderData])

    function handleChangeField(key: string, value: any){

        dispatch(updateInEditFolder(key, value));
    }

    function handleClose(): void {
        setSlideDown(false);
        setTimeout(() => onClose(), 500);
    }

    function handleSave(): void {

        if(props.folder){
            dispatch(updateFolderAction(folderData.inEditFolder));
        } else {
            dispatch(createFolderAction(folderData.inEditFolder));
        }   
        handleClose();
    }

    function updateSettings(key: string, value: any){
        if(!folderData || folderData.inEditFolder === null) return;

        return {
            ...folderData.inEditFolder?.settings,
            [key]: value
        };
    }

    return (<>
        <div className={`${styles.popup_container} overflow-y-scroll flex fixed top-0 left-0 justify-center items-center w-screen z-50 ${slideDown === false ? "transition-all ease-out h-0 duration-200" : "transition-all h-screen ease-in duration-75"}`}>
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

                        <FormField label="Name" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu mauris dapibus orci aliquam consequat id lacinia lorem. In sed vulputate neque">
                            <input type="text" defaultValue={folderData.inEditFolder?.name} className={predef.textfield_full} onBlur={(e: any) => handleChangeField("name", e.target.value)} />
                        </FormField>
                        <FormField label="Description" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu mauris dapibus orci aliquam consequat id lacinia lorem. In sed vulputate neque">
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
                        <div className="py-6 flex flex-row items-center">
                            <div className="w-full">
                                <h4 className="font-semibold text-lg mb-1">Windows and tabs</h4>
                                <Paragraph lineheight="leading-6" size="text-sm" text="You may add any number of windows and tabs as you like to this folder, but launching a folder with more than 25-30 tabs is not adviced as this might slow down your computer." />
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