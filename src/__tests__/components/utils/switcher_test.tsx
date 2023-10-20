import { render, screen, fireEvent, within } from "@testing-library/react";
import '@testing-library/jest-dom'
import Switcher from "../../../components/utils/switcher";

const mockFunction = jest.fn((data: boolean | null) => data);
const mockText = "hello mah boy";
const mockSwitcherId = "my-switcher-setting";

describe("test <PrimaryButton />", () => {
    test("clicking works (default value: true), callback works correctly", () => {
        render(<Switcher id={mockSwitcherId} label={mockText} value={true} onCallback={mockFunction} />);

        const button = screen.getByTestId(mockSwitcherId);
        const text = screen.getByText(mockText);

        expect(button).toBeInTheDocument();
        expect(text).toBeInTheDocument();

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalledWith(false);

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalledWith(true);

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalledWith(false);

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalledWith(true);
    });

    test("clicking works (default value: false), callback works correctly", () => {
        render(<Switcher id={mockSwitcherId} label={mockText} value={false} onCallback={mockFunction} />);

        const button = screen.getByTestId(mockSwitcherId);
        const text = screen.getByText(mockText);

        expect(button).toBeInTheDocument();
        expect(text).toBeInTheDocument();

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalledWith(true);

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalledWith(false);

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalledWith(true);

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalledWith(false);
    });

    test.each([true, false])(
        "renders correctly (default value: %p, no label)", (arg) => {
            render(<Switcher id={mockSwitcherId} value={arg} onCallback={mockFunction} />);

            const button = screen.getByTestId(mockSwitcherId);
            const text = screen.queryByText(mockText);

            expect(button).toBeInTheDocument();
            expect(text).not.toBeInTheDocument();
        }
    )
 
});