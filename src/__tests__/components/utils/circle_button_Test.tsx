import { render, screen, within, fireEvent } from "@testing-library/react";

import '@testing-library/jest-dom';
import CircleButton from "../../../components/utils/circle_button";

const mockFunction = jest.fn();
const mockText: string = "Hey buddy";
const mockComponent = (): JSX.Element => <>{mockText}</>;

describe("Test <CircleButton>", () => {
    test("Non disabled button behaves correctly", () => {
        render(
            <CircleButton onClick={mockFunction} bgCSSClass="abcdef" disabled={false}>
                {mockComponent()}
            </CircleButton>
        );

        const button = screen.getByRole("button");
        expect(button).toHaveTextContent(mockText);

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalled();
    });

    test("Disabled button behaves correctly", () => {
        render(
            <CircleButton onClick={mockFunction} bgCSSClass="abcdef" disabled={true}>
                {mockComponent()}
            </CircleButton>
        );

        const button = screen.getByRole("button");

        fireEvent.click(button);
        expect(mockFunction).not.toHaveBeenCalled();
    });
});
