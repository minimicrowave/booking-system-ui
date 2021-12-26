import NavBar from 'components/NavBar';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from 'antd';
const { Meta } = Card;

import './Home.less';

const cards = [
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
        <>
            <NavBar />
            <div className="card-container">
                {cards.map(({ title, path }) => (
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
        </>
    );
}

export default Home;
