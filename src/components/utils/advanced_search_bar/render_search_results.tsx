import { iFolderItem } from '../../../interfaces/folder_item';
import { iWindowItem } from '../../../interfaces/window_item';
import iHistoryState from "../../../interfaces/states/historyState";
import iCurrentSessionState from "../../../interfaces/states/currentSessionState";
import renderFolders from './render_folders';
import renderSessionTabs from './render_session_tabs';
import renderHistoryTabs from './render_history_tabs';

const renderSearchResults = (
        keyword: string, 
        launchFolder: (windows: Array<iWindowItem>, type: string) => void,
        foldersInfo: Array<iFolderItem>, 
        sessionInfo: iCurrentSessionState, 
        historyInfo: iHistoryState
    ): JSX.Element => {
        let results: JSX.Element;
    
        if(keyword.length > 0 ){
            results = (
                <div className="grid grid-cols-2 gap-x-[1.75rem]">   
                    <div className="">
                        <div className="mb-6">
                            <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">
                                Folders
                            </h3>
                            {
                                renderFolders(foldersInfo, keyword, launchFolder)
                            }
                        </div>

                        <div>
                            <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">
                                History
                            </h3>
                            {
                                renderHistoryTabs(historyInfo, keyword)
                            }
                        </div>
                    </div>
                    <div className="">
                        <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">
                            Currently opened
                        </h3>
                        {
                            renderSessionTabs(sessionInfo, keyword)
                        }
                    </div>
                </div>
            );
        } else {
            results = <p className="text-center">Enter a search term...</p>
        }

        return results;
}

export { renderFolders, renderSessionTabs, renderHistoryTabs, renderSearchResults };