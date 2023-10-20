import { useRef, useState, useEffect } from "react";
import ClosedFolderIcon from "../images/icons/closed_folder_icon";
import Paragraph from "../components/utils/paragraph";
import FolderControlButton from "./utils/folder_control_button";
import OpenedFolderIcon from "../images/icons/opened_folder_icon";
import "../styles/global_utils.module.scss";
import WindowItem from "./window_item";
import { iFolder } from "../interfaces/folder";
import Checkbox from './utils/checkbox';
import DropdownMenu from "./utils/dropdown_menu";
import { iFieldOption } from "../interfaces/dropdown";

/*
    Folder containing description, windows and tabs, as well as various folder options
*/

function Folder(props: iFolder) {
    const contentsRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null)
    const [expanded, setExpanded] = useState<boolean>(false);
    const [showLaunchOptions, setShowLaunchOptions] = useState<boolean>(false);
    const [slideDown, setSlideDown] = useState<boolean>(false);
    
    // Show a list of options for how to launch this folder
    function handleShowLaunchOptionsMenu(): void {
        if(showLaunchOptions === false){
            setShowLaunchOptions(true);
            setTimeout(() => {
                setSlideDown(slideDown === true ? false : true);
            }, 200);
        } else {
            setSlideDown(false);
            setTimeout(() => {
                setShowLaunchOptions(false);
            }, 200);
        }
    
    }

    const { 
        id,
        name,
        marked,
        desc,
        type,
        viewMode,
        windows,
        onOpen,
        onMark,
        onDelete,
        onEdit 
    } = props;
    
    // Expand or collapse this folder
    function handleExpandClick(e: any): void {
        if(contentsRef.current === null || headerRef.current === null) return;
  
            if(expanded === false){
                headerRef.current.className = `relative tbf-${type} bg-tbfColor-lightpurple px-3 h-10 flex items-center transition-all ease-in duration-400 rounded-t-md`;
                contentsRef.current.className = "max-h-[2000px] overflow-hidden transition-all ease-in duration-[50ms] bg-tbfColor-lighterpurple4 border border-tbfColor-lightpurple rounded-b-md";
                setExpanded(true);
            } else {
                headerRef.current.className = `relative tbf-${type}  hover:bg-tbfColor-lighterpurple2 border border-tbfColor-lighterpurple hover:border-tbfColor-lightpurple bg-tbfColor-lighterpurple3 px-3 h-10 flex items-center rounded-md transition-all ease-in duration-100`;
                contentsRef.current.className = "max-h-0 overflow-hidden transition-all ease-out duration-[50ms] bg-tbfColor-lighterpurple4 rounded-b-md";
                setExpanded(false);
            }        
    }

    function renderWindows(): Array<JSX.Element>{
        const result: Array<JSX.Element> = windows.map((window, index) => <WindowItem disableTabMark={true} disableTabEdit={true} key={"window-" + index} id={window.id} tabs={window.tabs} />)

        return result;
    }

    // Prepare to open a folder: show launch options -> open folder accordingly
    function handleOpen(): void {
        setShowLaunchOptions(true);
        handleShowLaunchOptionsMenu();
    }

    // Launch a folder based on selected option
    function handleLaunch(id: number): void {
        let type: string = "";

        if(id === 0){
            type = "normal";
        } else if(id === 1){
            type = "group";
        } else if(id === 2){
            type = "incognito";
        }

        if(onOpen) {
            onOpen(windows, type);
        }
        setShowLaunchOptions(false);
        setSlideDown(false);
    }

    function handleWindowClick(e: any): void {
        e.stopPropagation();

        if(showLaunchOptions === true){
            setShowLaunchOptions(false);
            setSlideDown(false);
            handleShowLaunchOptionsMenu();
        }

    }

    useEffect(() => {
        // Listen for clicks in the viewport. If the options list is visible, then hide it once
        // anything is clicked
        window.addEventListener("click", handleWindowClick);

        return () => {
            window.removeEventListener("click", handleWindowClick);
        }
    }, [slideDown])

    // List of all options on how to launch this folder. The id identifies the option, and
    // actions are performed accordingly.
    const launchOptions: Array<iFieldOption> = [
        {
            id: 0,
            label: "Open"
        },
        {
            id: 1,
            label: "Open as group"
        },
        {
            id: 2,
            label: "Open in incognito"
        }
    ]

    function handleDelete(): () => void {
        if(onDelete) onDelete(props);

        return () => {};
    }

    function handleEdit(e: any): () => void {
        if(onEdit) onEdit(e);

        return () => {}
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
                        { 
                        showLaunchOptions === true && <DropdownMenu selected={null} tag={"folder-control-dropdown"} onSelect={handleLaunch} options={launchOptions} />
                        }
                        <FolderControlButton icon="open_browser" active={expanded} onClick={handleOpen} />
                        <FolderControlButton icon="settings" active={expanded} onClick={handleEdit} />
                        <FolderControlButton icon="trash" active={expanded} onClick={handleDelete} />
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