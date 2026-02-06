import React, { useEffect, useState } from 'react';
import RadioPlayer from './RadioPlayer';
import PrivacyPopup from './PrivacyPopup';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [browserInfo, setBrowserInfo] = useState(null);

  useEffect(() => {
    // Pobieranie geolokalizacji z obsługą błędów
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(pos.coords);
          setLocationError(null);
        },
        (err) => {
          let message = "Nie udało się pobrać lokalizacji.";
          if (err.code === 1) message = "Odmówiono dostępu do lokalizacji.";
          if (err.code === 3) message = "Przekroczono czas oczekiwania.";
          
          setLocationError(message);
          console.warn("Geolokalizacja:", message);
        },
        { timeout: 10000 }
      );
    } else {
      setLocationError("Twoja przeglądarka nie wspiera geolokalizacji.");
    }

    // Pobieranie informacji o przeglądarce
    setBrowserInfo({
      appName: navigator.appName,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
    });
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Radio Internetowe</h1>
      </header>

      <main className="main-content">
        <RadioPlayer />

        <hr style={{ width: '100%', margin: '20px 0', borderColor: '#333' }} />

        <section className="info-section">
          {location && (
            <div className="location-box">
              <h3>Twoja lokalizacja:</h3>
              <p>Szerokość: <strong>{location.latitude.toFixed(4)}</strong></p>
              <p>Długość: <strong>{location.longitude.toFixed(4)}</strong></p>
            </div>
          )}

          {locationError && (
            <div className="error-box" style={{ color: '#ff6b6b' }}>
              <p>{locationError}</p>
            </div>
          )}

          {browserInfo && (
            <div className="browser-info">
              <h3>Informacje o systemie:</h3>
              <p><strong>System:</strong> {browserInfo.platform}</p>
              <p><strong>Przeglądarka:</strong> {browserInfo.appName}</p>
              <small style={{ opacity: 0.6 }}>{browserInfo.userAgent}</small>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Radio Internetowe. Wszelkie prawa zastrzeżone.</p>
      </footer>

      <PrivacyPopup />
    </div>
  );
}

export default App;