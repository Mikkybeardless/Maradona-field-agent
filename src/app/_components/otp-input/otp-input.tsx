"use client";

import React, { useState, ChangeEvent, KeyboardEvent } from "react";

interface OTPInputProps {
  length: number;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length }) => {
  const [inputs, setInputs] = useState<string[]>(Array(length).fill(""));

  const handleChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const newInputs = [...inputs];
      newInputs[index] = e.target.value;
      setInputs(newInputs);

      // Move focus to next input if the input is not empty and it's not the last input
      if (e.target.value && index < length - 1) {
        const nextInput = e.target.nextElementSibling as HTMLElement;
        nextInput.focus();
      }
    };

  const handleBackspace =
    (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !inputs[index] && index > 0) {
        // Move focus to previous input
        const previousInput = e.currentTarget
          .previousElementSibling as HTMLElement;
        previousInput.focus();
      }
    };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {inputs.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          onChange={handleChange(index)}
          onKeyDown={handleBackspace(index)}
          maxLength={1}
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "0.4rem",
            fontSize: "20px",
          }}
        />
      ))}
    </div>
  );
};
