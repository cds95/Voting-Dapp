import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./ActionableTextField.scss";

interface IActionTextFormProps {
  label: string;
  buttonLabel: string;
  onComplete: (text: string) => void;
}

export const ActionTextForm: React.FunctionComponent<IActionTextFormProps> = ({
  buttonLabel,
  label,
  onComplete,
}) => {
  const [text, setText] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);
  const handleOnComplete = () => onComplete(text);
  return (
    <form className="actionable-text-field">
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
