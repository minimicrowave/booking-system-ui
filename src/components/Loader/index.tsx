import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import TEST_ID from 'test/testIds.constant';
import './Loader.less';

function Loader() {
    return (
        <div className="loader-container" data-testid={TEST_ID.LOADER}>
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
        </div>
    );
}

export default Loader;
