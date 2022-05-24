import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

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

  const back = () => {
    if (history.length === 1){
      return;
    }
    history.pop()
    setMode(history[history.length - 1]);
  };

  return { mode, transition, back, history};
}