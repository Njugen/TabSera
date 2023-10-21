import { render, screen, within, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import ManageFolderPopup from "../../../components/utils/manage_folder_popup";
import { Provider } from "react-redux";
import { store } from "../../../redux/reducer";
import { chrome } from 'jest-chrome'
import { useDispatch, useSelector } from "../../../redux/mocked_hooks"; 

jest.mock("../../../redux/mocked_hooks");

describe("Testing polyfill", () => {
    beforeEach(() => {
       // chrome.mockImplementation(() => {});
       useSelector.mockImplementation(() => {});
       useDispatch.mockImplementation(() => jest.fn);
    })
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("test 1", () => {
        render(
            <Provider store={store}>
                <ManageFolderPopup title="test" onClose={() => {}}/>
            </Provider>
        );
    });
  //  console.log(chrome);
});

