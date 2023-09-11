import styles from "./../../styles/global_utils.module.scss";
import { iTextButton } from "../../interfaces/text_button";

function PrimaryButton(props: iTextButton){
    const { text, onClick } = props;
    
    return (
        <button className={`text-white py-2 px-6 mx-2 bg-tbfColor-lightpurple rounded-3xl ${styles.opacity_hover_effect}`} onClick={onClick}>
            {text}
        </button>
    ); 
}

export default PrimaryButton;