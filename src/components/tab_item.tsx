
import "./../styles/global_utils.module.scss";
import Checkbox from "./utils/checkbox";
import { iTabItem } from "../interfaces/tab_item";
import GenericIconButton from "./utils/generic_icon_button";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function TabItem(props: iTabItem): JSX.Element {
    const { id, label, url, onMark, onEdit } = props;

    const folderData = useSelector((state: any) => state.InEditFolderReducers);
    
    useEffect(() => {
        console.log(folderData);
    }, [folderData]);

    return (
        <div className="bg-tbfColor-lighterpurple1 hover:bg-tbfColor-lighterpurple transition-all ease-in tab-item rounded-md my-1 flex items-center justify-between">
            <a href={url} rel="noreferrer" className="text-sm p-2 tab-item-info w-full" target="_blank">
                <img src="/" className="w-18 h-18 bg-black inline-block" alt="Tab icon" />
                <span className="mx-3">{label}</span>
            </a>
          
            {folderData.inEditFolder && <div className="tab-item-settings p-2 flex flex-row">
                <GenericIconButton icon="edit" size={24} fill={"#6D00C2"} onClick={() => onEdit && onEdit(id)} />
                <Checkbox onCallback={(e) => onMark && onMark(id, e.state)} />
            </div>}
        </div>
    ); 
}

export default TabItem;