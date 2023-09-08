import styles from "./../../styles/global_utils.module.scss";
import { useRef, useState, useEffect } from "react";
import GenericIconButton from './generic_icon_button';
import PurpleButton from './purple_button';
import GreyBorderButton from "./grey_border_button";
import Paragraph from './paragraph';
import FolderControlButton from "./folder_control_button";
import FormField from "./form_field";
import * as predef from "../../styles/predef";
import Switcher from './switcher';
import Dropdown from './dropdown';


function Popup(props: iPopup){
    const { onClose, onSave, title, children } = props;
    const [slideDown, setSlideDown] = useState<boolean>(false);

    useEffect(() => {
        setSlideDown(true);
    }, []);

    function handleClose(): void {
        setSlideDown(false);
        setTimeout(() => onClose(), 500);
    }

    function handleSave(): void {
        alert("Saved!");
        handleClose();
    }

    return (<>
        <div className={`${styles.popup_container} overflow-y-scroll flex fixed justify-center items-center w-screen z-50 ${slideDown === false ? "transition-all ease-out h-0 duration-500" : "transition-all h-screen ease-in duration-75"}}`}>
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
                    <div id="popup-body">

                        <FormField label="Name" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu mauris dapibus orci aliquam consequat id lacinia lorem. In sed vulputate neque">
                            <input type="text" defaultValue={"..."} className={predef.textfield} />
                        </FormField>
                        <FormField label="Description" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu mauris dapibus orci aliquam consequat id lacinia lorem. In sed vulputate neque">
                            <textarea maxLength={400} defaultValue={"..."} className={predef.textarea}></textarea>
                        </FormField>
                        <FormField label="Launch at startup" description="E.g. the purpose of this folder...">
                            <Switcher onCallback={(e) => console.log(e.state)} />
                        </FormField>
                        <FormField label="Dropdown menu" description="Click the dropdown menu">
                            <Dropdown onCallback={(e) => console.log(e.selected)} tag="testdropdown" preset={{ id: 0, label: "This is a preset" }} options={[{ id: 1, label: "Another option" }, { id: 2, label: "Barnabas" }, { id: 3, label: "Vietnam" }]} />
                        </FormField>
                        <FormField label="Dropdown menu" description="Click the dropdown menu">
                            <Dropdown onCallback={(e) => console.log(e.selected)} tag="testdropdown2" preset={{ id: 0, label: "This is a preset" }} options={[{ id: 1, label: "Another option" }, { id: 2, label: "Barnabas" }, { id: 3, label: "Vietnam" }]} />
                        </FormField>
                        
                        <FormField label="Suspension" description="Automatically suspend inactive tabs">
                            <Switcher onCallback={(e) => console.log(e.state)} />
                        </FormField>
                        <div className="px-8 py-6 flex flex-row items-center">
                            <div className="w-2/5">
                                <h4 className="font-semibold text-lg mb-1">Windows and tabs</h4>
                                <Paragraph lineheight="leading-6" size="text-xs" text="E.g. the purpose of this folder..." />
                            </div>
                            <div className="w-3/5 ml-24">
                                abc
                            </div>
                        </div>
                    </div>
                    <div id="popup-footer" className="px-8 py-8 flex justify-end">
                        <GreyBorderButton text="Cancel" onClick={handleClose} />
                        <PurpleButton text="Create" onClick={handleSave} />
                    </div>
                </div>
            </div>
        </div>
        </>
    ); 
}

export default Popup;