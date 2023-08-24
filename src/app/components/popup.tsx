import styles from "./../styles/global_utils.module.scss";
import { useRef, useState, useEffect } from "react";
import GenericIconButton from './utils/generic_icon_button';

function Popup(props: Popup){
    const { onClose, onSave, title } = props;
    const [slideDown, setSlideDown] = useState<boolean>(false);

    useEffect(() => {
        setSlideDown(true);
    }, []);

    function handleClose(): void {
        setSlideDown(false);
        setTimeout(() => onClose(), 500);
    }

    return (<>
        <div className={`${styles.popup_container} overflow-y-scroll flex fixed justify-center items-center w-screen z-50 ${slideDown === false ? "transition-all ease-out h-0 duration-500" : "transition-all h-screen ease-in duration-75"}}`}>
            <div className="relative bottom-12 h-screen w-[992px]">
                <div className={`w-full bg-white min-h-[200px] rounded-3xl absolute left-0  ${slideDown === false ? "top-[-200%] ease-out duration-300" : "top-[6rem] ease-in duration-300"}`}>
                    <div id="popup-header" className="px-5 pb-5 pt-6 border-b border-tbfColor-lgrey w-full flex justify-between">
                        <h1 className="text-3xl text-tbfColor-darkpurple font-light inline-block">
                            {title}
                        </h1>
                        <button>
                            <GenericIconButton icon="close" size={34} fill="rgba(109,0,194,0.5)" onClick={() => handleClose()} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    ); 
}

export default Popup;