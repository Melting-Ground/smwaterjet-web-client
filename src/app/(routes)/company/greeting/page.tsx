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
              성문워터젯은 초고압·초고속 워터젯 공법을 기반으로
              <br />              구조물 손상 없이 안전한 콘크리트 해체를 수행하는 전문 시공업체입니다.
            </p>

            <p>
              성문워터젯은 초고압·초고속 워터젯 공법을 적용하여 철근 손상 없이
              정밀한 콘크리트 해체가 가능하며,
              <br />
              도로 및 교량 상판 보수, 콘크리트 치핑, 부분·전체 파쇄 등 다양한
              현장 조건에 맞춘 시공을 수행하고 있습니다.
            </p>

            <p>
              모든 공정에서 작업자 및 구조물 안전을 최우선 기준으로 적용하며,
              <br />
              현장별 시공 계획과 공정 관리를 통해 불필요한 리스크를
              최소화하고 있습니다.
              <br />
              또한 시공 이후에도 사후관리 및 품질 점검을 통해 책임 있는 시공이
              이루어지도록 관리하고 있습니다.
            </p>
              축적된 시공 경험과 철저한 품질 관리로 고객에게 신뢰받는 파트너가
              되겠습니다.
            <p>앞으로도 성문워터젯에 많은 관심과 성원 부탁드립니다.</p>

            <p className={styles.label}>감사합니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
