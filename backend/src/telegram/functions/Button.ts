import {CallbackQueryManager} from "../CallbackQueryManager";

export async function createButton(text:string, path:string, params:{[key:string]:any} = {}){
    const manager = new CallbackQueryManager();
    const id = await manager.createQueryInDb(path, params);
    return {
        text: text,
        callback_data: id.toString()
    }
}