
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/property-listings.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const MyFavorites = () => {
    const [bookmarkedProperties, setBookmarkedProperties] = useState([]);
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        const fetchBookmarkedProperties = async () => {
            try {
                const response = await axios.get(
                    'https://localhost:7164/api/property/bookmarks', 
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );
                setBookmarkedProperties(response.data);
            } catch (error) {
                console.error('Error fetching bookmarked properties', error);
            }
        };

        fetchBookmarkedProperties();
    }, [token]);

    const handleRemoveBookmark = async (propertyId) => {
        try {
            const stringPropertyId = typeof propertyId === 'object' ? propertyId.toString() : propertyId;

            await axios.delete(
                `https://localhost:7164/api/property/bookmark/${stringPropertyId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log('Bookmark removed successfully');

            const updatedBookmarkedProperties = bookmarkedProperties.filter(property => property.id !== stringPropertyId);
            setBookmarkedProperties(updatedBookmarkedProperties);

            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedProperties')) || [];
            const updatedBookmarks = savedBookmarks.filter(id => id !== stringPropertyId);
            localStorage.setItem('bookmarkedProperties', JSON.stringify(updatedBookmarks));
        } catch (error) {
            console.error('Error removing bookmark', error);
        }
    };

    return (
        <div className="property-listings-container">
            {/* <h2>Available Properties</h2> */}


            {bookmarkedProperties.length > 0 ? (
                <ul className="property-list">
                    {bookmarkedProperties.map((property) => (
                        <li key={property.id} className="property-card">
                            <div className="property-title">Title: {property.title}</div>
                            <div className="property-description">Description: {property.description}</div>
                            
                            {/* Property Images */}
                            <div className="property-info">
                                <div className="property-images">
                                {console.log('Property Images:', property.images)}
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
                                <button onClick={() => handleRemoveBookmark(property.id)}>
                                    Remove Bookmark
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
            ) : (
                <div>No properties found.</div>
            )}

            {/* {bookmarkMessage && <div className="bookmark-message">{bookmarkMessage}</div>} */}
        </div>
    );
};
    


export default MyFavorites;
