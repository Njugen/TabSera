import styles from "./../../styles/global_utils.module.scss";
import { iTextButton } from "../../interfaces/text_button";

/*
    Button intended to use in positive direction ("continue", "proceed", "Okay", "Yes", etc). 

    In the future, this button should be made into a generic button, offering various colors instead
    of just being a button intended for one purpose.
*/

const PrimaryButton = (props: iTextButton): JSX.Element => {
    const { text, disabled, onClick } = props;
    
    return (
        <button disabled={disabled} className={`text-white py-2 px-6 mx-2 ${disabled === false ? `bg-tbfColor-lightpurple border-tbfColor-lightpurple ${styles.opacity_hover_effect}` : "bg-tbfColor-middlegrey3 border-tbfColor-middlegrey3 disabled:opacity-50"} border-2 rounded-3xl`} onClick={onClick}>
            {text}
        </button>
    ); 
}

export default PrimaryButton;