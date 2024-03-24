import TabItem from '../../tab_item';
import { filterSessionTabsByString } from './filters';
import iCurrentSessionState from "../../../interfaces/states/currentSessionState";

// Render all filtered session tabs
const renderSessionTabs = (collection: iCurrentSessionState, keyword: string): Array<JSX.Element> | JSX.Element => {
    const tabs: Array<chrome.tabs.Tab> = filterSessionTabsByString(collection, keyword);
    
    if(tabs.length > 0){
        return tabs.map((tab) => {
            const { id, title,url } = tab;
            
            return (
                <TabItem 
                    key={`tab-session-sr-key-${id}`} 
                    marked={false} 
                    id={id!} 
                    label={title!} 
                    url={url!} 
                    disableEdit={true} 
                    disableMark={true} 
                    disableCloseButton={false} 
                    onClose={() => id && chrome.tabs.remove(id)} 
                />
            )
        });
    } 
    
    return (
        <p className="text-center p-2">There are no results in this section</p>
    );
}

export default renderSessionTabs;