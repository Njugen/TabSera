import styles from "./../../styles/global_utils.module.scss";
import { iNavlink } from "../../interfaces/nav_link";
import {Route, Link, Routes, useLocation} from 'react-router-dom';
import iMessageBox from './../../interfaces/message_box';

function MessageBox(props: iMessageBox): JSX.Element {
    const { title, text, primaryButton, secondaryButton } = props;

    return (
        <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full overflow-hidden bg-tbfColor-middlegrey2 z-[1000]">
            <div className="p-10 w-[500px] bg-tbfColor-darkpurple rounded-lg drop-shadow-2xl text-center leading-7 text-md">
                {title && <h4 className="text-lg text-white">{title}</h4>}
                <p className="mb-8 text-white">
                    {text}
                </p>
                <button onClick={secondaryButton.callback} className="hover:opacity-60 transition-all ease-in border-2 border-white bg-tbfColor-darkpurple text-white font-semibold px-3 py-2 mx-2 rounded-md">
                    { secondaryButton.text }
                </button>
                <button onClick={primaryButton.callback} className="hover:opacity-60 transition-all ease-in border-2 border-white bg-white text-tbfColor-darkpurple font-semibold px-3 py-2 mx-2 rounded-md">
                    { primaryButton.text }
                </button>
            </div>
        </div>
    ); 
}

export default MessageBox;