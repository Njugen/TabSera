import { iFolderItem } from '../../../interfaces/folder_item';
import { iWindowItem } from '../../../interfaces/window_item';
import FolderItem from '../../folder_item/folder_item';
import { filterFoldersByString } from './filters';

const renderFolders = (collection: Array<iFolderItem>, keyword: string, callback: (windows: Array<iWindowItem>, type: string) => void): Array<JSX.Element> | JSX.Element => {
    const folders: Array<iFolderItem> = filterFoldersByString(collection, keyword);

    if(folders.length > 0){
        return folders.map((folder: iFolderItem) => (
            <FolderItem 
                key={`folder-sr-key-${folder.id}`} 
                marked={false} 
                id={folder.id!} 
                name={folder.name} 
                viewMode={"list"} 
                type={"collapsed"} 
                desc={folder.desc} 
                windows={folder.windows} 
                onOpen={callback} 
            />
        ));
    }
    
    return (
        <p className="text-center p-2">There are no results in this section</p>
    );
    
}

export default renderFolders;