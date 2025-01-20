import React, { useState } from "react";
import DropdownList from "react-widgets/DropdownList"; //imports react widgets for use in form 
import DatePicker from "react-widgets/DatePicker";
import Combobox from "react-widgets/Combobox";
import NumberPicker from "react-widgets/NumberPicker";
import "react-widgets/styles.css"; //imports stylesheet for react widgets 

const SearchBar = ({getSearchFilters}) => {
    //state variables to store form data using useState react hook, sets default values
    const [propertyValue, setProperty] = useState("Any");
    const [postcodeValue, setPostcode] = useState("");
    const [priceMinValue, setPriceMin] = useState({ value: 200000, price: '£200,000' });
    const [priceMaxValue, setPriceMax] = useState({ value: 3500000, price: '£3,500,000' });
    const [bedsMinValue, setBedsMin] = useState(1);
    const [bedsMaxValue, setBedsMax] = useState(10);
    const [dateFromValue, setDateFrom] = useState();
    const [dateToValue, setDateTo] = useState();

    const handleSubmit = (e) => { //handles form submission, transfers values to home page 
        e.preventDefault(); //prevents page refresh 
        const updatedSubmittedValues = {
            propertyValue, 
            priceMinValue,
            priceMaxValue, 
            bedsMinValue, 
            bedsMaxValue,
            postcodeValue, 
            dateFromValue,
            dateToValue
        };
        getSearchFilters(updatedSubmittedValues);
    };

    const resetForm = () => { //handles reset of search filters, sets all filter back to defaults 
        setProperty("Any"); 
        setPostcode(""); 
        setPriceMin({ value: 200000, price: '£200,000' }); 
        setPriceMax({ value: 3500000, price: '£3,500,000' }); 
        setBedsMin(1); 
        setBedsMax(10); 
        setDateFrom(null); 
        setDateTo(null);

        getSearchFilters({}); //removes search filters from property results 
    }
    
    const priceValues = [ //price list for min and max price react widgets
        { value: 200000, price: '£200,000' }, 
        { value: 300000, price: '£300,000' }, 
        { value: 400000, price: '£400,000' }, 
        { value: 500000, price: '£500,000' }, 
        { value: 600000, price: '£600,000' }, 
        { value: 700000, price: '£700,000' }, 
        { value: 800000, price: '£800,000' }, 
        { value: 900000, price: '£900,000' }, 
        { value: 1000000, price: '£1,000,000' }, 
        { value: 1250000, price: '£1,250,000' }, 
        { value: 1500000, price: '£1,500,000' }, 
        { value: 2000000, price: '£2,000,000' }, 
        { value: 2500000, price: '£2,500,000' }, 
        { value: 3000000, price: '£3,000,000' }, 
        { value: 3500000, price: '£3,500,000' }
    ];

    return <form onSubmit={handleSubmit} onReset={resetForm}>
        <div className="search-filters">
            <div className="widget-container">
                <p>Property type</p>
                <div className="form-widget"> 
                    <DropdownList data={["Any", "House", "Flat"]} onChange={(value) => setProperty(value)} defaultValue={"Any"} value={propertyValue} />
                </div>
            </div>

            <div className="widget-container">
                <p>Postcode</p>
                <div className="form-widget"> 
                    <Combobox hideCaret hideEmptyPopup data={["BR5", "BR6", "NW1", "SW5", "SE2", "E15", "N8"]} placeholder="Enter a postcode" onChange={(value) => setPostcode(value)} value={postcodeValue} />
                </div>
            </div>

            <div className="widget-container double-filter">
                <p>Price range</p>
                <div className="form-widget"> 
                    <DropdownList data={priceValues} dataKey='value' textField='price' defaultValue={200000} onChange={(value) => setPriceMin(value)} value={priceMinValue} />
                </div>
                <span>-</span>
                <div className="form-widget"> 
                    <DropdownList data={priceValues} dataKey='value' textField='price' defaultValue={3500000} onChange={(value) => setPriceMax(value)} value={priceMaxValue} />
                </div>
            </div>

            <div className="widget-container double-filter">
                <p>Number of bedrooms</p>
                <div className="form-widget"> 
                    <NumberPicker min={1} max={10} defaultValue={1} onChange={(value) => setBedsMin(value)} 
                        value={bedsMinValue} />
                </div>
                <span>-</span>
                <div className="form-widget"> 
                    <NumberPicker min={1} max={10} defaultValue={10} onChange={(value) => setBedsMax(value)} value={bedsMaxValue} />
                </div>
            </div>

            <div className="widget-container double-filter">
                <p>Added to site</p>
                <div className="form-widget"> 
                    <DatePicker placeholder="dd/mm/yyyy" onChange={(value) => setDateFrom(value)} value={dateFromValue} />
                </div>
                <span>-</span>
                <div className="form-widget"> 
                    <DatePicker placeholder="dd/mm/yyyy" onChange={(value) => setDateTo(value)} value={dateToValue} />
                </div>
            </div>

        </div>
        <input type="submit" value="Search properties" />
        <input type="reset" value="Reset filters"/>
    </form>
}

export default SearchBar;