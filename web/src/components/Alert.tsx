import React from "react";
import styled from "@emotion/styled";

const StyledAlert = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1c1c1c;
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  width: 300px;
  text-align: center;

  h3 {
    margin-bottom: 5px;
  }

  button {
    margin: 0 5px;
    padding: 10px 20px;
    background-color: #ff4757;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ff6b81;
    }
  }

  .cancel-button {
    background-color: #ccc;
    color: #333;

    &:hover {
      background-color: #bbb;
    }
  }
`;

interface AlertProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Alert: React.FC<AlertProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel",
}) => {
  return (
    <StyledAlert>
      <h3>{title}</h3>
      <p>{message}</p>
      <button onClick={onConfirm}>{confirmText}</button>
      <button className="cancel-button" onClick={onCancel}>
        {cancelText}
      </button>
    </StyledAlert>
  );
};

export default Alert;
