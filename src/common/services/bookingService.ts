import instance from 'common/api/bookingAPI.instance';
import endpoints from 'common/constants/endpoints';
import { ICredentials } from 'common/types/credentials';
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

export function fetchUserBookings(userId: string): any {
    return useQuery('bookings', () =>
        instance.get(BOOKING_API.getUserBookings(userId))
    );
}

export function fetchLocations(): any {
    return instance.get(BOOKING_API.getLocations());
}

export function createNewBooking(
    userId: string,
    locationId: string,
    datetimeStart: string,
    datetimeEnd: string
): any {
    return instance.post(BOOKING_API.createNewBooking(), {
        userId,
        locationId,
        datetimeStart,
        datetimeEnd,
    });
}
