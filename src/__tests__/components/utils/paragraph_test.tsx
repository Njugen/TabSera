import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import randomNumber from "../../../tools/random_number";
import Paragraph from "../../../components/utils/paragraph";

test("paragraphs shows text", () => {  
    const mockText = randomNumber().toString();

    render(<Paragraph text={mockText} />);
    
    const text = screen.getByText(mockText);
    expect(text).toBeInTheDocument();
})
