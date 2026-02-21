import React from "react";
import styles from "../policy.module.scss";

export default function Email() {
  return (
    <section className={styles.tos}>
      <header className={styles["policy-hero"]}>
        <p className={styles["hero-kicker"]}>NO EMAIL SCRAPING</p>
        <h2>이메일무단수집거부</h2>
        <p className={styles["hero-summary"]}>
          이메일 무단 수집 및 광고성 메일 발송을 금지합니다.
        </p>
      </header>
      <article className={styles["policy-card"]}>
        <ul className={styles["quick-list"]}>
          <li>시행일: 2026년 2월 21일</li>
          <li>적용범위: 본 사이트에 게시된 이메일 주소</li>
          <li>문의: 고객센터 또는 문의사항 게시판</li>
        </ul>
        <div className={styles["terms-grid"]}>
          <section className={styles["term-block"]}>
            <p>
              본 사이트의 무차별적으로 보내지는 메일을 차단하기 위해 웹사이트에
              기재된 이메일을 무단 수집되는 것을 거부하며,
              <br />
              이를 위반시 정보통신망법에 의해 민형사처벌됩니다.
            </p>
          </section>
        </div>
      </article>
    </section>
  );
}
