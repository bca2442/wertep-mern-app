// src/components/ChatComponent.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function ChatComponent() {
    return (
        <div className="login-container dashboard-container loaded" style={{maxWidth: '600px', textAlign: 'left'}}>
            <header className="dashboard-header" style={{borderBottom: 'none'}}>
                <h2 className="wertep-logo-small" style={{margin: '0'}}>Messaging System (RS7)</h2>
                <Link to="/dashboard" className="logout-button">Back to Dashboard</Link>
            </header>

            <main className="dashboard-content">
                <h3>Active Barter Chats</h3>
                <div className="chat-list">
                    <div className="chat-item">
                        <strong>User A: Web Design Barter</strong>
                        <p>Last Message: "I confirmed the delivery time."</p>
                    </div>
                    <div className="chat-item">
                        <strong>User B: Camera Exchange</strong>
                        <p style={{color: '#FF6347'}}>New Message: "Are you free this weekend?"</p>
                    </div>
                </div>
                <button className="login-button" style={{marginTop: '20px'}} onClick={() => alert('Opens New Chat Interface.')}>
                    Start New Negotiation (RS5)
                </button>
            </main>
        </div>
    );
}

export default ChatComponent;