import styles from "./../../styles/global_utils.module.scss";


function Navlink(props: iNavlink): JSX.Element {
    const { label, url, isActive, onClick } = props;

    const activeLinkStyle: String = "font-semibold text-tbfColor-lightpurple border-b-2 border-tbfColor-lightpurple";
    const inActiveLinkStyle: String = "font-semibold bg-tbfColor-lightgrey text-tbfColor-middlegrey2 border-b-2 border-tbfColor-lightgrey hover:border-tbfColor-middlegrey2";

    return (
        <button className={`${isActive === true ? activeLinkStyle : inActiveLinkStyle} ${styles.opacity_hover_effect} px-3 py-2 mx-1 border-color border-tbfColor-lgrey`} onClick={onClick}>
          {label}
        </button>
    ); 
}

export default Navlink;