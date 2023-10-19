//import { render, screen, within, fireEvent } from "@testing-library/react";
import React from 'react';
import '@testing-library/jest-dom';
import DropdownMenu from "../../../components/utils/dropdown_menu";
import { iFieldOption } from "../../../interfaces/dropdown";
import { render, screen, within, fireEvent, Matcher } from "../../../tools/css_enhanced_render";
import userEvent from '@testing-library/user-event'

const mockTag: string = "my-lovely-dropdown-menu";
const mockOptions: Array<iFieldOption> = [
    { 
        id: 0,
        label: "Test option"
    },
    { 
        id: 1,
        label: "Another test option"
    },
    { 
        id: 2,
        label: "blablabla"
    }
];
const mockFunction = jest.fn();


describe("test <DropdownMenu />", () => {
    test.each(mockOptions)("list is collapsed (no preset option)", async (arg) => {
        render(<DropdownMenu tag={mockTag} options={mockOptions} visible={false} selected={null} onSelect={mockFunction} />);

        const list = screen.getByRole("list", { hidden: true });
        expect(list).not.toBeVisible();

        const button = within(list).getByText(arg.label as Matcher, { selector: "button"});
        expect(button).not.toBeVisible();
    });

    test.each(mockOptions)("list is collapsed (preset option)", async (arg) => {
        render(<DropdownMenu tag={mockTag} options={mockOptions} visible={false} selected={mockOptions[0].id} onSelect={mockFunction} />);

        const list = screen.getByRole("list", { hidden: true });
        expect(list).not.toBeVisible();

        const button = within(list).getByText(arg.label as Matcher, { selector: "button"});
        expect(button).not.toBeVisible();
    });


    test.each(mockOptions)("list is expanded (no preset option)", async (arg) => {
        render(<DropdownMenu tag={mockTag} options={mockOptions} visible={true} selected={null} onSelect={mockFunction} />);

        const list = screen.getByRole("list", { hidden: false });
        expect(list).toBeVisible();

        const button = within(list).getByText(arg.label as Matcher, { selector: "button"});
        expect(button).toBeVisible();

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalled();
    });

    test.each(mockOptions)("list is expanded (preset option)", async (arg) => {
        render(<DropdownMenu tag={mockTag} options={mockOptions} visible={true} selected={mockOptions[0].id} onSelect={mockFunction} />);

        const list = screen.getByRole("list", { hidden: false });
        expect(list).toBeVisible();

        const button = within(list).getByText(arg.label as Matcher, { selector: "button"});
        expect(button).toBeVisible();

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalled();
    });
});