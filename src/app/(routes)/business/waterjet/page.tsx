// import Image from "next/image";
import React from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import backgroundImage from "public/images/background-image.jpg";

export default function Waterjet() {
  // TODO: 시멘틱 태그 수정하기
  return (
    <div className={styles.container}>
      <section id="definition">
        <h2 className={styles["sr-only"]}>워터젯(WaterJet) 공법</h2>
        <div className={styles["dark-section"]}>
          <p className={styles.label}>
            <em>워터젯(WaterJet) 공법</em>이란 물을 초고압, 초고속 상태의
            제트루로 만들어
            <br /> 이를 해체 대상 구조물에 분사시킴으로써 콘크리트의 세골작용을
            일으켜
            <br /> 콘크리트만을 선택적으로 파괴시킬 수 있는 획기적인 공법입니다.
          </p>
        </div>
        <div className={styles["inner-container"]}>
          <h3 className={styles["sub-title"]}>
            <em>철근 손상 없이</em> 취약부 제거,
            <br />
            <em>환경과 품질을 동시에</em> 잡는 <em>워터젯 공법</em>
          </h3>

          <div className={styles["image-content-container"]}>
            <div className={styles.content}>
              {/* <p>
                이 공법은 철근을 전혀 손상시키지 않고 해체하므로,
                <br />
                표면 위에 보강 공사를 시행할 때 보강 콘크리트의 부착력을
                증대시킬 수 있습니다.
              </p>
              <p>
                따라서 도로 보수 공사나 <em>교량의 상판 및 교량 하부</em> 보수
                공사 등에서 구조물을 해체하지 않고도 보강이 필요한 열화된
                콘크리트 부분만을 제거하는 데 매우 유용한 공법입니다.
              </p> */}
              <p>
                7-80년대에 건설된 많은 콘크리트 구조물이 보수를 해야 할 시기에
                접어들었습니다.
                <br />
                보수 공법 중 재료에 대한 부분은 상당한 발전과 개발이
                이루어졌지만,
                <br />
                가장 중요한 불량한 부분을 제거하는 방법은 여전히 기능공의
                판단이나 능력에
                <br /> 의존하는 낙후된 방식만이 사용되고 있습니다.
              </p>
              <br />
              <p>
                현재 우리나라를 비롯한 선진국에서는 콘크리트 취약부를 제거하는
                방법으로
                <br />
                <em>워터젯 공법</em>만을 사용하도록 규정하고 있습니다.
                <br />
                이는 시공 중 환경적인 요소와 시공 후 제품의 품질이 뛰어난 것으로
                <br />
                여러 시험을 통해 입증되었기 때문입니다.
              </p>
              <br />
              <p>
                <em>워터젯 공법</em>은{" "}
                <strong>철근을 전혀 손상시키지 않고 해체</strong>하므로,
                <br />
                표면 위에 보강 공사를 시행할 때 보강 콘크리트의 부착력을
                증대시킬 수 있습니다.
              </p>
              <p>
                따라서 <strong>도로 보수 공사</strong>나{" "}
                <strong>교량의 상판 및 교량 하부 보수 공사</strong> 등에서
                구조물을 해체하지 않고도 보강이 필요한 열화된 콘크리트 부분만을
                제거하는 데 매우 탁월합니다.
              </p>
            </div>
            <Image
              className={styles.image}
              src={backgroundImage}
              alt="waterjet"
            />
          </div>
        </div>
      </section>
      {/* TODO: 반복문으로 변경 */}
      <section className={styles.feature} id="feature">
        <div className={styles["feature-title-container"]}>
          <h3 className={styles["sub-title"]}>워터젯 공법의 특징</h3>
          {/* <p className={styles.content}>
            일정한 압력의 물을 각도있게 분사하여 재료의 공극을 파고들어 취약부를
            제거하며
            <br />
            작업이 완료 후에 잔존하는 구조물은 일정한 강도 이상을 반드시 지니게
            됩니다.
          </p> */}
        </div>
        <div className={styles["card-background"]}>
          <ol>
            <li>
              <span className={styles.number}>1</span>
              <p>
                분진과 진동이 없어 시끄럽거나 까다로운 작업 조건에 적합합니다.
              </p>
            </li>
            <li>
              <span className={styles.number}>2</span>
              <p>
                충격과 진동이 없어 인근 구조물에 균열 등의 영향을 주지 않습니다.
              </p>
            </li>
            <li>
              <span className={styles.number}>3</span>
              <p>
                철근의 손상 없이 콘크리트 부식 부위만을 선별하여 제거합니다.
              </p>
            </li>
            <li>
              <span className={styles.number}>4</span>
              <p>재래식 공법에 비해 시공 속도가 매우 빠릅니다.</p>
            </li>
            <li>
              <span className={styles.number}>5</span>
              <p>
                압의의 방향으로 절단이 가능하며, 수중에서도 절단이 가능합니다.
              </p>
            </li>
            {/* 오타 확인 */}
            <li>
              <span className={styles.number}>6</span>
              <p>
                요철 방식으로 표면을 제거해 보강 콘크리트의 부착력이 증대됩니다.
              </p>
            </li>
            <li>
              <span className={styles.number}>7</span>
              <p>
                노즐을 소형화, 경량화, 소비력화함으로써 로보트화가 용이합니다.
              </p>
            </li>
            <li>
              <span className={styles.number}>8</span>
              <p>파쇄되지 않는 면의 구조물을 유지하며 파쇄할 수 있습니다.</p>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
