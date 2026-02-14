import React from "react";
import styles from "./page.module.scss";
import { Droplet, Shield, Zap, BadgeCheck } from "lucide-react";

export default function Waterjet() {
  return (
    <div className={styles.container}>
      <section id="definition">
        <h2 className={styles["sr-only"]}>워터젯(WaterJet) 공법</h2>
        <div className={styles["dark-section"]}>
          <p className={styles.label}>
            <em>워터젯(WaterJet) 공법</em>이란 물을 초고압, 초고속 상태의
            제트류로 만들어
            <br />
            해체 대상 구조물에 분사함으로써 콘크리트의 세골작용을 일으켜
            <br />
            콘크리트만을 선택적으로 파쇄시킬 수 있는 혁신적인 공법입니다.
          </p>
        </div>

        <div className={styles["inner-container"]}>
          <h3 className={styles["sub-title"]}>
            <em>철근 손상 없이</em> 취약부 제거,
            <br />
            <em>환경과 품질을 동시에</em> 잡는 <em>워터젯 공법</em>
          </h3>
        </div>

        <section className={styles["reason-section"]} aria-labelledby="why-waterjet">
          <div className={styles["reason-inner"]}>
            <div className={styles["reason-header"]}>
              <h4 id="why-waterjet" className={styles["reason-title"]}>
                왜 워터젯 공법인가요?
              </h4>
              <p className={styles["reason-description"]}>
                초고압 워터젯 공법은 기존 공법의 한계를 뛰어넘는 혁신적인 기술입니다.
              </p>
            </div>

            <div className={styles["reason-grid"]}>
              <article className={styles["reason-card"]}>
                <div className={styles["reason-icon"]}>
                  <Droplet size={22} />
                </div>
                <h5>초고압 워터젯</h5>
                <p>
                  초고압 물줄기로 철근의 손상없이{" "}
                  <span className={styles.keyword}>콘크리트를 정밀하게 </span>
                  절단하고 제거합니다.
                </p>
              </article>

              <article className={styles["reason-card"]}>
                <div className={styles["reason-icon"]}>
                  <Shield size={22} />
                </div>
                <h5>안전한 공법</h5>
                <p>
                  진동과 분진이 적어{" "}
                  <span className={styles.keyword}>환경 친화적</span>이며,
                  작업자와 구조물의 안전을 보장합니다.
                </p>
              </article>

              <article className={styles["reason-card"]}>
                <div className={styles["reason-icon"]}>
                  <Zap size={22} />
                </div>
                <h5>신속한 시공</h5>
                <p>
                  기존 공법 대비 빠른 시공으로
                  <br />
                  <span className={styles.keyword}>공사 기간을 단축</span>합니다.
                </p>
              </article>

              <article className={styles["reason-card"]}>
                <div className={styles["reason-icon"]}>
                  <BadgeCheck size={22} />
                </div>
                <h5>품질 보증</h5>
                <p>
                  다양한 특허, 인증서 획득 및 실적으로
                  <br />
                  <span className={styles.keyword}>검증된 품질</span>을 제공합니다.
                </p>
              </article>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
