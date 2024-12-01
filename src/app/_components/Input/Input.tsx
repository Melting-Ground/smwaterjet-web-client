import React from "react";
import styles from "./Input.module.scss";

interface InputProps {
  value?: string;
  checked?: boolean;
  label?: string;
  error?: boolean;
  placeholder?: string;
  id?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
  name?: string;
  message?: string;
  icon?: JSX.Element;
  iconPosition?: "left" | "inner-right";
  fullWidth?: boolean;
  multiple?: boolean;
  required: boolean;
}

export default function Input({
  value,
  checked,
  label,
  placeholder,
  id,
  className: customClassName,
  error = false,
  message,
  disabled = false,
  onChange = () => {},
  type = "text",
  name,
  icon,
  iconPosition = "left",
  fullWidth = false,
  multiple = false,
  required = false,
}: InputProps) {
  const className = `${styles.input} ${
    error ? styles.error : ""
  } ${customClassName} ${fullWidth ? styles["full-width"] : ""}`;

  return (
    <div
      className={`${styles.container} ${fullWidth ? styles["full-width"] : ""}`}
    >
      {/* 레이블을 prop으로 받는 경우 기본적으로 숨김처리, 숨김처리 하지 않을 경우 외부에서 선언하기 */}
      {label && <label className={styles["sr-only"]}>{label}</label>}
      {icon && iconPosition === "left" && (
        <span className={styles.icon}>{icon}</span>
      )}
      {/* 아이콘 추가 */}
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        id={id}
        className={className}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        multiple={multiple}
        required={required}
      />
      {icon && iconPosition === "inner-right" && (
        <span className={styles["inner-right-icon"]}>{icon}</span>
      )}
      {error && message && <p className={styles.errorMessage}>{message}</p>}
      {/* 에러 메시지 처리 */}
    </div>
  );
}
