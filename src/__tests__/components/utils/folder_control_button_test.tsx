import { render, screen, within, fireEvent } from "@testing-library/react";
import FolderControlButton from "../../../components/utils/folder_control_button";
import '@testing-library/jest-dom'

const mockFunction = jest.fn();
const mockIcons = ["trash", "settings", "open_browser", "collapse_expand"];
const mockActiveOnClick: Array<[boolean, any]> = [[true, undefined], [true, mockFunction], [false, undefined], [false, mockFunction]];

describe("test <FolderControlButton />", () => {
    test.each(mockActiveOnClick)(
        "button has no icon", (activeArg, onClickArg) => {
            render(<FolderControlButton icon="" active={activeArg} onClick={onClickArg} />);
            const button = screen.getByRole("button");
            const icon = within(button).queryByRole("img");
            
            expect(button).toBeInTheDocument();
            expect(icon).not.toBeInTheDocument();

            if(onClickArg === mockFunction){
                fireEvent.click(button);
                expect(onClickArg).toHaveBeenCalled();
            }
        }
    )

    describe("when active", () => {
        test.each(mockIcons)(
            "click %p button", (iconCase) => {
                render(<FolderControlButton icon={iconCase} active={true} onClick={mockFunction} />);

                const button = screen.getByRole("button");
                fireEvent.click(button);

                expect(mockFunction).toHaveBeenCalled();
            }
        );

        test.each(mockIcons)(
            "button has %p icon, with onClick", (iconCase) => {
                render(<FolderControlButton icon={iconCase} active={true} onClick={mockFunction} />);
                const button = screen.getByRole("button");
                const icon = within(button).getByRole("img");
                
                expect(button).toBeInTheDocument();
                expect(icon).toBeInTheDocument();
            }
        );

        test.each(mockIcons)(
            "button has %p icon, no onClick", (iconCase) => {
                render(<FolderControlButton icon={iconCase} active={true} />);
                const button = screen.getByRole("button");
                const icon = within(button).getByRole("img");
                
                expect(button).toBeInTheDocument();
                expect(icon).toBeInTheDocument();
            }
        );
    });
       
    describe("when not active", () => {
        test.each(mockIcons)(
            "click %p button", (iconCase) => {
                render(<FolderControlButton icon={iconCase} active={false} onClick={mockFunction} />);

                const button = screen.getByRole("button");
                fireEvent.click(button);

                expect(mockFunction).toHaveBeenCalled();
            }
        );

        test.each(mockIcons)(
            "button has %p icon", (iconCase) => {
                render(<FolderControlButton icon={iconCase} active={false} onClick={mockFunction} />);
                const button = screen.getByRole("button");
                const icon = within(button).getByRole("img");
                
                expect(button).toBeInTheDocument();
                expect(icon).toBeInTheDocument();
            }
        );

        test.each(mockIcons)(
            "button has %p icon", (iconCase) => {
                render(<FolderControlButton icon={iconCase} active={false} />);
                const button = screen.getByRole("button");
                const icon = within(button).getByRole("img");
                
                expect(button).toBeInTheDocument();
                expect(icon).toBeInTheDocument();
            }
        );
    });
}); 