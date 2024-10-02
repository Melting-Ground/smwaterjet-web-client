"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
export default function History() {
  const [boxHeight, setBoxHeight] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      const scrollRatio = scrollPosition / (documentHeight - windowHeight);

      const newHeight = scrollRatio * 100;
      setBoxHeight(newHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <ol className={styles.history}>
          <div
            id="box"
            className={styles["history-line"]}
            style={{ height: `${boxHeight}%` }}
          />

          <li data-year="2005 ~ 현재">
            <p>2005 ~ 현재</p>
            <p>Water Jet 공법공사 및 VIEW ROCK 공법공사 다수</p>
          </li>
          <li data-year="2010">
            <p>2010. 05</p>
            <p>미국 NRB사에서 파워팩 등 장비 구입</p>
          </li>
          <li data-year="2015">
            <p>2015. 07</p>
            <p>(주)삼형건설 법인설립</p>
          </li>
          <li data-year="2016">
            <p>2016. 03</p>
            <p>(주)삼형건설 자본금 3억원으로 증자</p>
          </li>
          <li data-year="2016">
            <p>2016. 04</p>
            <p>건설업등록(시설물 유지관리업)</p>
          </li>
          <li data-year="2020">
            <p>2020. </p>
            <p>금속, 창호 건설업 등록</p>
          </li>
          <li data-year="2020">
            <p>2020. </p>
            <p>기업 부설 연구소 개설</p>
          </li>
          <li data-year="2022">
            <p>2022. </p>
            <p>종합 건설 토목으로 변경</p>
          </li>
        </ol>
      </div>
    </>
  );
}
