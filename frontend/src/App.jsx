// IMPORT
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main, NotFound } from './pages';

// EXPORT
export default function App() {
  const [heightWidth, changeHeightWidth] = useState({ 
    height: (window.innerHeight / 2) * 2,
    width: (window.innerHeight / 2) * 3 
  })
  const clickSoundPlay = (audio) => {
    var sound = document.getElementById(audio);
    sound.play();
  }
  const resizeScreen = () => {
    changeHeightWidth({ 
      height: (window.innerHeight / 2) * 2,
      width: (window.innerHeight / 2) * 3 
    })
  }
  useEffect(() => {
    resizeScreen()
    window.addEventListener('resize', resizeScreen)
  }, [])
  return (
    <BrowserRouter>
      <audio id="click" src="/assets/click.wav"/>
      <audio id="bg" src="/assets/bgmusic-test.mp3"></audio>
      <Routes>
        <Route path="/" element={ <Main clickSoundPlay={ clickSoundPlay } height={ heightWidth.height } width={ heightWidth.width }/> }/>
        <Route path="*" element={ <NotFound/> }/>
      </Routes>
    </BrowserRouter>
  );
}
