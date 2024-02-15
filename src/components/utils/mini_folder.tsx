import ClosedFolderIcon from '../../images/icons/closed_folder_icon';
import './../../App.css';
import styles from "./../../styles/global_utils.module.scss";
import WindowItem from './../window_item';

function MiniFolder(props: any): JSX.Element {
    return (
        <>
            <div className={"bg-white drop-shadow-focus duration-75 p-4 transition-all ease-in w-full rounded-md my-4"}>
                <div className="flex items-center justify-start">
                    <ClosedFolderIcon size={23} fill="black" />
                    <h4 className="ml-2 font-semibold">Folder 1</h4>
                </div>
                <div className="text-sm my-4 leading-6">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mattis mi quis vulputate imperdiet. Nunc aliquet ullamcorper justo, a eleifend odio mollis vitae.
                    </p>
                    <div className={"mt-4"}>
                        <WindowItem
                            id={0}
                            tabs={[
                                {
                                    id: 0,
                                    label: "Fasabladet - Ingen glasskiosk i brändö",
                                    url: "http://vasabladet.fi",
                                    marked: false,
                                },
                                {
                                    id: 1,
                                    label: "Fasabladet - Ingen glasskiosk i brändö",
                                    url: "http://vasabladet.fi",
                                    marked: false
                                }
                            ]}
                            disableTabEdit={true}
                            disableTabMark={true}
                            disableMark={true}
                            tabsCol={1}
                        />
                        <WindowItem
                            id={1}
                            tabs={[
                                {
                                    id: 2,
                                    label: "Fasabladet - Ingen glasskiosk i brändö",
                                    url: "http://vasabladet.fi",
                                    marked: false
                                },
                                {
                                    id: 3,
                                    label: "Fasabladet - Ingen glasskiosk i brändö",
                                    url: "http://vasabladet.fi",
                                    marked: false
                                }
                            ]}
                            disableTabEdit={true}
                            disableTabMark={true}
                            disableMark={true}
                            tabsCol={1}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiniFolder;