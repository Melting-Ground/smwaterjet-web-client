import React from "react";
import styles from "../policy.module.scss";

const termsSections = [
  {
    title: "제1조 (목적)",
    content:
      "본 약관은 에스엠워터젯(이하 '회사')이 제공하는 서비스의 이용 조건, 절차, 회사와 이용자의 권리 및 의무를 규정하는 것을 목적으로 합니다.",
  },
  {
    title: "제2조 (약관의 효력 및 변경)",
    list: [
      "본 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다.",
      "회사는 관련 법령을 위반하지 않는 범위에서 약관을 개정할 수 있으며, 변경 내용은 적용일자와 함께 사전 공지합니다.",
      "이용자가 변경된 약관 적용일 이후 서비스를 계속 이용하는 경우 변경사항에 동의한 것으로 봅니다.",
    ],
  },
  {
    title: "제3조 (서비스의 제공 및 변경)",
    list: [
      "회사는 운영상 또는 기술상 필요에 따라 서비스의 전부 또는 일부를 변경할 수 있습니다.",
      "중대한 변경이 있는 경우 회사는 사전에 공지하며, 서비스의 중단이 필요한 경우 지체 없이 안내합니다.",
    ],
  },
  {
    title: "제4조 (이용자의 의무)",
    list: [
      "이용자는 관련 법령, 본 약관, 공지사항을 준수하여야 합니다.",
      "타인의 권리를 침해하거나 서비스 운영을 방해하는 행위를 해서는 안 됩니다.",
      "허위 정보 등록, 무단 광고, 악성 코드 유포 등 부정 이용 행위는 금지됩니다.",
    ],
  },
  {
    title: "제5조 (회사의 책임 제한)",
    list: [
      "회사는 천재지변, 불가항력, 이용자 귀책사유로 인한 서비스 장애에 대해 책임을 지지 않습니다.",
      "회사는 이용자 간 또는 이용자와 제3자 사이에서 발생한 분쟁에 개입하지 않으며, 관련 책임을 부담하지 않습니다.",
    ],
  },
  {
    title: "제6조 (준거법 및 관할)",
    content:
      "본 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련하여 발생한 분쟁은 관련 법령에 따른 관할 법원을 제1심 법원으로 합니다.",
  },
];

export default function Tos() {
  return (
    <section className={styles.tos}>
      <header className={styles["policy-hero"]}>
        <p className={styles["hero-kicker"]}>TERMS OF SERVICE</p>
        <h2>이용약관</h2>
        <p className={styles["hero-summary"]}>
          서비스 이용과 관련된 기본 원칙, 이용자 권리, 책임 범위를 안내합니다.
        </p>
      </header>

      <article className={styles["policy-card"]}>
        <ul className={styles["quick-list"]}>
          <li>시행일: 2026년 2월 21일</li>
          <li>적용범위: 홈페이지 및 관련 온라인 서비스</li>
          <li>문의: 고객센터 또는 문의사항 게시판</li>
        </ul>

        <div className={styles["terms-grid"]}>
          {termsSections.map((section) => (
            <section key={section.title} className={styles["term-block"]}>
              <h3>{section.title}</h3>
              {section.content ? <p>{section.content}</p> : null}
              {section.list ? (
                <ol>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </section>
  );
}
