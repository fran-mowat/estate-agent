import React from "react";

//map component, uses Google Maps API and property location to generate map tile 

const Map = ({location}) => {
    return (
        <div>
            <iframe loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${location}`}></iframe>
        </div>
    );
};

export default Map;