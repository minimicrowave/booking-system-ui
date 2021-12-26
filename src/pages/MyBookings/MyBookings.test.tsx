import React from 'react';

import { render, screen } from '@testing-library/react';
import * as bookingService from 'common/services/bookingService';
import { MemoryRouter } from 'react-router-dom';
import { createAxiosResponse } from 'test/helpers';

import MyBookings from '.';

const data = [
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
    const navBarId = 'bsui-navbar';
    const tableId = 'bsui-table';
    const rowId = 'ant-table-row';

    it('should render with logo and button', async () => {
        jest.spyOn(bookingService, 'getUserBookings').mockResolvedValueOnce(
            createAxiosResponse(data)
        );

        render(
            <MemoryRouter>
                <MyBookings />
            </MemoryRouter>
        );

        const navBar = await screen.findByTestId(navBarId);
        const table = await screen.findByTestId(tableId);

        expect(navBar).toBeTruthy();
        expect(table).toBeTruthy();
    });

    it('should display data returned from API in the table accordingly', async () => {
        jest.spyOn(bookingService, 'getUserBookings').mockResolvedValueOnce(
            createAxiosResponse(data)
        );

        render(
            <MemoryRouter>
                <MyBookings />
            </MemoryRouter>
        );

        const table = await screen.findByTestId(tableId);

        expect(table.getElementsByClassName(rowId)).toHaveLength(data.length);
    });
});
