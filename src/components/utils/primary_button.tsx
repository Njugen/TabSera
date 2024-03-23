import styles from "./../../styles/global_utils.module.scss";
import { iTextButton } from "../../interfaces/text_button";

/*
    Button intended to use in positive direction ("continue", "proceed", "Okay", "Yes", etc). 

    In the future, this button should be made into a generic button, offering various colors instead
    of just being a button intended for one purpose.
*/

const PrimaryButton = (props: iTextButton): JSX.Element => {
    const { text, disabled, onClick } = props;
    const { opacity_hover_effect } = styles;

    const buttonStateCSS = (): string => {
        if(disabled === false){
            return `bg-tbfColor-lightpurple border-tbfColor-lightpurple ${opacity_hover_effect}`;
        } else {
            return `bg-tbfColor-middlegrey3 border-tbfColor-middlegrey3 disabled:opacity-50`;
        }
    }
    
    return (
        <button disabled={disabled} className={`text-white py-2 px-6 mx-2 ${buttonStateCSS()} border-2 rounded-3xl`} onClick={onClick}>
            {text}
        </button>
    ); 
}

export default PrimaryButton;