"use client";


import "./../styles/global_utils.module.scss";

import FormField from '../components/utils/form_field';
import Dropdown from '../components/utils/dropdown';
import Switcher from '../components/utils/switcher';


function SettingsView(props: any) {

    return (
        <>
            <div id="settings-view">
                <div className="my-10 mx-auto flex justify-between">
                    <h1 className="text-4xl text-tbfColor-darkpurple font-light inline-block">
                        Settings
                    </h1>
                </div>
                <div className="w-6/12">
                    <FormField label="Auto suspend" description="Suspend all inactive tabs after a certain time">
                        <Dropdown onCallback={(e) => {}} tag="testdropdown2" preset={{ id: 0, label: "10 minutes" }} options={[{ id: 0, label: "10 minutes" }, { id: 1, label: "20 minutes" }, { id: 2, label: "30 minutes" }, { id: 3, label: "1 hour" }, { id: 4, label: "Never" }]} />
                    </FormField>
                    <FormField label="Performance notification" description="Warn me if the total amount of tabs exceeds the selected value when launching a new windows or folders">
                        <Dropdown onCallback={(e) => {}} tag="testdropdown3" preset={{ id: 0, label: "5" }} options={[{ id: 0, label: "10" }, { id: 1, label: "15" }, { id: 2, label: "20" }, { id: 3, label: "30" }, { id: 4, label: "40" }, { id: 5, label: "Don't warn me" } ]} />
                    </FormField>
                    <FormField label="Log errors" description="Automatically send error reports to the developer">
                        <Switcher value={false} onCallback={(e) => {}} />
                    </FormField>
                </div>
            </div>
        </>
    );
}

export default SettingsView;