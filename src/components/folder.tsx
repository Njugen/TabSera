import { useRef, useState } from "react";
import ClosedFolderIcon from "../images/icons/closed_folder_icon";
import Paragraph from "../components/utils/paragraph";
import FolderControlButton from "./utils/folder_control_button";
import OpenedFolderIcon from "../images/icons/opened_folder_icon";
import "../styles/global_utils.module.scss";
import WindowItem from "./window_item";
import { iFolder } from "../interfaces/folder";
import { useDispatch } from "react-redux";
import { deleteFolderAction } from "../redux/actions/folderCollectionActions";
import MessageBox from "./utils/message_box";
import Checkbox from './utils/checkbox';


function Folder(props: iFolder) {
    const contentsRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null)
    const [expanded, setExpanded] = useState<boolean>(false);
    
    const dispatch = useDispatch();

    const { 
        id,
        name,
        marked,
        desc,
        type,
        viewMode,
        settings,
        windows,
        onMark,
        onDelete,
        onEdit 
      } = props;
    
    function handleExpandClick(e: any): void {
        if(contentsRef.current === null || headerRef.current === null) return;
  
            if(expanded === false){
                headerRef.current.className = `relative tbf-${type} bg-tbfColor-lightpurple px-3 h-10 flex items-center transition-all ease-in duration-400 rounded-t-md`;
                contentsRef.current.className = "max-h-[2000px] overflow-none transition-all ease-in duration-200 bg-tbfColor-lighterpurple4 border border-tbfColor-lightpurple rounded-b-md";
                setExpanded(true);
            } else {
                headerRef.current.className = `relative tbf-${type}  hover:bg-tbfColor-lighterpurple2 border border-tbfColor-lighterpurple hover:border-tbfColor-lightpurple bg-tbfColor-lighterpurple3 px-3 h-10 flex items-center rounded-md transition-all ease-in duration-100`;
                contentsRef.current.className = "max-h-0 overflow-hidden transition-all ease-out duration-200 bg-tbfColor-lighterpurple4 rounded-b-md";
                setExpanded(false);
            }
        
    }
    function renderWindows(): Array<JSX.Element>{
        const result: Array<JSX.Element> = windows.map((window, index) => <WindowItem disableEdit={true} key={"window-" + index} id={window.id} tabs={window.tabs} />)

        return result;
    }

    return (
        <>
         
            <div className={`${viewMode === "list" ? "my-4 duration-200" : "my-2 duration-200"} transition-all ease-in w-full rounded-md`}>
                <div ref={headerRef} className={`relative tbf-${type}  hover:bg-tbfColor-lighterpurple2 border border-tbfColor-lighterpurple hover:border-tbfColor-lightpurple bg-tbfColor-lighterpurple4 px-3 h-10 flex items-center rounded-md transition-all ease-in duration-100`}>
                    <div className="inline-block mr-3">
                        {expanded === false ? <ClosedFolderIcon size={23} fill={"#000"} /> : <OpenedFolderIcon size={26} fill={"#fff"} />}
                    </div>
                    <div className={`inline-block ${viewMode === "list" ? "w-10/12" : "w-5/12"}`}>
                        <h2 className={`text-md truncate ${expanded === false ? "text-black" : "text-white"}`}>
                            {name}
                        </h2>
                    </div>
                    <div className="absolute flex items-center right-2">
                        <FolderControlButton icon="open_browser" active={expanded} onClick={() => {}} />
                        <FolderControlButton icon="settings" active={expanded} onClick={onEdit} />
                        <FolderControlButton icon="trash" active={expanded} onClick={() => { onDelete!(props); }} />
                        <FolderControlButton icon="collapse_expand" active={expanded} onClick={handleExpandClick} />
                        <Checkbox checked={marked} onCallback={(e) => onMark!(id)} />
                    </div>
                </div>
                <div ref={contentsRef} className="max-h-0 overflow-y-hidden bg-tbfColor-lighterpurple3">
                    {desc.length > 0 && <div className="px-5 mt-8 flex justify-between items-start">
                    <div className="inline-block w-fit">
                            <Paragraph text={desc} />
                        </div>
                    </div>}
                    
                    <div className="px-5 mb-8 mt-8">
                        {[...renderWindows()]}
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default Folder;