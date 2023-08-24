"use client"

import { useRef, useState } from "react";
import ClosedFolderIcon from "../images/icons/closed_folder_icon";
import Paragraph from "../components/utils/paragraph";
import PurpleButton from "./utils/purple_button";
import FolderControlButton from "./utils/folder_control_button";
import OpenedFolderIcon from "../images/icons/opened_folder_icon";
import styles from "./../styles/global_utils.module.scss";

function Folder(props: iFolder) {
    const contentsRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null)
    const [expanded, setExpanded] = useState<boolean>(false);

    const { 
        type, 
        name, 
        windows 
      } = props;
    
    function handleExpandClick(e: any) {
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

    return (
        <div className="my-6">
            <div ref={headerRef} className={`relative container tbf-${type} drop-shadow-contractedFolder bg-white px-5 h-14 flex items-center`}>
                <div className="inline-block mr-3">
                    {expanded === false ? <ClosedFolderIcon size={36} fill={"#000"} /> : <OpenedFolderIcon size={36} fill={"#fff"} />}
                </div>
                <div className="bg-blue inline-block">
                    <h2 className={`text-xl ${expanded === false ? "text-black" : "text-white"}`}>
                        {name}
                    </h2>
                </div>
                <div className="inline-block absolute flex items-center right-6">
                    <FolderControlButton icon="open_browser" active={expanded} onClick={() => {}} />
                    <FolderControlButton icon="settings" active={expanded} onClick={() => {}} />
                    <FolderControlButton icon="trash" active={expanded} onClick={() => {}} />
                    <FolderControlButton icon="collapse_expand" active={expanded} onClick={handleExpandClick} />
                </div>
            </div>
            <div ref={contentsRef} className="max-h-0 overflow-y-hidden bg-white ">
                <div className="px-5 py-8 flex justify-between items-start">
                    <div className="inline-block w-fit">
                        <Paragraph text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum, eros semper gravida ultricies, velit ipsum lacinia tortor, at varius mauris tortor in orci. Sed maximus orci vitae metus accumsan." />
                    </div>
                    <div className="inline-block flex justify-end w-[240px]">
                        <PurpleButton text="New window" onClick={() => {}} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Folder;