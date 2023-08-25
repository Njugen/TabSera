function Paragraph(props: iTextContents){
    const { text, size, lineheight} = props;
    
    return (
        <p className={`${size && size} text-base ${lineheight ? lineheight : "leading-7"} text-tbfColor-darkergrey text-start`}>
            {text}
        </p>
    ); 
}

export default Paragraph;