"use client";

import Folder from './components/folder'
import styles from "./styles/global_utils.module.scss";
import PurpleButton from './components/utils/purple_button';
import Popup from './components/utils/popup';
import { useRef, useState } from "react";
import Navlink from './components/utils/navlink';
import GenericIconButton from './components/utils/generic_icon_button';

export default function Home() {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<String>("list");

  const navLinks: Array<JSX.Element> = [
    <Navlink key="folders-nav-link"  label="Folders" url="#" isActive={true} onClick={() => {}} />,
    <Navlink key="settings-nav-link" label="Settings" url="#" isActive={false} onClick={() => {}} />
  ];

  function handleChangeViewMode(){
    setViewMode(viewMode === "list" ? "grid" : "list")
  }

  return (<>
    
    {showPopup === true && 
      <Popup title="Create folder" onSave={() => {}} onClose={() => setShowPopup(false)} >test</Popup>
    }

    <div id="root" className="none:container h-screen w-screen pb-20">
      <div className="navbar flex justify-center py-4 items-center mx-auto">
        {navLinks.map((link) => link)}
      </div>
      <div id="body" className="container w-full mx-auto my-8">
        <div id="folders-view">
          <div className="my-10 mx-auto flex justify-between">
            <h1 className="text-4xl text-tbfColor-darkpurple font-light inline-block">
              Folders
            </h1>
            <div className="inline-flex items-center">
              <div className="mr-4 inline-flex items-center">
                <GenericIconButton icon="search" fill="#6D00C2" size={30} />
                <GenericIconButton icon="grid" fill="#6D00C2" size={30} onClick={handleChangeViewMode} />
              </div>
              <PurpleButton text="Create folder" onClick={() => setShowPopup(true)} />
            </div>
          </div>
          <div className={viewMode === "list" ? "mx-auto" : "grid grid-cols-2 gap-x-4 gap-y-0"}>
            <Folder type={"collapsed"} viewMode={viewMode === "list" ? "list" : "grid"} name="Device-Agnostic Design" windows={[]} />
            <Folder type={"collapsed"} viewMode={viewMode === "list" ? "list" : "grid"} name="Studies" windows={[]} />
            <Folder type={"collapsed"} viewMode={viewMode === "list" ? "list" : "grid"} name="Free time" windows={[]} />
            <Folder type={"collapsed"} viewMode={viewMode === "list" ? "list" : "grid"} name="Device-Agnostic Design" windows={[]} />
            <Folder type={"collapsed"} viewMode={viewMode === "list" ? "list" : "grid"} name="Studies" windows={[]} />
            <Folder type={"collapsed"} viewMode={viewMode === "list" ? "list" : "grid"} name="Free time" windows={[]} />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}