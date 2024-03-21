import iSectionContainer from '../../interfaces/section_container';

const SectionContainer = (props: iSectionContainer): JSX.Element => {
    const { id, title, options, children } = props;

    return (
        <div id={id} className="mb-12 pt-10 bg-white shadow">
            <div className="flex justify-between min-h-[350px]">
                <div className="w-full mb-6 px-14 pb-4">
                    <div className="flex justify-between mb-8">
                        <h1 className="text-4xl text-tbfColor-darkpurple font-light inline-block">
                            {title}
                        </h1>
                        {options && options()}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}


export default SectionContainer;