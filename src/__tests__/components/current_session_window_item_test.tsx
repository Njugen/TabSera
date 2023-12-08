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
import CurrentSessionWindowItem from "../../components/current_session_window_item";
import { iWindowItem } from "../../interfaces/window_item";
import { iTabItem } from "../../interfaces/tab_item";

jest.mock("../../redux/mocked_hooks");
jest.useFakeTimers();
jest.setTimeout(10000);

const mockCurrentSession: iCurrentSessionState = {
    windows: [
        {
            focused: false,
            alwaysOnTop: false,
            incognito: false,
            id: 0,
            tabs: []
        },
        {
            focused: false,
            alwaysOnTop: false,
            incognito: false,
            id: 1,
            tabs: []
        }
    ],
    markedWindows: [],
    markedTabs: [],
    tabsSort: "asc",
    viewMode: "grid"
} 

const mockTabsWindow1 = [
    { url: "http://fz.se", title: "Fragzone" },
    { url: "http://aftonbladet.se", title: "Aftonbladet" },
    { url: "http://fragment.se", title: "Fragment" },
    { url: "http://aftis.fi", title: "Aftis" },
    { url: "http://vasabladet.fi", title: "Vasabladet" }
];

const mockTabsWindow2 = [
    { url: "http://reddit.com", title: "Reddit" },
    { url: "http://moviezine.se", title: "MovieZine" },
    { url: "http://lampio.fi", title: "Lämpiö" },
    { url: "http://chalmers.se", title: "Chalmers" },
    { url: "http://hanken.fi", title: "Hanken" }
];

mockTabsWindow1.forEach((tab, i) => {
    const temp = mockCurrentSession.windows[0].tabs as Array<any>;

    temp.push({
        index: i,
        title: tab.title,
        url: tab.url,
        pinned: false,
        highlighted: false,
        active: false,
        incognito: false,
        windowId: 1,
        selected: false,
        discarded: false,
        autoDiscardable: false,
        groupId: 0
    });
    
    mockCurrentSession.windows[0].tabs = temp as Array<chrome.tabs.Tab>;
});

mockTabsWindow2.forEach((tab, i) => {
    const temp = mockCurrentSession.windows[1].tabs as Array<any>;

    temp.push({
        index: i,
        title: tab.title,
        url: tab.url,
        pinned: false,
        highlighted: false,
        active: false,
        incognito: false,
        windowId: 1,
        selected: false,
        discarded: false,
        autoDiscardable: false,
        groupId: 0
    });
    
    mockCurrentSession.windows[1].tabs = temp as Array<chrome.tabs.Tab>;
})

beforeEach(() => {
    store.dispatch(setUpWindowsAction(mockCurrentSession.windows));
});

describe("Test current session window item component", () => {
    test.each(mockCurrentSession.windows)("The window lists tabs correctly.", (window) => {
        const { id, tabs } = window;

        const tabItems: Array<iTabItem> = [];
      
        tabs?.forEach((tab, i) => {
            const temp: iTabItem = {
                id: i,
                label: tab.title || "Empty tab",
                marked: false,
                url: tab.url || "http://"
            }
            tabItems.push(temp);
        })

        render(
            <Provider store={store}>
                <CurrentSessionWindowItem 
                    id={id || 0} 
                    tabs={tabItems} 
                    tabsCol={4} 
                    initExpand={true} 
                />
            </Provider>
        );

        tabs?.forEach((tab) => {
            const title = tab.title || "";
            const target = screen.getByRole("link", {name: title});
            
            expect(target).toBeInTheDocument();
            expect(target).toHaveAttribute("href", tab.url);
            expect(target).toHaveAttribute("target", "_blank");
        })
    })

    test("Window collapse/expand works as expected", () => {
        const { id, tabs } = mockCurrentSession.windows[0];

        const tabItems: Array<iTabItem> = [];
      
        tabs?.forEach((tab, i) => {
            const temp: iTabItem = {
                id: i,
                label: tab.title || "Empty tab",
                marked: false,
                url: tab.url || "http://"
            }
            tabItems.push(temp);
        })

        render(
            <Provider store={store}>
                <CurrentSessionWindowItem 
                    id={id || 0} 
                    tabs={tabItems} 
                    tabsCol={4} 
                    initExpand={false} 
                />
            </Provider>
        );

        let expandButton = screen.getByTestId("generic-icon-button-expand");
        expect(expandButton).toBeInTheDocument();
        fireEvent.click(expandButton);

        let collapseButton = screen.getByTestId("generic-icon-button-collapse");
        expect(collapseButton).toBeInTheDocument();
        fireEvent.click(collapseButton);

        expandButton = screen.getByTestId("generic-icon-button-expand");
        expect(expandButton).toBeInTheDocument();
        fireEvent.click(expandButton);

        collapseButton = screen.getByTestId("generic-icon-button-collapse");
        expect(collapseButton).toBeInTheDocument();
    })
})