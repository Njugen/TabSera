import MiniFolder from '../components/utils/mini_folder';
import SimpleSearchBar from '../components/utils/simple_search_bar';
import '../App.css';
import styles from "./../styles/global_utils.module.scss";
import "./../styles/sidepanel_specific.css";

function RenderSidePanel(props: any): JSX.Element {
    const handleChange = (e: any): void => {
        console.log(e.target.value);
    }

    return (
        <>
            <div className={"p-4 border-b border-gray-100 sticky top-0 z-50 bg-white"}>
                <SimpleSearchBar onChange={handleChange} />
                <div className="flex justify-between mt-8">
                    <button className="text-tbfColor-lightpurple font-semibold">Folders</button>
                    <button className="text-gray-400 hover:text-tbfColor-lighterpurple transition ease-in-out duration-300 font-semibold">Current tabs</button>
                    <button className="text-gray-400 hover:text-tbfColor-lighterpurple transition ease-in-out duration-300 font-semibold">History</button>
                </div>
            </div>
            <div className={`overflow-y-auto p-4 ${styles.scroll_style} bg-gray-50 min-h-[1000px]`}>
                <MiniFolder />
                <MiniFolder />
            </div>
        </>
    )
}

export default RenderSidePanel;