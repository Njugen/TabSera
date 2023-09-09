"use client";

import Folder from './components/folder'
import styles from "./styles/global_utils.module.scss";
import PurpleButton from './components/utils/primary_button';
import Popup from './components/utils/popup';
import { useRef, useState, useEffect } from "react";
import Navlink from './components/utils/navlink';
import GenericIconButton from './components/utils/generic_icon_button';
import * as predef from "./styles/predef";
import FolderView from './folders/page';

export default function Home() {


  return ( 
    <FolderView />
  )
}