import styles from "./../../styles/global_utils.module.scss";
import { iTextButton } from "../../interfaces/text_button";

function PrimaryButton(props: iTextButton): JSX.Element{
    const { text, disabled, onClick } = props;
    
    return (
        <button disabled={disabled} className={`text-white py-2 px-6 mx-2 ${disabled === false ? `bg-tbfColor-lightpurple border-tbfColor-lightpurple ${styles.opacity_hover_effect}` : "bg-tbfColor-middlegrey3 border-tbfColor-middlegrey3 disabled:opacity-50"} border-2 rounded-3xl`} onClick={onClick}>
            {text}
        </button>
    ); 
}

export default PrimaryButton;