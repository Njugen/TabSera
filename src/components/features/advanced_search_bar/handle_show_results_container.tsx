interface IHandleShowResultsContainerProps {
    searchResultsContainerRef: React.RefObject<HTMLDivElement>,
    showResultsContainer: boolean,
    slideDown: boolean,
    setSlideDown: React.Dispatch<React.SetStateAction<boolean>>,
    setShowResultsContainer: React.Dispatch<React.SetStateAction<boolean>>
}

 // Show search results by sliding in the results area
const handleShowResultsContainer = (props: IHandleShowResultsContainerProps): void => {
    const { searchResultsContainerRef, showResultsContainer, slideDown, setSlideDown, setShowResultsContainer } = props;

    if(showResultsContainer === false){
        setShowResultsContainer(true);
        setSlideDown(slideDown === true ? false : true);
      
    } else {
        if(searchResultsContainerRef.current){
            searchResultsContainerRef.current.classList.remove("mt-20");
            searchResultsContainerRef.current.classList.add("mt-10");
        } 
        document.body.style.overflowY = "auto";
        setSlideDown(false);
        setShowResultsContainer(false);
    }
}

export { IHandleShowResultsContainerProps, handleShowResultsContainer };