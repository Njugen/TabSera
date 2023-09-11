import { iWindowItem
 } from "./window_item";
 
interface iFolder {
    id: number;
    type: "expanded" | "collapsed",
    viewMode: "grid" | "list",
    name: String,
    windows: Array<iWindowItem>
}


export { iFolder };