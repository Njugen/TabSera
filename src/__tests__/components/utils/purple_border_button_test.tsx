import { render, screen, within, fireEvent } from "@testing-library/react";
import PurpleBorderButton from "../../../components/utils/purple_border_button";
import '@testing-library/jest-dom';

const mockFunction = jest.fn();
const mockText: string = "This is a purple button";

describe("Test <PurpleBorderButton>", () => {
    test("Clicking a non-disabled button triggers mockFunction", () => {
        render(<PurpleBorderButton disabled={false} onClick={mockFunction} text={mockText} />);
    
        const button = screen.getByRole("button");
        expect(button).toHaveTextContent(mockText);

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalled();
    });

    test("Clicking a disabled button triggers mockFunction", () => {
        render(<PurpleBorderButton disabled={true} onClick={mockFunction} text={mockText} />);
    
        const button = screen.getByRole("button");
        expect(button).toHaveTextContent(mockText);
        
        fireEvent.click(button);
        expect(mockFunction).not.toHaveBeenCalled();
    })
});
