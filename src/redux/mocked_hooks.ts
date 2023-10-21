import { useDispatch as useMockDispatch, useSelector as useMockSelector } from "react-redux";

const mockedDispatch = useMockDispatch as jest.MockedFunction<typeof useMockDispatch>;
const mockedSelector = useMockSelector as jest.MockedFunction<typeof useMockSelector>;

export const useDispatch = mockedDispatch;
export const useSelector = mockedSelector;
