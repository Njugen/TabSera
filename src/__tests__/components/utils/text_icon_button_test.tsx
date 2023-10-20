import { render, screen, within, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import GenericIconButton from "../../../components/utils/generic_icon_button";
import randomNumber from "../../../tools/random_number";
import TextIconButton from "../../../components/utils/text_icon_button";

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

describe("test <TextIconButton IconButton />", () => {
    test("Button text renders but has no icon", () => {
        const mockSize = {
            icon: Math.floor(Math.random() * 31),
            text: Math.floor(Math.random() * 31).toString()
        }
        const mockColorIndex = Math.floor(Math.random() * mockColors.length);         
        const mockIcon = randomNumber().toString();
        const mockText = randomNumber().toString();

        render(<TextIconButton text={mockText} disabled={false} icon={mockIcon} size={mockSize} fill={mockColors[mockColorIndex]} onClick={mockFunction} />);

        const button = screen.getByTestId(`text-icon-button-${mockIcon}`);
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalled();
    });

    test.each(mockIcons)(
        "%p text button renders and works ok", (iconArg) => {
            const mockSize = {
                icon: Math.floor(Math.random() * 31),
                text: Math.floor(Math.random() * 31).toString()
            }
            const mockColorIndex = Math.floor(Math.random() * mockColors.length);         
            const mockText = randomNumber().toString();

            render(<TextIconButton text={mockText} disabled={false} icon={iconArg} size={mockSize} fill={mockColors[mockColorIndex]} onClick={mockFunction} />);

            const button = screen.getByTestId(`text-icon-button-${iconArg}`);
            expect(button).toBeInTheDocument();

            const icon = within(button).getByRole("img");
            expect(icon).toBeInTheDocument();

            fireEvent.click(button);
            expect(mockFunction).toHaveBeenCalled();
        }
    );

    test("disabled button text renders but has no icon", () => {
        const mockSize = {
            icon: Math.floor(Math.random() * 31),
            text: Math.floor(Math.random() * 31).toString()
        }
        const mockColorIndex = Math.floor(Math.random() * mockColors.length);         
        const mockIcon = randomNumber().toString();
        const mockText = randomNumber().toString();

        render(<TextIconButton text={mockText} disabled={true} icon={mockIcon} size={mockSize} fill={mockColors[mockColorIndex]} onClick={mockFunction} />);

        const button = screen.getByTestId(`text-icon-button-${mockIcon}`);
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(mockFunction).not.toHaveBeenCalled();
    });

    test.each(mockIcons)(
        "disabled %p text button renders and works ok", (iconArg) => {
            const mockSize = {
                icon: Math.floor(Math.random() * 31),
                text: Math.floor(Math.random() * 31).toString()
            }
            const mockColorIndex = Math.floor(Math.random() * mockColors.length);         
            const mockText = randomNumber().toString();

            render(<TextIconButton text={mockText} disabled={true} icon={iconArg} size={mockSize} fill={mockColors[mockColorIndex]} onClick={mockFunction} />);

            const button = screen.getByTestId(`text-icon-button-${iconArg}`);
            expect(button).toBeInTheDocument();

            const icon = within(button).getByRole("img");
            expect(icon).toBeInTheDocument();

            fireEvent.click(button);
            expect(mockFunction).not.toHaveBeenCalled();
        }
    );
});