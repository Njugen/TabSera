"use client"

import { useRef, useState } from "react";
import ClosedFolderIcon from "../images/icons/closed_folder_icon";
import OpenBrowserIcon from "../images/icons/open_browser_icon";
import SettingsIcon from "../images/icons/settings_icon";
import TrashIcon from "../images/icons/trash_icon";
import ExpandIcon from "../images/icons/expand_icon";
import CollapseIcon from "../images/icons/collapse_icon";

function Folder(props: Folder) {
    const folderContentsRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState<boolean>(false);

    const { 
        type, 
        name, 
        windows 
    }  = props;
    
    function handleExpandClick(e: any) {
        if(folderContentsRef.current !== null){
            const classList = folderContentsRef.current.classList;
            if(expanded === false){
                folderContentsRef.current.className = "max-h-[2000px] overflow-none transition-all ease-in duration-700 bg-white";
                setExpanded(true);
            } else {
                folderContentsRef.current.className = "max-h-0 overflow-hidden transition-all ease-out duration-200 bg-white";
                setExpanded(false);
            }
        }
    }

    
    return (
        <div className="my-6">
            <div className={`relative container tbf-${type} drop-shadow-contractedFolder bg-white px-5 h-14 flex items-center`}>
                <div className="inline-block mr-3">
                    <ClosedFolderIcon size={36} fill="#000" />
                </div>
                <div className="bg-blue inline-block">
                    <h2 className="text-xl">
                        {name}
                    </h2>
                </div>
                <div className="inline-block absolute flex items-center right-6">
                        <button className="mx-3">
                            <OpenBrowserIcon size={26} fill="#000" />
                        </button>
                        <button className="mx-3">
                            <SettingsIcon size={26} fill="#000" />
                        </button>
                        <button className="mx-3">
                            <TrashIcon size={26} fill="#000" />
                        </button>
                        <button className="ml-5" onClick={handleExpandClick}>
                            {expanded === false ? <ExpandIcon size={34} fill="#000" /> : <CollapseIcon size={34} fill="#000" />}
                        </button>
                </div>
            </div>
            <div ref={folderContentsRef} className="max-h-0 overflow-hidden bg-white">
                <div className="p-5">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum, eros semper gravida ultricies, velit ipsum lacinia tortor, at varius mauris tortor in orci. Sed maximus orci vitae metus accumsan, ac ultrices libero sollicitudin. Aenean et nisi rutrum, euismod diam at, tristique leo. Fusce finibus posuere tincidunt. Nullam urna justo, fringilla ut est in, venenatis facilisis elit. Cras consequat, risus quis condimentum faucibus, urna magna aliquet tellus, congue consectetur est nunc vel ligula. Quisque tellus sem, tincidunt eget arcu nec, varius ultricies tellus. 
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Folder;