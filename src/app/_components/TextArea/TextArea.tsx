import React from "react";
import styles from "./textArea.module.scss";

interface TextAreaProps {
  value?: string;
  label?: string;
  error?: boolean;
  placeholder?: string;
  id?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  name?: string;
  message?: string;
  icon?: JSX.Element;
  // fullWidth?: boolean;
}

export default function TextArea({
  value,
  label,
  placeholder,
  id,
  className: customClassName,
  error = false,
  message,
  disabled = false,
  onChange = () => {},
  name,
  icon,
}: // fullWidth = false,
TextAreaProps) {
  const className = `${styles.textarea} ${
    error ? styles.error : null
  } ${customClassName}`;
  return (
    <div className={styles.container}>
      {/* 레이블을 prop으로 받는 경우 기본적으로 숨김처리, 숨김처리 하지 않을 경우 외부에서 선언하기 */}
      {label && <label className={styles["sr-only"]}>{label}</label>}
      <div className={styles["textarea-icon-container"]}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {/* 아이콘 추가 */}
        <textarea
          name={name}
          value={value}
          id={id}
          className={className}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
        />
      </div>
      {error && message && <p className={styles.errorMessage}>{message}</p>}{" "}
      {/* 에러 메시지 처리 */}
    </div>
  );
}
