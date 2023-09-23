import "./../styles/global_utils.module.scss";
import FormField from '../components/utils/form_field';
import Dropdown from '../components/utils/dropdown';
import Switcher from '../components/utils/switcher';

function SettingsView(props: any) {

    return (
        <>
            <div id="settings-view">
                <div className="mb-6 mx-auto flex justify-between">
                    <h1 className="text-4xl text-tbfColor-darkpurple font-light inline-block">
                        Settings
                    </h1>
                </div>
                <div className="bg-white p-6 drop-shadow-md min-h-[83.33333333333vh]">
                    <div className="w-5/12">
                        <FormField label="Auto suspend" description="Suspend all inactive tabs after a certain time">
                            <Dropdown onCallback={(e) => {}} tag="testdropdown2" preset={{ id: 0, label: "10 minutes" }} options={[{ id: 0, label: "10 minutes" }, { id: 1, label: "20 minutes" }, { id: 2, label: "30 minutes" }, { id: 3, label: "1 hour" }, { id: 4, label: "Never" }]} />
                        </FormField>
                        <FormField label="Performance notification" description="Warn me if the total amount of tabs exceeds a certain threshold when launching a new window or folder">
                            <Dropdown onCallback={(e) => {}} tag="testdropdown3" preset={{ id: 0, label: "5" }} options={[{ id: 0, label: "5" }, { id: 1, label: "10" }, { id: 2, label: "15" }, { id: 3, label: "20" }, { id: 4, label: "30" }, { id: 5, label: "Don't warn me" } ]} />
                        </FormField>
                        <FormField label="Duplication warnings" description="Show a warning message before duplicating at least a certain amount of selected folders">
                            <Dropdown onCallback={(e) => {}} tag="testdropdown4" preset={{ id: 0, label: "3 folders" }} options={[{ id: 0, label: "3 folders" }, { id: 1, label: "4 folders" }, { id: 2, label: "5 folders" }, { id: 5, label: "Never" }]} />
                        </FormField>
                        <FormField label="Cancellation warnings" description="Show a warning message before discarding changes made to folders">
                            <Switcher value={false} onCallback={(e) => {}} />
                        </FormField>
                        <FormField label="Removal warnings" description="Show a warning message before deleting folders">
                            <Switcher value={false} onCallback={(e) => {}} />
                        </FormField>
                        <FormField label="Log errors" description="Automatically send error reports to the developer">
                            <Switcher value={false} onCallback={(e) => {}} />
                        </FormField>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SettingsView;