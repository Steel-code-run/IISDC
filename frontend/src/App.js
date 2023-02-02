"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.css");
const Search_1 = __importDefault(require("./components/UI/Search/Search"));
function App() {
    return (<div className="App" data-testid="App">
      <Search_1.default list={['информационные технологии', 'гуманитарные науки', 'архитектура', 'гуманитарные науки', 'архитектура', 'экономика', 'агрономия', 'математика']}/>

    </div>);
}
exports.default = App;
//# sourceMappingURL=App.js.map