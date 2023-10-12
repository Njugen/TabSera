import { useRef, useState, useEffect } from "react";
import ClosedFolderIcon from "../images/icons/closed_folder_icon";
import Paragraph from "../components/utils/paragraph";
import FolderControlButton from "./utils/folder_control_button";
import OpenedFolderIcon from "../images/icons/opened_folder_icon";
import "../styles/global_utils.module.scss";
import WindowItem from "./window_item";
import { iFolder } from "../interfaces/folder";
import { useDispatch } from "react-redux";
import Checkbox from './utils/checkbox';
import { iWindowItem } from "../interfaces/window_item";
import MessageBox from "./utils/message_box";

function Folder(props: iFolder) {
    const contentsRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null)
    const [expanded, setExpanded] = useState<boolean>(false);
    const [totalTabsCount, setTotalTabsCount] = useState<number>(0);
    const [showLaunchOptions, setShowLaunchOptions] = useState<boolean>(false);
    const [slideDown, setSlideDown] = useState<boolean>(false);
    
    const subMenuRef = useRef<HTMLUListElement>(null);

    const dispatch = useDispatch();

    function handleShowSubMenu(): void {
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
        settings,
        windows,
        onOpen,
        onMark,
        onDelete,
        onEdit 
      } = props;
    
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
        const result: Array<JSX.Element> = windows.map((window, index) => <WindowItem disableMark={true} disableEdit={true} key={"window-" + index} id={window.id} tabs={window.tabs} />)

        return result;
    }

    function handleOpen(): void {
        setShowLaunchOptions(true);
        handleShowSubMenu();
    }

    function handleLaunch(type: string): void {
        if(onOpen) {
            onOpen(windows, type);
        }
        setShowLaunchOptions(false);
        setSlideDown(false);
    }

    function handleWindowClick(e: any): void {
       console.log("LAUNCH OPT", showLaunchOptions);
        e.stopPropagation();
/*
       // if(!e.target.parentElement || !e.target.parentElement.parentElement) return;
        const targetId = `folder-control-dropdown`;

        const firstParent = e.target.parentElement!.id;
        //const secondParent = e.target.parentElement.parentElement.id
        console.log("Launch", showLaunchOptions, slideDown);
        
            console.log("blabla", e.target);
            //setShowLaunchOptions(false);
            //setSlideDown(true);
         //   handleShowSubMenu();
     */
        if(showLaunchOptions === true){
            setShowLaunchOptions(false);
            setSlideDown(false);
            handleShowSubMenu();
        }

    }

    useEffect(() => {
        window.addEventListener("click", handleWindowClick);

        return () => {
            window.removeEventListener("click", handleWindowClick);
        }
    }, [slideDown])

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
                        showLaunchOptions === true && (
                                <ul ref={subMenuRef} id={"folder-control-dropdown"} className={`z-50 list-none drop-shadow-no_pos overflow-y-auto bg-white absolute max-h-[2000px] mt-2 text-sm text-tbfColor-darkergrey rounded-lg  ${slideDown === false ? "transition-all top-4 ease-out h-0 duration-500" : "transition-all top-12 ease-in duration-75"}`}>
                                    <li>
                                        <button onClick={() => handleLaunch("normal")} className="hover:bg-tbfColor-lightgrey border-b border-tbfColor-middlegrey hover:border-tbfColor-lightergrey flex items-center text-sm text-tbfColor-darkergrey weight-bold px-3 py-6 h-10 w-full">
                                            Normal launch
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => handleLaunch("group")} className="hover:bg-tbfColor-lightgrey border-b border-tbfColor-middlegrey hover:border-tbfColor-lightergrey flex items-center text-sm text-tbfColor-darkergrey weight-bold px-3 py-6 h-10 w-full">
                                            Launch as group
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => handleLaunch("incognito")} className="hover:bg-tbfColor-lightgrey border-b border-tbfColor-middlegrey hover:border-tbfColor-lightergrey flex items-center text-sm text-tbfColor-darkergrey weight-bold px-3 py-6 h-10 w-full">
                                            Launch in incognito
                                        </button>
                                    </li>
                                </ul>
                            )
                        }
                        <FolderControlButton icon="open_browser" active={expanded} onClick={handleOpen/*() => onOpen && onOpen(windows)*/} />
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