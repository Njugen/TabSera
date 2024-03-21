import { iGenericIconButton } from "../../interfaces/generic_icon_button";
import styles from "./../../styles/global_utils.module.scss";

/*
    An icon button used for all kind of things, where only an icon is sufficient (no labels)

    To make use of a new icon, insert a new if-statement returning the requested icon and
    check for the icon's prop name.

    E.g.
    ... 
    else if(icon === "myNewIcon"){
        return <MyNewIconComponent ... />
    } 
    ...
*/


function GenericIconButton(props: iGenericIconButton): JSX.Element {
    const { icon, children, onClick } = props;

    return (
        <button data-testid={`generic-icon-button-${icon}`} className={`${styles.opacity_hover_effect}`} onClick={onClick}>
            {children}
        </button>
    ); 
}

export default GenericIconButton;