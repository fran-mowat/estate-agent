import React, { useState } from "react";
import Map from "./Map";

//property tabs containing description, floorplan, and map 

const Tabs = ({property}) => {
    const [activeTab, setActiveTab] = useState("tab1"); //uses react hook to set active tab 

    return ( //checks which tab is active and returns appropriate content, uses bootstrap tabs elements 
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => setActiveTab('tab1')}>Description</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => setActiveTab('tab2')}>Floorplan</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => setActiveTab('tab3')}>Map</button>
                </li>
            </ul>
            <div className="tab-content">
                {activeTab === 'tab1' && <div className="description-tab">{property.description}</div>}
                {activeTab === 'tab2' && <div className="floorplan-tab"><img src={`../images/${property.id}/${property.id}_floorplan.png`} alt="floorplan" /></div>}
                {activeTab === 'tab3' && <div className="map-tab"><Map location={property.location} /></div>}
            </div>
        </div>
    );
};

export default Tabs;