function GridIcon(props: iSVG){
    const {size, fill} = props;

    return (<svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size}><path fill={fill} d="M120-510v-330h330v330H120Zm0 390v-330h330v330H120Zm390-390v-330h330v330H510Zm0 390v-330h330v330H510Z"/></svg>);
}

export default GridIcon;