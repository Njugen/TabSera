interface iSectionContainer {
    id: string,
    title: string,
    children: JSX.Element | Array<JSX.Element>,
    options?: () => JSX.Element | Array<JSX.Element>
}

export default iSectionContainer;