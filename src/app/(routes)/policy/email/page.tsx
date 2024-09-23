import React from "react";
import styles from "../policy.module.scss";
export default function Email() {
  return (
    <section className={styles.email}>
      <h2>이메일무단수집거부</h2>
      <article>
        <p>
          본 사이트의 무차별적으로 보내지는 메일을 차단하기 위해 웹사이트에
          기재된 이메일을 무단 수집되는 것을 거부하며,
          <br />
          이를 위반시 정보통신망법에 의해 민형사처벌됩니다.
        </p>
      </article>
    </section>
  );
}
