import iSectionContainer from '../../interfaces/section_container';

/*
    A white wrapper serving as either main section (contents page wrapper), or part section
    of a view.
*/

const SectionContainer = (props: iSectionContainer): JSX.Element => {
    const { id, title, options, children } = props;

    return (
        <div id={id} className="mb-12 pt-10 bg-white shadow">
            <div className="flex justify-between min-h-[350px]">
                <div className="w-full mb-6 px-14 pb-4">
                    <div className="flex flex-col 2xl:flex-row justify-between items-center 2xl:items-end mb-8">
                        <h1 className="text-4xl text-tbfColor-darkpurple font-light inline-block">
                            {title}
                        </h1>
                        <div className="mt-10 2xl:mt-0">
                            {options && options()}
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}


export default SectionContainer;