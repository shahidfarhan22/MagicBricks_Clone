// // FilterBar.js
// import React, { useState } from 'react';

// const FilterBar = ({ onFilterChange }) => {
//     const [location, setLocation] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');
//     const [bhk, setBhk] = useState('');

//     const handleFilterChange = () => {
//         onFilterChange({ location, minPrice, maxPrice, bhk });
//     };

//     return (
//         <div className="filter-bar">
//             <input 
//                 type="text"
//                 placeholder="Location"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//             />
//             <input 
//                 type="number"
//                 placeholder="Min Price"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(e.target.value)}
//             />
//             <input 
//                 type="number"
//                 placeholder="Max Price"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//             />
//             <input 
//                 type="number"
//                 placeholder="BHK"
//                 value={bhk}
//                 onChange={(e) => setBhk(e.target.value)}
//             />
//             <button onClick={handleFilterChange}>Apply Filters</button>
//         </div>
//     );
// };

// export default FilterBar;
// components/FilterBar.js
import React from 'react';
import './filter-bar.css'; // Create this CSS file for styling

const FilterBar = ({ onSearchChange, onPriceChange, onBHKChange }) => {
    return (
        <div className="filter-bar">
            <input
                type="text"
                placeholder="Search by location"
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <select onChange={(e) => onPriceChange(e.target.value)}>
                <option value="">Select Price Range</option>
                <option value="0-100000">0 - 100,000</option>
                <option value="100000-200000">100,000 - 200,000</option>
                <option value="200000-300000">200,000 - 300,000</option>
                {/* Add more price ranges as needed */}
            </select>
            <select onChange={(e) => onBHKChange(e.target.value)}>
                <option value="">Select BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                {/* Add more BHK options as needed */}
            </select>
        </div>
    );
};

export default FilterBar;
