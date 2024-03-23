import { render, screen, within, fireEvent } from "@testing-library/react";
import PurpleBorderButton from "../../../components/utils/purple_border_button";
import '@testing-library/jest-dom';
import SectionContainer from "../../../components/utils/section_container";

const mockFunction = jest.fn();
const mockTitle: string = "This is a test title";
const mockId = "test-id"
const mockText = "Hey buddy";
const mockContents: JSX.Element = <>{mockText}</>;
const mockOptions: JSX.Element = (
    <>
        <button data-testid="my-test-button">My Test Button</button>
    </>
);

describe("Test <SectionContainer>", () => {
    test("title and contents are visible", () => {
        render(
            <SectionContainer id={mockId} title={mockTitle}>
                {mockContents}
            </SectionContainer>
        );
    
        const button = screen.getByRole("heading");
        expect(button).toHaveTextContent(mockTitle);
        
        const contents = screen.getByText(mockText);
        expect(contents).toBeVisible();
    });

    test("Options props works", () => {
        render(
            <SectionContainer id={mockId} title={mockTitle} options={() => mockOptions}>
                {mockContents}
            </SectionContainer>
        );
    
        const button = screen.getByTestId("my-test-button");
        expect(button).toBeVisible();
    })
});
