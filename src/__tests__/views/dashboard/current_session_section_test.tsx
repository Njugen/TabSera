
import { fireEvent, render, screen, within } from "@testing-library/react";
import { store } from "../../../redux/reducer";
import { Provider } from "react-redux";
import CurrentSessionSection from "../../../views/dashboard/sections/current_session_section";

test("1+1 = 2", () => {
    render(
        <Provider store={store}>
            <CurrentSessionSection />
        </Provider>
    );
    expect(1+1).toEqual(2);
})