import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // change the application view to the given parameter and update the history state to include it
  const transition = (change, replace = false) => {
    setMode(change);
    if (!replace) {
      setHistory(prev => ([...prev, change]));
      return;
    }
    // setHistory(history)
    setHistory(prev => {
      prev.pop();
      return [...prev, change]
    });
    // console.log(history);
  };

  // change the application view to second last view in the history state
  const back = () => {
    if (history.length === 1){
      return;
    }
    history.pop()
    setMode(history[history.length - 1]);
  };

  return { mode, transition, back, history};
}