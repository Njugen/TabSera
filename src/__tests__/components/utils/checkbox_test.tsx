import { render, screen, within, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Checkbox from "../../../components/utils/checkbox";

const mockFunction = jest.fn();

describe("test <Checkbox />", () => {
    test("renders checked button", () => {
        const labelText = "This is a label";
        render(<Checkbox onCallback={mockFunction} checked={true} label={labelText} />);

        const button = screen.getByRole("button");
        const checkMark = within(button).getByRole("img");
        const text = screen.getByText(labelText);

        expect(button).toBeInTheDocument();
        expect(checkMark).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });

    test("renders unchecked button", () => {
        const labelText = "This is a label";
        render(<Checkbox onCallback={mockFunction} checked={false} label={labelText} />);

        const button = screen.getByRole("button");
        const checkMark = within(button).queryByRole("img");
        const text = screen.getByText(labelText);

        expect(button).toBeInTheDocument();
        expect(checkMark).toBeNull();
        expect(text).toBeInTheDocument();
    });

    test("renders no label", () => {
        const labelText = "This is a label";
        render(<Checkbox onCallback={mockFunction} checked={false} />);

        const button = screen.getByRole("button");
        const checkMark = within(button).queryByRole("img");
        const text = screen.queryByText(labelText);

        expect(button).toBeInTheDocument();
        expect(checkMark).toBeNull();
        expect(text).not.toBeInTheDocument();
    });

    test("toggles when clicked (preset: false)", () => {
        const labelText = "This is a label";
        render(<Checkbox onCallback={mockFunction} checked={false} label={labelText} />);

        const button = screen.getByRole("button");
        let checkMark = within(button).queryByRole("img");

        expect(checkMark).toBeNull();

        fireEvent.click(button);

        checkMark = within(button).queryByRole("img");
        expect(checkMark).toBeInTheDocument();

        fireEvent.click(button);

        checkMark = within(button).queryByRole("img");
        expect(checkMark).toBeNull();

        fireEvent.click(button);

        checkMark = within(button).queryByRole("img");
        expect(checkMark).toBeInTheDocument();
    });

    test("toggles when clicked (preset: true)", () => {
        const labelText = "This is a label";
        render(<Checkbox onCallback={mockFunction} checked={true} label={labelText} />);

        const button = screen.getByRole("button");
        let checkMark = within(button).queryByRole("img");

        expect(checkMark).toBeInTheDocument();

        fireEvent.click(button);

        checkMark = within(button).queryByRole("img");
        expect(checkMark).toBeNull();

        fireEvent.click(button);

        checkMark = within(button).queryByRole("img");
        expect(checkMark).toBeInTheDocument();

        fireEvent.click(button);

        checkMark = within(button).queryByRole("img");
        expect(checkMark).toBeNull();
    });
});