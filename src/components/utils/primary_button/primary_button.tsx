import styles from "./../../styles/global_utils.module.scss";
import { iTextButton } from "../../../interfaces/text_button";
import buttonStateCSS from "./button_state_css";

/*
    Button intended to use in positive direction ("continue", "proceed", "Okay", "Yes", etc). 

    In the future, this button should be made into a generic button, offering various colors instead
    of just being a button intended for one purpose.
*/

const PrimaryButton = (props: iTextButton): JSX.Element => {
    const { text, disabled, onClick } = props;

    return (
        <button disabled={disabled} className={`text-white py-2 px-6 mx-2 ${buttonStateCSS(disabled)} border-2 rounded-3xl`} onClick={onClick}>
            {text}
        </button>
    ); 
}

export default PrimaryButton;