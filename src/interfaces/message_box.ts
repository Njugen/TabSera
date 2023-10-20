interface iMessageBox {
    title: string,
    text: string,
    primaryButton: {
        text: string,
        callback: () => void
    },
    secondaryButton: {
        text: string,
        callback: () => void
    }
}

export default iMessageBox;