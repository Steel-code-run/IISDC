"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleLog = void 0;
function consoleLog(message) {
    const time = new Date().toLocaleString("ru-RU");
    console.log(`${time}\n` + message);
}
exports.consoleLog = consoleLog;
//# sourceMappingURL=consoleLog.js.map