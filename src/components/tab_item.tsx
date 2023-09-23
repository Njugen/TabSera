
import "./../styles/global_utils.module.scss";
import Checkbox from "./utils/checkbox";
import { iTabItem } from "../interfaces/tab_item";
import GenericIconButton from "./utils/generic_icon_button";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function TabItem(props: iTabItem): JSX.Element {
    const { id, label, url, onMark, onEdit, disableEdit } = props;
    
    return (
        <div className="bg-white border border-tbfColor-lightergrey shadow-md  hover:border-tbfColor-lighterpurple transition-all rounded-md ease-in duration-100 tab-item my-2 flex items-center justify-between">
            <a href={url} rel="noreferrer" className="text-sm truncate px-2 py-2 tab-item-info hover:underline" target="_blank">
                <img src="/" className="w-18 h-18 bg-black inline-block" alt="Tab icon" />
                <span className="mx-3">{label}</span>
            </a>
          
            {!disableEdit && <div className="tab-item-settings px-2 py-2 flex flex-row">
                <GenericIconButton icon="edit" size={24} fill={"#a36dce"} onClick={() => onEdit && onEdit(id)} />
                <Checkbox checked={false} onCallback={(e) => onMark && onMark(id, e.state)} />
            </div>}
        </div>
    ); 
}

export default TabItem;