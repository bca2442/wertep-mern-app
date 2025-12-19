// src/components/ListingModalComponent.jsx
import React, { useState } from 'react';

function ListingModalComponent({ isOpen, onClose }) {
    const [listingType, setListingType] = useState('Resource');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '', // Skill-Tokens
        category: 'Services',
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // --- API CALL PLACEHOLDER (RS3) ---
        console.log(`Submitting new ${listingType} listing:`, formData);
        alert(`Listing "${formData.title}" submitted for moderation (RS13).`);
        
        onClose(); // Close modal after submission
        setFormData({ title: '', description: '', price: '', category: 'Services' });
    };

    return (
        <div className="modal-overlay">
            <div className="login-container modal-content">
                <h2 className="wertep-logo-small">List New Item or Skill</h2>
                <span className="close-button" onClick={onClose}>&times;</span>
                
                <div className="tab-switch">
                    <button 
                        className={listingType === 'Resource' ? 'active' : ''}
                        onClick={() => setListingType('Resource')}
                    >
                        Resource (Item)
                    </button>
                    <button 
                        className={listingType === 'Skill' ? 'active' : ''}
                        onClick={() => setListingType('Skill')}
                    >
                        Skill (Service)
                    </button>
                </div>

                <form onSubmit={handleFormSubmit}>
                    <div className="input-field-container">
                        <input 
                            type="text" 
                            name="title" 
                            placeholder={`${listingType} Title`} 
                            required 
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-field-container">
                        <textarea 
                            name="description" 
                            placeholder={`${listingType} Description, Tags, and Availability (RS3)`} 
                            required
                            rows="4"
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <div className="input-field-container">
                        <input 
                            type="number" 
                            name="price" 
                            placeholder={`Suggested Skill-Tokens Price (RS6)`} 
                            required 
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="input-field-container file-upload">
                        <label>Upload Photos (RS3)</label>
                        <input type="file" id="photoUpload" multiple accept="image/*" />
                    </div>

                    <button type="submit" className="login-button">
                        Submit Listing
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ListingModalComponent;