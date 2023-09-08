"use client";

import Folder from './../components/folder'
import styles from "./../styles/global_utils.module.scss";
import PurpleButton from './../components/utils/purple_button';
import Popup from './../components/utils/popup';
import { useRef, useState, useEffect } from "react";
import Navlink from './../components/utils/navlink';
import GenericIconButton from './../components/utils/generic_icon_button';
import * as predef from "./../styles/predef";

function SettingsView(props: any) {

    return (
        <>
            <div id="settings-view">
                <div className="my-10 mx-auto flex justify-between">
                    <h1 className="text-4xl text-tbfColor-darkpurple font-light inline-block">
                        Settings
                    </h1>
                </div>
                <div>
                    <p>Contents Here...</p>
                </div>
            </div>
        </>
    );
}

export default SettingsView;