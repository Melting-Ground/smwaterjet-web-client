"use client";
import React from "react";
import styles from "./page.module.scss";
import Vibration from "@/_icons/Vibration";
import Corrosive from "@/_icons/Corrosive";
import SunRays from "@/_icons/SunRays";
import Transport from "@/_icons/Transport";
import Wave from "@/_icons/Wave";
import Optimization from "@/_icons/Optimization";
import Target from "@/_icons/Target";
import Stability from "@/_icons/Stability";
import Eco from "@/_icons/Eco";
import Energy from "@/_icons/Energy";
import AcidRain from "@/_icons/AcidRain";
import Button from "@/_components/Button/Button";
import { useRouter } from "next/navigation";
import { RiArrowRightUpLine } from "@remixicon/react";

export default function Fields() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <section id="waterjet-method" className={styles["waterjet-method"]}>
        <header className={styles.header}>
          <p className={styles["header-title"]}>
            혁신적인 워터젯 공법으로 교량의 수명을 연장합니다.
          </p>
          <p className={styles["header-description"]}>
            최신 고압 워터젯 기술을 통해 <br />
            <em>교량 상부 및 하부 구조물의 열화</em>를 정밀하게 보수하며 <br />
            <em>안전성과 내구성을 극대화</em>합니다.
          </p>
        </header>

        <main className={styles.main}>
          <section
            id="bridge-superstructure"
            aria-labelledby="superstructure-heading"
          >
            {/* <h3 id="superstructure-heading">교량 상부의 주요 열화 요인</h3> */}

            <h4 className={styles["list-title"]}>교량 상부 주요 열화 요인</h4>
            <p className={styles["list-description"]}>
              교량 상부 구조물은 차량 하중, 날씨 변화, 염분 침투 등 외부
              요인으로 인해 시간이 지남에 따라 열화가 진행됩니다.
              <br />
              이러한 열화는 교량의 안전성과 내구성에 큰 영향을 미칩니다.
            </p>
            <ul className={styles.list}>
              <li className={styles["list-item"]}>
                <div className={styles["list-item-card"]}>
                  <div className={styles["list-item-card-inner"]}>
                    {/* <Image src={truck} alt="트럭" width={50} /> */}
                    <Transport alt="차량 하중" width={50} color={"#f4f4f4"} />
                  </div>
                </div>
                <p className={styles["list-item-title"]}>차량 하중</p>
                <p className={styles["list-item-description"]}>
                  반복적인 차량 하중으로 인한
                  <br />
                  상판과 보 구조 손상
                </p>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["list-item-card"]}>
                  <div className={styles["list-item-card-inner"]}>
                    <SunRays alt="자외선" width={40} color={"#F4F4F4"} />
                  </div>
                  {/* <Image src={sunRays} alt="자외선" width={50} /> */}
                </div>
                <p className={styles["list-item-title"]}>환경적 요인</p>
                <p className={styles["list-item-description"]}>
                  자외선, 비, 눈 등<br />
                  날씨 변화로 인한 열화
                </p>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["list-item-card"]}>
                  <div className={styles["list-item-card-inner"]}>
                    <Corrosive alt="염분 침투" width={35} color={"#F4F4F4"} />
                  </div>
                </div>
                <p className={styles["list-item-title"]}>염분 침투</p>
                <p className={styles["list-item-description"]}>
                  도로 제설 작업 중 사용된
                  <br />
                  염분으로 인한 철근 부식
                </p>
              </li>
            </ul>
            {/* <p className={styles.solution}>
            <strong>해결 방안:</strong> 워터젯 공법을 통해 교량 상부 구조물의
            열화된 부분만 정밀하게 제거하고 보강 작업을 지원하여 구조물의
            안정성을 유지합니다.
          </p> */}
          </section>

          <section
            id="bridge-substructure"
            aria-labelledby="substructure-heading"
          >
            {/* <h3 id="substructure-heading">
            교량 하부의 안정성을 유지하는 핵심 기술
          </h3> */}
            <h4 className={styles["list-title"]}>교량 하부 주요 열화 요인</h4>
            <p className={styles["list-description"]}>
              교량 하부 구조물은 하천, 해안, 도로 환경에 노출되어 다양한 열화
              요인에 의해 손상될 가능성이 높습니다.
              <br />
              교량 하부는 교각, 기초, 받침대 등 교량 전체를 지탱하는 핵심
              구조물로, 정밀한 관리가 필수적입니다.
            </p>
            <ul className={styles.list}>
              <li className={styles["list-item"]}>
                <div className={styles["list-item-card"]}>
                  <div className={styles["list-item-card-inner"]}>
                    <Wave alt="하천 흐름" width={40} color={"#F4F4F4"} />
                  </div>
                </div>
                <p className={styles["list-item-title"]}>환경적 요인</p>
                <p className={styles["list-item-description"]}>
                  하천 흐름에 의한 침식,
                  <br />
                  염분 노출, 습기로 인한 열화
                </p>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["list-item-card"]}>
                  <div className={styles["list-item-card-inner"]}>
                    <Vibration
                      alt="반복적인 진동"
                      width={42}
                      color={"#F4F4F4"}
                    />
                  </div>
                </div>
                <p className={styles["list-item-title"]}>구조적 요인</p>
                <p className={styles["list-item-description"]}>
                  진동, 하중, 토사의 이동으로
                  <br />
                  인한 구조물 약화
                </p>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["list-item-card"]}>
                  <div className={styles["list-item-card-inner"]}>
                    <AcidRain alt="산성비" width={45} color={"#F4F4F4"} />
                  </div>
                </div>
                <p className={styles["list-item-title"]}>화학적 요인</p>
                <p className={styles["list-item-description"]}>
                  산성비, 염화물 침투로 인한
                  <br />
                  콘크리트 및 철근 부식
                </p>
              </li>
            </ul>

            {/* <p className={styles.solution}>
            <strong>해결 방안:</strong> 고압 워터젯 기술로 열화된 부분을 정밀
            제거하고, 철근을 노출 및 보존하여 안정적이고 효율적인 보강 작업을
            지원합니다.
          </p> */}
          </section>

          <section
            id="waterjet-advantages"
            className={styles["waterjet-advantage"]}
            aria-labelledby="advantages-heading"
          >
            <h3 className={styles["list-title"]}>해결 방안</h3>
            <p className={styles["list-description"]}>
              <em>워터젯 공법</em>을 통해 구조물의{" "}
              <strong>열화된 부분만 정밀하게 제거</strong>하고{" "}
              <strong>보강 작업을 지원</strong>하여{" "}
              <em>구조물의 안정성을 유지</em>합니다.
            </p>

            {/* <h3 id="advantages-heading">워터젯 공법의 차별화된 기술력</h3> */}
            <ul className={styles["grid-list"]}>
              <li className={styles["grid-list-item"]}>
                <p className={styles["grid-list-item-circle"]}>
                  <Target alt="정밀성" width={45} color="#3272eb" />
                  <p className={styles["grid-list-item-title"]}>정밀성</p>
                </p>

                <p className={styles["grid-list-item-description"]}>
                  열화된 콘크리트를
                  <br />
                  <em>선택적으로 제거</em>
                </p>
              </li>
              <li className={styles["grid-list-item"]}>
                <p className={styles["grid-list-item-circle"]}>
                  <Stability alt="안정성" width={45} color="#3272eb" />
                  <p className={styles["grid-list-item-title"]}>안정성</p>
                </p>
                <p className={styles["grid-list-item-description"]}>
                  <em>구조물 손상을 최소화</em>하고
                  <br />
                  철근을 보존
                </p>
              </li>
              <li className={styles["grid-list-item"]}>
                <p className={styles["grid-list-item-circle"]}>
                  <Eco alt="친환경성" width={45} color="#3272eb" />
                  <p className={styles["grid-list-item-title"]}>친환경성</p>
                </p>
                <p className={styles["grid-list-item-description"]}>
                  먼지 및 유독 물질
                  <br />
                  <em>발생 억제</em>
                </p>
              </li>
              <li className={styles["grid-list-item"]}>
                <p className={styles["grid-list-item-circle"]}>
                  <Energy alt="효율성" width={45} color="#3272eb" />
                  <p className={styles["grid-list-item-title"]}>효율성</p>
                </p>
                <p className={styles["grid-list-item-description"]}>
                  좁고 접근이 어려운
                  <br />
                  구조물에서도 <em>작업 가능</em>
                </p>
              </li>
              <div className={styles["inside-card"]}>
                <p className={styles["inside-card-title"]}>WaterJet</p>
                <Optimization alt="최적" width={150} color="#dce6f7" />
              </div>
            </ul>
          </section>
        </main>
        <footer className={styles.footer}>
          <p className={styles["highlighted-text"]}>
            정기적인 점검과 적절한 보수 작업은
            <br />
            교량의 안정성과 수명을 유지하는 데 필수적입니다.
          </p>

          <p className={styles["waterjet-solution"]}>
            삼형 건설의 워터젯 기술은 열화된 부분만 선택적으로 제거하여 교량
            보강 및 복구 작업을 효율적으로 지원합니다.
          </p>
          <article className={styles["inquiry-article"]}>
            <p className={styles["inquiry-text"]}>
              지금 문의하셔서 맞춤형 솔루션을 경험해보세요.
            </p>
            <Button
              color="blue"
              className={styles["inquiry-button"]}
              onClick={() => {
                router.push("/support/inquiry/edit");
              }}
              icon={<RiArrowRightUpLine color="#ffffff" size={20} />}
            >
              문의하기
            </Button>
          </article>
          {/* <a href="/projects" className="btn btn-secondary">
            프로젝트 사례 보기
          </a> */}
        </footer>
      </section>
    </div>
  );
}
