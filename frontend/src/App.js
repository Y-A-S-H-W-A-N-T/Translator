import './App.css'
import { useState } from 'react'

import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'

function App() {

  const [transalation,setTranslation] = useState()
  const [language,setLanguage] = useState('te')
  const [en,setEn] = useState()
  const [sentence,setSentence] = useState()

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  if(!browserSupportsSpeechRecognition)return 'ERROR'

  const Speak = async()=>{
    await SpeechRecognition.startListening()
  }


  const Convert = async()=>{
    setSentence(transcript)
    const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'd3a19c7887msh864b0e0b9056390p1e5a2djsn509fc8b630ba',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
      },
      body: new URLSearchParams({
        from: 'auto',
        to: language,
        text: sentence
      })
    }
    try {
      const response = await fetch(url, options) // actual conversion
      const result = await response.json()
      setTranslation(result.trans)      
    } catch (error) {
      console.error(error)
    }
  }
  const English_Conversion = async()=>{
    const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'd3a19c7887msh864b0e0b9056390p1e5a2djsn509fc8b630ba',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
      },
      body: new URLSearchParams({
        from: 'auto',
        to: 'en',
        text: sentence
      })
    }
    try {
      const response = await fetch(url, options) // for converting response to English
      const result = await response.json()
      setEn(result.trans)
    } catch (error) {
      console.error(error)
    }
  }

  const Speech = (words)=>{
    console.log(words)
    const to_speak = new SpeechSynthesisUtterance(words)
    window.speechSynthesis.speak(to_speak)
  }

  return (
    <div>
        <div>
          {listening? 'on' : 'off'}
        </div>
        <div className='text'>
            <h1>{transcript}</h1>
          </div>
        <div className='mic'>
          <img src='microphone.png' alt='mic' height={50} width={50} onClick={Speak}/>
        </div>
        <div className='text'>
          <button onClick={Convert}>Convert</button>
        </div>
        <div className='text'>
            <h1>{transalation}</h1>
        </div>
        <div className='text'>
          <button onClick={English_Conversion}>To English</button>
        </div>
        <div className='text'>
            <h1>{en}</h1><br/><button onClick={()=>Speech(en)}>SPEECH</button>
        </div>
        
    </div>
  )
}

export default App;
