"use client";

import Folder from './../components/folder'
import styles from "./../styles/global_utils.module.scss";
import PurpleButton from '../components/utils/primary_button';
import Popup from './../components/utils/popup';
import { useRef, useState, useEffect } from "react";
import Navlink from './../components/utils/navlink';
import GenericIconButton from './../components/utils/generic_icon_button';
import * as predef from "./../styles/predef";
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
                        <Dropdown onCallback={(e) => console.log(e.selected)} tag="testdropdown2" preset={{ id: 0, label: "10 minutes" }} options={[{ id: 0, label: "10 minutes" }, { id: 1, label: "20 minutes" }, { id: 2, label: "30 minutes" }, { id: 3, label: "1 hour" }, { id: 4, label: "Never" }]} />
                    </FormField>
                    <FormField label="Log errors" description="Automatically send error reports to the developer">
                        <Switcher onCallback={(e) => console.log(e.state)} />
                    </FormField>
                </div>
            </div>
        </>
    );
}

export default SettingsView;