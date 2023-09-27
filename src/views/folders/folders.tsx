import { useDispatch, useSelector } from 'react-redux';

import Workspaces from './workspaces';
import History from './history';
import CurrentSession from './currentSession';

function FolderView(props: any): JSX.Element {
    return (
        <>
            <Workspaces />
            <CurrentSession />
            <History />
            
        </>
    );
}

export default FolderView;