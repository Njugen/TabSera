//import './global.css'
import Navlink from './components/utils/navlink';
import { useEffect, useRef, useState } from 'react';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import CollapseIcon from './images/icons/collapse_icon';
import "./styles/global_utils.module.scss";
import './App.css';
import FolderView from './views/folders';
import SettingsView from './views/settings';
import getAllTabs from './services/webex_api/tabs';
import { getAllWindows } from './services/webex_api/windows';

function App() {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [activeNavLink, setActiveNavLink] = useState<string>("options"); 

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

  useEffect(() => {
  
  }, []);

  function handleScrollButtonClick(): void {
    if (rootRef.current === null || rootRef.current?.scrollTop === undefined) return;
    rootRef.current.scrollTop = 0;
  }

  useEffect(() => {
    rootRef.current?.addEventListener("scroll", showScrollUpButton);
    return () => rootRef.current?.removeEventListener("scroll", showScrollUpButton);
  }, []);

  const navLinks: Array<JSX.Element> = [
    <Navlink key="folders-nav-link"  label="Folders" url="/options" isActive={activeNavLink === "options" ? true : false} onClick={() => setActiveNavLink("options")} />,
    <Navlink key="settings-nav-link" label="Settings" url="/settings" isActive={activeNavLink === "settings" ? true : false} onClick={() => setActiveNavLink("settings")} />
  ];

  function renderViewWrapper(view: JSX.Element): JSX.Element {
    return (<>
          <div className="navbar flex justify-center py-4 items-center mx-auto">
            {navLinks.map((link) => link)}
          </div>
          <div id="body" className="container w-full mx-auto my-8">
            {view}
          </div>
    </>);
  };

  const router = createBrowserRouter([
    {
      path: "/options.html",
      element: renderViewWrapper(<FolderView />)
    },
    {
      path: "/options",
      element: renderViewWrapper(<FolderView />)
    },
    {
      path: "/settings",
      element: renderViewWrapper(<SettingsView />)
    }
  ]);

  return (
    <div className="App bg-tbfColor-lightgrey">
       {showScrollTop === true && <button className={`bg-tbfColor-lightpurple flex scroll_button_shadow justify-center items-center w-14 h-14 rounded-full absolute bottom-10 right-10 z-[500]`} onClick={handleScrollButtonClick}>
          <CollapseIcon size={40} fill={"#fff"} />
        </button>}
        <div ref={rootRef} id="root" className="none:container h-screen w-screen pb-20 scroll-smooth">
          
          <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
