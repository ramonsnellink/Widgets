import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Set up a seperate useEffect. This only runs once (thus the empty array).
  // This will set up a SEPERATE event listener for the body, and checks if the ref is clicked or not
  // If it is not clicked, set open to false (close the dropdown.)
  // We do this because otherwise the menu won't close if the user clicks anywhere on the screen to close.

  useEffect(() => {
    const onBodyClick = (event) => {
      //Check if the current ref contains the item that was clicked.
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener("click", onBodyClick);

    //Cleanup function. Remove the event listener if the element gets removed
    //Otherwise we get an error because ref can't be found.

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []); // empty array = only runs when the element is rendered

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }
    return (
      //onSelectedChange is calling setSelected that sets the "selected" state
      <div key={option.value} className="item" onClick={() => onSelectedChange(option)}>
        {option.label}
      </div>
    );
  });

  return (
    <div className="ui form" ref={ref}>
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => setOpen(!open)} //set open to the opposite of it's current value
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>{renderedOptions}</div>
        </div>
      </div>
    </div>
  );
};
export default Dropdown;
