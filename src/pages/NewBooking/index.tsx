import React, { useContext, useEffect } from 'react';

import { Button, DatePicker, Form, Select, Typography } from 'antd';
import { UserContext } from 'common/context/authContext';
import {
    createNewBooking,
    fetchLocations,
} from 'common/services/bookingService';
import Loader from 'components/Loader';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const { Option } = Select;

function NewBooking() {
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();

    const {
        isLoading: isLocationLoading,
        isError: hasLocationError,
        data: locations,
    } = fetchLocations();

    const { isLoading: isSubmitting, isSuccess, mutate } = createNewBooking();

    useEffect(() => {
        if (isSuccess) {
            navigate('/bookings');
        }
    }, [isSuccess]);

    const onFinish = (values: any) => {
        const {
            locationId,
            dateRange: [datetimeStart, datetimeEnd],
        } = values;

        mutate({ locationId, userId, datetimeStart, datetimeEnd });
    };

    if (isLocationLoading) return <Loader />;

    return (
        <Form
            name="basic"
            requiredMark={false}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 7 }}
            onFinish={onFinish}
            autoComplete="off"
            colon={false}
        >
            <Title level={2} style={{ textAlign: 'center' }}>
                Create New Booking
            </Title>
            <Form.Item
                name="dateRange"
                label="Date Time Range"
                rules={[
                    {
                        type: 'array' as const,
                        required: true,
                        message: 'Please select time range!',
                    },
                ]}
            >
                <RangePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    disabled={isSubmitting}
                />
            </Form.Item>
            <Form.Item
                name="locationId"
                label="Location"
                rules={[{ required: true, message: 'Please select location!' }]}
            >
                <Select
                    placeholder="Select location"
                    disabled={isSubmitting || hasLocationError}
                >
                    {locations.map((location: any) => (
                        <Option value={location.id} key={location.name}>
                            {location.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 9, span: 5 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default NewBooking;
