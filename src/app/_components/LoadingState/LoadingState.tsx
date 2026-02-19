import styles from "./LoadingState.module.scss";

interface LoadingStateProps {
  label?: string;
}

export default function LoadingState({
  label = "페이지를 준비하고 있습니다",
}: LoadingStateProps) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <p className={styles.label}>{label}</p>
    </div>
  );
}
