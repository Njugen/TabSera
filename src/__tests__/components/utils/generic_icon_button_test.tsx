import { render, screen, within, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import GenericIconButton from "../../../components/utils/generic_icon_button";
import randomNumber from "../../../tools/random_number";

const mockFunction = jest.fn();
const mockIcons: Array<string> = [
    "trash", 
    "settings", 
    "open_browser", 
    "collapse",
    "expand",
    "close",
    "search",
    "list",
    "grid",
    "checked",
    "edit",
    "multi_folders",
    "config",
    "folder_duplicate",
    "merge",
    "selected_checkbox",
    "deselected_checkbox",
    "sort",
    "close_light",
    "closed_folder",
    "left",
    "opened_folder",
    "right"
];

const mockColors = [
    "rgba(0,0,0,1)",
    "#fff",
    "#d2d2d2",
    "rgba(158, 254, 255, 0.5)"
]

describe("test <GenericIconButton />", () => {
    test.each(mockIcons)(
        "%p icon button renders and works ok", (iconArg) => {
            const mockSize = Math.floor(Math.random() * 31);
            const mockColorIndex = Math.floor(Math.random() * mockColors.length);         
            
            render(<GenericIconButton icon={iconArg} size={mockSize} fill={mockColors[mockColorIndex]} onClick={mockFunction} />);

            const button = screen.getByRole("button");
            expect(button).toBeInTheDocument();

            const icon = within(button).getByRole("img");
            expect(icon).toBeInTheDocument();

            fireEvent.click(button);
            expect(mockFunction).toHaveBeenCalled();
        }
    );

    test("render no image if icon prop is not valid", () => {
        const iconString = randomNumber().toString();
        render(<GenericIconButton icon={iconString} size={10} fill={"#000"} onClick={mockFunction} />);

        const icon = screen.queryByRole("img");
        expect(icon).not.toBeInTheDocument();

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalled();
    });
});