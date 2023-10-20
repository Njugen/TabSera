import { render, screen, within } from "@testing-library/react";
import FormField from "../../../components/utils/form_field";
import '@testing-library/jest-dom'

describe("test <FormField />", () => {
    test("finds label and description, no error nor children", () => {
        const labelText = "This is my field";
        const descText = "This is the field's description";
        render(<FormField label={labelText} description={descText}></FormField>);

        const label = screen.getByText(labelText);
        const desc = screen.getByText(descText);
        const heading = screen.getByTestId("field-title-normal");

        expect(label).toBeInTheDocument();
        expect(desc).toBeInTheDocument();

        expect(heading).toBeInTheDocument();
    });

    test("finds error and child props", () => {
        const testId = "my-child";
        const childElement = <div data-testid={testId}></div>;
        render(<FormField label={"123456"} description={"456789"} error={true}>{childElement}</FormField>);

        const child = screen.queryByTestId(testId);
        const err = screen.getByTestId("field-title-error");

        expect(child).toBeInTheDocument();
        expect(err).toBeInTheDocument();
    });

    test("finds no error and child props", () => {
        const testId = "my-child";
        const childElement = <div data-testid={testId}></div>;
        render(<FormField label={"123456"} description={"456789"} error={false}>{childElement}</FormField>);

        const child = screen.queryByTestId(testId);
        const err = screen.getByTestId("field-title-normal");

        expect(child).toBeInTheDocument();
        expect(err).toBeInTheDocument();
    });
});