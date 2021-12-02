import { useEffect, useState } from "react";
import '../styles/timer.scss'

export function Timer () {
  
  const [ selectedTimer, setSelectedTimer ] = useState(1);
  const [ paused , pauseTimer ] = useState(true);
  const [ change, changeNow ] = useState(false);
  const [ min, setMin ] = useState(25);
  const [ sec, setSec ] = useState(0);
  
  function handleSetTimeTo (selected) {
    
    setSelectedTimer(selected);
    
    if (selected === 1) setMin(25);
    if (selected === 2) setMin(5);
    if (selected === 3) setMin(15);
  }
  
  const displayMinutes = min > 9 ? min : `0${min}`
  const displaySeconds = sec > 9 ? sec : `0${sec}`

  const setTimerType = (type) => {
    if (selectedTimer !== type) {
      if (paused || window.confirm('Você deseja mesmo cancelar o timer?')) {
        pauseTimer(true);
        changeNow(true);
        handleSetTimeTo(type);
      }}
    }
  
  useEffect(()=>{
    console.log('teste')
    if (!paused) {
      document.title = `${displayMinutes}:${displaySeconds} - Don't stop!`
      var interval = setInterval( ()=>{
        if (sec === 0) {
          if (min === 0) {
            pauseTimer(true);
            clearInterval(interval);
            return;
          }
          setSec(59);
          setMin(min-1);
        } else {
          setSec(sec-1);
        }  
      }, 1000);
    } else {
      if (change) {
        setSec(0);
        changeNow(false);
      }
    }    

    return () => {
      clearInterval(interval);
    }
  // eslint-disable-next-line
  }, [paused, min, sec]);
  
  return (
    <main>
      <div className="container">
        <div className="buttons">
          <button 
            id="pomodoroBtn" className={`btn ${selectedTimer === 1 && 'selected'}`}
            onClick={ () => setTimerType(1) }>
            Pomodoro
          </button>
          <button 
            id="shortBreackBtn" className={`btn ${selectedTimer === 2 && 'selected'}`}
            onClick={ () => setTimerType(2) }>
            Short break
          </button>
          <button 
            id="longBreakBtn" className={`btn ${selectedTimer === 3 && 'selected'}`}
            onClick={ () => setTimerType(3) }>
            Long break
          </button> 
        </div>

        <div className="timer">
          <h3>{displayMinutes}:{displaySeconds}</h3>
          <button onClick={ () => pauseTimer(!paused) }>{ paused ? 'START' : 'STOP' }</button>
        </div>

      </div>

    </main>
  )
}