import React from "react";
import { Link } from 'react-router-dom';

//contains details of each property in favourites 

const FavouritePropertyDetails = ({property}) => {
    return(
        <div className="favourite-property-details">
            <Link to={`/property/${property.id}`}>{<img src={`/${property.picture}`} alt={property.location} />}</Link> 
            <div className="favourite-text">
                <h3><Link to={`/property/${property.id}`}>{property.title}</Link></h3>
                <div className="property-icon-container">
                    <img className="icon" src="./images/icons/pin.svg" alt="pin icon"></img>
                    <span>{property.location}</span>
                </div>
                <div className="bed-price-details">
                    <div className="property-icon-container">
                        <img className="icon" src="./images/icons/bed.svg" alt="bed icon"></img>
                        <span>{property.bedrooms}</span>
                    </div>
                    <div className="property-icon-container">
                        <img className="icon" src="./images/icons/pound.svg" alt="pound icon"></img>
                        <span>£{property.price}</span>
                    </div>
                </div>
            </div>
        </div>
    ); 
};

export default FavouritePropertyDetails;