"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decoderShieldIt = exports.shieldIt = void 0;
function shieldIt(str) {
    if (typeof str !== 'string')
        return str;
    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .trim();
}
exports.shieldIt = shieldIt;
function decoderShieldIt(str) {
    return str?.replace(/&amp;/g, "&")
        ?.replace(/&lt;/g, "<")
        ?.replace(/&gt;/g, ">")
        ?.replace(/&quot;/g, '"')
        ?.replace(/&#039;/g, "'");
}
exports.decoderShieldIt = decoderShieldIt;
//# sourceMappingURL=index.js.map