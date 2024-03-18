import { iWindowItem
 } from "./window_item";
 
interface iFolder {
    id: number,
    name: string,
    desc: string,
    marked: boolean,
    type: "expanded" | "collapsed",
    viewMode: "list" | "grid",
    windows: Array<iWindowItem>,
    index?: number,
    showActions?: boolean, 
    onOpen?: (e: Array<iWindowItem>, type: string) => void,
    onMark?: (e: number) => void,
    onEdit?: (e: number) => void
    onDelete?: (e: iFolder) => void
}


export { iFolder };