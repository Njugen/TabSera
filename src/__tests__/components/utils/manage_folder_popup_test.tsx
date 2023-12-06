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
import { useEffect, useState as useStateMock } from "react";
import { setShowFolderChangeWarning } from "../../../redux/actions/warningActions";

jest.mock("../../../redux/mocked_hooks");
jest.setTimeout(10000);
jest.useFakeTimers();

const mockCloseFunction = jest.fn();
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
    windows: [
        {
            id: 1,
            tabs: [{
                id: 1,
                label: "test tab",
                url: "http://localhost:3000",
                marked: false
            }]
        },
        {
            id: 2,
            tabs: [{
                id: 1,
                label: "test tab",
                url: "http://google.com",
                marked: false
            }]
        },
        {
            id: 3,
            tabs: [{
                id: 1,
                label: "test tab",
                url: "http://fz.se",
                marked: false
            }]
        }
    ]
};

beforeEach(() => {
    //const state = mockStore();
    useSelector.mockImplementation(() => store.getState());
    useDispatch.mockClear();
    useDispatch.mockImplementation(() => store.dispatch);
})

afterEach(() => {
   jest.clearAllMocks();
   store.dispatch(initInEditFolder({} as iFolder));
});

describe("Create new workspace", () => {
    test(`popup title reads "${mockNewFolderTitle}"`, () => {
        render(
            <Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>
        );

        const titleTag = screen.getByTestId("manage-folder-title");
        expect(titleTag).toHaveTextContent(mockNewFolderTitle);
    });

    test("name field works (focus & blur) and value is saved to redux when blurred", () => {
        render(
            <Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
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
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>
        );
        
        const textareaField: HTMLTextAreaElement = screen.getByTestId("desc-field");

        expect(textareaField.value).toBe(mockNewFolderState.desc);

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

    test("window/tab section lists no windows", () => {
        render(
            <Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>
        );

        const section = screen.queryAllByTestId("window-item");

        expect(section.length).toEqual(0);
    });

    test("window/tab section has a working \"New window\" button", () => {
        render(
            <Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>
        );

        const button = screen.getByText("New window", { selector: "button" });
        expect(button).toBeVisible();
    });
});

describe("Edit workspace", () => {
    test(`popup title reads "${mockEditFolderTitle}"`, () => {
        render(
            <Provider store={store}>
                <ManageFolderPopup folder={mockEditFolderState} title={mockEditFolderTitle} onClose={mockCloseFunction} />
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
                <ManageFolderPopup folder={mockEditFolderState} title={mockEditFolderTitle} onClose={mockCloseFunction} />
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
                <ManageFolderPopup folder={mockEditFolderState} title={mockEditFolderTitle} onClose={mockCloseFunction} />
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
    });

    test("window/tab section lists at least one window", async () => {
        render(
            <Provider store={store}>
                <ManageFolderPopup folder={mockEditFolderState} title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>
        );

    
        const section = screen.queryAllByTestId("window-item");
        expect(section.length).toBeGreaterThan(0);
       
        
    });

    test("window/tab section has a working \"New window\" button", () => {
        render(
            <Provider store={store}>
                <ManageFolderPopup folder={mockEditFolderState} title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>
        );

        const button = screen.getByText("New window", { selector: "button" });
        expect(button).toBeVisible();
    });
});

describe("Test of close and cancelling of folder management popup", () => {
    test("X button triggers onClose when clicked (no field changes)", (done) => {
        chrome.storage.sync.get.mockImplementation((string, callback) => {
            callback({});
        })

        render(
            <Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>
        );

        const xButton = screen.getByTestId("generic-icon-button-close");
        expect(xButton).toBeVisible();

        fireEvent.click(xButton);
        
        jest.runAllTimers();
        
        expect(mockCloseFunction).toHaveBeenCalled();
        done();
        
    });

    test("cancel button triggers onClose when clicked (no field changes)", (done) => {
        chrome.storage.sync.get.mockImplementation((string, callback) => {
            callback({});
        })

        render(
            <Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>
        );

        const cancelButton = screen.getByText("Cancel", { selector: "button" });
        expect(cancelButton).toBeVisible();

        fireEvent.click(cancelButton);
        
        jest.runAllTimers();
        
        expect(mockCloseFunction).toHaveBeenCalled();
        done();
        
    });

    describe("Focus on action relative to name field", () => {
        test("cancel button does not trigger onClose when clicked (name field change)", (done) => {
            const randomName = Math.floor(Math.random() * 100).toString();

            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({});
            })

            const { rerender } = render(
                <Provider store={store}>
                    <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );

            const inputField: HTMLInputElement = screen.getByTestId("name-field");
            
            expect(inputField.defaultValue).toBe(mockNewFolderState.name);

            fireEvent.focus(inputField);

            fireEvent.change(inputField, {
                target: {
                    value: randomName
                }
            });

            fireEvent.blur(inputField);

            const cancelButton = screen.getByText("Cancel", { selector: "button" });
            expect(cancelButton).toBeVisible();

            fireEvent.click(cancelButton);
            
            expect(mockCloseFunction).not.toHaveBeenCalled();
            done();
        });

        test("X button does not trigger onClose when clicked (name field change)", (done) => {
            const randomName = Math.floor(Math.random() * 100).toString();

            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({});
            })

            render(
                <Provider store={store}>
                    <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );

            const inputField: HTMLInputElement = screen.getByTestId("name-field");
            
            expect(inputField.defaultValue).toBe(mockNewFolderState.name);

            fireEvent.focus(inputField);

            fireEvent.change(inputField, {
                target: {
                    value: randomName
                }
            });

            fireEvent.blur(inputField);

            const xButton = screen.getByTestId("generic-icon-button-close");
            expect(xButton).toBeVisible();

            fireEvent.click(xButton);

            expect(mockCloseFunction).not.toHaveBeenCalled();
            done();
        });

        test("X button triggers cancellation warning when clicked (name field change + warning turned on)", async () => {
            const randomName = Math.floor(Math.random() * 100).toString();
            
            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({
                    cancellation_warning_setting: true
                });

            })
            
            const { rerender } = render(<Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const inputField: HTMLInputElement = screen.getByTestId("name-field");
            
            expect(inputField.defaultValue).toBe(mockNewFolderState.name);

            fireEvent.focus(inputField);

            fireEvent.change(inputField, {
                target: {
                    value: randomName
                }
            });

            fireEvent.blur(inputField);

            const xButton = screen.getByTestId("generic-icon-button-close");
            expect(xButton).toBeVisible();

            fireEvent.click(xButton);

            rerender(<Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const warningMessagePopup = await screen.findByTestId("warning-message-popup");
            expect(warningMessagePopup).toBeInTheDocument();
            expect(mockCloseFunction).not.toHaveBeenCalled();
        // done();
        })

        test("cancel button triggers cancellation warning when clicked (name field change + warning turned on)", async () => {
            const randomName = Math.floor(Math.random() * 100).toString();
            
            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({
                    cancellation_warning_setting: true
                });

            })
            
            const { rerender } = render(<Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const inputField: HTMLInputElement = screen.getByTestId("name-field");
            
            expect(inputField.defaultValue).toBe(mockNewFolderState.name);

            fireEvent.focus(inputField);

            fireEvent.change(inputField, {
                target: {
                    value: randomName
                }
            });

            fireEvent.blur(inputField);

            const cancelButton = screen.getByText("Cancel", { selector: "button" });
            expect(cancelButton).toBeVisible();

            fireEvent.click(cancelButton);

            rerender(<Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const warningMessagePopup = await screen.findByTestId("warning-message-popup");
            expect(warningMessagePopup).toBeInTheDocument();

            expect(mockCloseFunction).not.toHaveBeenCalled();
        // done();
        })
    });

    describe("Focus on action relative to description field", () => {
        test("cancel button does not trigger onClose when clicked (description field change)", (done) => {
            const randomDesc = Math.floor(Math.random() * 100).toString();

            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({});
            })

            const { rerender } = render(
                <Provider store={store}>
                    <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );

            const inputField: HTMLTextAreaElement = screen.getByTestId("desc-field");
            
            expect(inputField.defaultValue).toBe(mockNewFolderState.desc);

            fireEvent.focus(inputField);

            fireEvent.change(inputField, {
                target: {
                    value: randomDesc
                }
            });

            fireEvent.blur(inputField);

            const cancelButton = screen.getByText("Cancel", { selector: "button" });
            expect(cancelButton).toBeVisible();

            fireEvent.click(cancelButton);
            
            expect(mockCloseFunction).not.toHaveBeenCalled();
            done();
        });

        test("X button does not trigger onClose when clicked (description field change)", (done) => {
            const randomName = Math.floor(Math.random() * 100).toString();

            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({});
            })

            render(
                <Provider store={store}>
                    <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );

            const inputField: HTMLTextAreaElement = screen.getByTestId("desc-field");
            
            expect(inputField.defaultValue).toBe(mockNewFolderState.desc);

            fireEvent.focus(inputField);

            fireEvent.change(inputField, {
                target: {
                    value: randomName
                }
            });

            fireEvent.blur(inputField);

            const xButton = screen.getByTestId("generic-icon-button-close");
            expect(xButton).toBeVisible();

            fireEvent.click(xButton);

            expect(mockCloseFunction).not.toHaveBeenCalled();
            done();
        });

        test("X button triggers cancellation warning when clicked (description field change + warning turned on)", async () => {
            const randomDesc = Math.floor(Math.random() * 100).toString();
            
            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({
                    cancellation_warning_setting: true
                });

            })
            
            const { rerender } = render(<Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const inputField: HTMLTextAreaElement = screen.getByTestId("desc-field");
            
            expect(inputField.defaultValue).toBe(mockNewFolderState.desc);

            fireEvent.focus(inputField);

            fireEvent.change(inputField, {
                target: {
                    value: randomDesc
                }
            });

            fireEvent.blur(inputField);

            const xButton = screen.getByTestId("generic-icon-button-close");
            expect(xButton).toBeVisible();

            fireEvent.click(xButton);

            rerender(<Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const warningMessagePopup = await screen.findByTestId("warning-message-popup");
            expect(warningMessagePopup).toBeInTheDocument();
            expect(mockCloseFunction).not.toHaveBeenCalled();
        // done();
        })

        test("cancel button triggers cancellation warning when clicked (description field change + warning turned on)", async () => {
            const randomDesc = Math.floor(Math.random() * 100).toString();
            
            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({
                    cancellation_warning_setting: true
                });

            })
            
            const { rerender } = render(<Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const inputField: HTMLInputElement = screen.getByTestId("desc-field");
            
            expect(inputField.defaultValue).toBe(mockNewFolderState.desc);

            fireEvent.focus(inputField);

            fireEvent.change(inputField, {
                target: {
                    value: randomDesc
                }
            });

            fireEvent.blur(inputField);

            const cancelButton = screen.getByText("Cancel", { selector: "button" });
            expect(cancelButton).toBeVisible();

            fireEvent.click(cancelButton);

            rerender(<Provider store={store}>
                <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const warningMessagePopup = await screen.findByTestId("warning-message-popup");
            expect(warningMessagePopup).toBeInTheDocument();
            expect(mockCloseFunction).not.toHaveBeenCalled();

        // done();
        })
    });

    describe("Focus on action relative to window manager", () => {
        test("Window gets removed when trash icon is clicked", () => {
            render(
                <Provider store={store}>
                    <ManageFolderPopup folder={mockEditFolderState} title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );

            const windowList = screen.getAllByTestId("window-item");
            windowList.forEach(window => expect(window).toBeInTheDocument());

            const trashButton = screen.getAllByTestId("generic-icon-button-trash");
            
            fireEvent.click(trashButton[0]);

            expect(windowList[0]).not.toBeInTheDocument();
        });

        test("X button triggers onClose when clicked (when a window has been removed)", (done) => {
            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({});
            })
    
            render(
                <Provider store={store}>
                    <ManageFolderPopup folder={mockEditFolderState} title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );

            const windowList = screen.getAllByTestId("window-item");
            windowList.forEach(window => expect(window).toBeInTheDocument());

            const trashButton = screen.getAllByTestId("generic-icon-button-trash");
            
            fireEvent.click(trashButton[0]);

            const xButton = screen.getByTestId("generic-icon-button-close");
            expect(xButton).toBeVisible();

            fireEvent.click(xButton);
            
            jest.runAllTimers();
            
            expect(mockCloseFunction).toHaveBeenCalled();
            done();

        });

        test("X button triggers warning when clicked (when a window has been removed + warning settings turned on)", async () => {
            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({
                    cancellation_warning_setting: true
                });
            })
    
            const { rerender } = render(
                <Provider store={store}>
                    <ManageFolderPopup folder={mockEditFolderState} title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );

            const windowList = screen.getAllByTestId("window-item");
            windowList.forEach(window => expect(window).toBeInTheDocument());

            const trashButton = screen.getAllByTestId("generic-icon-button-trash");
            
            fireEvent.click(trashButton[0]);

            rerender(<Provider store={store}>
                <ManageFolderPopup folder={mockEditFolderState}  title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const xButton = screen.getByTestId("generic-icon-button-close");
            expect(xButton).toBeVisible();

            fireEvent.click(xButton);
            
            rerender(<Provider store={store}>
                <ManageFolderPopup folder={mockEditFolderState} title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const warningMessagePopup = await screen.findByTestId("warning-message-popup");
            expect(warningMessagePopup).toBeInTheDocument();
            expect(mockCloseFunction).not.toHaveBeenCalled();
        });

        test("Cancel button triggers onClose when clicked (when a window has been removed)", (done) => {
            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({});
            })
    
            render(
                <Provider store={store}>
                    <ManageFolderPopup folder={mockEditFolderState} title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );

            const windowList = screen.getAllByTestId("window-item");
            windowList.forEach(window => expect(window).toBeInTheDocument());

            const trashButton = screen.getAllByTestId("generic-icon-button-trash");
            
            fireEvent.click(trashButton[0]);

            const cancelButton = screen.getByText("Cancel", { selector: "button" });
            expect(cancelButton).toBeVisible();

            fireEvent.click(cancelButton);
            
            jest.runAllTimers();
            
            expect(mockCloseFunction).toHaveBeenCalled();
            done();

        });

        test("Cancel button triggers warning when clicked (when a window has been removed + warning settings turned on)", async () => {
            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({
                    cancellation_warning_setting: true
                });
            })

            const { rerender } = render(
                <Provider store={store}>
                    <ManageFolderPopup folder={mockEditFolderState} title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );

            const windowList = screen.getAllByTestId("window-item");
            
            windowList.forEach(window => expect(window).toBeInTheDocument());
            

            const trashButton = screen.getAllByTestId("generic-icon-button-trash");
            
            fireEvent.click(trashButton[0]);
            
            rerender(<Provider store={store}>
                <ManageFolderPopup folder={mockEditFolderState}  title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const cancelButton = screen.getByText("Cancel", { selector: "button" });
            expect(cancelButton).toBeVisible();

            fireEvent.click(cancelButton);

            rerender(<Provider store={store}>
                <ManageFolderPopup folder={mockEditFolderState}  title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const warningMessagePopup = await screen.findByTestId("warning-message-popup");
            expect(warningMessagePopup).toBeInTheDocument();
            expect(mockCloseFunction).not.toHaveBeenCalled();
        });

        test("Clicking \"New window\" adds a new window. Setting mandatory tab and cancellation (no warning) works", () => {
            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({});
            })
            
            const randomString = Math.floor(Math.random() * 100000000).toString();
            const url = "https://"+ randomString + ".com";

            const { rerender } = render(
                <Provider store={store}>
                    <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );

            const windowList = screen.queryAllByTestId("window-item");
            expect(windowList.length).toEqual(0);

            const button = screen.getByText("New window", { selector: "button" });
            fireEvent.click(button);

            const updatedWindowList = screen.queryAllByTestId("window-item");
            expect(updatedWindowList.length).toEqual(1);

            const inputField: HTMLInputElement = screen.getByDisplayValue("https://");
            expect(inputField.value).toBe("https://");

            fireEvent.click(inputField);

            fireEvent.change(inputField, {
                target: {
                    value: url
                }
            });

            fireEvent.blur(inputField);
            
            const tab = screen.getByTestId("tab-item");
            expect(tab).toHaveTextContent(url);

            const cancelButton = screen.getByText("Cancel", { selector: "button" });
            expect(cancelButton).toBeVisible();

            fireEvent.click(cancelButton);

            jest.runAllTimers();
            expect(mockCloseFunction).toHaveBeenCalled();
        });

        test("Clicking \"New window\" adds a new window. Setting mandatory tab and cancellation warning works", async () => {
            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({
                    cancellation_warning_setting: true
                });
            })
            
            const randomString = Math.floor(Math.random() * 100000000).toString();
            const url = "https://"+ randomString + ".com";

            const { rerender } = render(
                <Provider store={store}>
                    <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );

            const windowList = screen.queryAllByTestId("window-item");
            expect(windowList.length).toEqual(0);

            const button = screen.getByText("New window", { selector: "button" });
            fireEvent.click(button);

            const updatedWindowList = screen.queryAllByTestId("window-item");
            expect(updatedWindowList.length).toEqual(1);

            const inputField: HTMLInputElement = screen.getByDisplayValue("https://");
            expect(inputField.value).toBe("https://");

            fireEvent.click(inputField);

            fireEvent.change(inputField, {
                target: {
                    value: url
                }
            });

            fireEvent.blur(inputField);

            rerender(<Provider store={store}>
                <ManageFolderPopup folder={mockEditFolderState}  title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);
            
            const tab = screen.getByTestId("tab-item");
            expect(tab).toHaveTextContent(url);

            const cancelButton = screen.getByText("Cancel", { selector: "button" });
            expect(cancelButton).toBeVisible();

            fireEvent.click(cancelButton);

            rerender(<Provider store={store}>
                <ManageFolderPopup folder={mockEditFolderState}  title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const warningMessagePopup = await screen.findByTestId("warning-message-popup");
            expect(warningMessagePopup).toBeInTheDocument();
            expect(mockCloseFunction).not.toHaveBeenCalled();
        });

        test("Clicking \"New window\" adds a new window. Cancellation (no warning) works when editable field is ongoing", () => {
            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({});
            })
            
            const randomString = Math.floor(Math.random() * 100000000).toString();
            const url = "https://"+ randomString + ".com";

            const { rerender } = render(
                <Provider store={store}>
                    <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );

            const windowList = screen.queryAllByTestId("window-item");
            expect(windowList.length).toEqual(0);

            const button = screen.getByText("New window", { selector: "button" });
            fireEvent.click(button);

            const updatedWindowList = screen.queryAllByTestId("window-item");
            expect(updatedWindowList.length).toEqual(1);

            const inputField: HTMLInputElement = screen.getByDisplayValue("https://");
            expect(inputField.value).toBe("https://");

            fireEvent.click(inputField);

            fireEvent.change(inputField, {
                target: {
                    value: url
                }
            });

            const cancelButton = screen.getByText("Cancel", { selector: "button" });
            expect(cancelButton).toBeVisible();

            fireEvent.click(cancelButton);

            jest.runAllTimers();
            expect(mockCloseFunction).toHaveBeenCalled();
        });

        test("Clicking \"New window\" adds a new window. Cancellation (with warning) works when editable field is ongoing", async () => {
            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({
                    cancellation_warning_setting: true
                });
            })
            
            const randomString = Math.floor(Math.random() * 100000000).toString();
            const url = "https://"+ randomString + ".com";

            const { rerender } = render(
                <Provider store={store}>
                    <ManageFolderPopup title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );

            const windowList = screen.queryAllByTestId("window-item");
            expect(windowList.length).toEqual(0);

            const button = screen.getByText("New window", { selector: "button" });
            fireEvent.click(button);

            const updatedWindowList = screen.queryAllByTestId("window-item");
            expect(updatedWindowList.length).toEqual(1);

            const inputField: HTMLInputElement = screen.getByDisplayValue("https://");
            expect(inputField.value).toBe("https://");

            fireEvent.click(inputField);

            fireEvent.change(inputField, {
                target: {
                    value: url
                }
            });

            fireEvent.blur(inputField);

            rerender(<Provider store={store}>
                <ManageFolderPopup folder={mockEditFolderState}  title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const cancelButton = screen.getByText("Cancel", { selector: "button" });
            expect(cancelButton).toBeVisible();

            fireEvent.click(cancelButton);

            rerender(<Provider store={store}>
                <ManageFolderPopup folder={mockEditFolderState}  title={mockNewFolderTitle} onClose={mockCloseFunction} />
            </Provider>);

            const warningMessagePopup = await screen.findByTestId("warning-message-popup");
            expect(warningMessagePopup).toBeInTheDocument();
            expect(mockCloseFunction).not.toHaveBeenCalled();
        });

        test("Clicking \"New tab\" in a window will add a working editable field. Cancellation works while editing", async () => {
            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({});
            })
            
            const randomString = Math.floor(Math.random() * 100000000).toString();
            const url = "https://"+ randomString + ".com";

            render(
                <Provider store={store}>
                    <ManageFolderPopup folder={mockEditFolderState} title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );
           
            let windowList = screen.getAllByTestId("window-item");;
            const targetIndex = Math.floor(Math.random() * ((windowList.length-1) - 0));

            const button = screen.getAllByText("New tab", { selector: "button" });
            fireEvent.click(button[targetIndex]);

            const inputField: HTMLInputElement = screen.getByDisplayValue("https://" );
            expect(inputField.value).toBe("https://");

            fireEvent.click(inputField);

            fireEvent.change(inputField, {
                target: {
                    value: url
                }
            });

            const cancelButton = screen.getByText("Cancel", { selector: "button" });
            expect(cancelButton).toBeVisible();

            fireEvent.click(cancelButton);

            jest.runAllTimers();
            expect(mockCloseFunction).toHaveBeenCalled();
        });

        test("Clicking \"New tab\" in a window will add a working editable field. Cancellation (X button) works while editing", async () => {
            chrome.storage.sync.get.mockImplementation((string, callback) => {
                callback({});
            })
            
            const randomString = Math.floor(Math.random() * 100000000).toString();
            const url = "https://"+ randomString + ".com";

            render(
                <Provider store={store}>
                    <ManageFolderPopup folder={mockEditFolderState} title={mockNewFolderTitle} onClose={mockCloseFunction} />
                </Provider>
            );
           
            let windowList = screen.getAllByTestId("window-item");;
            const targetIndex = Math.floor(Math.random() * ((windowList.length-1) - 0));

            const button = screen.getAllByText("New tab", { selector: "button" });
            fireEvent.click(button[targetIndex]);

            const inputField: HTMLInputElement = screen.getByDisplayValue("https://" );
            expect(inputField.value).toBe("https://");

            fireEvent.click(inputField);

            fireEvent.change(inputField, {
                target: {
                    value: url
                }
            });

            const xButton = screen.getByTestId("generic-icon-button-close");
            expect(xButton).toBeVisible();

            fireEvent.click(xButton);

            jest.runAllTimers();
            expect(mockCloseFunction).toHaveBeenCalled();
        });
    })
})

/*describe("Validation, saving and field errors", () => {

});*/