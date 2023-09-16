
import "./../styles/global_utils.module.scss";
import Checkbox from "./utils/checkbox";
import { iTabItem } from "../interfaces/tab_item";
import GenericIconButton from "./utils/generic_icon_button";

function TabItem(props: iTabItem): JSX.Element {
    const { id, label, url, onMark, onEdit } = props;

    return (
        <div className="hover:bg-tbfColor-lighterpurple hover:text-tbfColor-darkpurple tab-item border-tbfColor-middlegrey4 hover:border-tbfColor-lightpurple bg-white border my-1 flex items-center justify-between">
            <a href={url} className="text-sm p-2 tab-item-info w-full" target="_blank">
                <img src="/" className="w-18 h-18 bg-black inline-block" />
                <span className="mx-3">{label}</span>
            </a>
          
            <div className="tab-item-settings p-2 flex flex-row">
                <GenericIconButton icon="edit" size={24} fill={"#000"} onClick={() => onEdit && onEdit(id)} />
                <Checkbox onCallback={(e) => onMark && onMark(id, e.state)} />
            </div>
        </div>
    ); 
}

export default TabItem;