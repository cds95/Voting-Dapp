import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./ActionableTextField.scss";

interface IActionTextFormProps {
  label: string;
  buttonLabel: string;
  onComplete: (text: string) => void;
  className?: string;
}

export const ActionTextForm: React.FunctionComponent<IActionTextFormProps> = ({
  buttonLabel,
  label,
  onComplete,
  className,
}) => {
  const [text, setText] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);
  const handleOnComplete = () => onComplete(text);
  let containerClassName = "actionable-text-field";
  if (className) {
    containerClassName += ` ${className}`;
  }
  return (
    <form className={containerClassName}>
      <TextField
        label={label}
        value={text}
        onChange={handleOnChange}
        className="actionable-text-field__field"
      />
      <Button
        onClick={handleOnComplete}
        variant="contained"
        color="primary"
        className="actionable-text-field__btn"
      >
        {buttonLabel}
      </Button>
    </form>
  );
};
