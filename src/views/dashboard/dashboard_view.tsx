import WorkspacesSection from './sections/workspaces_section';
import CurrentSessionSection from './sections/current_session_section';
import HistorySection from './sections/history_section';
import iView from '../../interfaces/view';

const DashboardView = (props: iView): JSX.Element => {
    return (
        <>
            <div>  
                <WorkspacesSection />
                <CurrentSessionSection />
                <HistorySection />
            </div>
            
        </>
    );
}

export default DashboardView;