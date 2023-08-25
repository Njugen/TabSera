"use client";

import Folder from './components/folder'
import styles from "./styles/global_utils.module.scss";
import PurpleButton from './components/utils/purple_button';
import Popup from './components/popup';
import { useRef, useState } from "react";

export default function Home() {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (<>
    
    {showPopup === true && 
      <Popup title="Create folder" onSave={() => {}} onClose={() => setShowPopup(false)} >test</Popup>
    }

    <div id="root" className="none:container h-screen w-screen pb-20">
      <div id="header" className={`none:container mx-auto flex justify-center items-center w-full h-32 white border-b bg-white border-tbfColor-lgrey`}>
        test
      </div> 
      <div id="navbar" className="flex justify-center items-center h-24 mx-auto p-10">
        <a href="#" id="current-nav-link" className="font-semibold underline mx-8 text-tbfColor-darkpurple">
          Folders
        </a>
        <a href="#" id="nav-link" className={`${styles.opacity_hover_effect}`}>
          Settings
        </a>

        
      </div>
      <div id="body" className="container md:w-7/12 mx-auto my-10">
        <div id="folders-view">
          <div className="my-10 flex justify-between">
            <h1 className="text-4xl text-tbfColor-darkpurple font-light inline-block">
              Folders
            </h1>
            <div className="inline-block">
              <PurpleButton text="Create folder" onClick={() => setShowPopup(true)} />
            </div>
          </div>
          <Folder type={"collapsed"} name="Device-Agnostic Design" windows={[]} />
          <Folder type={"collapsed"} name="Studies" windows={[]} />
          <Folder type={"collapsed"} name="Free time" windows={[]} />
        </div>
      </div>
    </div>
    </>
  )
}