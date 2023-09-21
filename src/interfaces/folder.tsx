import { iWindowItem
 } from "./window_item";
 
interface iFolder {
    id: number,
    name: string,
    desc: string,
    marked: boolean,
    type: "expanded" | "collapsed",
    viewMode: "list" | "grid",
    settings: {
        startup_launch: boolean,
        close_previous: boolean,
        auto_add: boolean
    },
    windows: Array<iWindowItem>,
    onMark?: (e: number) => void,
    onEdit?: (e: number) => void
    onDelete?: (e: iFolder) => void
}


export { iFolder };