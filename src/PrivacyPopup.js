import React, { useState, useEffect } from 'react';
import './PrivacyPopup.css';

const PrivacyPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("privacyAccepted");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const acceptPolicy = () => {
    localStorage.setItem("privacyAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="privacy-popup">
      <div className="privacy-box">
        <h3>Polityka Prywatności i Cookies</h3>
        <p>
          Ta strona wykorzystuje geolokalizację oraz pliki cookie w celu poprawy działania aplikacji.
          Korzystając z serwisu, wyrażasz zgodę na przetwarzanie danych zgodnie z polityką prywatności.
        </p>

        <a href="/polityka-prywatnosci.pdf" target="_blank" rel="noopener noreferrer">
          Przeczytaj pełną politykę prywatności
        </a>

        <button onClick={acceptPolicy}>Akceptuję</button>
      </div>
    </div>
  );
};

export default PrivacyPopup;