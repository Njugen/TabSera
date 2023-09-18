import { useRef, useState } from "react";
import ClosedFolderIcon from "../images/icons/closed_folder_icon";
import Paragraph from "../components/utils/paragraph";
import FolderControlButton from "./utils/folder_control_button";
import OpenedFolderIcon from "../images/icons/opened_folder_icon";
import "../styles/global_utils.module.scss";
import WindowItem from "./window_item";
import { iFolder } from "../interfaces/folder";
import { useDispatch } from "react-redux";
import { deleteFolderAction } from "../redux/actions/FoldersActions";
import MessageBox from "./utils/message_box";

function Folder(props: iFolder) {
    const contentsRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null)
    const [expanded, setExpanded] = useState<boolean>(false);
    const [removalWarning, setRemovalWarning] = useState<boolean>(false);
    const dispatch = useDispatch();

    const { 
        id,
        name,
        desc,
        type,
        viewMode,
        settings,
        windows,
        onEdit 
      } = props;
    
    function handleExpandClick(e: any): void {
        if(contentsRef.current === null || headerRef.current === null) return;
  
            if(expanded === false){
                headerRef.current.className = `relative container tbf-${type} drop-shadow-contractedFolder bg-tbfColor-lightpurple px-5 h-14 flex items-center transition-all ease-in duration-400`;
                contentsRef.current.className = "max-h-[2000px] overflow-none transition-all ease-in duration-700 bg-white border border-tbfColor-lightpurple";
                setExpanded(true);
            } else {
                headerRef.current.className = `relative container tbf-${type} drop-shadow-contractedFolder bg-white px-5 h-14 flex items-center transition-all ease-out duration-600 bg-white`;
                contentsRef.current.className = "max-h-0 overflow-hidden transition-all ease-out duration-300 bg-white";
                setExpanded(false);
            }
        
    }

    function handleRemoveClick(): void {
        setRemovalWarning(true);
    }

    function renderWindows(): Array<JSX.Element>{
        const result: Array<JSX.Element> = windows.map((window, index) => <WindowItem disableEdit={true} key={"window-" + index} id={window.id} tabs={window.tabs} />)

        return result;
    }

    return (
        <>
            {removalWarning === true && 
                <MessageBox 
                    title="Warning" 
                    text={`You are about to remove the "${name}" folder and all its contents. This is irreversible, do you want to proceed?`}
                    primaryButton={{ text: "Yes, remove this folder", callback: () => { dispatch(deleteFolderAction(id)); setRemovalWarning(false)} }}
                    secondaryButton={{ text: "No, don't remove", callback: () => setRemovalWarning(false) }}    
                />
            }
            <div className={`${viewMode === "list" ? "my-4 duration-200" : "my-2 duration-200"} transition-all ease-in`}>
                <div ref={headerRef} className={`relative container tbf-${type} drop-shadow-contractedFolder bg-white px-5 h-14 flex items-center`}>
                    <div className="inline-block mr-3">
                        {expanded === false ? <ClosedFolderIcon size={36} fill={"#000"} /> : <OpenedFolderIcon size={36} fill={"#fff"} />}
                    </div>
                    <div className={`inline-block ${viewMode === "list" ? "w-10/12" : "w-5/12"}`}>
                        <h2 className={`text-xl truncate ${expanded === false ? "text-black" : "text-white"}`}>
                            {name}
                        </h2>
                    </div>
                    <div className="absolute flex items-center right-6">
                        <FolderControlButton icon="open_browser" active={expanded} onClick={() => {}} />
                        <FolderControlButton icon="settings" active={expanded} onClick={onEdit} />
                        <FolderControlButton icon="trash" active={expanded} onClick={handleRemoveClick} />
                        <FolderControlButton icon="collapse_expand" active={expanded} onClick={handleExpandClick} />
                    </div>
                </div>
                <div ref={contentsRef} className="max-h-0 overflow-y-hidden bg-white ">
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