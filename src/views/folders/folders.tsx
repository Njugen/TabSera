import { useDispatch, useSelector } from 'react-redux';

import Workspaces from './workspaces';
import History from './history';

function FolderView(props: any): JSX.Element {
    const dispatch = useDispatch();

    const folderCollection = useSelector((state: any) => state.FolderCollectionReducer);
    const dataCollection = useSelector((state: any) => state.DataCollectionReducer);

    return (
        <>
            <Workspaces />
            <History />
        </>
    );
}

export default FolderView;