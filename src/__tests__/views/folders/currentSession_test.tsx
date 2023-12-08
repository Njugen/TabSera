
import { fireEvent, render, screen, within } from "@testing-library/react";
import CurrentSession from "../../../views/folders/currentSession";
import { store } from "../../../redux/reducer";
import { Provider } from "react-redux";

test("1+1 = 2", () => {
    render(
        <Provider store={store}>
            <CurrentSession />
        </Provider>
    );
    expect(1+1).toEqual(2);
})