import Folder from '../../components/folder'
import "./../../styles/global_utils.module.scss";
import PrimaryButton from '../../components/utils/primary_button';
import ManageFolderPopup from '../../components/utils/manage_folder_popup';
import { useEffect, useState } from "react";

import GenericIconButton from '../../components/utils/generic_icon_button';
import * as predef from "../../styles/predef";
import { iFolder } from '../../interfaces/folder';
import { useDispatch, useSelector } from 'react-redux';
import { clearInEditFolder  } from '../../redux/actions/inEditFolderActions';
import {  createFolderAction, readAllFoldersFromBrowserAction } from '../../redux/actions/folderCollectionActions';
import Paragraph from '../../components/utils/paragraph';
import { deleteFolderAction } from "../../redux/actions/folderCollectionActions";
import { saveToStorage, getFromStorage } from '../../services/webex_api/storage';
import MessageBox from '../../components/utils/message_box';
import GreyBorderButton from '../../components/utils/grey_border_button';
import TextIconButton from '../../components/utils/text_icon_button';
import randomNumber from '../../tools/random_number';
import { iWindowItem } from '../../interfaces/window_item';
import { clearMarkedFoldersAction, setFoldersSortOrder, setMarkedFoldersAction, setMarkMultipleFoldersAction } from '../../redux/actions/dataCollectionActions';
import Dropdown from '../../components/utils/dropdown';
import GridIcon from '../../images/icons/grid_icon';
import SortIcon from '../../images/icons/sort_icon';
import TabItem from '../../components/tab_item';
import WindowItem from '../../components/window_item';

function History(props: any): JSX.Element {
    const [viewMode, setViewMode] = useState<string>("grid");

    const dispatch = useDispatch();

    function handleChangeViewMode(): void {
        setViewMode(viewMode === "list" ? "grid" : "list");
    }

    function handleSort(e: any): void{
      //  dispatch(setFoldersSortOrder(e.selected === 0 ? "asc" : "desc"));
    }

    function renderOptionsMenu(): JSX.Element {
        return <>
        
            <div className="mr-4 inline-flex items-center justify-between w-full">
                
                <div className="flex w-5/12">
                    <TextIconButton icon={"selected_checkbox"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Mark all" onClick={() => {}} />
                    <TextIconButton icon={"deselected_checkbox"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Unmark all" onClick={() => {}} />
                    <TextIconButton icon={"trash"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Delete" onClick={() => {}} />
                </div>
                <div className="flex items-center justify-end w-8/12">
                    
                    <TextIconButton icon={viewMode === "list" ? "grid" : "list"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text={viewMode === "list" ? "Grid" : "List"} onClick={handleChangeViewMode} />
                    <div className="relative w-4/12 mr-4 flex items-center">
                    
                        <div className="mr-2">
                            <SortIcon size={24} fill="#6D00C2" />
                        </div> 
                        <div className="text-sm mr-4">Sort:</div> 
                        <Dropdown tag="sort-folders" preset={{id: 0, label: "Ascending"}} options={[{id: 0, label: "Ascending"}, {id: 1, label: "Descending"}]} onCallback={handleSort} />
                    </div>
                    <PrimaryButton text="Open selected" onClick={() => {}} />
                    <PrimaryButton text="Add to workspace" onClick={() => {}} />
                </div>
            </div>
               
            
        </>
    }

    return (
        <>
            
            <div id="history-view" className="mb-12">
                <div className="mb-6 mx-auto flex justify-between">
                    <h1 className="text-4xl text-tbfColor-darkpurple font-light inline-block">
                        Previously closed
                    </h1>
                </div>
                <div className="flex justify-between bg-white px-6 drop-shadow-md">
                    <div className="pt-6 w-full mb-6">
                        {renderOptionsMenu()}
                        <div className="w-full flex mt-10">
                            <div className="w-6/12 mr-8">
                                <h2 className="text-2xl text-black inline-block">
                                    Windows
                                </h2>
                                <div className="mt-6">
                                <WindowItem id={0} tabs={[
                                        {
                                            id: 0,
                                            label: "Another test tab",
                                            url: "https://facebook.com",
                                            disableEdit: true
                                        }
                                ]} />
                                </div>
                            </div>
                            <div className="w-6/12 ml-8">
                                <h2 className="text-2xl text-black inline-block">
                                    Single tabs
                                </h2>
                                <div className="mt-6">
                                    <TabItem id={0} label="Test Tab" url="https://google.com" disableEdit={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        </>  
    );

}

export default History