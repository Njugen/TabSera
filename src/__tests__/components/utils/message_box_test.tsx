import { render, screen, within, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import MessageBox from "../../../components/utils/message_box";
import randomNumber from "../../../tools/random_number";

const mockTitle = randomNumber().toString();
const mockMessage = randomNumber().toString();

const primaryButton = {
    text: randomNumber().toString(),
    callback: jest.fn()
}

const secondaryButton = {
    text: randomNumber().toString(),
    callback: jest.fn()
}

describe("test <MessageBox /> and its features", () => {
    test("title and text in place", () => {
        render(<MessageBox title={mockTitle} text={mockMessage} primaryButton={primaryButton} secondaryButton={secondaryButton} />);

        const title = screen.getByRole("heading", { level: 4 } );
        const message = screen.getByText(mockMessage);

        expect(document.body.style.overflowY).toBe("hidden");
        expect(title).toBeInTheDocument();
        expect(message).toBeInTheDocument();
    });

    test("primary button works", () => {
        render(<MessageBox title={mockTitle} text={mockMessage} primaryButton={primaryButton} secondaryButton={secondaryButton} />);

        const button = screen.getByText(primaryButton.text, { selector: "button" });
        expect(button).toBeInTheDocument();
        
        fireEvent.click(button);
        expect(document.body.style.overflowY).toBe("scroll");
        expect(primaryButton.callback).toHaveBeenCalled();
    });

    test("secondary button works", () => {
        render(<MessageBox title={mockTitle} text={mockMessage} primaryButton={primaryButton} secondaryButton={secondaryButton} />);

        const button = screen.getByText(secondaryButton.text, { selector: "button" });
        expect(button).toBeInTheDocument();
        
        fireEvent.click(button);
        expect(document.body.style.overflowY).toBe("scroll");
        expect(secondaryButton.callback).toHaveBeenCalled();
    })
});