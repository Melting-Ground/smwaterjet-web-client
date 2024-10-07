"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import { motion } from "framer-motion";

const historyData = [
  {
    year: "2022",
    events: [{ period: "2022.", description: "종합 건설 토목으로 변경" }],
  },
  {
    year: "2020",
    events: [
      { period: "2020.", description: "금속, 창호 건설업 등록" },
      { period: "2020.", description: "기업 부설 연구소 개설" },
    ],
  },
  {
    year: "2016",
    events: [
      { period: "2016. 04", description: "건설업등록(시설물 유지관리업)" },
      {
        period: "2016. 03",
        description: "(주)삼형건설 자본금 3억원으로 증자",
      },
    ],
  },
  {
    year: "2015",
    events: [{ period: "2015. 07", description: "(주)삼형건설 법인설립" }],
  },
  {
    year: "2010",
    events: [
      {
        period: "2010. 05",
        description: "미국 NRB사에서 파워팩 등 장비 구입",
      },
    ],
  },
  {
    year: "2005",
    events: [
      {
        period: "2005 ~ 현재",
        description: "Water Jet 공법공사 및 VIEW ROCK 공법공사 다수",
      },
    ],
  },
];

export default function History() {
  const [boxHeight, setBoxHeight] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<string | null>(null);
  const yearRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      // 스크롤 퍼센트
      const scrollProgress = Math.max(
        0,
        Math.min(1, -containerTop / (containerHeight - windowHeight))
      );
      const newHeight = scrollProgress * 100;
      setBoxHeight(newHeight);

      // 현재 스크롤 위치에 해당하는 li
      const threshold = windowHeight / 3; // 화면 1/3 지점을 기준으로 설정
      let closestYear: string | null = null;
      let closestDistance = Infinity;

      Object.entries(yearRefs.current).forEach(([year, li]) => {
        if (!li) return;
        const rect = li.getBoundingClientRect();
        const distance = Math.abs(rect.top - threshold);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestYear = year;
        }
      });

      if (closestYear !== currentYear) {
        setCurrentYear(closestYear);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentYear]);

  useEffect(() => {
    Object.entries(yearRefs.current).forEach(([year, li]) => {
      if (li) {
        if (year === currentYear) {
          li.style.setProperty("--border", "#e86a02");
          li.style.color = "#f5f5f5";
        } else {
          li.style.setProperty("--border", "");
          li.style.color = "#947C72";
        }
      }
    });
  }, [currentYear]);

  return (
    <div className={styles.container} ref={containerRef}>
      <ol className={styles.history}>
        <motion.div
          id="box"
          className={styles["history-line"]}
          style={{ height: `${boxHeight}%` }}
          initial={{ height: 0 }}
          animate={{ height: `${boxHeight}%` }}
          transition={{ duration: 0.3 }}
        />
        {historyData.map((item, index) => (
          <li
            key={index}
            data-year={item.year}
            ref={(el) => {
              if (el) {
                yearRefs.current[item.year] = el;
              }
            }}
          >
            {item.events.map((event, idx) => (
              <div key={idx}>
                <p className={styles.period}>{event.period}</p>
                <p>{event.description}</p>
              </div>
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
}
