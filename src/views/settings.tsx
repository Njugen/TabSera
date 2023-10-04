import "./../styles/global_utils.module.scss";
import FormField from '../components/utils/form_field';
import Dropdown from '../components/utils/dropdown';
import Switcher from '../components/utils/switcher';
import { iDropdownSelected } from "../interfaces/dropdown";
import { iSwitcher, iSwitcherSelected } from "../interfaces/switcher";
import { useEffect, useCallback, useState } from 'react';
import { saveToStorage, getFromStorage } from "../services/webex_api/storage";

function SettingsView(props: any) {
    const [settings, setSettings] = useState<any>({});
   
    const autoSuspendOptions = [
        { id: 0, label: "10 minutes" }, 
        { id: 1, label: "20 minutes" }, 
        { id: 2, label: "30 minutes" }, 
        { id: 3, label: "1 hour" }, 
        { id: 4, label: "Never" }
    ];
    
    const performanceNotificationOptions = [
        { id: 0, label: "5" }, 
        { id: 1, label: "10" }, 
        { id: 2, label: "15" }, 
        { id: 3, label: "20" }, 
        { id: 4, label: "30" }, 
        { id: 5, label: "Don't warn me" } 
    ];

    const duplicationWarningOptions = [
        { id: 0, label: "3 folders" }, 
        { id: 1, label: "4 folders" }, 
        { id: 2, label: "5 folders" }, 
        { id: 3, label: "Never" }
    ];


    const getPresetAutoSuspend = (): any => {
        const result = autoSuspendOptions.filter((target) => target.id === settings.auto_suspend_setting);
        return result[0] || autoSuspendOptions[0];
    }

    const getPresetPerformanceNotification = (): any => {
        const result = performanceNotificationOptions.filter((target) => target.id === settings.performance_notification_setting);
        return result[0] || performanceNotificationOptions[0];
    }

    const getPresetDuplicationWarning = (): any => {
        const result = duplicationWarningOptions.filter((target) => target.id === settings.duplication_warning_setting);
        return result[0] || duplicationWarningOptions[0];
    }

    const saveAutoSuspend = (e: iDropdownSelected): void => {
        if(typeof e.selected !== "number") return;

        console.log("AUTO SUSPEND", e);
        saveToStorage("sync", "auto_suspend_setting", e.selected);
        setSettings({
            ...settings,
            "auto_suspend_setting": e.selected
        });
    } 

    const savePerformanceNotification = (e: iDropdownSelected): void => {
        if(typeof e.selected !== "number") return;

        saveToStorage("sync", "performance_notification_setting", e.selected);
        setSettings({
            ...settings,
            "performance_notification_setting": e.selected
        });
    } 

    const saveDuplicationWarning = (e: iDropdownSelected): void => {
        if(typeof e.selected !== "number") return;
        saveToStorage("sync", "duplication_warning_setting", e.selected);
        setSettings({
            ...settings,
            "duplication_warning_setting": e.selected
        });
    }

    const saveSelectedOption = (key: string, value: number): void => {
        saveToStorage("sync", key, value);
        setSettings({
            ...settings,
            [key]: value
        });
    }

    const saveSwitchSetting = (key: string, value: boolean): void => {
        saveToStorage("sync", key, value);
        setSettings({
            ...settings,
            [key]: value
        });
    }

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
            <div id="settings-view">
                <div className="mb-6 mx-auto flex justify-between">
                    <h1 className="text-4xl text-tbfColor-darkpurple font-light inline-block">
                        Settings
                    </h1>
                </div>
                <div className="bg-white p-6 drop-shadow-md min-h-[83.33333333333vh]">
                    <div className="w-5/12">
                        <FormField label="Auto suspend" description="Suspend all inactive tabs after a certain time">
                            <Dropdown onCallback={(e) => typeof e.selected === "number" && saveSelectedOption("auto_suspend_setting", e.selected)} tag="testdropdown2" preset={getPresetAutoSuspend()} options={autoSuspendOptions} />
                        </FormField>
                        <FormField label="Performance notification" description="Warn me if the total amount of tabs exceeds a certain threshold when launching a new window or folder">
                            <Dropdown onCallback={(e) => typeof e.selected === "number" && saveSelectedOption("performance_notification_setting", e.selected)} tag="testdropdown3" preset={getPresetPerformanceNotification()} options={performanceNotificationOptions} />
                        </FormField>
                        
                        <FormField label="Duplication warnings" description="Show a warning message before duplicating at least a certain amount of selected folders">
                            <Dropdown onCallback={(e) => typeof e.selected === "number" && saveSelectedOption("duplication_warning_setting", e.selected)} tag="testdropdown4" preset={getPresetDuplicationWarning()} options={duplicationWarningOptions} />
                        </FormField>
                        <FormField label="Cancellation warnings" description="Show a warning message before discarding changes made to folders">
                            <Switcher value={settings.cancellation_warning_setting} onCallback={(e) => e.state !== null && saveSwitchSetting("cancellation_warning_setting", e.state)} />
                        </FormField>
                        <FormField label="Browser relaunch" description="Close all currently opened windows and tabs when launching a folder">
                            <Switcher value={settings.browser_relaunch_setting} onCallback={(e) => e.state !== null && saveSwitchSetting("browser_relaunch_setting", e.state)} />
                        </FormField>
                        <FormField label="Removal warnings" description="Show a warning message before deleting folders">
                            <Switcher value={settings.removal_warning_setting} onCallback={(e) => e.state !== null && saveSwitchSetting("removal_warning_setting", e.state)} />
                        </FormField>
                        <FormField label="Log errors" description="Automatically send error reports to the developer">
                            <Switcher value={settings.error_log_setting} onCallback={(e) => e.state !== null && saveSwitchSetting("error_log_setting", e.state)} />
                        </FormField>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SettingsView;