import React, { useContext, useEffect } from 'react';

import { Button, DatePicker, Form, Select, Typography } from 'antd';
import { UserContext } from 'common/context/authContext';
import { useAPICall, usePrevious } from 'common/hooks';
import { createNewBooking, getLocations } from 'common/services/bookingService';
import { NavBar } from 'components';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const { Option } = Select;

function NewBooking() {
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();

    const {
        isLoading: isLocationLoading,
        hasError: hasLocationError,
        response: locations,
        executeApiCall: executeLocationApiCall,
    } = useAPICall();
    const {
        isLoading: isSubmitting,
        executeApiCall: executeBookingApiCall,
        hasError: hasSubmissionError,
        executionCount: submissionCount,
    } = useAPICall();

    const prevSubmissionCount = usePrevious(submissionCount);

    useEffect(() => {
        executeLocationApiCall(getLocations);
    }, []);

    useEffect(() => {
        // if form is submitted with no error, and not on initial form render
        if (
            submissionCount >= 1 &&
            prevSubmissionCount != submissionCount &&
            !hasSubmissionError
        ) {
            navigate('/bookings');
        }
    }, [submissionCount, hasSubmissionError]);

    const onFinish = (values: any) => {
        const {
            locationId,
            dateRange: [datetimeStart, datetimeEnd],
        } = values;
        executeBookingApiCall(() =>
            createNewBooking(
                userId,
                locationId,
                datetimeStart.toISOString(),
                datetimeEnd.toISOString()
            )
        );
    };

    return (
        <>
            <NavBar />
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
                    rules={[
                        { required: true, message: 'Please select location!' },
                    ]}
                >
                    <Select
                        placeholder="Select location"
                        disabled={isSubmitting || hasLocationError}
                    >
                        {isLocationLoading || hasLocationError || !locations
                            ? []
                            : locations.map((location: any) => (
                                  <Option
                                      value={location.id}
                                      key={location.name}
                                  >
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
        </>
    );
}

export default NewBooking;
