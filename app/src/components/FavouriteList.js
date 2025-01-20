import React from "react";
import FavouritePropertyDetails from "./FavouritePropertyDetails"; 

const FavouriteList = ({favourites, handleClearFavourites, handleAddToFavourites, handleRemoveFromFavourites, handleDragStart, handleDragOver}) => {
    const handleDrop = (e) => { //adds property to favourites when dropped in favourites area
        e.preventDefault(); //prevents page refresh 
        const property = JSON.parse(e.dataTransfer.getData('property'));
        handleAddToFavourites(property);
    };

    if (favourites.length > 0){
        return (
            <div onDrop={handleDrop} onDragOver={handleDragOver}>
                <h2>Favourite Properties</h2>
                <button onClick={handleClearFavourites}>Clear Favourite List</button>
                <div>
                    {favourites.map((property) => ( //runs the code for each element in favourites 
                        <div key={property.id} className="favourite-property-card">
                            <div draggable onDragStart={(e) => handleDragStart(e, property)}>
                                <FavouritePropertyDetails property={property} />
                            </div>

                            <button onClick={() => handleRemoveFromFavourites(property)}>Remove from favourites</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else{ //returns 'no favourites' if favourites list contains no properties 
        return (
            <div onDrop={handleDrop} onDragOver={handleDragOver}>
                <h2>Favourite Properties</h2>
                <button onClick={handleClearFavourites} disabled>Clear Favourite List</button>
                <p>No favourite properties.</p>
            </div>
        );
    }

};

export default FavouriteList;