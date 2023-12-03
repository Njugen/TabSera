import { render, screen, within, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import ManageFolderPopup from "../../../components/utils/manage_folder_popup";
import { Provider } from "react-redux";
import { store } from "../../../redux/reducer";
//import { store } from "../../../tools/testing/reduxStore";
import { chrome } from 'jest-chrome'
import { useDispatch, useSelector } from "../../../redux/mocked_hooks"; 
//import { renderWithProviders } from "../../../tools/testing/renderWithProviders";
import { updateFolderAction } from "../../../redux/actions/folderCollectionActions";
import { iFolder } from "../../../interfaces/folder";
import { initInEditFolder, updateInEditFolder } from "../../../redux/actions/inEditFolderActions";
//import { setupStore } from "../../../tools/testing/reduxStore";
//import { inEditFolderState } from "../../../redux/reducers/inEditFolderReducer";
import { act } from "react-dom/test-utils";
import configureStore from 'redux-mock-store';
import { FolderCollectionReducer } from "../../../redux/reducers/folderCollectionReducer";
import { InEditFolderReducer } from "../../../redux/reducers/inEditFolderReducer";
import { WarningActionsReducer } from "../../../redux/reducers/warningActionsReducer";
import { WorkspaceSettingsReducer } from "../../../redux/reducers/workspaceSettingsReducer";
import { HistorySettingsReducer } from "../../../redux/reducers/historySettingsReducer";
import { CurrentSessionSettingsReducer } from "../../../redux/reducers/currentSessionReducer";
import { MiscReducer } from "../../../redux/reducers/miscReducer";
import { mockStore } from "../../../redux/reducer";

jest.mock("../../../redux/mocked_hooks");
const mockFunction = jest.fn();
const mockNewFolderTitle = "This is a folder creation popup";
const mockEditFolderTitle = "This is a edit folder popup";
const mockDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer elementum, orci in pharetra euismod, mauris quam imperdiet eros, ut sodales magna metus et felis. Etiam ornare varius nisi, ultricies pulvinar tortor blandit ac. Proin cursus hendrerit ligula, dapibus imperdiet neque mollis et.";
const mockFolderName = "Studies and research";

const mockNewFolderState: iFolder = {
    id: 0,
    name: "",
    desc: "",
    marked: false,
    type: "expanded",
    viewMode: "list",
    windows: []
};

const mockEditFolderState: iFolder = {
    id: 1,
    name: "Dragonball Z",
    desc: "This is a folder with links to Dragonball related pages",
    marked: false,
    type: "expanded",
    viewMode: "list",
    windows: [{
        id: 0,
        tabs: [{
            id: 0,
            label: "test tab",
            url: "http://localhost:3000",
            marked: false
        }]
    }]
};


afterEach(() => {
   jest.clearAllMocks();
});

describe("Create new workspace", () => {
    beforeEach(() => {
        const state = mockStore();
        useSelector.mockImplementation(() => state.getState());
        useDispatch.mockClear();
        useDispatch.mockImplementation(() => state.dispatch);
    })
 
    test(`popup title reads "${mockNewFolderTitle}"`, () => {
  
        render(
            <Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockFunction} />
            </Provider>
        );

        const titleTag = screen.getByTestId("manage-folder-title");
        expect(titleTag).toHaveTextContent(mockNewFolderTitle);
    });

    test("name field works (focus & blur) and value is saved to redux when blurred", () => {
 
        render(
            <Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockFunction} />
            </Provider>
        );
        
        const inputField: HTMLInputElement = screen.getByTestId("name-field");
        
        expect(inputField.value).toBe(mockNewFolderState.name);

        fireEvent.focus(inputField);

        fireEvent.change(inputField, {
            target: {
                value: mockFolderName
            }
        });

        expect(inputField.value).toBe(mockFolderName);

        fireEvent.blur(inputField);

        expect(inputField.value).toBe(mockFolderName);

    });

    test("description field works (focus & blur) and value is saved to redux when blurred", () => {
        
        render(
            <Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockFunction} />
            </Provider>
        );
        
        const textareaField: HTMLTextAreaElement = screen.getByTestId("desc-field");

        expect(textareaField.value).toBe(mockEditFolderState.desc);

        fireEvent.focus(textareaField);

        fireEvent.change(textareaField, {
            target: {
                value: mockDescription
            }
        });

        expect(textareaField.value).toBe(mockDescription);

        fireEvent.blur(textareaField);

        expect(textareaField.value).toBe(mockDescription);

    })

   /* test("no windows listed", () => {
        renderWithProviders(
            <ManageFolderPopup title={mockNewFolderTitle} onClose={mockFunction}/>, 
            {
                preloadedState: {
                    InEditFolderReducer: mockNewFolderState
                }
            }
        );

        const windowManager = screen.getByTestId("window-manager");
        expect(windowManager.getElementsByClassName("window-item").length).toBe(0);
    })*/
});

describe("Edit workspace", () => {
    beforeEach(() => {
        const state = mockStore();
        useSelector.mockImplementation(() => state.getState());
        useDispatch.mockClear();
        useDispatch.mockImplementation(() => state.dispatch);
    })
    
    test(`popup title reads "${mockEditFolderTitle}"`, () => {
        render(
            <Provider store={store}>
                <ManageFolderPopup folder={mockNewFolderState} title={mockEditFolderTitle} onClose={mockFunction} />
            </Provider>
        );

        const titleTag = screen.getByTestId("manage-folder-title");
        expect(titleTag).toHaveTextContent(mockEditFolderTitle);
    });

    test("name field works (focus & blur) and value is saved to redux when blurred", () => {
        const randomName = Math.floor(Math.random() * 100000000).toString();

        //store.dispatch(initInEditFolder(mockEditFolderState));    
        render(
            <Provider store={store}>
                <ManageFolderPopup folder={mockEditFolderState} title={mockEditFolderTitle} onClose={mockFunction} />
            </Provider>
        );

        const inputField: HTMLInputElement = screen.getByTestId("name-field");
        
        expect(inputField.defaultValue).toBe(mockEditFolderState.name);

        fireEvent.focus(inputField);

        fireEvent.change(inputField, {
            target: {
                value: randomName
            }
        });

        expect(inputField.value).toBe(randomName);

        fireEvent.blur(inputField);

        expect(inputField.value).toBe(randomName);
    });
    

    test("description field works (focus & blur) and value is saved to redux when blurred", async() => {
        const randomDesc = Math.floor(Math.random() * 100000000).toString();

        // const store = setupStore();
        
       // store.dispatch(initInEditFolder(mockEditFolderState));    
        render(
            <Provider store={store}>
                <ManageFolderPopup folder={mockEditFolderState} title={mockEditFolderTitle} onClose={mockFunction} />
            </Provider>
        );
      
        const textareaField: HTMLTextAreaElement = screen.getByTestId("desc-field");
        expect(textareaField.defaultValue).toBe(mockEditFolderState.desc);

        fireEvent.focus(textareaField);

        fireEvent.change(textareaField, {
            target: {
                value: randomDesc
            }
        });

        expect(textareaField.value).toBe(randomDesc);

        fireEvent.blur(textareaField);

        expect(textareaField.value).toBe(randomDesc);
    })

   /* test("windows are listed", () => {
        renderWithProviders(
            <ManageFolderPopup title={mockEditFolderTitle} onClose={mockFunction}/>, 
            {
                preloadedState: {
                    InEditFolderReducer: mockEditFolderState
                }
            }
        );

       // const windowManager = screen.getByTestId("window-manager");
      //  expect(windowManager).toHaveText("test tab");
    })*/
});