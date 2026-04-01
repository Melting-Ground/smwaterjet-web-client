"use client";
import React from "react";
import { EquipmentType } from "@/_types/equipment";
import { useLocalData } from "@/_hooks/useLocalData";
import GalleryLayout from "@/_layout/gallery/layout";
import styles from "./page.module.scss";

export default function Equipment() {
  // 장비
  const { data: equipments } = useLocalData<EquipmentType[]>("equipments");

  const galleryList = equipments
    ? equipments.map((equipment) => ({
      id: equipment.id,
      path: equipment.image,
      title: equipment.name,
      // path: `/equipment/${equipment.id}`,
    }))
    : [];
  return (
    <section className={styles.container}>
      <section className={styles.hero}>
        <div className={styles["hero-inner"]}>
          <p className={styles["section-eyebrow"]}>EQUIPMENT OVERVIEW</p>
          <p className={styles["section-title"]}>
            핵심 장비 보유 현황
          </p>
          <div className={styles["section-accent"]} aria-hidden="true" />
        </div>
      </section>
      <GalleryLayout
        list={galleryList}
        isLinkItem
        captionPosition="below"
        galleryMarginTop={0}
        galleryMarginBottom={32}
      />
      <section className={styles["composition-section"]}>
        <div className={styles["composition-inner"]}>
          <div className={styles["section-header"]}>
            <p className={styles["section-eyebrow"]}>EQUIPMENT SYSTEM</p>
            <h3 className={styles["section-title"]}>주요 장비 구성</h3>
            <div className={styles["section-accent"]} aria-hidden="true" />
            <p className={styles["section-summary"]}>
              고압수 생성부터 분사·제어·폐수 처리까지, 단일 시스템으로
              운용되는 작업 흐름을 설명합니다.
            </p>
          </div>
          <ol className={styles["pill-list"]}>
            <li>
              고압 펌프
              <span>high pressure pump</span>
            </li>
            <li>
              워터젯 분사 장비
              <span>water jet spray unit</span>
            </li>
            <li>
              유·무선 원격 컨트롤러
              <span>wire/wireless remote controller</span>
            </li>
            <li>
              폐수 처리 장비
              <span>effluent handling unit</span>
            </li>
          </ol>
          <div className={styles["detail-grid"]}>
            <article className={styles["detail-card"]}>
              <span className={styles.badge}>1</span>
              <div>
                <h4 className={styles["detail-title"]}>고압 펌프</h4>
                <p className={styles["detail-desc"]}>
                고압수를 안정적으로 생성해 절삭 성능을 확보합니다.<br />
                현장 조건에 맞춘 압력 제어로 작업 효율과 안전성을
                동시에 확보합니다.
              </p>
          </div>
        </article>
        <article className={styles["detail-card"]}>
          <span className={styles.badge}>2</span>
          <div>
            <h4 className={styles["detail-title"]}>워터젯 분사장치</h4>
            <p className={styles["detail-desc"]}>
              분사 각도와 방향을 정밀 제어해 절삭 범위를 결정합니다.<br />
              다양한 구조물 대응이 가능해 현장 적응력이 높습니다.
            </p>
          </div>
        </article>
        <article className={styles["detail-card"]}>
          <span className={styles.badge}>3</span>
          <div>
            <h4 className={styles["detail-title"]}>유·무선 원격 컨트롤러</h4>
            <p className={styles["detail-desc"]}>
              원거리에서 장비를 통합 제어해 작업 중 위험 노출을
              줄입니다.<br /> 작업자의 안전 확보와 작업 리듬 유지에
              기여합니다.
            </p>
          </div>
        </article>
        <article className={styles["detail-card"]}>
          <span className={styles.badge}>4</span>
          <div>
            <h4 className={styles["detail-title"]}>폐수 처리장치</h4>
            <p className={styles["detail-desc"]}>
              절삭 과정에서 발생하는 폐수를 분리·정화합니다.<br />
              환경 대응과 현장 정리 시간을 단축해 운영 효율을
              높입니다.
            </p>
          </div>
        </article>
      </div>
    </div>
      </section >
    </section >
  );
}
