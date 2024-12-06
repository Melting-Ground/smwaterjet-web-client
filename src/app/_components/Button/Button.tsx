import React, { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  id?: string;
  type?: "button" | "submit" | "reset";
  color?:
    | "primary"
    | "primary-border"
    | "transparent-link"
    | "transparent"
    | "blue"
    | "red"
    | "icon";
  disabled?: boolean;
  className?: string;
  value?: string;
  icon?: JSX.Element;
  fullWidth?: boolean;
}

export default function Button({
  onClick,
  children,
  id,
  type = "button",
  color,
  disabled = false,
  className: customClassName,
  value,
  icon,
  fullWidth,
}: ButtonProps) {
  const className = `${styles.button} ${
    color ? styles[color] : ""
  } ${customClassName} ${fullWidth ? styles["full-width"] : ""}`;

  return (
    <button
      id={id}
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      value={value}
    >
      {children}
      {icon}
    </button>
  );
}
