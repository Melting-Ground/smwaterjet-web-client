// import Image from "next/image";
import React from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import image from "../../../_images/background-image.jpg";

export default function Waterjet() {
  return (
    <div className={styles.container}>
      <section id="definition" className={styles.definition}>
        <div className={styles["dark-background"]}>
          <h3 className={styles["sr-only"]}>워터젯(WaterJet) 공법</h3>
          <p className={styles.description}>
            <em>워터젯(WaterJet) 공법</em>이란 물을 초고압, 초고속 상태의
            제트루로 만들어 이를 해체 대상 구조물에 분사시킴으로써
            <br />
            콘크리트의 세골작용을 일으켜 콘크리트만을 선택적으로 파괴시킬 수
            있는 획기적인 공법입니다.
          </p>
        </div>
        <div className={styles["inner-container"]}>
          <div className={styles["image-desc-container"]}>
            <div>
              <p>
                이 공법은 철근을 전혀 손상시키지 않고 해체하므로,
                <br />
                표면 위에 보강 공사를 시행할 때 보강 콘크리트의 부착력을
                증대시킬 수 있습니다.
              </p>
              <p>
                따라서 도로 보수 공사나 교량의 상판 보수 공사 등에서 구조물을
                해체하지 않고도
                <br />
                보강이 필요한 콘크리트 부분만을 제거하는 데 매우 유용한
                공법입니다.
              </p>
              <p>
                7-80년대에 건설된 많은 콘크리트 구조물이 이제 보수를 해야 할
                시기에 접어들었습니다.
              </p>
              <p>
                보수 공법 중 재료에 대한 부분은 상당한 발전과 개발이
                이루어졌지만,
                <br />
                가장 중요한 불량한 부분을 제거하는 방법은 여전히 기능공의
                판단이나 능력에 의존하는
                <br />
                낙후된 방식만이 사용되고 있습니다.
              </p>
              <p>
                현재 우리나라를 비롯한 선진국에서는 콘크리트 취약부를 제거하는
                방법으로
                <br />
                워터젯 공법만을 사용하도록 규정하고 있습니다.
                <br />
                이는 시공 중 환경적인 요소와 시공 후 제품의 품질이 뛰어난 것으로
                <br />
                여러 시험을 통해 입증되었기 때문입니다.
              </p>
            </div>
            <Image className={styles.image} src={image} alt="waterjet" />
          </div>
        </div>
      </section>
      <section className={styles.feature} id="feature">
        <h3>워터젯 공법의 특징</h3>
        <p className={styles.description}>
          일정한 압력의 물을 각도있게 분사하여 재료의 공극을 파고들어 취약부를
          제거하며
          <br />
          작업이 완료 후에 잔존하는 구조물은 일정한 강도 이상을 반드시 지니게
          됩니다.
        </p>
        <div className={styles["card-background"]}>
          <ol>
            <li>
              <span className={styles.number}>
                0<em>1</em>
              </span>
              <p>
                분진과 진동이 없어 시끄럽거나 까다로운 작업 조건에 적합합니다.
              </p>
            </li>
            <li>
              <span className={styles.number}>
                0<em>2</em>
              </span>
              <p>
                충격과 진동이 없어 인근 구조물에
                <br />
                균열 등의 영향을 주지 않습니다.
              </p>
            </li>
            <li>
              <span className={styles.number}>
                0<em>3</em>
              </span>
              <p>
                철근의 손상 없이 콘크리트의 부식된 부위만을 선별하여 제거할 수
                있습니다.
              </p>
            </li>
            <li>
              <span className={styles.number}>
                0<em>4</em>
              </span>
              <p>
                재래식 공법에 비해 시공 속도가
                <br />
                매우 빠릅니다.
              </p>
            </li>
            <li>
              <span className={styles.number}>
                0<em>5</em>
              </span>
              <p>
                압의의 방향으로 절단이 가능하며,
                <br />
                수중에서도 절단이 가능합니다.
              </p>
            </li>
            {/* 오타 확인 */}
            <li>
              <span className={styles.number}>
                0<em>6</em>
              </span>
              <p>
                표면을 요철 방식으로 제거하므로
                <br />
                보강 콘크리트의 부착력이 증대됩니다.
              </p>
            </li>
            <li>
              <span className={styles.number}>
                0<em>7</em>
              </span>
              <p>
                노즐을 소형화, 경량화, 소비력화함으로써
                <br />
                로보트화가 용이합니다.
              </p>
            </li>
            <li>
              <span className={styles.number}>
                0<em>8</em>
              </span>
              <p>
                파쇄되지 않는 면에 대한 충격이 없어
                <br />
                구조물의 성능을 그대로 유지하면서
                <br />
                파쇄할 수 있습니다.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
