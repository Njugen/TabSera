import "./../../styles/global_utils.module.scss";
import { iFormField } from "../../interfaces/form_field";

import Paragraph from '../../components/utils/paragraph';

function FormField(props: iFormField): JSX.Element {
    const { label, description, children } = props;
    return (
        <div className="py-6 flex flex-row items-center">
            <div className="w-2/5">
                <h4 className="font-semibold text-lg mb-1">{label}</h4>
                <Paragraph lineheight="leading-6" size="text-xs" text={description} />
            </div>
            <div className="w-3/5 ml-24">
                { children }
            </div>
        </div>
    ); 
}

export default FormField;