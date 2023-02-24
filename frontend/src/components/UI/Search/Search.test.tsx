import React from 'react';
import {screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from './Search';

describe('<Search />', () => {
    test('it should mount without list item', () => {
        // render(<Search list={[]}/>);

        const search = screen.getByTestId('Search');
        const searchInput = screen.getByTestId('SearchInput');
        const searchlist = screen.getByTestId('SearchList');


        expect(search).toBeInTheDocument();
        expect(searchlist).toBeInTheDocument();

        expect(searchInput).toHaveFocus();

    });


});