//import './global.css'
import Navlink from './components/utils/navlink';
import { useEffect, useRef, useState } from 'react';
import { createBrowserRouter, Link, RouterProvider, useLocation, useNavigate } from 'react-router-dom';
import CollapseIcon from './images/icons/collapse_icon';
import styles from "./styles/global_utils.module.scss";
import './App.css';
import FolderView from './views/folders';
import SettingsView from './views/settings';
import getAllTabs from './services/webex_api/tabs';
import { getAllWindows } from './services/webex_api/windows';
import GenericIconButton from './components/utils/generic_icon_button';
import ConfigIcon from './images/icons/config_icon';
import MultipleFoldersIcon from './images/icons/multiple_folders_icon';
import LeftIcon from './images/icons/left_icon';
import RightIcon from './images/icons/right_icon';

function App() {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [activeNavLink, setActiveNavLink] = useState<string>("options"); 
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const { getAll } = chrome.windows;

  // Routing Start


  // Routing End

  const rootRef = useRef<HTMLDivElement>(null);

  function showScrollUpButton(): void {
    if (rootRef.current?.scrollTop === undefined) return;

    if(rootRef.current?.scrollTop > 0){
      if(showScrollTop === false) setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  }



  function handleScrollButtonClick(): void {
    if (rootRef.current === null || rootRef.current?.scrollTop === undefined) return;
    rootRef.current.scrollTop = 0;
  }

  useEffect(() => {
    rootRef.current?.addEventListener("scroll", showScrollUpButton);
    return () => rootRef.current?.removeEventListener("scroll", showScrollUpButton);
  }, []);

  function handleSidebarExpandButton(): void {
    setSidebarExpanded(sidebarExpanded === true ? false : true);
  }

  const navLinks: Array<JSX.Element> = [
    <Navlink key="folders-nav-link" iconSize={24} label="Folders" url="/options" isActive={activeNavLink === "options" ? true : false} onClick={() => setActiveNavLink("options")} />,
    <Navlink key="settings-nav-link" iconSize={24} label="Settings" url="/settings" isActive={activeNavLink === "settings" ? true : false} onClick={() => setActiveNavLink("settings")} />
  ];

  function expandedSidebarNav(): JSX.Element {
    return <>

      <div id="brand-section" className="h-32">

      </div>  
      <div id="main-menu" className="px-4">
        {navLinks.map((link) => link)}
      </div>
    </>;
  }

  function contractedSidebarNav(): JSX.Element {
    return <>

      <div id="brand-section" className="h-32">

      </div>  
      <div id="main-menu" className="flex flex-col items-center justify-center">
        <div className="my-2">
          <Navlink key="folders-nav-link" iconSize={32} url="/options" isActive={activeNavLink === "options" ? true : false} onClick={() => setActiveNavLink("options")} />
        </div>
        <div className="my-2">
          <Navlink key="settings-nav-link" iconSize={32} url="/settings" isActive={activeNavLink === "settings" ? true : false} onClick={() => setActiveNavLink("settings")} />
        </div>
      </div>
    </>;
  }

  function renderViewWrapper(view: JSX.Element): JSX.Element {
    return (<>
          <div className="flex h-full">
            <div id="sidebar" className={`relative ${styles.sidebar_shadow} ${sidebarExpanded === true ? "min-w-[200px]" : "min-w-[70px]"} transition-all ease-in duration-200 border-r  border-tbfColor-middlegrey bg-white`}>
              <button className={`flex justify-center items-center bottom-0 right-0 float-right h-10 ${sidebarExpanded === true ? "w-8" : "w-full"} bg-tbfColor-darkpurple`} onClick={handleSidebarExpandButton}>
                {sidebarExpanded === true ? <LeftIcon size={30} fill="#fff" /> : <RightIcon size={30} fill="#fff" />}
              </button>  
              {sidebarExpanded === true ? expandedSidebarNav() : contractedSidebarNav()}
              
            </div>
            <div id="body" className="container w-full mx-8 my-4">
              {view}
            </div>
          </div>
    </>);
  };

  const router = createBrowserRouter([
    {
      path: "/options",
      element: renderViewWrapper(<FolderView />)
    },
    {
      path: "/settings",
      element: renderViewWrapper(<SettingsView />)
    },  
    {
      path: "/options.html",
      element: renderViewWrapper(<FolderView />)
    },
  ]);

  return (
    <div className="App bg-tbfColor-lightgrey">
       {showScrollTop === true && <button className={`bg-tbfColor-lightpurple flex scroll_button_shadow justify-center items-center w-14 h-14 rounded-full absolute bottom-10 right-10 z-[500]`} onClick={handleScrollButtonClick}>
          <CollapseIcon size={40} fill={"#fff"} />
        </button>}
        <div ref={rootRef} id="root" className="none:container h-screen w-screen scroll-smooth">
          
          <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
