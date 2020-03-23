import React from 'react';
import { FaArrowRight } from 'react-icons/fa'; 
import  "./Card.css"

const Card = ({ event }) => {
  const { confName, confStartDate, confEndDate, venue, entryType, confUrl, imageURL} = event;

	return (
    <div className="card">
      <div className="card-image">
        <img className="card-image" src={imageURL} alt={confName} />
      </div>
      <div className = "card-details">
        <h2 className="card-info">{confName}</h2>
        <p className="card-info">{`Conference Date: ${confStartDate} - ${confEndDate}`}</p>
        <p className="card-info">Venue: {venue}</p>
        <p className="card-info">Entry: {entryType}</p>
        <a href={confUrl} className="card-icon" target="_blank">
          <p className="card-info">Link to Conf</p>
          <FaArrowRight/>
        </a>
      </div>
    </div>
  );
}

export default Card;