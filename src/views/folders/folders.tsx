import { useDispatch, useSelector } from 'react-redux';

import Workspaces from './workspaces';
import History from './history';
import CurrentSession from './currentSession';

function FolderView(props: any): JSX.Element {
    return (
        <>
          {/*  <div className="p-4 mb-10 flex justify-center bg-tbfColor-lighterpurple">
                <input className="text-sm h-10 w-8/12 opacity-50 focus:opacity-90 border-tbfColor-lightergrey focus:outline-0 focus:outline-tbfColor-lighterpurple4 focus:shadow-md hover:shadow p-5 rounded-3xl" type="text" />
    </div> */}
            <div>  
                <Workspaces />
                <CurrentSession />
                <History />
            </div>
            
        </>
    );
}

export default FolderView;