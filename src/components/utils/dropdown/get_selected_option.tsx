import { iFieldOption } from "../../../interfaces/dropdown";

interface IGetSelectedOptionProps {
    options: Array<iFieldOption>,
    preset: iFieldOption,
    selected: number | null
}

// Get information about the selected option 
const getSelectedOption = (props: IGetSelectedOptionProps): iFieldOption => {
    const { options, preset, selected } = props;

    const target = options.find((option) => option.id === selected);
    return target ? target : preset;
}

export {IGetSelectedOptionProps, getSelectedOption};