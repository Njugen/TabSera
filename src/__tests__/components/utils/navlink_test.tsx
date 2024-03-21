import { render, screen, within, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Navlink from "../../../components/utils/navlink";
import randomNumber from "../../../tools/random_number";
import { MemoryRouter } from "react-router-dom";

const mockPaths: Array<string> = [
    "?view=main",
    "?view=settings"
];

const mockFunction = jest.fn();

describe("test <NavLink />", () => {
    test.each(mockPaths)("works with label (not active)", (path) => {
        const mockLabel = randomNumber().toString();
        const mockIconSize = Math.floor(Math.random() * 31);

        render(
            <MemoryRouter>
                <Navlink label={mockLabel} isActive={false} url={path} iconSize={mockIconSize} onClick={mockFunction} />
            </MemoryRouter>
        );
    
        const link = screen.getByRole("link");
        const label = within(link).getByText(mockLabel);
        const icon = within(link).getByRole("img");

        expect(link).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(icon).toBeInTheDocument();

        fireEvent.click(link);
        expect(mockFunction).toHaveBeenCalled();
    });

    test.each(mockPaths)("works with label (active)", (path) => {
        const mockLabel = randomNumber().toString();
        const mockIconSize = Math.floor(Math.random() * 31);

        render(
            <MemoryRouter>
                <Navlink label={mockLabel} isActive={true} url={path} iconSize={mockIconSize} onClick={mockFunction} />
            </MemoryRouter>
        );

        const link = screen.getByRole("link");
        const label = within(link).getByText(mockLabel);
        const icon = within(link).getByRole("img");

        expect(link).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(icon).toBeInTheDocument();

        fireEvent.click(link);
        expect(mockFunction).toHaveBeenCalled();
    });

    test.each(mockPaths)("works with no label (active)", (path) => {
        const mockLabel = randomNumber().toString();
        const mockIconSize = Math.floor(Math.random() * 31);

        render(
            <MemoryRouter>
                <Navlink isActive={true} url={path} iconSize={mockIconSize} onClick={mockFunction} />
            </MemoryRouter>
        );
    
        const link = screen.getByRole("link");
        const label = within(link).queryByText(mockLabel);
        const icon = within(link).queryByRole("img");

        expect(link).toBeInTheDocument();
        expect(label).not.toBeInTheDocument();
        expect(icon).toBeInTheDocument();

        fireEvent.click(link);
        expect(mockFunction).toHaveBeenCalled();
    });

    test.each(mockPaths)("works with no label (not active)", (path) => {
        const mockLabel = randomNumber().toString();
        const mockIconSize = Math.floor(Math.random() * 31);

        render(
            <MemoryRouter>
                <Navlink isActive={false} url={path} iconSize={mockIconSize} onClick={mockFunction} />
            </MemoryRouter>
        );
    
        const link = screen.getByRole("link");
        const label = within(link).queryByText(mockLabel);
        const icon = within(link).queryByRole("img");

        expect(link).toBeInTheDocument();
        expect(label).not.toBeInTheDocument();
        expect(icon).toBeInTheDocument();

        fireEvent.click(link);
        expect(mockFunction).toHaveBeenCalled();
    });

    test("has no icon (with label)", () => {
        const mockPath = randomNumber().toString();
        const mockLabel = randomNumber().toString();
        const mockIconSize = Math.floor(Math.random() * 31);

        render(
            <MemoryRouter>
                <Navlink isActive={false} label={mockLabel} url={mockPath} iconSize={mockIconSize} onClick={mockFunction} />
            </MemoryRouter>
        );

        const link = screen.getByRole("link");
        const icon = within(link).queryByRole("img");

        expect(icon).not.toBeInTheDocument();
    });

    test("has no icon (without label)", () => {
        const mockPath = randomNumber().toString();
        const mockIconSize = Math.floor(Math.random() * 31);

        render(
            <MemoryRouter>
                <Navlink isActive={false} url={mockPath} iconSize={mockIconSize} onClick={mockFunction} />
            </MemoryRouter>
        );

        const link = screen.getByRole("link");
        const icon = within(link).queryByRole("img");

        expect(icon).not.toBeInTheDocument();
    })
})