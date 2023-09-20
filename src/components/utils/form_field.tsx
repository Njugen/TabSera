import { iFormField } from "../../interfaces/form_field";

function FormField(props: iFormField): JSX.Element {
    const { label, description, children, error } = props;
    
    return (
        <div className="mb-12 flex flex-row items-center">
            <div className={`w-2/5`}>
                <h4 className={`font-semibold text-lg mb-1 ${error === true && "text-red-500"}`}>{label}</h4>
                <p className={`text-sm leading-6 text-tbfColor-darkergrey text-start ${error === true && "text-red-500"}`}>
                    {description}
                </p>
            </div>
            <div className="w-3/5 ml-24">
                { children }
            </div>
        </div>
    ); 
}

export default FormField;