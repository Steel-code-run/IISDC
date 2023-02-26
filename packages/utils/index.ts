export function shieldIt(str:any){
    if (typeof str !== 'string') return str;
    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .trim();
}

export function decoderShieldIt(str: string | undefined){
    return str?.replace(/&amp;/g, "&")
        ?.replace(/&lt;/g, "<")
        ?.replace(/&gt;/g, ">")
        ?.replace(/&quot;/g, '"')
        ?.replace(/&#039;/g, "'");
}