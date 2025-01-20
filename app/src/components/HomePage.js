import SearchBar from './SearchBar';
import PropertyList from './PropertyList';
import FavouriteList from './FavouriteList';
import React, { useEffect, useState } from 'react';

//home page component that displays search options and properties

const HomePage = ({properties}) => {
  const [searchFilters, setSearchFilters] = useState({}); //react hook for selected search filters
  const [favourites, setFavourites] = useState([]); //react hook for favourites list

  const getSearchFilters = (submittedValues) => { //obtains the search filters selected in the search bar component, updates the search filters variable
    setSearchFilters(submittedValues);
  };

  const toMonth = (monthString) => { //converts months to their numerical equivalent
    const months = {
      January: 1,
      Feburary: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    }
    return months[monthString];
  };

  const filterProperties = () => { //applies all of the search filters to the list of properties 
    let filteredProps = properties;

    if (Object.keys(searchFilters).length > 0){ //check whether any search filters have been applied
      //price filters 
      let minPrice = searchFilters["priceMinValue"].value;
      let maxPrice = searchFilters["priceMaxValue"].value;

      filteredProps = filteredProps.filter((property) => parseInt(property.price.replaceAll(",", "")) >= minPrice && parseInt(property.price.replaceAll(",", "")) <= maxPrice); 

      //bed count filters 
      let minBeds = parseInt(searchFilters["bedsMinValue"]);
      let maxBeds = parseInt(searchFilters["bedsMaxValue"]);

      filteredProps = filteredProps.filter((property) => property.bedrooms >= minBeds && property.bedrooms <= maxBeds);

      //postcode filters 
      let postcode = searchFilters["postcodeValue"];
      filteredProps = filteredProps.filter((property) => property.location.toLowerCase().includes(postcode.toLowerCase()));

      if (searchFilters["propertyValue"] === "House" || searchFilters["propertyValue"] === "Flat"){
        filteredProps = filteredProps.filter((property) => property.type === searchFilters["propertyValue"]);
      } 

      //date filters 
      let dateFrom = searchFilters["dateFromValue"];
      let dateTo = searchFilters["dateToValue"];

      if (dateFrom){
        filteredProps = filteredProps.filter((property) => (new Date(property.added.year + "-"+toMonth(property.added.month)+"-"+property.added.day) > dateFrom));
      }

      if (dateTo){
        filteredProps = filteredProps.filter((property) => (new Date(property.added.year + "-"+toMonth(property.added.month)+"-"+property.added.day) < dateTo));
      }
    }
    return filteredProps; //returns filtered list of properties 
  };

  const filteredProperties = filterProperties();

  const handleAddToFavourites = (property) => { //checks if property is in favourites and adds it if it isn't
    if (!favourites.some((favourites) => favourites.id === property.id)){
      setFavourites([...favourites, property]);
    }
  };

  const handleRemoveFromFavourites = (property) => { //removes property from favourites 
    const updatedFavourites = favourites.filter(favourite => favourite.id !== property.id);
    setFavourites(updatedFavourites);
  };

  useEffect(() => { //saves favourites to local storage whenever it changes 
    if (favourites.length > 0){
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
  }, [favourites]);

  const handleClearFavourites = () => { //clears favourites list
    setFavourites([]);
    localStorage.removeItem("favourites"); //clears local storage 
  };

  useEffect(() => { //loads favourites from local storage on component mount 
    const savedFavourites = localStorage.getItem("favourites");
    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    }
  }, []);

  const handleDragStart = (e, property) => { 
    e.dataTransfer.setData('property', JSON.stringify(property));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className='title-bar'>
        <div className='title-image'>
          <img src='./images/icons/tree.svg' alt='tree icon' />
        </div>
        <div className='title-text'>
          <h1>Elmwood Estates</h1>
          <i>Search for your new beginning.</i>
        </div>
      </div>
      <SearchBar getSearchFilters={getSearchFilters} />
      <div className='main-container'>
          <div className='left-panel'>
          {filteredProperties.length > 0 ? ( <PropertyList properties={filteredProperties} favourites={favourites} handleAddToFavourites={handleAddToFavourites}  handleRemoveFromFavourites={handleRemoveFromFavourites} handleDragStart={handleDragStart} handleDragOver={handleDragOver} /> ) : ( <p>No properties found.</p> )}
          </div>
          <div className='right-panel'>
          <FavouriteList favourites={favourites} handleClearFavourites={handleClearFavourites} handleAddToFavourites={handleAddToFavourites} handleRemoveFromFavourites={handleRemoveFromFavourites} handleDragStart={handleDragStart} handleDragOver={handleDragOver} /> 
          </div>
      </div>
    </div>
  );
};

export default HomePage;
