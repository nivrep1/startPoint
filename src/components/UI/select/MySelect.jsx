import React from "react";
import "./MySelect.scss";
const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
      className="slc"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option className="opt" disabled value="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
