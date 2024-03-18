
import "./../styles/global_utils.module.scss";
import Checkbox from "./utils/checkbox";
import { iTabItem } from "../interfaces/tab_item";
import GenericIconButton from "./utils/generic_icon_button";

/* 
    Tab component with clickable url and options (close tab, edit tab, mark tab)
*/

function TabItem(props: iTabItem): JSX.Element {
    const { id, label, url, marked, onMark, onEdit, onClose, disableCloseButton, disableEdit, disableMark } = props;
    
    let address;
    
    // If the given url is not valid, then put this tab in edit mode.
    // -> Automatically edit a tab once a new window has been created
    try {
        address = new URL(url);
    } catch(e){
        if(onEdit) onEdit(id);
    }   

    return (<>
        <div data-testid="tab-item" className="bg-gray-100 border px-2 border-gray-100 hover:border-tbfColor-lightpurple hover:bg-tbfColor-lighterpurple hover:text-tbf-middlegrey2 transition-all ease-in duration-100 tab-item my-2 flex items-center justify-between">
            <a href={url} rel="noreferrer" className="w-full py-3 text-sm flex hover:no-underline items-center truncate px-2 tab-item-info" target="_blank">
                {address && <img src={`http://www.google.com/s2/favicons?domain=${address.origin}`} className="w-[18px] h-[18px] inline-block" alt={""} />}
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