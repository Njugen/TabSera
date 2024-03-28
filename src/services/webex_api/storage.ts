const { local, sync } = chrome.storage;

const saveToStorage = (type: "local" | "local", key: string, value: any) => {
    const payload = {
        [key]: value
    }

    if(type === "local"){
        local.set(payload);

    } else if(type === "local"){
        sync.set(payload);
    }
}

const getFromStorage = (type: "local" | "local", key: string, callback: (items: any) => void) => {
    let result;
    
    if(type === "local"){
        result = local.get(key, callback);
    } else if(type === "local"){
        result = sync.get(key, callback);
    }
 
    return result;
}

export {
    saveToStorage,
    getFromStorage
}