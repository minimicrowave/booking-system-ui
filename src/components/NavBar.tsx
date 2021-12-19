import React, { useContext } from 'react';
import { Logo } from 'assets';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './NavBar.less';
import { UserContext } from 'common/hooks/useAuth';

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
