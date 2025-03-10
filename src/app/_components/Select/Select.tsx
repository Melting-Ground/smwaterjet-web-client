import React from "react";
import styles from "./Select.module.scss";

interface SelectProps {
  selectList: (number | string)[];
  initialValue?: number | string;
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
        value={value ?? initialValue}
      >
        <option value="" className={styles.option}>
          {placeholder}
        </option>
        {selectList.map((year) => (
          <option key={year} value={year} className={styles.option}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
