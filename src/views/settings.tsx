import "./../styles/global_utils.module.scss";
import FormField from '../components/utils/form_field';
import Dropdown from '../components/utils/dropdown';
import Switcher from '../components/utils/switcher';
import { iFieldOption } from "../interfaces/dropdown";
import { useEffect, useState } from 'react';
import { saveToStorage } from "../services/webex_api/storage";

/*
    Settings view

    Consists of form fields wrapping input components in vertical order, representing various settings and options 
    in this plugin. 

    Wrap input, textarea, Dropdown, Switcher or Checkbox components into the formfields to add new
    features if needed while keeping the intended UI intact. 
*/

function SettingsView(props: any) {
    const [settings, setSettings] = useState<any>({});
    
    // Options for performance warnings
    const performanceNotificationOptions: Array<iFieldOption> = [
        { id: 5, label: "5" }, 
        { id: 10, label: "10" }, 
        { id: 15, label: "15" }, 
        { id: 20, label: "20" }, 
        { id: 30, label: "30" },
        { id: 40, label: "40" }, 
        { id: -1, label: "Don't warn me" } 
    ];

    // Options for duplication warnings
    const duplicationWarningOptions: Array<iFieldOption> = [
        { id: 2, label: "2 folders" }, 
        { id: 3, label: "3 folders" }, 
        { id: 4, label: "4 folders" }, 
        { id: 5, label: "5 folders" }, 
        { id: -1, label: "Never" }
    ];

    const getPresetPerformanceNotification = (): any => {
        const result = performanceNotificationOptions.filter((target) => target.id === settings.performance_notification_value);
        return result[0] || performanceNotificationOptions[0];
    }

    const getPresetDuplicationWarning = (): any => {
        const result = duplicationWarningOptions.filter((target) => target.id === settings.duplication_warning_value);
        return result[0] || duplicationWarningOptions[0];
    }

    // Save data selected in dropdown menu
    const saveSelectedOption = (key: string, value: number): void => {
        saveToStorage("sync", key, value);
        setSettings({
            ...settings,
            [key]: value
        });
    }

    // Save switcher data
    const saveSwitchSetting = (key: string, value: boolean): void => {
        saveToStorage("sync", key, value);
        setSettings({
            ...settings,
            [key]: value
        });
    }

    // Set default values of all fields
    useEffect(() => {
        chrome.storage.sync.get((items: object) => {
            let initialSettings = {settings};
            for(const [key, value] of Object.entries(items)){
                initialSettings = {
                    ...initialSettings,
                    [key]: value
                }
            }
            setSettings(initialSettings);
        })
    }, []);

    return (
        <>
            <div id="settings-view" className="mb-12 py-10 bg-white shadow">
                <div className="bg-white  px-16 min-h-[83.33333333333vh]">
                    <h1 className="text-4xl text-tbfColor-darkpurple mb-8 font-light inline-block">
                        Settings
                    </h1>
                    <div className="w-7/12">
                        <FormField label="Performance notification" description="Warn me if the total amount of tabs exceeds a certain threshold when launching multiple tabs">
                            <Dropdown onCallback={(e) => typeof e.selected === "number" && saveSelectedOption("performance_notification_value", e.selected)} tag="performance-dropdown" preset={getPresetPerformanceNotification()} options={performanceNotificationOptions} />
                        </FormField>                      
                        <FormField label="Duplication warnings" description="Show a warning message before duplicating at least a certain amount of selected folders">
                            <Dropdown onCallback={(e) => typeof e.selected === "number" && saveSelectedOption("duplication_warning_value", e.selected)} tag="duplication-warning-dropdown" preset={getPresetDuplicationWarning()} options={duplicationWarningOptions} />
                        </FormField>
                        <FormField label="Close at folder launch" description="Close current browser session when launching a folder">
                            <Switcher id="close_current_setting" value={settings.close_current_setting} onCallback={(e) => e !== null && saveSwitchSetting("close_current_setting", e)} />
                        </FormField>
                        <FormField label="Cancellation warnings" description="Show a warning message before discarding changes made to folders">
                            <Switcher id="cancellation_warning_setting" value={settings.cancellation_warning_setting} onCallback={(e) => e !== null && saveSwitchSetting("cancellation_warning_setting", e)} />
                        </FormField>
                        <FormField label="Removal warnings" description="Show a warning message before deleting folders">
                            <Switcher id="removal_warning_setting" value={settings.removal_warning_setting} onCallback={(e) => {e !== null && saveSwitchSetting("removal_warning_setting", e)}} />
                        </FormField>
                        <FormField label="Log errors" description="Automatically send error reports to the developer">
                            <Switcher id="error_log_setting" value={settings.error_log_setting} onCallback={(e) => e !== null && saveSwitchSetting("error_log_setting", e)} />
                        </FormField>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SettingsView;