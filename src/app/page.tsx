"use client";

import styles from "./page.module.scss";
import { useAPIData } from "./_hooks/useAPIData";
import { API_URLS } from "./_config/apiConfig";
import { useEffect } from "react";
import { RiArrowRightUpLine } from "@remixicon/react";
import { ArrowUpRight, MessageSquare, Phone, Clock, PhoneCall } from "lucide-react";
import Link from "next/link";
import { formatDate } from "./_utils/formatDate";
import landingPageImage from "/public/images/background-image.jpg";
import Image from "next/image";
import Carousel from "./_components/Carousel/Carousel";
import { Wrench, Hammer, Scissors } from "lucide-react";

interface ListItemProps {
  title: string;
  icon: JSX.Element;
  content: JSX.Element;
}

function ListItem({ title, icon, content }: ListItemProps) {
  return (
    <section className={styles["list-item"]}>
      <div className={styles["card-overlay"]} aria-hidden="true" />
      <div>
        <div className={styles["icon-box"]}>{icon}</div>
        <h2 className={styles.title}>{title}</h2>
        {content}
      </div>
      <div className={styles["card-accent"]} aria-hidden="true" />
      {/* TODO: 더보기 버튼 필요 시 여기 복구 */}
    </section>
  );
}

export default function Home() {
  const { dataList: notices, fetchDataList } = useAPIData<
    typeof API_URLS.notices.method.get
  >(API_URLS.notices);

  useEffect(() => {
    fetchDataList(1, 4); // TODO: limit?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles["top-section"]}>
        <div className={styles["top-inner"]}>
          <div className={styles["top-grid"]}>
            {/* Left Content (모바일에서 이미지 먼저, 텍스트는 아래로 이동하도록 order 조정) */}
            <div className={styles["left-container"]}>
              <h2 className={styles.greeting}>
                <span className={styles["greeting-text"]}>초고압 워터젯 공법으로</span>
                <br />
                <span className={styles["nowrap"]}>
                  <span className={styles.primary}>혁신적인 공사</span>
                  <span className={styles["greeting-text"]}>를 제공합니다</span>
                </span>
              </h2>
              <p className={styles.description}>
                최첨단 장비와 숙련된 기술력으로 도로, 교량, 터널 등 다양한 구조물의
                <br />
                보수, 보강 공사를 수행합니다.
              </p>
            </div>

            {/* Right Image */}
            <div className={styles["hero-media"]}>
              {/* Floating CTA Button */}
              <Link href="/business/waterjet" className={styles["waterjet-more-button"]}>
                <RiArrowRightUpLine className={styles.icon} color="#ffffff" size={20} />
                <span className={styles["cta-line"]}>워터젯</span>
                <span className={styles["cta-line"]}>알아보기</span>
              </Link>

              {/* Hero Image */}
              <div className={styles["photo-wrap"]}>
                <Image
                  src={landingPageImage}
                  alt="성문워터젯 공사현장 사진"
                  className={styles.photo}
                  fill
                  priority
                />
                <div className={styles["image-overlay"]} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className={styles["photo-section"]}>
        <div className={styles["photo-header"]}>
          <p className={styles["photo-eyebrow"]}>OUR WORKS</p>
          <h1 className={styles["photo-title"]}>현장사진</h1>
          <div className={styles["photo-accent"]} />
          <p className={styles["photo-description"]}>
            수많은 현장에서 축적된 성문워터젯의 시공 사례를 담았습니다.
          </p>
        </div>
        <Carousel />
      </section>

      <div className={styles["full-width"]}>
        <div className={styles["service-header"]}>
          <p className={styles["service-eyebrow"]}>OUR SERVICE</p>
          <h2 className={styles["service-title"]}>핵심 서비스</h2>
          <div className={styles["service-accent"]} />
        </div>
        <ul className={styles["list-container"]}>
          <li>
            <ListItem
              title="무손상 해체"
              icon={<Wrench size={32} color="#3272eb" />}
              content={
                <p className={styles.content}>
                  구조물 안전을 지키며
                  {" "}
                  <span className={styles.keyword}>철근 손상 없는 해체</span>를
                  정확하게 진행합니다.
                </p>
              }
            />
          </li>

          <li>
            <ListItem
              title="콘크리트 치핑"
              icon={<Hammer size={32} color="#3272eb" />}
              content={
                <p className={styles.content}>
                  필요한 부위만 선택 제거해
                  {" "}
                  <span className={styles.keyword}>손상 범위를 최소화</span>합니다.
                </p>
              }
            />
          </li>

          <li>
            <ListItem
              title="콘크리트 커팅"
              icon={<Scissors size={32} color="#3272eb" />}
              content={
                <p className={styles.content}>
                  기준선에 맞춰
                  {" "}
                  <span className={styles.keyword}>깔끔한 절단면</span>을 제공합니다.
                </p>
              }
            />
          </li>
        </ul>
      </div>

      <div className={styles["article-container"]}>
        <article className={styles.notice}>
          <div className={styles["notice-header"]}>
            <div className={styles["notice-title-block"]}>
              <div className={styles["notice-icon"]} aria-hidden="true">
                <MessageSquare size={24} />
              </div>
              <h1 className={styles["notice-title-text"]}>공지사항</h1>
            </div>
            <Link
              href="/support/notice"
              className={styles["notice-navigate-link"]}
              aria-label="공지사항 더보기"
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <ol className={styles["notice-list"]}>
            {notices.map((notice) => (
              <li key={notice.id} className={styles["notice-item"]}>
                <Link href={`/support/notice/${notice.id}`}>
                  <div className={styles["notice-item-left"]}>
                    <p className={styles["notice-item-title"]}>{notice.title}</p>
                  </div>
                  <p className={styles["notice-item-date"]}>
                    {formatDate(notice.created_at)}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </article>

        <article className={styles.inquiry}>
          <div className={styles["contact-main"]}>
            <span className={styles["contact-eyebrow"]}>Contact us</span>
            <div className={styles["contact-phones"]}>
              <div className={styles["contact-row"]}>
                <div className={styles["contact-icon"]} aria-hidden="true">
                  <Phone size={18} />
                </div>
                <span className={styles["contact-number"]}>033-261-4175</span>
              </div>
              <div className={styles["contact-row"]}>
                <div className={styles["contact-icon"]} aria-hidden="true">
                  <PhoneCall size={18} />
                </div>
                <span className={styles["contact-number"]}>010-4277-6693</span>
              </div>
            </div>
          </div>

          <div className={styles["contact-hours"]}>
            <Clock size={16} />
            <p>
              상담시간 오전 9시 ~ 오후 6시
              <br />
              토, 일요일, 공휴일은 휴무입니다.
            </p>
          </div>

          <Link href="/support/inquiry/edit" className={styles["contact-cta"]}>
            문의글 작성하기
            <ArrowUpRight size={18} />
          </Link>
        </article>
      </div>
    </div>
  );
}
