import styles from "./../../styles/global_utils.module.scss";
import { iFolderIconButton } from "../../interfaces/folder_icon_button";
import OpenBrowserIcon from "../../images/icons/open_browser_icon";
import SettingsIcon from "../../images/icons/settings_icon";
import TrashIcon from "../../images/icons/trash_icon";
import ExpandIcon from "../../images/icons/expand_icon";
import CollapseIcon from "../../images/icons/collapse_icon";

function SearchBar(props: any): JSX.Element {
    return (
        <>
            <div className="p-4 top-0 z-50 sticky flex justify-center bg-tbfColor-lighterpurple drop-shadow-md">
                <input className="text-sm h-10 w-7/12 opacity-50 focus:opacity-90 border-tbfColor-lightergrey focus:outline-0 focus:outline-tbfColor-lighterpurple4 focus:shadow-md hover:shadow p-5 rounded-3xl" type="text" />
                <div className="flex justify-center w-screen h-screen absolute z-500">
                    <div className="bg-white p-6 mt-20 h-72 w-7/12 z-10 rounded-lg drop-shadow-[0_5px_5px_rgba(0,0,0,0.15)]">
                        <div className="grid grid-cols-3 gap-x-4">   
                            <div className="">
                                <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">
                                    Workspaces
                                </h3>
                                <ul className="list-none text-sm text-tbfColor-darkergrey">
                                    <li className="my-2">Work related stuff</li>
                                    <li className="my-2">Device-Agnostic Design Course Material</li>
                                </ul>
                            </div>
                            <div className="">
                                <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">
                                    Currently opened
                                </h3>
                                <ul className="list-none text-sm text-tbfColor-darkergrey">
                                    <li className="my-2">Work related stuff</li>
                                    <li className="my-2">Device-Agnostic Design Course Material</li>
                                </ul>
                            </div>
                            <div className="">
                                <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">
                                    History
                                </h3>
                                <ul className="list-none text-sm text-tbfColor-darkergrey">
                                    <li className="my-2">Work related stuff</li>
                                    <li className="my-2">Device-Agnostic Design Course Material</li>
                                </ul>
                            </div>
                        </div> 
                    </div>
                </div> 
            </div>
            
        </>
    ); 
}

export default SearchBar;