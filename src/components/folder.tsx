"use client"

import { useRef, useState } from "react";
import ClosedFolderIcon from "../images/icons/closed_folder_icon";
import Paragraph from "../components/utils/paragraph";
import PrimaryButton from "./utils/primary_button";
import FolderControlButton from "./utils/folder_control_button";
import OpenedFolderIcon from "../images/icons/opened_folder_icon";
import "../styles/global_utils.module.scss";
import Switcher from "./utils/switcher";
import WindowItem from "./window_item";
import { iFolder } from "../interfaces/folder";

function Folder(props: iFolder) {
    const contentsRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null)
    const [expanded, setExpanded] = useState<boolean>(false);

    const { 
        type, 
        viewMode,
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

    function renderWindows(){
        let result = [];

        result = windows.map((window, index) => <WindowItem key={index} id={window.id} tabs={window.tabs} />)

        return result;
    }

    return (
        <div className={`${viewMode === "list" ? "my-6" : "my-2"}`}>
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
                    {viewMode === "list" && <Switcher label="Auto start" dark={expanded} onCallback={() => {}} />}
                    <FolderControlButton icon="open_browser" active={expanded} onClick={() => {}} />
                    <FolderControlButton icon="settings" active={expanded} onClick={() => {}} />
                    <FolderControlButton icon="trash" active={expanded} onClick={() => {}} />
                    <FolderControlButton icon="collapse_expand" active={expanded} onClick={handleExpandClick} />
                </div>
            </div>
            <div ref={contentsRef} className="max-h-0 overflow-y-hidden bg-white ">
                <div className="px-5 py-8 flex justify-between items-start">
                    {viewMode === "list" && <div className="inline-block w-fit">
                        <Paragraph text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum, eros semper gravida ultricies, velit ipsum lacinia tortor, at varius mauris tortor in orci. Sed maximus orci vitae metus accumsan." />
                    </div>}
                    <div className={`flex ${viewMode === "list" ? "w-[240px] justify-end" : "w-full justify-center"}`}>
                        <PrimaryButton text="New window" onClick={() => {}} />
                    </div>
                </div>
                <div className="px-5 mb-8">
                    {[...renderWindows()]}
                </div>
            </div>
            
        </div>
    );
}

export default Folder;