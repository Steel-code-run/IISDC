"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
require("@testing-library/jest-dom/extend-expect");
const TemplateName_1 = __importDefault(require("./TemplateName"));
describe('<TemplateName />', () => {
    test('it should mount', () => {
        (0, react_2.render)(<TemplateName_1.default />);
        const templateName = react_2.screen.getByTestId('TemplateName');
        expect(templateName).toBeInTheDocument();
    });
});
//# sourceMappingURL=TemplateName.test.js.map