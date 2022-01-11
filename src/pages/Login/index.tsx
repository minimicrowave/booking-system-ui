import React, { useContext, useEffect } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input } from 'antd';
import { Logo } from 'assets';
import { UserContext } from 'common/context/authContext';
import { fetchAccessToken } from 'common/services/bookingService';
import { useNavigate } from 'react-router-dom';
import TEST_ID from 'test/testIds.constant';
import './Login.less';

const formItems = [
    {
        name: 'username',
        rules: [
            {
                required: true,
                message: 'Please input your username!',
            },
        ],
        input: (isDisabled: boolean) => (
            <Input
                placeholder="Username"
                prefix={<UserOutlined />}
                disabled={isDisabled}
            />
        ),
    },
    {
        name: 'password',
        rules: [
            {
                required: true,
                message: 'Please input your password!',
            },
        ],
        input: (isDisabled: boolean) => (
            <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                disabled={isDisabled}
            />
        ),
    },
];

function Login() {
    const { setToken } = useContext(UserContext);

    const { isLoading, isError, data, isSuccess, mutate } = fetchAccessToken({
        useErrorBoundary: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            setToken(data.access_token, () => navigate('/', { replace: true }));
        }
    }, [isSuccess]);

    const onFinish = (values: any) => {
        const { username, password } = values;
        mutate({ username, password });
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <Logo size={250} />
                <Form
                    onFinish={onFinish}
                    autoComplete="off"
                    className="login-form"
                    data-testid={TEST_ID.FORM}
                >
                    {formItems.map(({ name, rules, input }) => (
                        <Form.Item
                            name={name}
                            rules={rules}
                            key={`login-form-${name}`}
                            data-testid={TEST_ID.INPUT}
                        >
                            {input(isLoading)}
                        </Form.Item>
                    ))}
                    {isError && (
                        <Alert
                            message="Error logging in. Please try again."
                            showIcon
                            type="error"
                            className="login-form-error"
                            data-testid={TEST_ID.ALERT}
                        />
                    )}
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            data-testid={TEST_ID.BUTTON}
                            loading={isLoading}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
