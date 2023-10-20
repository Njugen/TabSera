import { render, screen, within, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Checkbox from "../../../components/utils/checkbox";
import Navlink from "../../../components/utils/navlink";
import randomNumber from "../../../tools/random_number";
import { MemoryRouter } from "react-router-dom";
import Paragraph from "../../../components/utils/paragraph";

test("paragraphs shows text", () => {  
    const mockText = randomNumber().toString();

    render(<Paragraph text={mockText} />);
    
    const text = screen.getByText(mockText);
    expect(text).toBeInTheDocument();
})
