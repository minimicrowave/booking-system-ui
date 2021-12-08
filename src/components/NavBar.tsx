import React from 'react';
import { Logo } from 'assets';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './NavBar.less';

function NavBar() {
    const navigate = useNavigate();

    return (
        <div className="nav-bar">
            <Logo size={120} />
            <Button
                type="primary"
                htmlType="submit"
                data-testid="bsui-button"
                onClick={() => navigate('/login', { replace: true })}
            >
                Sign Out
            </Button>
        </div>
    );
}

export default NavBar;
