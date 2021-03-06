import React from "react";

const Error = function (props) {
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        className="appointment__error-close"
        //the function called with this onClick is often the transition() function from useVisualMode
        onClick={props.onClose}
        src="images/close.png"
        alt="Close"
      />
    </main>
  );
};

export default Error;
