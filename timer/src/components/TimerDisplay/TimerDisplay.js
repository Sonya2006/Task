import React from 'react';
import PropTypes from 'prop-types';
import './TimerDisplay.css';

const TimerDisplay = ({ 
    time,
    className = '',
    customStyles = {},
    showHours = false
}) => {
    const formatTime = (seconds) => {
        if (showHours) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
            return `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${remainingSeconds
                .toString()
                .padStart(2, '0')}`;
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <div 
            className={`timer-display ${className}`}
            style={customStyles}
        >
            {formatTime(time)}
        </div>
    );
};

TimerDisplay.propTypes = {
    time: PropTypes.number.isRequired,
    className: PropTypes.string,
    customStyles: PropTypes.object,
    showHours: PropTypes.bool
};

export default TimerDisplay;