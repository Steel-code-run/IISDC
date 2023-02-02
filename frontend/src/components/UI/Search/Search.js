"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Search_module_scss_1 = __importDefault(require("./Search.module.scss"));
const Search = ({ list = [] }) => {
    const [isOpen, setIsOpen] = react_1.default.useState(false);
    const [searchValue, setSearchValue] = react_1.default.useState('');
    const [filteredList, setFilteredList] = react_1.default.useState(list);
    (0, react_1.useEffect)(() => {
        setFilteredList(list.filter(item => item.toLowerCase().startsWith(searchValue.toLowerCase())));
    }, [list, searchValue]);
    return (<div className={Search_module_scss_1.default.search} data-testid="Search">
            <div className={Search_module_scss_1.default.search__wrapper}>

                <input autoFocus={true} onChange={(e) => {
            setSearchValue(e.target.value);
            if (!e.target.value) {
                setIsOpen(true);
            }
        }} onFocus={() => {
            if (!searchValue) {
                setIsOpen(true);
            }
        }} onBlur={() => {
            setTimeout(() => {
                setIsOpen(false);
            }, 0);
        }} className={Search_module_scss_1.default.search__input} value={searchValue} type="text" data-testid="SearchInput"/>
                <ul data-testid="SearchList" className={(isOpen) ? Search_module_scss_1.default.search__list : Search_module_scss_1.default.hideDropDown}>
                    {filteredList.length > 0 ? filteredList.map((item, index) => {
            return (<li onClick={() => {
                    setSearchValue(item);
                    setIsOpen(false);
                }} className={Search_module_scss_1.default.search__list__item} key={index} data-testid="SearchListItem">{item}</li>);
        })
            : <li className={Search_module_scss_1.default.search__list__searchEmpty}>Ничего не найдено</li>}
                </ul>

            </div>
        </div>);
};
exports.default = Search;
//# sourceMappingURL=Search.js.map