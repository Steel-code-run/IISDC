"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
require("@testing-library/jest-dom/extend-expect");
const Search_1 = __importDefault(require("./Search"));
describe('<Search />', () => {
    test('it should mount without list item', () => {
        (0, react_2.render)(<Search_1.default list={[]}/>);
        const search = react_2.screen.getByTestId('Search');
        const searchlist = react_2.screen.getByTestId('SearchList');
        expect(search).toBeInTheDocument();
        expect(searchlist).toBeInTheDocument();
        expect(searchlist).toHaveClass('hideDropDown');
        expect(react_2.screen.queryByRole('listitem')).not.toBeInTheDocument();
    });
    test('it should show list', () => {
        (0, react_2.render)(<Search_1.default list={['testing',
                'test',
                'asdasd',
                'rrrrra']}/>);
        const list = react_2.screen.getByTestId('SearchList');
        expect(list).toBeInTheDocument();
        expect(list).toHaveClass('hideDropDown');
    });
    test('onChange show list', () => {
        (0, react_2.render)(<Search_1.default list={['testing', 'test', 'asdasd', 'rrrrra']}/>);
        const list = react_2.screen.getByTestId('SearchList');
        const input = react_2.screen.getByTestId('SearchInput');
        react_2.fireEvent.change(input, { target: { value: 'test' } });
        expect(list).not.toHaveClass('hideDropDown');
    });
});
//# sourceMappingURL=Search.test.js.map