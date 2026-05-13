import React, { useState } from 'react';
import './App.css';

function App() {

  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [culture, setCulture] = useState('');
  const [gestureResult, setGestureResult] = useState('');

  const startListening = () => {

    const recognition =
      new window.webkitSpeechRecognition();

    recognition.lang = 'en-US';

    recognition.onresult = (event) => {

      const speechText =
        event.results[0][0].transcript;

      setText(speechText);
    };

    recognition.start();
  };

  const translateText = async () => {

    const response = await fetch(
      'http://127.0.0.1:5000/translate',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          text: text,
          target: 'ta'
        })
      }
    );

    const data = await response.json();

    setTranslated(data.translated_text);

    setCulture(data.cultural_context);
  };

  const detectGesture = async (gesture) => {

    const response = await fetch(
      'http://127.0.0.1:5000/gesture',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          gesture: gesture
        })
      }
    );

    const data = await response.json();

    setGestureResult(data.meaning);
  };

  return (

    <div className="container">

      <h1>
        AR Language Immersion Translator
      </h1>

      <div className="glass-box">

        <h2>🎤 Voice Input</h2>

        <button onClick={startListening}>
          Start Speaking
        </button>

        <p>
          <strong>Recognized:</strong>
          {text}
        </p>

        <button onClick={translateText}>
          Translate
        </button>

      </div>

      <div className="glass-box subtitle-box">

        <h2>🕶 AR Subtitle Overlay</h2>

        <p className="subtitle">
          {translated}
        </p>

      </div>

      <div className="glass-box">

        <h2>🌍 Cultural Context</h2>

        <p>{culture}</p>

      </div>

      <div className="glass-box">

        <h2>✋ Gesture Translation</h2>

        <button
          onClick={() => detectGesture('thumbs_up')}
        >
          👍 Thumbs Up
        </button>

        <button
          onClick={() => detectGesture('wave')}
        >
          👋 Wave
        </button>

        <button
          onClick={() => detectGesture('clap')}
        >
          👏 Clap
        </button>

        <p>{gestureResult}</p>

      </div>

    </div>
  );
}

export default App;
