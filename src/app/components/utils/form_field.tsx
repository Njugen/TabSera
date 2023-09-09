import styles from "./../../styles/global_utils.module.scss";

import OpenBrowserIcon from "../../images/icons/open_browser_icon";
import SettingsIcon from "../../images/icons/settings_icon";
import TrashIcon from "../../images/icons/trash_icon";
import ExpandIcon from "../../images/icons/expand_icon";
import CollapseIcon from "../../images/icons/collapse_icon";
import Paragraph from '../../components/utils/paragraph';

function FormField(props: iFormField): JSX.Element {
    const { label, description, children } = props;
    return (
        <div className="py-6 flex flex-row items-center">
            <div className="w-2/5">
                <h4 className="font-semibold text-lg mb-1">{label}</h4>
                <Paragraph lineheight="leading-6" size="text-xs" text={description} />
            </div>
            <div className="w-3/5 ml-24">
                { children }
            </div>
        </div>
    ); 
}

export default FormField;