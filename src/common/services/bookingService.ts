import instance from 'common/api/bookingAPI.instance';
import endpoints from 'common/constants/endpoints';
import { IBooking } from 'common/interfaces/bookings';
import { ICredentials } from 'common/interfaces/credentials';
import { useMutation, useQuery } from 'react-query';

const { BOOKING_API } = endpoints;

export function fetchAccessToken(options?: object): any {
    return useMutation(
        ({ username, password }: ICredentials) =>
            instance.post(BOOKING_API.getAccessToken(), {
                username,
                password,
            }),
        options
    );
}

export function fetchUserBookings(userId: string, options?: object): any {
    return useQuery(
        'bookings',
        () => instance.get(BOOKING_API.getUserBookings(userId)),
        options
    );
}

export function fetchLocations(options?: object): any {
    return useQuery(
        'locations',
        () => instance.get(BOOKING_API.getLocations()),
        options
    );
}

export function createNewBooking(options?: object): any {
    return useMutation(
        (newBooking: IBooking) =>
            instance.post(BOOKING_API.createNewBooking(), newBooking),
        options
    );
}
