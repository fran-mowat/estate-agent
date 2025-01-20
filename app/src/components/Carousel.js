import React, { useState } from "react";

//image carousel component
const Carousel = ({property}) => {
    const [currentIndex, setCurrentIndex] = useState(0); //react hook to update image index 
    const length = 6; //number of images 

    const next = () => { //updates the currentIndex to correspond to the next image 
        if (currentIndex < (length - 1)) {
            setCurrentIndex(prevState => prevState + 1);
        } else { 
            setCurrentIndex(0); //sets the index to 0 if the end is reached
        }
    };
    
    const previous = () => { //updates the currentIndex to correspond to the previous image 
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1);
        } else {
            setCurrentIndex(length - 1); //sets the index to 5 if the start is reached
        }
    };

    return (
        <div className="carousel-content-wrapper">
            <button className="left-arrow" onClick={previous}>&lt;</button>
            <div className="carousel-wrapper">
                <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    <img src={`../images/${property.id}/${property.id}_img1.png`} alt={property.id}></img>
                    <img src={`../images/${property.id}/${property.id}_img2.png`} alt={property.id}></img>
                    <img src={`../images/${property.id}/${property.id}_img3.png`} alt={property.id}></img>
                    <img src={`../images/${property.id}/${property.id}_img4.png`} alt={property.id}></img>
                    <img src={`../images/${property.id}/${property.id}_img5.png`} alt={property.id}></img>
                    <img src={`../images/${property.id}/${property.id}_img6.png`} alt={property.id}></img>
                </div>
            </div>
            <button className="right-arrow" onClick={next}>&gt;</button>
        </div>
    );
};

export default Carousel;