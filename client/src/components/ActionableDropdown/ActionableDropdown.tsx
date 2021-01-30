import React, { useState } from "react";
import "./ActionableDropdown.scss";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

interface IActionableDropdownProps {
  options: string[];
  onComplete: (value: string) => void;
  label: string;
  buttonLabel: string;
  className?: string;
}

export const ActionableDropdown: React.FunctionComponent<IActionableDropdownProps> = ({
  options,
  onComplete,
  label,
  buttonLabel,
  className,
}) => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) =>
    setValue(e.target.value as string);
  const handleOnBtnClick = () => onComplete(value);
  let containerClassName = "actionable-dropdown";
  if (className) {
    containerClassName += ` ${className}`;
  }
  return (
    <div className={containerClassName}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          value={value}
          onChange={handleChange}
          className="actionable-dropdown__dropdown"
        >
          {options.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleOnBtnClick}>
        {buttonLabel}
      </Button>
    </div>
  );
};
