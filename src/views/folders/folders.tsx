import { useDispatch, useSelector } from 'react-redux';

import Workspaces from './workspaces';
import History from './history';

function FolderView(props: any): JSX.Element {
    return (
        <>
            <Workspaces />
            <History />
        </>
    );
}

export default FolderView;