import { iTextContents } from "../../interfaces/text_contents";

/*
    Customized generic paragraph for this extension. May or may not be used depending
    on needs for a generic paragraph layout.
*/

function Paragraph(props: iTextContents): JSX.Element {
    const { text, size, lineheight} = props;
    
    return (
        <p className={`${size && size} text-base ${lineheight ? lineheight : "leading-7"} text-tbfColor-darkergrey text-start`}>
            {text}
        </p>
    ); 
}

export default Paragraph;