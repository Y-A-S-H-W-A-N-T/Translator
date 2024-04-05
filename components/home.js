import { useState, useEffect } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Home({ browserSupportsSpeechRecognition }) {
  const [translation, setTranslation] = useState('');
  const [language, setLanguage] = useState('');
  const [en, setEn] = useState('');
  const [sentence, setSentence] = useState('');

  const {
    transcript,
    listening,
  } = useSpeechRecognition();

  const StartSpeech = () => {
    const startListening = async () => {
      await SpeechRecognition.startListening();
    };
    startListening(); // Start listening when component mounts
  }

  const convert = async () => {
    setSentence(transcript);
    console.log(language)
    const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'd3a19c7887msh864b0e0b9056390p1e5a2djsn509fc8b630ba',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
      },
      body: new URLSearchParams({
        from: 'auto',
        to: language,
        text: sentence
      })
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setTranslation(result.trans);
    } catch (error) {
      console.error(error);
    }
  };

  const englishConversion = async () => {
    const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'd3a19c7887msh864b0e0b9056390p1e5a2djsn509fc8b630ba',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
      },
      body: new URLSearchParams({
        from: 'auto',
        to: 'en',
        text: sentence
      })
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setEn(result.trans);
    } catch (error) {
      console.error(error);
    }
  };

  const speech = (words) => {
    console.log(words);
    const toSpeak = new SpeechSynthesisUtterance(words);
    window.speechSynthesis.speak(toSpeak);
  };

  return (
    <div className='container'>
  <div className='text transcript'>
    <h1>{transcript}</h1>
  </div>
  <div className='mic' onClick={StartSpeech}>
    <img src='microphone.png' alt='mic' height={30} width={30} />
  </div>
  <div>
    <select className='language-dropdown' onChange={(e)=>setLanguage(e.target.value)}>
      <option value=''>None</option>
      <option value='hi'>Hindi</option>
      <option value='en'>English</option>
      <option value='te'>Telugu</option>
    </select>
  </div>
  {
    language &&
    <div className='text'>
      <button className='convert-button' onClick={convert}>Convert</button>
    </div>
  }
  <div className='text translation'>
    <h1>{translation}</h1>
  </div>
  {
    translation &&
    <div className='text'>
      <button className='convert-button english-conversion' onClick={englishConversion}>To English</button>
    </div>
  }
  {
    en &&
    <div className='text'>
      <h1>{en}</h1>
      <br />
      <button className='speech-button' onClick={() => speech(en)}>SPEECH</button>
    </div>
  }
</div>

  );
}

// Server-side rendering (SSR) to check browser support for speech recognition
export async function getServerSideProps(context) {
  return {
    props: {
      browserSupportsSpeechRecognition: SpeechRecognition.browserSupportsSpeechRecognition
    }
  };
}
