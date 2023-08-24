function Paragraph(props: iTextContents){
    const { text } = props;
    
    return (
        <p className="text-base leading-7 text-tbfColor-darkergrey text-start">
            {text}
        </p>
    ); 
}

export default Paragraph;