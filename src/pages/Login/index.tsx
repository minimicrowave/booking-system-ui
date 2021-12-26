import React, { useContext, useEffect } from 'react';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Alert } from 'antd';
import { Logo } from 'assets';
import useAPICall from 'common/hooks/useAPICall';
import './Login.less';
import { UserContext } from 'common/hooks/useAuth';
import { getAccessToken } from 'common/services/bookingService';
import { useNavigate } from 'react-router-dom';

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
    const { isLoading, hasError, response, executeApiCall } = useAPICall(false);
    const { setToken } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (response && !hasError) {
            setToken(response.access_token);
            navigate('/', { replace: true });
        }
    }, [response]);

    const onFinish = (values: any) => {
        const { username, password } = values;
        executeApiCall(() => getAccessToken(username, password));
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <Logo size={250} />
                <Form
                    onFinish={onFinish}
                    autoComplete="off"
                    className="login-form"
                    data-testid="bsui-login-form"
                >
                    {formItems.map(({ name, rules, input }) => (
                        <Form.Item
                            name={name}
                            rules={rules}
                            key={`login-form-${name}`}
                            data-testid="bsui-form-input"
                        >
                            {input(isLoading)}
                        </Form.Item>
                    ))}
                    {hasError && (
                        <Alert
                            message="Error logging in. Please try again."
                            showIcon
                            type="error"
                            className="login-form-error"
                            data-testid="bsui-alert"
                        />
                    )}
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            data-testid="bsui-form-button"
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
