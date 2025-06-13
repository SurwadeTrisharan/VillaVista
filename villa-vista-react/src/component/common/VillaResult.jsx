import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ApiService from '../../service/ApiService';

const VillaResult = ({ villaSearchResults }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const isAdmin = ApiService.isAdmin();
    return (
        <section className="villa-results">
            {villaSearchResults && villaSearchResults.length > 0 && (
                <div className="villa-list">
                    {villaSearchResults.map(villa => (
                        <div key={villa.id} className="villa-list-item">
                            <img className='villa-list-item-image' src={villa.villaPhotoUrl} alt={villa.villaType} />
                            <div className="villa-details">
                                <h3>{villa.villaType}</h3>
                                <p>Price: ${villa.villaPrice} / night</p>
                                <p>Description: {villa.villaDescription}</p>
                            </div>

                            <div className='book-now-div'>
                                {isAdmin ? (
                                    <button
                                        className="edit-villa-button"
                                        onClick={() => navigate(`/admin/edit-villa/${villa.id}`)} // Navigate to edit villa with room ID
                                    >
                                        Edit Villa
                                    </button>
                                ) : (
                                    <button
                                        className="book-now-button"
                                        onClick={() => navigate(`/villa-details-book/${villa.id}`)} // Navigate to book villa with villa ID
                                    >
                                        View/Book Now
                                    </button>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default VillaResult;
