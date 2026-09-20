import { CircleAlert, Inbox, RotateCcw } from "lucide-react";
import styles from "./AsyncState.module.scss";

type AsyncStatus = "loading" | "error" | "empty";

interface AsyncStateProps {
  status: AsyncStatus;
  message?: string;
  onRetry?: () => void;
  compact?: boolean;
}

const defaultMessages: Record<AsyncStatus, string> = {
  loading: "잠시만 기다려 주세요.",
  error: "정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
  empty: "등록된 내용이 없습니다.",
};

export default function AsyncState({
  status,
  message = defaultMessages[status],
  onRetry,
  compact = false,
}: AsyncStateProps) {
  return (
    <section
      className={`${styles.container} ${compact ? styles.compact : ""}`}
      role={status === "error" ? "alert" : "status"}
      aria-live="polite"
    >
      {status === "loading" ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : status === "error" ? (
        <CircleAlert className={styles.icon} aria-hidden="true" />
      ) : (
        <Inbox className={styles.icon} aria-hidden="true" />
      )}
      <p>{message}</p>
      {status === "error" && onRetry ? (
        <button type="button" className={styles.retry} onClick={onRetry}>
          <RotateCcw size={18} aria-hidden="true" />
          다시 시도
        </button>
      ) : null}
    </section>
  );
}
