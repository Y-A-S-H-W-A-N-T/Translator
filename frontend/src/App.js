import './App.css';

import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'

function App() {


  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  if(!browserSupportsSpeechRecognition)return 'ERROR'

  const Speak = ()=>{
    SpeechRecognition.startListening()
  }

  return (
    <div>
        <div>
          {listening? 'on' : 'off'}
        </div>
        <div className='text'>
            {transcript}
          </div>
        <div className='mic'>
          <img src='microphone.png' alt='mic' height={50} width={50} onClick={Speak}/>
        </div>
        
    </div>
  )
}

export default App;
