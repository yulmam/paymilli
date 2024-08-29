import React, { useState } from "react";

interface DropDownProps {
  label?: string;
  list: string[];
  selected: string;
  dropDownPlaceHolder?: string;
  handleSelectedChange: (type: string, selected: string) => void;
  description?: string;
  disabled?: boolean;
  type: string;
}

export default function DropDownCommon({
  label,
  list,
  selected,
  dropDownPlaceHolder,
  handleSelectedChange,
  description,
  disabled = false,
  type,
}: DropDownProps): JSX.Element {
  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = (): void => {
    if (!disabled) {
      setIsActive(!isActive);
    }
  };

  const handleSelect = (type: string, item: string): void => {
    handleSelectedChange(type, item);
    setIsActive(false);
  };

  return (
    <div className="container">
      {label && (
        <label className={`dropdown-label ${disabled ? "disabled" : ""}`}>
          {label}
        </label>
      )}
      <div className="dropdown-container">
        <div
          className={`dropdown-body ${isActive ? "active" : ""} ${
            disabled ? "disabled" : ""
          }`}
          onClick={toggleDropdown}
        >
          <div className={`dropdown-selected ${disabled ? "disabled" : ""}`}>
            {selected || dropDownPlaceHolder || "Select an item"}
          </div>
          <div className={`dropdown-selected ${disabled ? "" : "active"}`}>
            {isActive ? "▲" : "▼"}
          </div>
        </div>

        <div className={`dropdown-menu-container ${isActive ? "active" : ""}`}>
          {list.map((item) => (
            <div
              key={item}
              className={`dropdown-item-container ${
                item === selected ? "selected" : ""
              }`}
              onClick={(): void => {
                handleSelect(type, item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {description && <div className="description">{description}</div>}
    </div>
  );
}
