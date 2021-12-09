export default {
    BOOKING_API: {
        getAccessToken: () => `/auth/login`,
        getUserBookings: (userId: string) => `/bookings/users/${userId}`,
        getLocations: () => `/locations`,
        createNewBooking: () => `/bookings`,
    },
};
