import TabItem from '../../tab_item';
import { filterHistoryTabsByString } from './filters';
import iHistoryState from "../../../interfaces/states/historyState";

// Render all filtered history tabs
const renderHistoryTabs = (collection: iHistoryState, keyword: string): Array<JSX.Element> | JSX.Element => {
    const tabs: Array<chrome.history.HistoryItem> = filterHistoryTabsByString(collection, keyword);

    if(tabs.length > 0){
        return tabs.map((tab) => {
            const { id, title,url } = tab;

            return <TabItem 
                key={`tab-history-sr-key-${id}`} 
                marked={false} 
                id={parseInt(id)} 
                label={title!} 
                url={url!} 
                disableEdit={true} 
                disableMark={true} 
                disableCloseButton={true} 
            />
        });
    }

    return (
        <p className="text-center p-2">There are no results in this section</p>
    );
}

export default renderHistoryTabs;