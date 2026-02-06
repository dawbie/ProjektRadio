import React, { useState, useRef, useEffect } from 'react';

const stations = {
  Antyradio: 'https://an01.cdn.eurozet.pl/ant-waw.mp3',
  RMF_FM: 'https://rs102-krk.rmfstream.pl/rmf_fm',
  Radio_ZET: 'https://r.zetcdn.pl/zet.mp3',
  Chillizet: 'https://ch01.cdn.eurozet.pl/chi-waw.mp3',
  Radio357: 'https://stream.radio357.pl/'
};

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentStation, setCurrentStation] = useState(Object.keys(stations)[0]);
  const audioRef = useRef(new Audio(stations[currentStation]));

  // Obsługa zmiany stacji
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current.src = stations[currentStation];
    audioRef.current.load();
    
    if (isPlaying) {
      audioRef.current.play().catch(err => console.error("Błąd odtwarzania:", err));
    }
  }, [currentStation]);

  // Obsługa głośności
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlayPause = () => {
  if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  } else {
    // Ważne: play() w przeglądarce zwraca Promise
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(err => {
        console.error("Błąd odtwarzania:", err);
        alert("Nie można uruchomić tego strumienia. Spróbuj innej stacji.");
        setIsPlaying(false);
      });
  }
};

  return (
    <div className="radio-player">
      <h2>Odtwarzacz Radiowy</h2>
      <select value={currentStation} onChange={(e) => setCurrentStation(e.target.value)}>
        {Object.keys(stations).map((station) => (
          <option key={station} value={station}>{station.replace('_', ' ')}</option>
        ))}
      </select>
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pauza' : 'Odtwórz'}
      </button>
      <div>
        <label>Głośność: </label>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} />
      </div>
    </div>
  );
};

export default RadioPlayer;