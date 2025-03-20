// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../components/property-listings.css';


// const PropertyListings = () => {
//     const [properties, setProperties] = useState([]);
//     const [filteredProperties, setFilteredProperties] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedSellerDetails, setSelectedSellerDetails] = useState({});
//     const [bookmarkMessage, setBookmarkMessage] = useState('');
//     const [bookmarkedProperties, setBookmarkedProperties] = useState([]); 

//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         const fetchProperties = async () => {
//             try {
//                 const response = await axios.get('https://localhost:7164/api/property/list');
//                 setProperties(response.data.filter(p => p.isForRent));  
//                 setFilteredProperties(response.data.filter(p => p.isForRent));

//                 const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedProperties')) || [];
//                 setBookmarkedProperties(savedBookmarks);

//                 if (token) {
//                     const bookmarkedResponse = await axios.get('https://localhost:7164/api/property/bookmarked', {
//                         headers: {
//                             'Authorization': `Bearer ${token}`
//                         }
//                     });
//                     const bookmarkedIds = bookmarkedResponse.data.map(property => property.id);
//                     setBookmarkedProperties(bookmarkedIds);

//                     localStorage.setItem('bookmarkedProperties', JSON.stringify(bookmarkedIds));
//                 }
//             } catch (error) {
//                 console.error('Error fetching properties or bookmarks', error);
//             }
//         };

//         fetchProperties();
//     }, [token]); 

//     const handleSearch = (event) => {
//         const value = event.target.value.toLowerCase();
//         setSearchTerm(value);

//         if (value === '') {
//             setFilteredProperties(properties);
//         } else {
//             const filtered = properties.filter(property => 
//                 property.location.toLowerCase().includes(value)
//             );
//             setFilteredProperties(filtered);
//         }
//     };

//     const handleBookmark = async (propertyId) => {
//         if (!token) {
//             alert('Please log in to bookmark properties.');
//             return;
//         }
//         try {
//             await axios.post(
//                 `https://localhost:7164/api/property/bookmark/${propertyId}`,
//                 {},
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     }
//                 }
//             );
//             const newBookmarkedProperties = [...bookmarkedProperties, propertyId];  
//             setBookmarkedProperties(newBookmarkedProperties);
//             setBookmarkMessage('Property bookmarked successfully!');

//             localStorage.setItem('bookmarkedProperties', JSON.stringify(newBookmarkedProperties));
//         } catch (error) {
//             console.error('Error bookmarking property', error);
//             setBookmarkMessage('Error bookmarking property.');
//         }

//         setTimeout(() => {
//             setBookmarkMessage('');
//         }, 3000);
//     };

//     const handleRemoveBookmark = async (propertyId) => {
//         if (!token) {
//             alert('Please log in to remove bookmarks.');
//             return;
//         }
//         try {
//             await axios.delete(
//                 `https://localhost:7164/api/property/bookmark/${propertyId}`,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     }
//                 }
//             );
//             const newBookmarkedProperties = bookmarkedProperties.filter(id => id !== propertyId);  
//             setBookmarkedProperties(newBookmarkedProperties);
//             setBookmarkMessage('Bookmark removed successfully!');

//             localStorage.setItem('bookmarkedProperties', JSON.stringify(newBookmarkedProperties));
//         } catch (error) {
//             console.error('Error removing bookmark', error);
//             setBookmarkMessage('Error removing bookmark.');
//         }

//         setTimeout(() => {
//             setBookmarkMessage('');
//         }, 3000);
//     };

//     const viewSellerDetails = async (propertyId) => {
//         if (!token) {
//             alert('Please log in to view seller details.');
//             return;
//         }
//         try {
//             const response = await axios.get(`https://localhost:7164/api/property/seller-details/${propertyId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             const { name, phoneNumber } = response.data;
//             setSelectedSellerDetails(prev => ({ ...prev, [propertyId]: { name, phoneNumber } }));
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 alert(error.response.data);
//             } else {
//                 console.error('Error fetching seller details', error);
//             }
//         }
//     };

//     return (
//         <div className="property-listings-container">
//             <h2>Available Properties</h2>

//             <div className="property-search-form">
//                 <input 
//                     type="text"
//                     placeholder="Search by location"
//                     value={searchTerm}
//                     onChange={handleSearch}
//                 />
//             </div>

//             {filteredProperties.length > 0 ? (
//                 <ul className="property-list">
//                     {filteredProperties.map((property) => (
//                         <li key={property.id} className="property-card">
//                             <div className="property-title">Title: {property.title}</div>
//                             <div className="property-description">Description: {property.description}</div>

//                             <div className="property-info">
//                                 <div className="property-box property-location"><b>Location:</b> {property.location}</div>
//                                 <div className="property-box property-price"><b>Price:</b> {property.price}</div>
//                             </div>

//                             <div className="property-info">
//                                 <div className="property-box property-bhk"><b>BHK:</b> {property.bhk}</div>
//                                 <div className="property-box property-facing"><b>Facing:</b> {property.facing}</div>
//                             </div>

//                             <div className="property-info">
//                                 <div className="property-box property-parking"><b>Parking:</b> {property.parking}</div>
//                                 <div className="property-box property-builtUp"><b>BuiltUp:</b>{property.builtUp}</div>
//                             </div>

//                             <div className="property-info">
//                                 <div className="property-box property-status"><b>Status:</b> {property.isForRent ? 'For Rent' : 'For Sale'}</div>
//                                 <div className="property-box property-bathrooms"><b>Bathrooms:</b> {property.bathrooms}</div>
//                             </div>

//                             <div className="property-actions">
//                                 <button onClick={() => viewSellerDetails(property.id)}>View Seller Details</button>
//                             </div>

//                             {selectedSellerDetails[property.id] && (
//                                 <div className="seller-details">
//                                     <b>Seller Name:</b> {selectedSellerDetails[property.id].name} <br />
//                                     <b>Phone Number:</b> {selectedSellerDetails[property.id].phoneNumber}
//                                 </div>
//                             )}

//                             <div className="property-actions">
//                                 <button 
//                                     onClick={() => bookmarkedProperties.includes(property.id) 
//                                         ? handleRemoveBookmark(property.id) 
//                                         : handleBookmark(property.id)}
//                                     style={{ backgroundColor: bookmarkedProperties.includes(property.id) ? 'red' : 'gray' }}
//                                 >
//                                     {bookmarkedProperties.includes(property.id) ? 'Remove Bookmark' : 'Bookmark'}
//                                 </button>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No properties available.</p>
//             )}
//         </div>
//     );
// };

// export default PropertyListings;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/property-listings.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const PropertyListings = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSellerDetails, setSelectedSellerDetails] = useState({});
    const [bookmarkMessage, setBookmarkMessage] = useState('');
    const [bookmarkedProperties, setBookmarkedProperties] = useState([]);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000000); // Set a reasonable max price
    const [bhk, setBhk] = useState('');
    const [facing, setFacing] = useState('');
    const [bathrooms, setBathrooms] = useState('');


    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('https://localhost:7164/api/property/list');
                setProperties(response.data.filter(p => p.isForRent));  // Only non-rent properties
                setFilteredProperties(response.data.filter(p => p.isForRent));

                const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedProperties')) || [];
                setBookmarkedProperties(savedBookmarks);

                if (token) {
                    const bookmarkedResponse = await axios.get('https://localhost:7164/api/property/bookmarked', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const bookmarkedIds = bookmarkedResponse.data.map(property => property.id);
                    setBookmarkedProperties(bookmarkedIds);
                    localStorage.setItem('bookmarkedProperties', JSON.stringify(bookmarkedIds));
                }
            } catch (error) {
                console.error('Error fetching properties or bookmarks', error);
            }
        };

        fetchProperties();
    }, [token]);

    // Other handlers remain the same ...


    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        if (value === '') {
            setFilteredProperties(properties);
        } else {
            const filtered = properties.filter(property => 
                property.location.toLowerCase().includes(value)
            );
            setFilteredProperties(filtered);
        }
    };

    const handlePriceRangeChange = (event) => {
        const { name, value } = event.target;
        if (name === "minPrice") {
            setMinPrice(Number(value));
        } else if (name === "maxPrice") {
            setMaxPrice(Number(value));
        }
    };

    const handleBhkChange = (event) => {
        const value = event.target.value;
        setBhk(value);
    };

    const handleFacingChange = (event) => { // New handler for facing filter
        const value = event.target.value;
        setFacing(value);
    };

    const handleBathroomsChange = (event) => { // New handler for bathrooms filter
        const value = event.target.value;
        setBathrooms(value);
    };

    const applyFilters = () => {
        let filtered = properties.filter(property => 
            !property.isForRent && 
            property.price >= minPrice && 
            property.price <= maxPrice
        );
    
        if (searchTerm) {
            filtered = filtered.filter(property => 
                property.location.toLowerCase().includes(searchTerm)
            );
        }
    
        if (bhk) {
            filtered = filtered.filter(property => 
                property.bhk === Number(bhk)  // Convert BHK to number for comparison
            );
        }
    
        if (facing) {
            filtered = filtered.filter(property => 
                property.facing === facing
            );
        }
    
        if (bathrooms) {
            filtered = filtered.filter(property => 
                property.bathrooms === Number(bathrooms)  // Convert bathrooms to number for comparison
            );
        }
    
        setFilteredProperties(filtered);
    };
    

    const handleBookmark = async (propertyId) => {
        if (!token) {
            alert('Please log in to bookmark properties.');
            return;
        }
        try {
            await axios.post(
                `https://localhost:7164/api/property/bookmark/${propertyId}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            const newBookmarkedProperties = [...bookmarkedProperties, propertyId];  
            setBookmarkedProperties(newBookmarkedProperties);
            setBookmarkMessage('Property bookmarked successfully!');

            localStorage.setItem('bookmarkedProperties', JSON.stringify(newBookmarkedProperties));
        } catch (error) {
            console.error('Error bookmarking property', error);
            setBookmarkMessage('Error bookmarking property.');
        }

        setTimeout(() => {
            setBookmarkMessage('');
        }, 3000);
    };

    const handleRemoveBookmark = async (propertyId) => {
        if (!token) {
            alert('Please log in to remove bookmarks.');
            return;
        }
        try {
            await axios.delete(
                `https://localhost:7164/api/property/bookmark/${propertyId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            const newBookmarkedProperties = bookmarkedProperties.filter(id => id !== propertyId);
            setBookmarkedProperties(newBookmarkedProperties);
            setBookmarkMessage('Bookmark removed successfully!');

            localStorage.setItem('bookmarkedProperties', JSON.stringify(newBookmarkedProperties));
        } catch (error) {
            console.error('Error removing bookmark', error);
            setBookmarkMessage('Error removing bookmark.');
        }

        setTimeout(() => {
            setBookmarkMessage('');
        }, 3000);
    };

    const viewSellerDetails = async (propertyId) => {
        if (!token) {
            alert('Please log in to view seller details.');
            return;
        }
        try {
            const response = await axios.get(`https://localhost:7164/api/property/seller-details/${propertyId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const { name, phoneNumber } = response.data;
            setSelectedSellerDetails(prev => ({ ...prev, [propertyId]: { name, phoneNumber } }));
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data);
            } else {
                console.error('Error fetching seller details', error);
            }
        }
    };


    return (
        <div className="property-listings-container">
            {/* <h2>Available Properties</h2> */}


            <div className="filter-bar">
                <input 
                    type="text"
                    placeholder="Search by location"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                {/* <label>Min Price: </label> */}
                <input 
                    type="number" 
                    name="minPrice" 
                    value={minPrice} 
                    onChange={handlePriceRangeChange} 
                    placeholder="Enter Min Price" 
                />

                {/* <label>Max Price: </label> */}
                <input 
                    type="number" 
                    name="maxPrice" 
                    value={maxPrice} 
                    onChange={handlePriceRangeChange} 
                    placeholder="Enter Max Price" 
                />


                
                <input
                    type="number"
                    placeholder='Number of Bhk'
                    value={bhk} 
                    onChange={handleBhkChange}>
                  
                </input>

                <input
                    type='text'
                    value={facing} 
                    placeholder='Facing'
                    onChange={handleFacingChange} 
                 
                />
                <input
                    type='number'
                    placeholder='No of Bathrooms'
                    value={bathrooms} 
                    onChange={handleBathroomsChange} 
                
                />

                <button onClick={applyFilters}>Filter</button>
            </div>

            {filteredProperties.length > 0 ? (
                <ul className="property-list">
                    {filteredProperties.map((property) => (
                        <li key={property.id} className="property-card">
                            <div className="property-title">Title: {property.title}</div>
                            <div className="property-description">Description: {property.description}</div>
                            
                            {/* Property Images */}
                            <div className="property-info">
                                <div className="property-images">
                                    {property.images && property.images.length > 0 ? (
                                        <Carousel showThumbs={false} infiniteLoop={true} dynamicHeight={false} useKeyboardArrows>
                                            {property.images.map((image, index) => (
                                                <div key={index}>
                                                    <img
                                                        src={`data:image/jpeg;base64,${image}`}
                                                        alt={`Property Image ${index + 1}`}
                                                        className="property-image"
                                                    />
                                                </div>
                                            ))}
                                        </Carousel>
                                    ) : (
                                        <p>No images available</p>
                                    )}
                                </div>


                            </div>
                            <div className='property-info'>
                            <div className="property-box">
                                <div className="property-field"><b>Location:</b> {property.location}</div>
                                <div className="property-field"><b>Price:</b> {property.price}</div>
                                <div className="property-field"><b>BHK:</b> {property.bhk}</div>
                                <div className="property-field"><b>Parking:</b> {property.parking}</div>
                                <div className="property-field"><b>Facing:</b> {property.facing}</div>
                                <div className="property-field"><b>Bathrooms:</b> {property.bathrooms}</div>

                            </div>
                                {/* </div>   */}
                            </div>

               

                            <div className="bookmark-buttons">
                                {bookmarkedProperties.includes(property.id) ? (
                                    <button className="bookmark-btn" onClick={() => handleRemoveBookmark(property.id)}>Remove Bookmark</button>
                                ) : (
                                    <button className="bookmark-btn" onClick={() => handleBookmark(property.id)}>Bookmark</button>
                                )}
                            </div>

                            <div className="view-seller-details">
                                <button className="seller-btn" onClick={() => viewSellerDetails(property.id)}>View Seller Details</button>

                                {selectedSellerDetails[property.id] && (
                                    <div className="seller-details">
                                        <p><b>Seller Name:</b> {selectedSellerDetails[property.id].name} <b>Phone Number: </b> {selectedSellerDetails[property.id].phoneNumber}</p>
                                        {/* <p><b>Phone Number:</b> {selectedSellerDetails[property.id].phoneNumber}</p> */}
                                    </div>
                                )}
                            </div>
                            {/* </div> */}

                        </li>
                    ))}
                </ul>
            ) : (
                <div>No properties found.</div>
            )}

            {bookmarkMessage && <div className="bookmark-message">{bookmarkMessage}</div>}
        </div>
    );
};

export default PropertyListings;