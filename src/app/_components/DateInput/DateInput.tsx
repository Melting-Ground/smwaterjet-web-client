import React from "react";
import styles from "./DateInput.module.scss";

interface DateInputProps {
  year: number;
  value?: string;
  id?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  fullWidth?: boolean;
}

export default function DateInput({
  year,
  value,
  id,
  className: customClassName,
  onChange,
  label,
  fullWidth,
}: DateInputProps) {
  const className = `${styles.input} ${customClassName} ${
    fullWidth ? styles["full-width"] : ""
  }`;

  return (
    <div className={styles.container}>
      {/* 레이블을 prop으로 받는 경우 기본적으로 숨김처리, 숨김처리 하지 않을 경우 외부에서 선언하기 */}
      {label && <label className={styles["sr-only"]}>{label}</label>}
      <input
        value={value}
        id={id}
        onChange={onChange}
        className={className}
        type="date"
        min={`${year}-01-01`}
        max={`${year}-12-31`}
        required
      />
    </div>
  );
}
