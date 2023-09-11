import { iSVG } from "../../interfaces/svg";
function OpenedFolderIcon(props: iSVG){
    const {size, fill} = props;

    return (<svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size}><path fill={fill} d="M140-160q-23 0-41.5-18.5T80-220v-520q0-23 18.5-41.5T140-800h281l60 60h339q23 0 41.5 18.5T880-680H140v460l102-400h698L833-206q-6 24-22 35t-41 11H140Z"/></svg>);
}

export default OpenedFolderIcon;