import { render, screen, within, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Navlink from "../../../components/utils/navlink";
import randomNumber from "../../../tools/random_number";
import { MemoryRouter } from "react-router-dom";

const mockFunction = jest.fn();
const mockUrl = "/" + randomNumber();
const mockLabel = randomNumber().toString();
const mockText = randomNumber().toString();

describe("test <NavLink />", () => {
    test("link renders and works (not active)", () => {


        render(
            <MemoryRouter>
                <Navlink label={mockLabel} isActive={false} url={mockUrl} onClick={mockFunction}>
                    <p>{mockText}</p>
                </Navlink>
            </MemoryRouter>
        );
    
        const link = screen.getByRole("link");
        
        expect(link).toHaveTextContent(mockText);
        expect(link).toHaveTextContent(mockLabel);
        expect(link).toHaveAttribute("href", mockUrl);

        fireEvent.click(link);
        expect(mockFunction).toHaveBeenCalled();
    });

    test("link renders and works (active)", () => {
        const mockLabel = randomNumber().toString();
        const mockText = randomNumber().toString();

        render(
            <MemoryRouter>
                <Navlink label={mockLabel} isActive={true} url={mockUrl} onClick={mockFunction}>
                    <p>{mockText}</p>
                </Navlink>
            </MemoryRouter>
        );
    
        const link = screen.getByRole("link");
        
        expect(link).toHaveTextContent(mockText);
        expect(link).toHaveTextContent(mockLabel);
        expect(link).toHaveAttribute("href", mockUrl);

        fireEvent.click(link);
        expect(mockFunction).toHaveBeenCalled();
    });

  
})