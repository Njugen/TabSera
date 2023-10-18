import randomNumber from "../../tools/random_number";

describe("test randomNumber()", () => {
    test("returns numbers - 1", () => {
        const rand1 = randomNumber();
        const rand2 = randomNumber();

        expect(rand1).not.toBeNaN();
        expect(rand2).not.toBeNaN();

        expect(rand1).not.toEqual(rand2);
    });
    
    test("returns numbers - 2", () => {
        const rand1 = randomNumber();
        const rand2 = randomNumber();

        expect(rand1).not.toBeNaN();
        expect(rand2).not.toBeNaN();

        expect(rand1).not.toEqual(rand2);
    });
    
    test("returns numbers - 3", () => {
        const rand1 = randomNumber();
        const rand2 = randomNumber();

        expect(rand1).not.toBeNaN();
        expect(rand2).not.toBeNaN();

        expect(rand1).not.toEqual(rand2);
    });
})
