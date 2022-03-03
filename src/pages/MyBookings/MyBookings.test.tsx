import React from 'react';

import { render, screen } from '@testing-library/react';
import mockAxios from 'axios';
import { wrapper } from 'test/helpers';
import TEST_ID from 'test/testIds.constant';

import MyBookings from '.';

const dummyData = [
    {
        datetimeStart: '2021-12-04T20:00:00.000Z',
        datetimeEnd: '2021-12-06T23:00:00.000Z',
        userId: 1,
        locationId: 1,
        id: 2,
        location: {
            name: 'location C',
            id: 1,
        },
    },
    {
        datetimeStart: '2021-12-02T20:00:00.000Z',
        datetimeEnd: '2021-12-03T23:00:00.000Z',
        userId: 1,
        locationId: 1,
        id: 3,
        location: {
            name: 'location B',
            id: 1,
        },
    },
    {
        datetimeStart: '2021-12-06T20:00:00.000Z',
        datetimeEnd: '2021-12-06T23:00:00.000Z',
        userId: 1,
        locationId: 1,
        id: 4,
        location: {
            name: 'location K',
            id: 1,
        },
    },
];

describe('<MyBookings/>', () => {
    const rowId = 'ant-table-row';

    beforeEach(() => {
        render(wrapper(<MyBookings />));
    });

    it('should display data returned from API in the table accordingly', async () => {
        jest.spyOn(mockAxios, 'get').mockResolvedValueOnce('hi');

        const table = await screen.findByTestId(TEST_ID.TABLE);

        expect(table.getElementsByClassName(rowId)).toHaveLength(
            dummyData.length
        );
    });
});
