import React from 'react';
import './Card.css';

const Card = ({ item }) => {

  return (
    <div className="card">
      <img src={item.menu_item.imageId}  className="card-image" />
      <div className="card-content">
        <h2>{item.menu_item.name}</h2>
        <p>{item.is_veg ? 'Veg' : 'Non-Veg'}</p>
        <p>Price: ${item.menu_item.price}</p>
        <p>Status : {item.status}</p>
      </div>
    </div>
  );
};

export default Card;
