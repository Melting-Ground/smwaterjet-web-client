"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";

const historyData = [
  {
    year: "2022",
    events: [{ period: "2022.", description: "종합건설 토목업으로 변경" }],
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
        description: "Water Jet 공법 및 VIEW ROCK 공법 공사 다수 수행",
      },
    ],
  },
];

export default function History() {
  const [lineHeight, setLineHeight] = useState<number>(0);
  const [lineTop, setLineTop] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<string | null>(null);
  const yearRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const listEl = listRef.current;
      if (!listEl) return;
      const listHeight = listEl.offsetHeight;
      const windowHeight = window.innerHeight;

      const threshold = windowHeight / 3;
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

      if (closestYear && yearRefs.current[closestYear]) {
        const markerCenterOffset = 60;
        const activeEl = yearRefs.current[closestYear];
        if (!activeEl) return;
        const activeOffset = activeEl.offsetTop + markerCenterOffset;
        const lastYear = historyData[historyData.length - 1]?.year;
        const isLast = lastYear === closestYear;
        setLineTop(0);
        setLineHeight(isLast ? listHeight : Math.max(0, activeOffset));
      }
    };

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    const visualViewport = window.visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener("resize", handleResize);
    }

    let resizeObserver: ResizeObserver | null = null;
    if (listRef.current && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => {
        handleScroll();
      });
      resizeObserver.observe(listRef.current);
    }
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (visualViewport) {
        visualViewport.removeEventListener("resize", handleResize);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [currentYear]);

  useEffect(() => {
    Object.entries(yearRefs.current).forEach(([year, li]) => {
      const description = li?.querySelectorAll("p");
      if (li && description) {
        description.forEach((p) => {
          const element = p as HTMLElement;
          if (year === currentYear) {
            li.style.setProperty("--border", "#e86a02");
            element.style.color = "#f5f5f5";
          } else {
            li.style.setProperty("--border", "");
            element.style.color = "#947C72";
          }
        });
      }
    });
  }, [currentYear]);

  return (
    <div className={styles.container} ref={containerRef}>
      <ol className={styles.history} ref={listRef}>
        <div
          id="box"
          className={styles["history-line"]}
          style={{ height: `${lineHeight}px`, top: `${lineTop}px` }}
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
                <time dateTime={event.period} className={styles.period}>
                  {event.period}
                </time>
                <p className={styles.description}>{event.description}</p>
              </div>
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
}
