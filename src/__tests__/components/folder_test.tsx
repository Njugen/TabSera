import { fireEvent, render, screen, within } from "@testing-library/react";
import FormField from "../../components/utils/form_field";
import '@testing-library/jest-dom'
import { store } from "../../redux/reducer";
import { chrome } from 'jest-chrome'
import { useDispatch, useSelector } from "../../redux/mocked_hooks"; 
import SearchBar from "../../components/utils/search_bar";
import { Provider } from "react-redux";
import iCurrentSessionState from "../../interfaces/states/currentSessionState";
import { setUpWindowsAction } from "../../redux/actions/currentSessionActions";
import userEvent from "@testing-library/user-event";
import iHistoryState from './../../interfaces/states/historyState';
import { setUpTabsAction } from "../../redux/actions/historySettingsActions";
import { iFolder } from "../../interfaces/folder";

jest.mock("../../redux/mocked_hooks");
jest.useFakeTimers();
jest.setTimeout(10000);

/*
const mockFolder: iFolder = {
    id: 0,
    name: "Mock folder",
    desc: "blablabla",
    marked: false,
    type: "collapsed"
} */

describe("Test a folder", () => {
    test("", () => {

    });
});