import { useEffect, useState } from "react"
import CloseIcon from "../../../images/icons/close_icon"
import { innerStyleDirection, outerStyleDirection } from "../../features/folder_manager/style_directions"
import GenericIconButton from "../generic_icon_button"
import PrimaryButton from "../primary_button/primary_button"
import PurpleBorderButton from "../purple_border_button"

interface iGenericPopup {
    title: string,
    type: "slide-in" | "popup",
    children: Array<JSX.Element> | JSX.Element,
    onClose: (e?: any) => void
    onSave?: (e?: any) => void
}

const GenericPopup = (props: iGenericPopup): JSX.Element => {
    const [show, setShow] = useState<boolean>(false);
    const { title, type, children, onClose, onSave } = props;

    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <div data-testid="generic-popup" className={outerStyleDirection(type, show)}>
            <div className="relative top-0 md:bottom-12 h-screen w-[992px]">
                <div className={innerStyleDirection(type, show)}>
                    <div id="popup-header" className="pl-8 pr-5 pb-5 pt-6 border-b border-tbfColor-lgrey w-full flex justify-between">
                        <h1 data-testid="popup-title" className="text-3xl text-tbfColor-darkpurple font-light inline-block">
                            {title}
                        </h1>
                        <GenericIconButton icon="close" onClick={onClose}>
                            <CloseIcon size={34} fill="rgba(0,0,0,0.2)" />
                        </GenericIconButton>
                    </div>
                    <div id="popup-body" className="px-8 pt-6">
                        {children}
                    </div>
                    {
                        onSave && (
                            <div id="popup-footer" className="px-8 py-8 mt-4 flex justify-end border-t border-tbfColor-lgrey">
                                <PurpleBorderButton disabled={false} text="Cancel" onClick={() => onClose} />
                                <PrimaryButton disabled={false} text={"blabla"} onClick={() => onSave} />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default GenericPopup;