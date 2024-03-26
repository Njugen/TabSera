import { render, screen, within, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import randomNumber from "../../../tools/random_number";
import TextIconButton from "../../../components/utils/text_icon_button";

const mockFunction = jest.fn();
const mockLabel = randomNumber().toString();
const mockText = randomNumber().toString();
const mockId = randomNumber().toString();

describe("test <TextIconButton />", () => {
    test("Button renders ok and triggers a function when clicked", () => {
        render(
            <TextIconButton id={mockId} text={mockLabel} disabled={false} textSize={"blabla"} onClick={mockFunction}>
                <>{mockText}</>
            </TextIconButton>
            );

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(mockText);
        expect(button).toHaveTextContent(mockLabel);
        expect(button).not.toHaveTextContent(mockId);

        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalled();
    });

    test("Disabled button renders ok and does not trigger anything at click", () => {
        render(
            <TextIconButton id={mockId} text={mockLabel} disabled={true} textSize={"blabla"} onClick={mockFunction}>
                <>{mockText}</>
            </TextIconButton>
            );

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(mockText);
        expect(button).toHaveTextContent(mockLabel);
        expect(button).not.toHaveTextContent(mockId);

        fireEvent.click(button);
        expect(mockFunction).not.toHaveBeenCalled();
    });
});