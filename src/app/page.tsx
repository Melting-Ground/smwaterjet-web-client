import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <h3>성문워터젯에서 함께합니다</h3>
      <ul>
        <li>철근에 손상없이 콘크리트 해체</li>
        <li>도로 보수공사, 교량의 상판 보수공사</li>
        <li>도로, 다리, 높은 주차 건물의 콘크리트 부분/전체 파쇄</li>
      </ul>
    </div>
  );
}
