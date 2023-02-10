"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shieldIt = void 0;
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
//# sourceMappingURL=index.js.map