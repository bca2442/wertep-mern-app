// src/components/AdminDashboardComponent.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboardComponent() {
    return (
        <div className="login-container dashboard-container loaded" style={{maxWidth: '900px', textAlign: 'left'}}>
            <header className="dashboard-header" style={{borderBottom: '1px solid #66FCF1'}}>
                <h1 className="wertep-logo-small" style={{margin: '0'}}>ADMIN CONTROL PANEL (RS12)</h1>
                <Link to="/dashboard" className="logout-button">Exit Admin View</Link>
            </header>

            <div className="token-ledger-display" style={{backgroundColor: '#1F2833'}}>
                <p>System Oversight</p>
                <h2 className="token-balance" style={{fontSize: '1.8rem'}}>5,400 Active Users | 28 Pending Reports (RS14)</h2>
            </div>
            
            <main className="dashboard-content">
                <h3>Moderation Queue</h3>
                <div className="admin-queue">
                    <div className="queue-item">
                        <strong>New Listing: Hand-knit Sweaters (RS13)</strong>
                        <button className="tiny-button" style={{marginLeft: '20px', background: '#4CAF50'}}>Approve</button>
                        <button className="tiny-button" style={{background: '#FF6347'}}>Reject</button>
                    </div>
                    <div className="queue-item">
                        <strong>User Report: Barter Dispute (RS14)</strong>
                        <button className="tiny-button" style={{background: '#45A29E'}}>Review Case</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminDashboardComponent;