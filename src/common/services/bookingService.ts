import instance from 'common/api/bookingAPI.instance';
import endpoints from 'common/constants/endpoints';

const { BOOKING_API } = endpoints;

export function getAccessToken(username: string, password: string) {
    return instance.post(BOOKING_API.getAccessToken(), {
        username,
        password,
    });
}
