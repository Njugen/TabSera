// Decide how the slide-in features behaves
import styles from "./../../../styles/global_utils.module.scss";

const {
    popup_container_transparent_bg, 
    popup_container_default
} = styles;

const popupStyleDirection = (type: string): string => {
    let cssClasses = "";

    if(type === "slide-in"){
        cssClasses = `fixed flex ${popup_container_transparent_bg} justify-center items-center top-0 left-0 w-full h-screen z-[1000]`;
    } else if(type === "popup"){
        cssClasses = `fixed flex ${popup_container_default} justify-center top-0 left-0 w-screen h-screen z-[1000]`;
    }

    return cssClasses;
}

export default popupStyleDirection;