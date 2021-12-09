import instance from 'common/api/bookingAPI.instance';
import endpoints from 'common/constants/endpoints';

const { BOOKING_API } = endpoints;

export function getAccessToken(username: string, password: string) {
    return instance.post(BOOKING_API.getAccessToken(), {
        username,
        password,
    });
}

export function getUserBookings(userId: string) {
    return instance.get(BOOKING_API.getUserBookings(userId));
}

export function getLocations() {
    return instance.get(BOOKING_API.getLocations());
}

export function createNewBooking(
    userId: string,
    locationId: string,
    datetimeStart: string,
    datetimeEnd: string
) {
    return instance.post(BOOKING_API.createNewBooking(), {
        userId,
        locationId,
        datetimeStart,
        datetimeEnd,
    });
}
