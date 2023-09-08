interface iFolder {
    type: "expanded" | "collapsed",
    viewMode: "grid" | "list",
    name: String,
    windows: Array<Window>
}
