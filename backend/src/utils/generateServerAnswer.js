"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateErrorAnswer = exports.generateSuccessfulAnswer = void 0;
const generateSuccessfulAnswer = (params) => {
    return {
        status: params?.status || 200,
        message: params?.message || 'Successful',
        data: params?.data || null,
    };
};
exports.generateSuccessfulAnswer = generateSuccessfulAnswer;
const generateErrorAnswer = (params) => {
    return {
        status: params?.status || 400,
        message: params?.message || 'Error',
        data: params?.data || null,
    };
};
exports.generateErrorAnswer = generateErrorAnswer;
//# sourceMappingURL=generateServerAnswer.js.map