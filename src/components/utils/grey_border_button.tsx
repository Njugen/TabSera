import styles from "./../../styles/global_utils.module.scss";
import { iTextButton } from "../../interfaces/text_button";

function GreyBorderButton(props: iTextButton){
    const { text, onClick } = props;
    
    return (
        <button className={`text-tbfColor-middlegrey2 border-2 border-tbfColor-middlegrey py-2 px-6 mx-2 bg-white rounded-3xl ${styles.opacity_hover_effect}`} onClick={onClick}>
            {text}
        </button>
    ); 
}

export default GreyBorderButton;