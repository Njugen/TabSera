// Show scrollbar and close the popup
const handleClose = (callback: () => void): void => {
    document.body.style.overflowY = "scroll";
    callback();
}

export default handleClose;