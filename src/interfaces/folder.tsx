import { iWindowItem
 } from "./window_item";
 
interface iFolder {
    id: number,
    name: string,
    desc: string,
    type: "expanded" | "collapsed",
    viewMode: "list" | "grid",
    settings: {
        startup_launch: boolean,
        close_previous: boolean,
        auto_add: boolean
    },
    windows: Array<iWindowItem>,
    onEdit?: (e: number) => void
    onDelete?: (e: iFolder) => void
}


export { iFolder };