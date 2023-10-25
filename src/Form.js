import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, toggleItem, resetItems } from "./itemsSlice";
import "./App.css";
import Stats from "./Stats";


function Form() {
  const [inputValue, setInputValue] = useState("");
  const [showDone, setShowDone] = useState(false);
  const [showNotDone, setShowNotDone] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  const handleDelete = (index) => {
    dispatch(removeItem(index));
  };

  const toggleItemChecked = (index) => {
    dispatch(toggleItem(index));
  };

  const handleReset = () => {
    dispatch(resetItems());
    setShowDone(false);
    setShowNotDone(false);
  };

  const handleTabClick = (tab) => {
    setShowDone(tab === "Done");
    setShowNotDone(tab === "Not Done");
  };

  return (
    <>
      <div className="container">
        {items.length > 0 && (
          <div className="tab-buttons">
            <button
              className={`my-button ${showDone ? "active" : ""}`}
              onClick={() => handleTabClick("Done")}
            >
              Done
            </button>
            <button
              className={`my-button ${showNotDone ? "active" : ""}`}
              onClick={() => handleTabClick("Not Done")}
            >
              Not Done
            </button>
            <button
              className={`my-button ${!showDone && !showNotDone ? "active" : ""}
              `}
              onClick={() => handleTabClick("All")}
            >
              Show All
            </button>
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputValue === "") return;
              dispatch(addItem({ value: inputValue, checked: false }));
              setInputValue("");
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          {items.map((item, index) => (
            <div key={index}>
              {(showDone && item.checked) ||
              (showNotDone && !item.checked) ||
              (!showDone && !showNotDone) ? (
                <ul>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={item.checked}
                      onChange={() => toggleItemChecked(index)}
                    />
                  </label>
                  <span className={item.checked ? "completed" : "notCompleted"}>
                    {item.value}
                  </span>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                  >
                    X
                  </button>
                </ul>
              ) : null}
            </div>
          ))}
        </div>
        <Stats items={items} />
      </div>

    </>
  );
}

export default Form;
