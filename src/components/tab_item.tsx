
import "./../styles/global_utils.module.scss";
import Checkbox from "./utils/checkbox";
import { iTabItem } from "../interfaces/tab_item";
import GenericIconButton from "./utils/generic_icon_button";

function TabItem(props: iTabItem): JSX.Element {
    const { id, label, url, marked, onMark, onEdit, onClose, disableCloseButton, disableEdit, disableMark } = props;
    
    let address;
    
    try {
        address = new URL(url);
    } catch(e){

    }   


    return (<>
        <div className="bg-white border border-tbfColor-middlegrey2 hover:border-tbfColor-lightpurple hover:bg-tbfColor-lighterpurple hover:text-tbf-middlegrey2 transition-all rounded-md ease-in duration-100 tab-item my-2 flex items-center justify-between">
            <a href={url} rel="noreferrer" className="text-sm flex items-center truncate px-2 py-2 tab-item-info hover:underline" target="_blank">
                {address && <img src={`http://www.google.com/s2/favicons?domain=${address.origin}`} className="w-[18 h-18 inline-block" alt={""} />}
                <span className="mx-3">{label || url}</span>
            </a>
          
            <div className="tab-item-settings px-2 py-2 flex flex-row">
                {!disableEdit &&
                    <GenericIconButton icon="edit" size={24} fill={"#000"} onClick={() => onEdit && onEdit(id)} />
                }
                {!disableMark &&
                    <Checkbox checked={marked} onCallback={(e) => onMark && onMark(id, e.state)} />
                }
                {disableCloseButton === false && <GenericIconButton icon="close_light" size={20} fill={"#000"} onClick={() => onClose && onClose(id)} />}
            </div>
        </div>
        
        </>
    ); 
}

export default TabItem;