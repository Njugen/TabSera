import SimpleSearchBar from '../components/utils/simple_search_bar';
import './../App.css';
import "./../styles/global_utils.module.scss";

function RenderSidePanel(props: any): JSX.Element {
    const handleChange = (e: any): void => {
        console.log(e.target.value);
    }

    return (
        <div className={"m-4"}>
            <SimpleSearchBar onChange={handleChange} />
            <div className="flex justify-between my-8">
                <button className="text-tbfColor-lighterpurple font-semibold">Folders</button>
                <button className="text-gray-400">Current tabs</button>
                <button className="text-gray-400">History</button>
            </div>
        </div>
    )
}

export default RenderSidePanel;