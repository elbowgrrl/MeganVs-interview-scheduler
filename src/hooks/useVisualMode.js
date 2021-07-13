import { useState } from "react";

const useVisualMode = function (initial) {
  //set initial state
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    setHistory((previous) => {
      if (replace) {
        return [...previous.slice(-1), newMode];
      };

      return [...previous, newMode];
    });
  };
  
  const back = function () {
    if (history.length < 2) {
      return;
    };
    setHistory((previous) => {
      return [...previous.slice(0, previous.length - 1)];
    });
  };
  const mode = history.slice(-1)[0];

  return { mode, transition, back };
};

export default useVisualMode;
