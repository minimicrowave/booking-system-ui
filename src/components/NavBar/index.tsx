import React, { useContext } from 'react';

import { Button } from 'antd';
import { Logo } from 'assets';
import { UserContext } from 'common/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './NavBar.less';

function NavBar() {
    const navigate = useNavigate();
    const { removeToken } = useContext(UserContext);

    return (
        <div className="nav-bar" data-testid="bsui-navbar">
            <Logo size={120} />
            <Button
                type="primary"
                htmlType="submit"
                data-testid="bsui-button"
                onClick={() =>
                    removeToken() && navigate('/login', { replace: true })
                }
            >
                Sign Out
            </Button>
        </div>
    );
}

export default NavBar;
