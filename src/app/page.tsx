import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div>
          <h1 className={styles.title}>성문워터젯에서 함께합니다</h1>
          <p className={styles["sub-title"]}>
            초고압 워터젯 공법으로 혁신적인 공사를 제공합니다.
          </p>
          {/* <Link href="/business/waterjet" className={styles.button}>
            살펴보기
          </Link> */}
        </div>
        <img src="" className={styles.photo} />
      </section>

      <ul className={styles["list-container"]}>
        <li>
          {/* 서비스 소개 섹션 */}
          <section className={styles.section}>
            <h2 className={styles["sr-only"]}>서비스/사업 분야</h2>
            <p className={styles.label}>
              철근에 손상없이 콘크리트 해체 도로 보수공사, 교량의 상판 보수공사
              도로, 다리, 높은 주차 건물의 콘크리트 파쇄
            </p>
            {/* <ul className={styles.list}>
              <li>철근에 손상없이 콘크리트 해체</li>
              <li>도로 보수공사, 교량의 상판 보수공사</li>
              <li>도로, 다리, 높은 주차 건물의 콘크리트 파쇄</li>
            </ul> */}
            <Link href="/business/fields" className={styles.button}>
              더보기
            </Link>
          </section>
        </li>

        {/* 워터젯 공법 설명 섹션 */}
        <li>
          <section className={styles.section}>
            <h2>워터젯 공법이란?</h2>
            <p className={styles.label}>
              초고압, 초고속으로 만들어진 제트류를 콘크리트 구조물에 분사하는
              공법으로, 철근 손상 없이 구조물의 세굴을 통해 콘크리트 구조물의
              보수 또는 보강이 가능합니다.
            </p>
            <Link href="/business/waterjet" className={styles.button}>
              더보기
            </Link>
          </section>
        </li>

        {/* 실적 현황 섹션 */}
        <li>
          <section className={styles.section}>
            <h2>실적 현황</h2>
            <p className={styles.label}>
              최신 장비와 풍부한 노하우를 갖춘 우수 전문 인력으로 수행한 주요
              프로젝트들입니다.
            </p>
            <Link href="/performance/reports" className={styles.button}>
              더보기
            </Link>
          </section>
        </li>
      </ul>
      {/* 공지사항 노출 */}
      {/* TODO: carousel로 구현 */}
      <section>
        <h1>현장 사진</h1>
        <ul className={styles.carousel}>
          <li>
            <img src="" alt="" className={styles.photo} />
          </li>
          <li>
            <img src="" alt="" className={styles.photo} />
          </li>
          <li>
            <img src="" alt="" className={styles.photo} />
          </li>
          <li>
            <img src="" alt="" className={styles.photo} />
          </li>
          <li>
            <img src="" alt="" className={styles.photo} />
          </li>
        </ul>
      </section>

      <div className={styles["section-container"]}>
        <section>
          <h1>문의하기</h1>
          <div className={styles.inquiry}></div>
        </section>
        <section>
          <h1>공지사항</h1>
          <div className={styles.notice}></div>
        </section>
      </div>
      {/* 현장 사진 노출 */}
      {/* 문의하기  */}
    </div>
  );
}
