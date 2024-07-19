import React, { useState, useEffect, useRef } from 'react';
import './Order_card.css';
import Grid from '../Item_Card/Grid'

const Order_card = ({ order_data }) => {
    const [showGrid, setShowGrid] = useState(false);
    const gridRef = useRef();

    const hotelName = order_data.created_by.name;
    const orderId = order_data._id;
    const status = order_data.status;
    const id = Math.floor(Math.random() * 10) + 1;
    const imageUrl = `hotels/${id}.jpg`;
    const handleClickOutside = (event) => {
        if (gridRef.current && !gridRef.current.contains(event.target)) {
            setShowGrid(false);
        }
    };

    useEffect(() => {
        if (showGrid) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showGrid]);

    const showItems = (event) => {
        event.stopPropagation();
        setShowGrid(true);
    };

    const closeGrid = (event) => {
        event.stopPropagation();
        setShowGrid(false);
    };

    return (
        <div className='card' onClick={showItems}>
            <img className='card-image' src={imageUrl} alt='Hotel' />
            <div>
                <div>Order ID : {orderId}</div>
                <div>Hotel : {hotelName}</div>
                <div>Status : {status}</div>
            </div>
            {showGrid && (
                <div className='grid-overlay'>
                    <div className='grid-container' ref={gridRef}>
                        <button className='close-button' onClick={closeGrid}>×</button>
                        <Grid items={order_data.items} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order_card;
