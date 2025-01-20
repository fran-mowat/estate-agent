import React from "react";
import PropertyDetails from "./PropertyDetails";

const PropertyList = ({properties, favourites, handleAddToFavourites, handleRemoveFromFavourites, handleDragStart, handleDragOver}) => {
    const handleDrop = (e) => { //removes property from favourites when dropped outside of favourites area
        e.preventDefault(); //prevents page refresh 
        const property = JSON.parse(e.dataTransfer.getData('property'));
        handleRemoveFromFavourites(property);
    };

    return(
        <div onDrop={handleDrop} onDragOver={handleDragOver} className="property-list">
            {properties.map((property) => { //runs the code for each element in properties 
                const isFavourite = favourites.some((favourite) => favourite.id === property.id); //checks whether property is in favourites 
                return(
                    <div key={property.id} className="property-card">
                        <div draggable onDragStart={(e) => handleDragStart(e, property)} >
                            <PropertyDetails property={property} />
                        </div>

                        <button onClick={() => handleAddToFavourites(property)} disabled={isFavourite}>
                            {isFavourite ? "Already in favourites" : "Add to favourites"} 
                        </button> 
                    </div> //returns 'already in favourites' button if property is in favourites list 
                );
            })}
        </div>
    );
};

export default PropertyList;