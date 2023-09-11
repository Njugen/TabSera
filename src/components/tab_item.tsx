
import "./../styles/global_utils.module.scss";
import Checkbox from "./utils/checkbox";
import { iTabItem } from "../interfaces/tab_item";

function TabItem(props: iTabItem): JSX.Element {
    const { id, label, url } = props;
    

    return (
        <div className="hover:bg-tbfColor-lighterpurple hover:text-tbfColor-darkpurple tab-item border-tbfColor-middlegrey4 hover:border-tbfColor-lightpurple border my-1 flex items-center justify-between">
            <a href={url} className="text-sm p-2 tab-item-info w-full" target="_blank">
                <img src="/" className="w-18 h-18 bg-black inline-block" />
                <span className="mx-3">{label}</span>
            </a>
          
            <div className="tab-item-settings p-2">
                <Checkbox onCallback={(e) => {}} />
            </div>
    </div>
    ); 
}

export default TabItem;