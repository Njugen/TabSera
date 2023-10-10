import Workspaces from './workspaces';
import History from './history';
import CurrentSession from './currentSession';

function FolderView(props: any): JSX.Element {
    return (
        <>
            <div>  
                <Workspaces />
                <CurrentSession />
                <History />
            </div>
            
        </>
    );
}

export default FolderView;