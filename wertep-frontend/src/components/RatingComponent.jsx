// src/components/RatingComponent.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function RatingComponent() {
    // In a real app, useParams would grab the transaction ID from the URL
    // const { transactionId } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [hoverRating, setHoverRating] = useState(0);

    // Mock data for the transaction being reviewed
    const transaction = {
        id: 'TXN-9876',
        partner: 'Karthik S.',
        item: 'Web Design Service',
        date: '12/10/2025'
    };

    // Effect for the "Classy Slide-Up Motion Effect"
    useEffect(() => {
        const container = document.getElementById('ratingContainer');
        if (container) {
            container.classList.add('loaded');
        }
    }, []);

    const handleRatingSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a star rating before submitting.');
            return;
        }

        // --- API CALL PLACEHOLDER (RS9) ---
        console.log(`Submitting Rating for ${transaction.partner}: ${rating} stars, Review: "${review}"`);
        alert(`Thank you for your review! ${transaction.partner} has been rated ${rating} stars.`);
        
        // Redirect back to the transaction history or dashboard
        navigate('/dashboard?tab=history'); 
    };

    const Star = ({ index }) => {
        const value = index + 1;
        const active = value <= (hoverRating || rating);
        
        return (
            <i 
                className={`fas fa-star ${active ? 'active' : ''}`}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(value)}
            ></i>
        );
    };

    return (
        <div className="login-container dashboard-container" id="ratingContainer" style={{maxWidth: '550px', textAlign: 'center'}}>
            <header className="dashboard-header" style={{borderBottom: 'none'}}>
                <h2 className="wertep-logo-small">Rate Your Exchange (RS9)</h2>
                <Link to="/dashboard" className="logout-button">Back to Dashboard</Link>
            </header>

            <main className="dashboard-content" style={{textAlign: 'left'}}>
                <div className="review-info-box">
                    <p>Transaction ID: <strong>{transaction.id}</strong></p>
                    <p>Partner: <span style={{color: '#66FCF1'}}>{transaction.partner}</span></p>
                    <p>Item/Service: <strong>{transaction.item}</strong></p>
                </div>
                
                <form onSubmit={handleRatingSubmit}>
                    <h4 style={{marginTop: '30px', color: '#C5C6C7'}}>Your Rating:</h4>
                    
                    {/* Star Rating System */}
                    <div className="star-rating-input">
                        {[...Array(5)].map((_, index) => (
                            <Star key={index} index={index} />
                        ))}
                        <span className="current-rating-text">{rating > 0 ? `${rating} Stars` : 'Select Score'}</span>
                    </div>

                    <div className="input-field-container" style={{marginTop: '20px'}}>
                        <textarea 
                            name="review" 
                            placeholder="Write your detailed review here (Max 500 characters)" 
                            rows="5"
                            maxLength="500"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                        <small style={{display: 'block', color: '#45A29E', textAlign: 'right'}}>{review.length}/500</small>
                    </div>

                    <button type="submit" className="login-button">
                        Submit Review
                    </button>
                </form>
            </main>
        </div>
    );
}

export default RatingComponent;