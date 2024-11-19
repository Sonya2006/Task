import React from 'react';
import Timer from './components/Timer/Timer';
import './App.css';

const App = () => {
  const handleTimeEnd = () => {
    alert('Час вийшов!');
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Таймер</h1>
        <Timer 
          maxSeconds={7200} 
          initialTime={0}
          onTimeEnd={handleTimeEnd}
          startButtonText="Почати"
          stopButtonText="Пауза"
          resetButtonText="Скинути"
          inputPlaceholder="Введіть час в секундах"
          customStyles={{
            backgroundColor: '#ffffff',
            padding: '1.5rem',
            borderRadius: '12px'
          }}
        />
      </div>
    </div>
  );
};

export default App;