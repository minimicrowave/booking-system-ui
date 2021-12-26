import { notification } from 'antd';

function ErrorNotification(description: string) {
    notification.error({
        message: 'Error',
        description,
        placement: 'bottomRight',
        duration: 7,
    });
}

export default ErrorNotification;
