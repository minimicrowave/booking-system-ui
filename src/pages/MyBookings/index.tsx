import React, { useContext } from 'react';

import { Table } from 'antd';
import { UserContext } from 'common/context/authContext';
import { fetchUserBookings } from 'common/services/bookingService';
import { NavBar } from 'components';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import TEST_ID from 'test/testIds.constant';
import './MyBookings.less';

const dateFormat = 'MMMM D, YYYY h:mm A';
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'From',
        dataIndex: 'datetimeStart',
        key: 'datetimeStart',
        render: (date: string) => dayjs(date).format(dateFormat),
    },
    {
        title: 'To',
        dataIndex: 'datetimeEnd',
        key: 'datetimeEnd',
        render: (date: string) => dayjs(date).format(dateFormat),
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        render: (location: any) => location.name,
    },
];

function MyBookings() {
    const { isLoading, isError, data } = useQuery('bookings', () =>
        fetchUserBookings(userId)
    );
    const { userId } = useContext(UserContext);

    return (
        <>
            <NavBar />
            <Table
                className="table-container"
                columns={columns}
                dataSource={data}
                loading={isLoading || isError}
                data-testid={TEST_ID.TABLE}
            />
        </>
    );
}

export default MyBookings;
