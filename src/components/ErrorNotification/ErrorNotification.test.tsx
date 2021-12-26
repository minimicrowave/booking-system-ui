import { notification } from 'antd';

import errorNotification from '.';

describe('<ErrorNotification/>', () => {
    it('should trigger the error notification event', () => {
        const eventHandler = jest.fn();
        jest.spyOn(notification, 'error').mockImplementationOnce(eventHandler);

        errorNotification('test');
        expect(eventHandler).toHaveBeenCalledTimes(1);
    });
});
