import React, { useContext, useEffect } from 'react';

import { Table } from 'antd';
import { useAPICall } from 'common/hooks';
import { UserContext } from 'common/hooks/useAuth';
import { getUserBookings } from 'common/services/bookingService';
import { NavBar } from 'components';
import dayjs from 'dayjs';
import './MyBookings.less';

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
        render: (datetimeStart: string) =>
            dayjs(datetimeStart).format('MMMM D, YYYY h:mm A'),
    },
    {
        title: 'To',
        dataIndex: 'datetimeEnd',
        key: 'datetimeEnd',
        render: (datetimeEnd: string) =>
            dayjs(datetimeEnd).format('MMMM D, YYYY h:mm A'),
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        render: (location: any) => location.name,
    },
];

function MyBookings() {
    const { isLoading, hasError, response, executeApiCall } = useAPICall();
    const { userId } = useContext(UserContext);

    useEffect(() => {
        executeApiCall(() => getUserBookings(userId));
    }, []);

    return (
        <>
            <NavBar />
            <Table
                className="table-container"
                columns={columns}
                dataSource={response}
                loading={isLoading || hasError}
                data-testid="bsui-table"
            />
        </>
    );
}

export default MyBookings;
