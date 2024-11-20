import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TimerDisplay from '../TimerDisplay/TimerDisplay';
import './Timer.css';

const Timer = ({ 
    maxSeconds = 3600,
    initialTime = 0,
    onTimeEnd = () => {},
    className = '',
    inputClassName = '',
    buttonClassName = '',
    startButtonText = 'Почати',
    stopButtonText = 'Пауза',
    resetButtonText = 'Скинути',
    resumeButtonText = 'Продовжити',
    inputPlaceholder = 'Введіть час в секундах',
    customStyles = {},
    customInputStyles = {},
    customButtonStyles = {},
}) => {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [inputTime, setInputTime] = useState('');
    const [error, setError] = useState('');
    const [hasEnded, setHasEnded] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && time >= 0) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime === 0) {
                        setIsRunning(false);
                        setIsPaused(false);
                        setHasEnded(true);
                        onTimeEnd();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, time, onTimeEnd]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputTime(value);
    
        if (value > maxSeconds) {
            setError(`Максимальний час - ${maxSeconds} секунд`);
        } else if (value < 0) {
            setError('Час не може бути від\'ємним');
        } else {
            setError('');
        }
    };

    const handleStart = () => {
        const timeValue = parseInt(inputTime);
        if (timeValue > 0 && timeValue <= maxSeconds) {
            setTime(timeValue);
            setIsRunning(true);
            setIsPaused(false);
            setInputTime('');
            setError('');
            setHasEnded(false);
        }
    };

    const handleStop = () => {
        setIsRunning(false);
        setIsPaused(true);
    };

    const handleResume = () => {
        if (time > 0) {
            setIsRunning(true);
            setIsPaused(false);
        }
    };

    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
        setIsPaused(false);
        setInputTime('');
        setError('');
        setHasEnded(false);
    };

    return (
        <div 
            className={`timer ${className}`}
            style={customStyles}
        >
            <div className="input-container">
                <input
                    type="number"
                    value={inputTime}
                    onChange={handleInputChange}
                    placeholder={`${inputPlaceholder} (макс. ${maxSeconds})`}
                    disabled={isRunning || isPaused}
                    className={`timer-input ${inputClassName}`}
                    style={customInputStyles}
                    min="0"
                    max={maxSeconds}
                />
                {error && <div className="error-message">{error}</div>}
            </div>
            <TimerDisplay time={time} />
            {hasEnded && <div className="timer-ended">Час закінчився!</div>}
            <div className="timer-buttons">
                {!isPaused && (
                    <button
                        onClick={handleStart}
                        disabled={isRunning || inputTime <= 0 || inputTime > maxSeconds}
                        className={`btn btn-start ${buttonClassName}`}
                        style={customButtonStyles}
                    >
                        {startButtonText}
                    </button>
                )}
                {isRunning && (
                    <button
                        onClick={handleStop}
                        className={`btn btn-stop ${buttonClassName}`}
                        style={customButtonStyles}
                    >
                        {stopButtonText}
                    </button>
                )}
                {isPaused && time > 0 && (
                    <button
                        onClick={handleResume}
                        className={`btn btn-resume ${buttonClassName}`}
                        style={customButtonStyles}
                    >
                        {resumeButtonText}
                    </button>
                )}
                <button
                    onClick={handleReset}
                    className={`btn btn-reset ${buttonClassName}`}
                    style={customButtonStyles}
                >
                    {resetButtonText}
                </button>
            </div>
        </div>
    );
};

Timer.propTypes = {
    maxSeconds: PropTypes.number,
    initialTime: PropTypes.number,
    onTimeEnd: PropTypes.func,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    startButtonText: PropTypes.string,
    stopButtonText: PropTypes.string,
    resetButtonText: PropTypes.string,
    resumeButtonText: PropTypes.string,
    inputPlaceholder: PropTypes.string,
    customStyles: PropTypes.object,
    customInputStyles: PropTypes.object,
    customButtonStyles: PropTypes.object
};

export default Timer;