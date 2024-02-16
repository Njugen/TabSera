import SimpleSearchBar from '../components/utils/simple_search_bar';
import '../App.css';
import styles from "./../styles/global_utils.module.scss";
import "./../styles/sidepanel_specific.css";
import { useState, useEffect } from 'react';
import Navlink from '../components/utils/navlink';
import FoldersView from '../views/sidepanel/folders_view';

function RenderSidePanel(props: any): JSX.Element {
    const [view, setView] = useState<string>("folders-view");

    const renderView = (): JSX.Element => {
        let component: JSX.Element = <></>;
        if(view === "folders-view"){
            component = <FoldersView onNavigate={(target: string) => setView(target)} />
        } else if(view === "add-folder-view"){
            component = <></>
        }

        return component;
    }

    const handleChange = (e: any): void => {
        console.log(e.target.value);
    }

    return (
        <>
            <div className={"p-4 border-b border-gray-100 sticky top-0 z-50 bg-white shadow"}>
                <SimpleSearchBar onChange={handleChange} />
                <div className="flex justify-between mt-8">
                    <button className="text-tbfColor-lightpurple font-semibold">Folders</button>
                    <button className="text-gray-400 hover:text-tbfColor-lighterpurple transition ease-in-out duration-300 font-semibold">Current tabs</button>
                    <button className="text-gray-400 hover:text-tbfColor-lighterpurple transition ease-in-out duration-300 font-semibold">History</button>
                </div>
            </div>
            <div className={`overflow-y-auto p-4 pt-2 ${styles.scroll_style} bg-gray-50 min-h-[1000px]`}>
                {renderView()}
            </div>
            <div className="shadow bg-white sticky bottom-0 px-4 py-4 border-t-2 border-t-tbfColor-lightpurple flex justify-around z-50">
                <Navlink key="folders-nav-link" iconSize={20} label="" url="?view=main" isActive={false} onClick={() => window.open("./options.html?view=main", "_blank")} />
                <Navlink key="settings-nav-link" iconSize={20} label="" url="?view=settings" isActive={false} onClick={() => window.open("./options.html?view=settings", "_blank")} />
            </div>
        </>
    )
}

export default RenderSidePanel;