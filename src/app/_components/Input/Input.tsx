import React from "react";
import styles from "./input.module.scss";

interface InputProps {
  value?: string;
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
  fullWidth?: boolean;
  multiple?: boolean;
}

export default function Input({
  value,
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
  fullWidth = false,
  multiple = false,
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
      {icon && <span className={styles.icon}>{icon}</span>}
      {/* 아이콘 추가 */}
      <input
        type={type}
        name={name}
        value={value}
        id={id}
        className={className}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        multiple={multiple}
      />
      {error && message && <p className={styles.errorMessage}>{message}</p>}
      {/* 에러 메시지 처리 */}
    </div>
  );
}
