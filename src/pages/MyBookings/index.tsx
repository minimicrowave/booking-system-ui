import React, { useContext, useEffect } from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { UserContext } from 'common/context/authContext';
import {
    fetchUserBookings,
    removeBooking,
} from 'common/services/bookingService';
import dayjs from 'dayjs';
import TEST_ID from 'test/testIds.constant';
import './MyBookings.less';

const dateFormat = 'MMMM D, YYYY h:mm A';
function columns(onDelete: Function) {
    return [
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
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id: string) => (
                <DeleteOutlined onClick={() => onDelete(id)} />
            ),
        },
    ];
}

function MyBookings() {
    const { userId } = useContext(UserContext);
    const {
        isLoading,
        isError,
        data,
        refetch: refetchBookings,
    } = fetchUserBookings(userId);
    const {
        mutate: removeBookingById,
        reset: resetBookingMutation,
        isSuccess: isRemoveBookingSuccess,
    } = removeBooking();

    useEffect(() => {
        if (isRemoveBookingSuccess) {
            resetBookingMutation();
            refetchBookings();
        }
    }, [isRemoveBookingSuccess]);

    return (
        <Table
            className="table-container"
            columns={columns((id: string) => removeBookingById(id))}
            dataSource={data}
            loading={isLoading || isError}
            data-testid={TEST_ID.TABLE}
        />
    );
}

export default MyBookings;
