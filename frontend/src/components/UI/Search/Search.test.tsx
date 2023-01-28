import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from './Search';

describe('<Search />', () => {
    test('it should mount', () => {
        render(<Search list={[]}/>);

        const search = screen.getByTestId('Search');
        const searchlist = screen.getByTestId('SearchList');

        expect(search).toBeInTheDocument();
        expect(searchlist).toBeInTheDocument();
        expect(searchlist).toHaveClass('hideDropDown');
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });

    test('it should show list', () => {
        render(<Search list={['testing',
            'test',
            'asdasd',
            'rrrrra']}/>);

        const search = screen.getByTestId('Search');
        const input = screen.getByTestId('SearchInput') as HTMLInputElement;
        const list = screen.getByTestId('SearchList');

        expect(search).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(list).toBeInTheDocument();

        expect(list).toHaveClass('hideDropDown');

        fireEvent.change(input, {target: {value: 'test'}});
        expect(list).not.toHaveClass('hideDropDown');






    });
});