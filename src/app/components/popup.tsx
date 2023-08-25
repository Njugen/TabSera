import styles from "./../styles/global_utils.module.scss";
import { useRef, useState, useEffect } from "react";
import GenericIconButton from './utils/generic_icon_button';
import PurpleButton from './utils/purple_button';
import GreyBorderButton from "./utils/grey_border_button copy";
import Paragraph from './utils/paragraph';


function Popup(props: iPopup){
    const { onClose, onSave, title, children } = props;
    const [slideDown, setSlideDown] = useState<boolean>(false);
    const [switchOn, setSwitchOn] = useState<boolean>(false);

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

    function handleSwitch(): void {
        setSwitchOn(switchOn === false ? true : false);
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
                            <GenericIconButton icon="close" size={34} fill="rgba(0,0,0,0.4)" onClick={() => handleClose()} />
                        </button>
                    </div>
                    <div id="popup-body">
                        <div className="px-8 py-6 flex flex-row items-center">
                            <div className="w-2/5">
                                <h4 className="font-semibold text-lg mb-1">Name</h4>
                                <Paragraph lineheight="leading-6" size="text-xs" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu mauris dapibus orci aliquam consequat id lacinia lorem. In sed vulputate neque" />
                            </div>
                            <div className="w-3/5 ml-24">
                                <input type="text" defaultValue={"..."} className={`${styles.input_textfield} text-sm w-full text-tbfColor-darkergrey rounded-lg p-2 border border-tbfColor-middlegrey3`} />
                            </div>
                        </div>
                        <div className="px-8 py-6 flex flex-row items-center">
                            <div className="w-2/5">
                                <h4 className="font-semibold text-lg mb-1">Description</h4>
                                <Paragraph lineheight="leading-6" size="text-xs" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu mauris dapibus orci aliquam consequat id lacinia lorem. In sed vulputate neque" />
                            </div>
                            <div className="w-3/5 ml-24">
                                <textarea maxLength={400} defaultValue={"..."} className={`${styles.input_textfield} text-sm w-full resize-none text-tbfColor-darkergrey h-40 rounded-lg p-2 border border-tbfColor-middlegrey3`}></textarea>
                            </div>
                        </div>
                        <div className="px-8 py-6 flex flex-row items-center">
                            <div className="w-2/5">
                                <h4 className="font-semibold text-lg mb-1">Launch at startup</h4>
                                <Paragraph lineheight="leading-6" size="text-xs" text="E.g. the purpose of this folder..." />
                            </div>
                            <div className="w-3/5 ml-24">
                                <button onClick={handleSwitch} className={`rounded-3xl py-0 px-2 block w-14 h-7 flex items-center ${switchOn === true ? "transition-all ease-in duration-100 left-0 bg-tbfColor-lighterpurple2 border border-tbfColor-lighterpurple2" : "transition-all ease-out duration-100 left-full bg-tbfColor-middlegrey border border-tbfColor-middlegrey4"}`}>
                                    <div className={`h-4 w-6 relative`}>
                                        <div className={`w-4 h-4 block rounded-3xl absolute top-0 ${switchOn === true ? "transition-all ease-in duration-100 left-0 bg-tbfColor-lightpurple" : "transition-all ease-out duration-100 left-full bg-tbfColor-middlegrey3"}`}>
                                            
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="px-8 py-6 flex flex-row items-center">
                            <div className="w-2/5">
                                <h4 className="font-semibold text-lg mb-1">Close others</h4>
                                <Paragraph lineheight="leading-6" size="text-xs" text="E.g. the purpose of this folder..." />
                            </div>
                            <div className="w-3/5 ml-24">
                                abc
                            </div>
                        </div>
                        <div className="px-8 py-6 flex flex-row items-center">
                            <div className="w-2/5">
                                <h4 className="font-semibold text-lg mb-1">Suspension</h4>
                                <Paragraph lineheight="leading-6" size="text-xs" text="E.g. the purpose of this folder..." />
                            </div>
                            <div className="w-3/5 ml-24">
                                abc
                            </div>
                        </div>
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