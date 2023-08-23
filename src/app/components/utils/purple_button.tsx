import styles from "./../../styles/global_utils.module.scss";

function PurpleButton(props: TextButton){
    const { text, onClick } = props;
    
    return (
        <button className={`text-white py-2 px-6 bg-tbfColor-lightpurple rounded-3xl ${styles.opacity_hover_effect}`} onClick={onClick}>
            {text}
        </button>
    ); 
}

export default PurpleButton;