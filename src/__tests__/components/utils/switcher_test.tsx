import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Switcher from "../../../components/utils/switcher";

const mockFunction = jest.fn(data => data);
const mockText = "hello mah boy";

describe("test <PrimaryButton />", () => {
    test("clicking works (default value: true), callback works correctly", () => {
        
        render(<Switcher label={mockText} value={true} onCallback={mockFunction} />);

        const button = screen.getByRole("button");
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
        
        render(<Switcher label={mockText} value={false} onCallback={mockFunction} />);

        const button = screen.getByRole("button");
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
            render(<Switcher value={arg} onCallback={mockFunction} />);

            const button = screen.getByRole("button");
            const text = screen.queryByText(mockText);

            expect(button).toBeInTheDocument();
            expect(text).not.toBeInTheDocument();
        }
    )
 
});