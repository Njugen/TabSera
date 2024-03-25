import './App.css';
import "./styles/global_utils.module.scss";
import styles from "./styles/global_utils.module.scss";
import Navlink from './components/utils/navlink';
import { useRef, useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SettingsView from './views/settings/settings_view';
import LeftIcon from './images/icons/left_icon';
import RightIcon from './images/icons/right_icon';
import AdvancedSearchBar from './components/features/advanced_search_bar/advanced_search_bar';
import RenderOptionsPage from './sections/options_page';
import RenderSidePanel from './sections/sidepanel';
import DashboardView from './views/dashboard/dashboard_view';

/*
  This file acts as the very foundation of this plugin's UI. This file
  connects a collapsable sidebar, a search bar and a page content section into one single unity,
  making it possible to retain all the basic UI elements while changing pages.

  This file also controls the navigation routes using React-Dom.
*/
function App() {
  
  
  
  const router = createBrowserRouter([
    {
      path: "/options.html",
      element: <RenderOptionsPage />
    },
    {
      path: "/sidepanel.html",
      element: <RenderSidePanel />
    },
  ]);

  return (
    <div className="App">
        <div id="root" className={`w-full pb`}>
          <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
