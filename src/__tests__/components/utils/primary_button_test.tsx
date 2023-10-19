import { render, screen, within, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import PrimaryButton from "../../../components/utils/primary_button";

const mockFunction = jest.fn();
const mockText = "hello mah boy";

describe("test <PrimaryButton />", () => {
    test("disabled button not calling function when clicked", () => {
        render(<PrimaryButton text={mockText} disabled={true} onClick={mockFunction} />);

        const button = screen.getByRole("button");
        const text = within(button).getByText(mockText);

        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
        expect(text).toBeInTheDocument();

        fireEvent.click(button);
        expect(mockFunction).not.toHaveBeenCalled();
    });

    test("normal button calling function when clicked", () => {
        render(<PrimaryButton text={mockText} disabled={false} onClick={mockFunction} />);

        const button = screen.getByRole("button");
        const text = within(button).getByText(mockText);

        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
        expect(text).toBeInTheDocument();

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalled();
    })
});