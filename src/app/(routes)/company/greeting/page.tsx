import React from "react";
import styles from "./page.module.scss";

export default function Greeting() {
  return (
    <div className={styles.container}>
      <section>
        <div className={styles["inner-container"]}>
          <h3 className={styles["title"]}>
            <em>
              믿음과 서비스를
              <br />
              최우선
            </em>
            으로 합니다.
          </h3>
          <div className={styles.content}>
            <p className={styles.label}>
              안녕하세요.
              <br />
              <em>성문워터젯</em> 홈페이지에 방문해주신 고객 여러분께 감사의
              말씀드립니다.
            </p>
            <p>
              저희 성문워터젯에서는 초고압, 초고속 워터젯을 이용하여
              <br />
              철근에 손상 없는 콘크리트 해체, 도로 보수공사, 교량의 상판
              보수공사,
              <br />
              도로, 다리, 높은 주차건물의 콘크리트 부분/전체 파쇄 등 다양한
              일처리를 도와드리고 있습니다.
            </p>
            <p>
              성문워터젯에서는 안전감/편리함/작업능률의 극대화를 위해 항상
              노력을 기울이고 있습니다.
              <br />
              안전작업을 최우선으로 합리적인 가격에 작업하고 있으며,
              A/S(사후관리) 또한 철저하게 관리, 감독하고 있습니다.
            </p>
            <p>
              확실한 일처리, 다년간의 노하우, 철저한 사후관리로 항상 고객님께
              최고의 서비스를 제공해드릴 것을 약속드립니다.
              <br />
              고객님의 작은 목소리에도 귀 기울이는 성문워터젯이 되겠습니다.
            </p>
            <p>앞으로도 성문워터젯에 많은 관심과 성원 부탁드리겠습니다.</p>
            <p className={styles.label}>감사합니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
