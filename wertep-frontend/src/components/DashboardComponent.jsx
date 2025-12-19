// src/components/DashboardComponent.jsx (COMPLETE CODE)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingModalComponent from './ListingModalComponent'; 

// Mock user data for Profile and Tokens
const MOCK_USER = {
    email: "gouri.p@example.com",
    phone: "+1234567890",
    locality: "Kochi, Kerala", // RS2
    radius: "5 km", // RS2
    balance: 1250, // RS6
    currentRating: 4.5, // RS9
};

function DashboardComponent() {
    const [activeTab, setActiveTab] = useState('exchange');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate(); 

    // Effect for the "Classy Slide-Up Motion Effect"
    useEffect(() => {
        const container = document.getElementById('dashboardContainer');
        if (container) {
            container.classList.add('loaded');
        }
    }, []);

    const FeatureCard = ({ icon, title, count, onClick }) => (
        <div className="feature-card" onClick={onClick}>
            <i className={`fas ${icon}`}></i>
            <h3>{title}</h3>
            {count !== undefined && <span className="count-badge">{count}</span>}
        </div>
    );
    
    // Updated Navigation Logic
    const handleFeatureClick = (feature, transactionId) => {
        if (feature === 'Chat System') {
            navigate('/chat');
        } else if (feature === 'Review User') {
            // Navigate to the Review page with a mock transaction ID
            navigate(`/review/${transactionId || 'TXN-001'}`); 
        } else if (feature === 'Admin Access') {
             // Temporary shortcut for testing RS12
             navigate('/admin');
        } else {
            alert(`Feature clicked: ${feature}. API/Detailed UI integration required.`);
        }
    };

    const handleLogout = () => {
        // Clear session/JWT here
        alert('Logging out...');
        navigate('/login'); 
    };

    return (
        <>
        {/* Listing Modal (RS3) */}
        <ListingModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <div className="login-container dashboard-container" id="dashboardContainer">
            
            <header className="dashboard-header">
                {/* Clickable logo for Admin access shortcut (for testing) */}
                <h1 className="wertep-logo" onClick={() => handleFeatureClick('Admin Access')} style={{cursor: 'pointer'}}>Wertep</h1>
                
                <div className="user-controls">
                    {/* Notifications System (RS11) */}
                    <i className="fas fa-bell notification-icon" onClick={() => handleFeatureClick('Notifications')}></i> 
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </header>

            {/* Skill-Token Ledger Display (RS6) */}
            <div className="token-ledger-display">
                <p>Skill-Token Balance (RS6)</p>
                <h2 className="token-balance">{MOCK_USER.balance.toLocaleString()} ST</h2>
            </div>

            {/* Navigation Tabs (NFR6 - Usability) */}
            <nav className="dashboard-nav">
                <button 
                    className={activeTab === 'exchange' ? 'active' : ''} 
                    onClick={() => setActiveTab('exchange')}
                >
                    <i className="fas fa-handshake"></i> Exchange
                </button>
                <button 
                    className={activeTab === 'listings' ? 'active' : ''} 
                    onClick={() => setActiveTab('listings')}
                >
                    <i className="fas fa-boxes"></i> My Listings
                </button>
                <button 
                    className={activeTab === 'history' ? 'active' : ''} 
                    onClick={() => setActiveTab('history')}
                >
                    <i className="fas fa-history"></i> History
                </button>
                <button 
                    className={activeTab === 'profile' ? 'active' : ''} 
                    onClick={() => setActiveTab('profile')}
                >
                    <i className="fas fa-user-circle"></i> Profile
                </button>
            </nav>
            
            <main className="dashboard-content">
                {/* --------------------------------- */}
                {/* --- 1. EXCHANGE TAB --- */}
                {/* --------------------------------- */}
                {activeTab === 'exchange' && (
                    <div className="exchange-panel">
                        <h3>Discover & Trade</h3>
                        
                        {/* Search & Filters (RS4) */}
                        <div className="search-bar-container">
                            <input type="text" placeholder="Search resources or skills locally (RS4)..." />
                            <i className="fas fa-search search-icon" onClick={() => handleFeatureClick('Search')}></i>
                            <i className="fas fa-map-marker-alt filter-icon" title="Location Filters (RS2)" onClick={() => handleFeatureClick('Filters')}></i>
                        </div>

                        {/* Quick Actions (RS5, RS7, RS9, RS10) */}
                        <div className="quick-actions">
                            <FeatureCard icon="fa-comment-alt" title="My Chats (RS7)" count={3} onClick={() => handleFeatureClick('Chat System')} /> {/* NOW NAVIGATES */}
                            <FeatureCard icon="fa-exchange-alt" title="Barter Requests (RS5)" count={2} onClick={() => handleFeatureClick('Barter Requests')} /> 
                            <FeatureCard icon="fa-thumbs-up" title="Reviews Pending (RS9)" onClick={() => handleFeatureClick('Rating/Review')} /> 
                            <FeatureCard icon="fa-chart-line" title="Recommendations (RS10)" onClick={() => handleFeatureClick('Recommendations')} /> 
                        </div>

                        <div className="listings-feed">
                            <h4>Hyper-Local Feed (Items & Skills)</h4>
                            <div className="listing-card">
                                <strong>Item: Old Gaming PC</strong> 
                                <span className="listing-price">50 ST</span>
                                <p>Category: Electronics. Locality: 1.5 km away.</p>
                                <button className="small-button" onClick={() => handleFeatureClick('Initiate Barter')}>Initiate Barter (RS5)</button>
                            </div>
                            <div className="listing-card">
                                <strong>Skill: Beginner Guitar Lessons</strong> 
                                <span className="listing-price">10 ST/hr</span>
                                <p>Category: Services. Locality: 500 m away.</p>
                                <button className="small-button" onClick={() => handleFeatureClick('Initiate Exchange')}>Initiate Exchange (RS5)</button>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* --------------------------------- */}
                {/* --- 2. LISTINGS TAB --- */}
                {/* --------------------------------- */}
                {activeTab === 'listings' && (
                    <div className="listings-panel">
                        <h3>Manage My Listings (RS3)</h3>
                        {/* Button opens the ListingModalComponent */}
                        <button className="login-button add-listing-button" onClick={() => setIsModalOpen(true)}>
                            <i className="fas fa-plus"></i> List New Resource/Skill (RS3)
                        </button>

                        <div className="my-listings-list">
                            <h4>Active Listings:</h4>
                            <ul>
                                <li>Gardening Skill (5 ST/hr) - Active | <button className="tiny-button" onClick={() => handleFeatureClick('Edit Listing')}>Edit</button></li>
                                <li>Old Books (10 ST total) - Pending Barter | <button className="tiny-button" onClick={() => handleFeatureClick('View Requests')}>View Requests (RS5)</button></li>
                            </ul>
                            <h4>Pending Moderation:</h4>
                            <p>Hand-knit Sweaters (Awaiting Admin Approval - RS13)</p>
                        </div>
                    </div>
                )}
                
                {/* --------------------------------- */}
                {/* --- 3. HISTORY TAB (MODIFIED) --- */}
                {/* --------------------------------- */}
                {activeTab === 'history' && (
                    <div className="history-panel">
                        <h3>Transaction History (RS8)</h3>
                        <p className="history-note">View past exchanges, Skill-Token movements, and apply ratings.</p>
                        <ul>
                            <li className="positive-tx">
                                <strong>Barter: Web Design Service</strong> for 50 ST 
                                <span className="tx-amount">+50 ST</span>
                                {/* MODIFIED: Now navigates to the review page */}
                                <button className="tiny-button" onClick={() => handleFeatureClick('Review User', 'TXN-001')}>Rate/Review (RS9)</button> 
                            </li>
                            <li className="negative-tx">
                                <strong>Exchange: Used Camera</strong> for 100 ST 
                                <span className="tx-amount">-100 ST</span>
                                <button className="tiny-button" onClick={() => alert('Already Reviewed')}>Reviewed</button>
                            </li>
                            <li className="neutral-tx">
                                <strong>Barter: Bike Repair</strong> (Service Credit) 
                                <span className="tx-amount">0 ST</span>
                                <button className="tiny-button" onClick={() => handleFeatureClick('Review User', 'TXN-003')}>Rate/Review (RS9)</button>
                            </li>
                        </ul>
                    </div>
                )}

                {/* --------------------------------- */}
                {/* --- 4. PROFILE TAB --- */}
                {/* --------------------------------- */}
                {activeTab === 'profile' && (
                    <div className="profile-panel">
                        <h3>My Profile (RS2)</h3>
                        <div className="profile-info">
                            <div className="info-item">
                                <strong>Email:</strong> <span>{MOCK_USER.email}</span>
                            </div>
                            <div className="info-item">
                                <strong>Phone:</strong> <span>{MOCK_USER.phone}</span>
                            </div>
                            <div className="info-item">
                                <strong>Locality:</strong> <span>{MOCK_USER.locality}</span>
                            </div>
                            <div className="info-item">
                                <strong>Search Radius:</strong> <span>{MOCK_USER.radius}</span>
                            </div>
                            <div className="info-item rating-display">
                                <strong>Community Rating (RS9):</strong> 
                                <span className="star-rating">
                                    <i className="fas fa-star"></i> {MOCK_USER.currentRating} / 5
                                </span>
                            </div>
                        </div>

                        <button className="login-button" style={{marginTop: '20px'}} onClick={() => handleFeatureClick('Edit Profile')}>
                            Edit Profile & Localization Settings (RS2)
                        </button>
                    </div>
                )}
            </main>
        </div>
        </>
    );
}

export default DashboardComponent;