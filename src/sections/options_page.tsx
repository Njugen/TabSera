import './../App.css';
import "./../styles/global_utils.module.scss";
import styles from "./../styles/global_utils.module.scss";
import Navlink from './../components/utils/navlink';
import { useRef, useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FolderView from './../views/folders/folders';
import SettingsView from './../views/settings';
import LeftIcon from './../images/icons/left_icon';
import RightIcon from './../images/icons/right_icon';
import SearchBar from './../components/utils/search_bar';

function RenderOptionsPage(props: any){
    const [activeNavLink, setActiveNavLink] = useState<string>("options"); 
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  // Check whether or not a setting for sidebar expansion exists in browser storage. If so, set a state.
  useEffect(() => {
    chrome.storage.sync.get("expanded_sidebar", (data) => setSidebarExpanded(data.expanded_sidebar));
  }, []);

  const rootRef = useRef<HTMLDivElement>(null);

  // Expand/collapse sidebar, and save the information in the browser storage
  function handleSidebarExpandButton(): void {
    setSidebarExpanded(sidebarExpanded === true ? false : true);
    chrome.storage.sync.set({"expanded_sidebar": sidebarExpanded === true ? false : true});
  }

  function renderExpandedSidebarNav(): JSX.Element {
    return <div id="main-menu" className="px-2 py-4">
        <Navlink key="folders-nav-link" iconSize={20} label="Dashboard" url="?view=main" isActive={activeNavLink === "options" ? true : false} onClick={() => setActiveNavLink("options")} />
        <Navlink key="settings-nav-link" iconSize={20} label="Settings" url="?view=settings" isActive={activeNavLink === "settings" ? true : false} onClick={() => setActiveNavLink("settings")} />
      </div>;
  }

  function renderCollapsedSidebarNav(): JSX.Element {
    return <div id="main-menu" className="flex flex-col items-center justify-center">
        <div className="mt-1">
          <div className={`my-2 border p-2 rounded-lg ${activeNavLink === "options" ? "border-tbfColor-lightpurple" : "border-tbfColor-middlegrey2"}`}>
            <Navlink key="folders-nav-link" iconSize={32} url="?view=main" isActive={activeNavLink === "options" ? true : false} onClick={() => setActiveNavLink("options")} />
          </div>
          <div className={`my-2 border p-2 rounded-lg ${activeNavLink === "settings" ? "border-tbfColor-lightpurple" : "border-tbfColor-middlegrey2"}`}>
            <Navlink key="settings-nav-link" iconSize={32} url="?view=settings" isActive={activeNavLink === "settings" ? true : false} onClick={() => setActiveNavLink("settings")} />
          </div>
        </div>
      </div>;
  }

  // Render the plugin's user interface
  function renderUI(view: JSX.Element): JSX.Element {
    return (<>
           
            <div className="flex h-full w-full relative">
              <div id="sidebar" className={`drop-shadow-md sticky h-[calc(100vh)] top-0 left-0 self-start ${sidebarExpanded === true ? `${styles.sidebar_animation_expanded}` : `${styles.sidebar_animation_contracted}`} overflow-x-hidden items-end flex flex-col justify-between border-tbfColor-middlegrey bg-white`}>
                <div className="w-full px-2 ">
                  {sidebarExpanded === true ? renderExpandedSidebarNav() : renderCollapsedSidebarNav()}
                </div>
                <button className={`flex justify-center items-center bottom-0 right-0 float-right h-6 ${sidebarExpanded === true ? "w-full" : "w-full"} bg-tbfColor-middlegrey2 hover:opacity-70 transition-all ease-in`} onClick={handleSidebarExpandButton}>
                  {sidebarExpanded === true ? <LeftIcon size={20} fill="#828282" /> : <RightIcon size={20} fill="#828282" />}
                </button>  
              </div>
             
              <div ref={rootRef} id="body" className="container">
                <SearchBar />
                <div className="mx-16 my-12 pb-[50px]">
                  {view}
                </div>
              </div>
            </div>
    </>);
  };

  // Routing. Encapsulate a page component in the renderUI for each path.
  function renderView(){
    const url: string = window.location.href;
    const urlSplit: Array<string> = url.split("?");
    let result: JSX.Element = <></>;

    if(urlSplit.length === 1){
      result = renderUI(<FolderView />);
    } else if(urlSplit.length === 2){
      const paramSplit: Array<string> =  urlSplit[1].split("=");
      const key: string = paramSplit[0];
      const val: string = paramSplit[1]
      
      if(key === "view"){
        if(val === "main"){
          result = renderUI(<FolderView />);
        } else if(val === "settings"){
          result = renderUI(<SettingsView />);
        } else {
          result = renderUI(<FolderView />);
        }
      } else {
        result = renderUI(<FolderView />);
      }
    }

    return result;
  }

  return renderView();
}

export default RenderOptionsPage;