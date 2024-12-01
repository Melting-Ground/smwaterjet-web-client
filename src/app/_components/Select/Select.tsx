import React from "react";
import styles from "./Select.module.scss";

interface SelectProps {
  selectList: number[];
  initialValue: number;
  placeholder: string;
  value?: string;
  id?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  //   label?: string;
  fullWidth?: boolean;
}

export default function Select({
  selectList,
  initialValue,
  placeholder,
  value,
  id,
  className: customClassName,
  onChange,
  //   label,
  fullWidth,
}: SelectProps) {
  const className = `${styles.select} ${customClassName} ${
    fullWidth ? styles["full-width"] : ""
  }`;

  return (
    <div className={styles.container}>
      <select
        id={id}
        onChange={onChange}
        className={className}
        defaultValue={2024}
      >
        <option value={value}>{placeholder}</option>
        {selectList.map((year) => (
          <option key={year} value={year} selected={year === initialValue}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
