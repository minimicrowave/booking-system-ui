import React, { useContext } from 'react';

import { Button } from 'antd';
import { Logo } from 'assets';
import { UserContext } from 'common/context/authContext';
import { useNavigate } from 'react-router-dom';
import TEST_ID from 'test/testIds.constant';
import './NavBar.less';

function NavBar() {
    const navigate = useNavigate();
    const { removeToken } = useContext(UserContext);

    return (
        <div className="nav-bar" data-testid={TEST_ID.NAV_BAR}>
            <Logo size={120} />
            <Button
                type="primary"
                htmlType="submit"
                data-testid={TEST_ID.BUTTON}
                onClick={() => {
                    removeToken();
                    navigate('/login', { replace: true });
                }}
            >
                Sign Out
            </Button>
        </div>
    );
}

export default NavBar;
