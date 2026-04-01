import Image from "next/image";
import React from "react";
import { BadgeCheck, Droplet, Shield, Zap } from "lucide-react";
import styles from "./page.module.scss";

const reasons = [
  {
    icon: Droplet,
    title: "초고압 워터젯",
    description:
      "초고압 물줄기로 철근 손상 없이 콘크리트를 정밀하게 절단하고 제거합니다.",
  },
  {
    icon: Shield,
    title: "안전한 공법",
    description:
      "진동과 분진이 적어 환경 친화적이며, 작업자와 구조물의 안전을 함께 확보합니다.",
  },
  {
    icon: Zap,
    title: "신속한 시공",
    description:
      "기존 공법 대비 빠른 시공이 가능해 공사 기간을 단축하고 교통 통제를 줄일 수 있습니다.",
  },
  {
    icon: BadgeCheck,
    title: "검증된 품질",
    description:
      "다양한 특허·인증·시공 실적을 바탕으로 현장 맞춤형 고품질 시공을 제공합니다.",
  },
];

export default function Waterjet() {
  return (
    <div className={styles.container}>
      <h2 className={styles["sr-only"]}>워터젯(WaterJet) 공법</h2>

      <section className={styles["dark-section"]}>
        <div className={styles["inner-container"]}>
          <p className={styles.label}>
            워터젯(WaterJet) 공법은 물을 초고압·초고속 상태의 제트류로 만들어
            해체 대상 구조물에 분사함으로써 콘크리트의 세골 작용을 유도하고,
            콘크리트만 선택적으로 파쇄할 수 있는 혁신적인 공법입니다.
          </p>
        </div>
      </section>

      <section className={styles["inner-container"]}>
        <h3 className={styles["sub-title"]}>
          <em>철근 손상 없이</em> 취약부 제거,
          <br />
          <em>환경과 품질을 동시에</em> 잡는 <em>워터젯 공법</em>
        </h3>

        <div className={styles["image-content-container"]}>
          <Image
            src="/images/banner/waterjet.webp"
            width={500}
            height={330}
            alt="초고압 워터젯을 이용한 콘크리트 치핑 작업"
            className={styles.image}
            priority
          />
        </div>
      </section>

      <section className={styles["reason-section"]}>
        <div className={styles["reason-inner"]}>
          <header className={styles["reason-header"]}>
            <h4 className={styles["reason-title"]}>왜 워터젯 공법인가요?</h4>
            <p className={styles["reason-description"]}>
              초고압 워터젯 공법은 기존 공법의 한계를 보완하는 정밀한 시공 기술입니다.
            </p>
          </header>

          <ul className={styles["reason-grid"]}>
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <li key={reason.title} className={styles["reason-card"]}>
                  <span className={styles["reason-icon"]} aria-hidden="true">
                    <Icon size={24} />
                  </span>
                  <h5>{reason.title}</h5>
                  <p>{reason.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
