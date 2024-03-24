const applyStateId = (tag: string, id: number, selected : number | null): string => {
    if(selected === id){
        return `${tag}-option-${id}-active`;
    }
    
    return `${tag}-option-${id}`;
}

export default applyStateId;