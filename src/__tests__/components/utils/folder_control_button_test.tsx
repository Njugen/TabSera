import { render, screen, within, fireEvent } from "@testing-library/react";
import FolderControlButton from "../../../components/utils/folder_control_button";
import '@testing-library/jest-dom'

const mockFunction = jest.fn();
const mockIcons = ["trash", "settings", "open_browser", "collapse_expand"];

describe("test <FolderControlButton />", () => {
    describe("when active", () => {
        test.each(mockIcons)(
            "click %p icon button", (iconCase) => {
                render(<FolderControlButton icon={iconCase} active={true} onClick={mockFunction} />);
                const button = screen.getByRole("button");
                const icon = within(button).getByRole("img");
                fireEvent.click(button);
                
                expect(mockFunction).toHaveBeenCalled();
                expect(icon).toBeInTheDocument();
            }
        );

        test("click no icon button", () => {
            render(<FolderControlButton icon="" active={true} onClick={mockFunction} />);
            const button = screen.getByRole("button");
            const icon = within(button).queryByRole("img");
            fireEvent.click(button);
            
            expect(mockFunction).toHaveBeenCalled();
            expect(icon).not.toBeInTheDocument();
        })
    });
       
    describe("when not active", () => {
        test.each(mockIcons)(
            "click %p button", (iconCase) => {
                render(<FolderControlButton icon={iconCase} active={false} onClick={mockFunction} />);
                const button = screen.getByRole("button");
                const icon = within(button).getByRole("img");
                fireEvent.click(button);
                
                expect(mockFunction).toHaveBeenCalled();
                expect(icon).toBeInTheDocument();
            }
        );
        
        test("click no icon button", () => {
            render(<FolderControlButton icon="" active={false} onClick={mockFunction} />);
            const button = screen.getByRole("button");
            const icon = within(button).queryByRole("img");
            fireEvent.click(button);
            
            expect(mockFunction).toHaveBeenCalled();
            expect(icon).not.toBeInTheDocument();
        })
    });
}); 