import { useState } from "react";

const useVisualMode = function (initial) {
//set initial state
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    setHistory((previous) => {
      if(replace) {
       const newHistory = [...previous]
        newHistory.pop();
        newHistory.push(newMode)
        return newHistory;
      }
    return[...previous, newMode]
    });
  };
  const back = function () {
    if(history.length < 2) {
      return
    }
    setHistory((previous) => {
      const newHistory = [...previous];
      newHistory.pop();
      return [...previous.slice(0, previous.length - 1)];
    });
  };
  const mode = history.slice(-1)[0];
  return { mode, transition, back };
};
export default useVisualMode;

