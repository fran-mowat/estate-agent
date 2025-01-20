import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Tabs from './Tabs';
import Carousel from './Carousel';

//property page component, displays details about each property 

const PropertyPage = ({ properties }) => {
  const { id } = useParams(); //obtains id of property from URL parameter
  const property = properties.find((prop) => prop.id === id); //locates correct property from properties list 

  useEffect(() => { //scrolling to top of page on component mount
    window.scrollTo(0, 0);
  },[]);

  if (!property) {
    return <p>Property not found</p>; //returns error message if property is not found 
  }

  return ( //returns property details, image carousel, and tabs 
    <div>
      <div className='title-bar-property'>
        <div className='title-back'>
          <Link to='/'> 
            <img src='../images/icons/undo.svg' alt='undo icon'></img>
            Return to search
          </Link>
        </div>
        <div className='title-image'>
          <img src='../images/icons/tree.svg' alt='tree icon' />
        </div>
      </div>
      <div className='property-page-content'>
      <div className='carousel-container'>
          <Carousel property={property} />
      </div>
        <div className='property-page-text'>
          <h2>{property.title}</h2>
          <div className="property-icon-container">
            <img className="icon" src="../images/icons/pin.svg" alt="pin icon"></img>
            <span>{property.location}</span>
          </div>
          <p>Type: {property.type}</p>
          <p>Total bedrooms: {property.bedrooms}</p>
          <p>Tenure: {property.tenure}</p>
          <p>Price: £{property.price}</p>
          <p>Added on: {property.added.day} {property.added.month} {property.added.year}</p>

          <Tabs property={property} />
        </div>
      </div>
    </div>

  );
};

export default PropertyPage;
