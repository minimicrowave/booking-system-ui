import React from 'react';

import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Home.less';

const { Meta } = Card;

export const CARDS_METADATA = [
    {
        title: 'Create Booking',
        path: '/bookings/new',
    },
    {
        title: 'My Bookings',
        path: '/bookings',
    },
];

function Home() {
    const navigate = useNavigate();

    return (
        <div className="card-container">
            {CARDS_METADATA.map(({ title, path }) => (
                <Card
                    hoverable
                    data-testid="bsui-card"
                    className="card"
                    key={title}
                    onClick={() => navigate(path, { replace: true })}
                >
                    <Meta title={title} />
                </Card>
            ))}
        </div>
    );
}

export default Home;
