import React from "react";
import styles from "./InlineLoader.module.scss";

type InlineLoaderProps = {
  message?: string;
};

export default function InlineLoader({
  message = "잠시만 기다려주십시오.",
}: InlineLoaderProps) {
  return (
    <section className={styles.container} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.message}>{message}</p>
    </section>
  );
}
