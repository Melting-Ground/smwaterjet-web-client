"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useLocalData } from "@/_hooks/useLocalData";
import { EquipmentType } from "@/_types/equipment";
import Image from "next/image";
import styles from "./page.module.scss";
import Button from "@/_components/Button/Button";

export default function EquipmentDetailLayout() {
  const { id } = useParams();
  //   const equipment = equipments.find((item) => item.id === Number(id));
  const { data: equipments } = useLocalData<EquipmentType[]>("equipments");
  const equipment = equipments
    ? equipments.find((item) => item.id === Number(id))
    : null;
  const router = useRouter();
  const goToList = () => {
    router.push("/equipment");
  };

  return (
    <section className={styles.container}>
      <h3 className={styles["equipment-name"]}>
        {equipment ? equipment.name : null}
      </h3>
      {equipment ? (
        <div className={styles["item-container"]}>
          <div className={styles["image-container"]}>
            <Image
              src={equipment.image}
              alt={equipment.name}
              objectFit="cover"
              fill
            />
          </div>
          {/* <div className={styles["item-info-button-container"]}> */}
          <div className={styles["item-info"]}>
            <p
              className={styles["item-info-title"]}
              aria-label="시설 및 장비명"
            >
              시설 및 장비명
            </p>
            <p aria-label={equipment.name}>{equipment.name}</p>

            <p className={styles["item-info-title"]} aria-label="규격">
              규격
            </p>
            <p aria-label={equipment.standard}>{equipment.standard}</p>

            <p className={styles["item-info-title"]} aria-label="가격">
              가격
            </p>
            <p aria-label={equipment.price}>{equipment.price}</p>

            <p className={styles["item-info-title"]} aria-label="구입년도">
              구입년도
            </p>
            <p aria-label={equipment.purchased_year}>
              {equipment.purchased_year}년
            </p>

            <p className={styles["item-info-title"]} aria-label="용도">
              용도
            </p>
            <p aria-label={equipment.use}>{equipment.use}</p>

            <p className={styles["item-info-title"]} aria-label="보유기관">
              보유기관
            </p>
            <p aria-label={equipment.own}>{equipment.own}</p>
          </div>
          {/* </div> */}
        </div>
      ) : (
        <>로딩중</>
      )}
      <Button
        color="primary"
        className={styles["go-list-button"]}
        onClick={goToList}
      >
        목록으로
      </Button>
    </section>
  );
}
