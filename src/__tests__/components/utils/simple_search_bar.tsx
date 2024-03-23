import { render, screen, within, fireEvent } from "@testing-library/react";

import '@testing-library/jest-dom';
import SimpleSearchBar from "../../../components/utils/simple_search_bar";

const mockFunction = jest.fn();
const mockSearchText: string = "This is a purple button";

describe("Test <SimpleSearchBar>", () => {
    test("Clicking a non-disabled button triggers mockFunction", () => {
        render(<SimpleSearchBar onChange={mockFunction} />);
    
        const textfield = screen.getByTestId("search-field");
        expect(textfield).toHaveValue("Search...");

        fireEvent.click(textfield);
        fireEvent.change(textfield, { 
            target: { 
                value: mockSearchText
            } 
        })

        expect(mockFunction).toHaveBeenCalled();
        expect(textfield).toHaveValue(mockSearchText);
    });

});
