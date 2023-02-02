"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TemplateName_module_scss_1 = __importDefault(require("./TemplateName.module.scss"));
const TemplateName = () => {
    return (<div className={TemplateName_module_scss_1.default.templateName} data-testid="TemplateName">
            TemplateName Component
        </div>);
};
exports.default = TemplateName;
//# sourceMappingURL=TemplateName.js.map