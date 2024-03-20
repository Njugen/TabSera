import WorkspacesSection from './sections/workspaces_section';
import CurrentSessionSection from './sections/current_session_section';
import HistorySection from './sections/history_section';

const DashboardView = (props: any): JSX.Element => {
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