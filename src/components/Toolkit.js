import React, { useState } from "react";
import "../styles/toolkit.css";

const checklistItems = [
    { id: 1, title: "JOB RESOURCES", content: "Content for Job Resources" },
    { id: 2, title: "LOREM IPSUM", content: "Content for Lorem Ipsum 2" },
    { id: 3, title: "LOREM IPSUM", content: "Content for Lorem Ipsum 3" },
    { id: 4, title: "LOREM IPSUM", content: "Content for Lorem Ipsum 4" },
    { id: 5, title: "LOREM IPSUM", content: "Content for Lorem Ipsum 5" },
];

const Header = () => {
    return (
        <div className="header">
            <div className="header-title">Humming BEE</div>
            {/* Placeholder for the icon */}
        </div>
    );
};

const EngagementSection = () => {
    return (
        <div className="engagement-section">
            <h1 className="engagement-title">What is engagement?</h1>
            <p className="engagement-description">
                Engagement in the workplace context refers to the emotional commitment and connection employees have to their
                work, their organization, and its goals. It's a measure of how enthusiastic, involved, and dedicated
                employees are in their roles and to their company.
            </p>
            <div className="engagement-actions">
                <button className="engagement-button yes">Yes</button>
                <button className="engagement-button no">No</button>
            </div>
        </div>
    );
};

const Checklist = ({ selectedId, onSelect }) => {
    return (
        <div className="checklist">
            {checklistItems.map(item => (
                <div
                    key={item.id}
                    className={`checklist-item ${selectedId === item.id ? "active" : ""}`}
                    onClick={() => onSelect(item.id)}
                >
                    <div className="item-number">{item.id}</div>
                    <div className="item-title">{item.title}</div>
                    {selectedId === item.id && <div className="item-icon">✔️</div>}
                </div>
            ))}
        </div>
    );
};

const ContentSection = ({ selectedId }) => {
    const selectedItem = checklistItems.find(item => item.id === selectedId);

    return (
        <div className="content-section">
            <h2 className="content-title">{selectedItem.title}</h2>
            <p className="content-description">
                {selectedItem.content} Engagement in the workplace context refers to the emotional commitment and connection employees have to their work, their organization, and its goals. It's a measure of how enthusiastic, involved, and dedicated employees are in their roles and to their company.
            </p>
            <div className="lorem-box-container">
                <div className="lorem-box">Lorem Ipsum</div>
                <div className="lorem-box">Lorem Ipsum</div>
                <div className="lorem-box">Lorem Ipsum</div>
            </div>
            <div className="rating-scale">
                <p>On a scale of 1 to 10, how much have you improved?</p>
                <div className="rating-options">
                    {[...Array(10)].map((_, index) => (
                        <label key={index}>
                            <input type="radio" name="rating" value={index + 1} />
                            {index + 1}
                        </label>
                    ))}
                </div>
                <div className="rating-labels">
                    <span>Not at all</span>
                    <span>Average</span>
                    <span>Excellent</span>
                </div>
            </div>
        </div>
    );
};

const Toolkit = () => {
    const [selectedId, setSelectedId] = useState(1);

    return (
        <div className="toolkit-container">
            <div className="toolkit">
                <Header />
                <EngagementSection />
                <div className="main-content">
                    <Checklist selectedId={selectedId} onSelect={setSelectedId} />
                    <ContentSection selectedId={selectedId} />
                </div>
            </div>
        </div>
        
    );
};

export default Toolkit;
