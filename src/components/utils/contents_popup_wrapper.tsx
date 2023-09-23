import { useState, useEffect, useRef } from "react";
import GenericIconButton from './generic_icon_button';
import PrimaryButton from './primary_button';
import GreyBorderButton from "./grey_border_button";
import FormField from "./form_field";
import * as predef from "../../styles/predef";
import Switcher from './switcher';
import { iPopup } from "../../interfaces/popup";
import styles from "../../styles/global_utils.module.scss";
import WindowManager from './window_manager';
import randomNumber from "../../tools/random_number";
import { useDispatch, useSelector } from "react-redux";
import { initInEditFolder, updateInEditFolder} from "../../redux/actions/inEditFolderActions";
import { createFolderAction, updateFolderAction } from "../../redux/actions/folderCollectionActions";
import { iFolder } from "../../interfaces/folder";
import MessageBox from './message_box';
import { setShowFolderChangeWarning } from "../../redux/actions/warningActions";


function ContentsPopupWrapper(props: iPopup): JSX.Element {
    const { children } = props;

    return (<>
        {children}
    </>)
}

export default ContentsPopupWrapper