"use client";
import React from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { EquipmentType } from "../../_types/equipment";
import { useLocalData } from "../../_hooks/useLocalData";
// import { equipments } from "../../../../public/data/equipments";

export default function Equipment() {
  // 영상
  const { data: equipments } = useLocalData<EquipmentType[]>("equipments");

  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        {equipments ? (
          equipments.map((item) => (
            // link 태그 등
            <Link
              href={`/equipment/${item.id}`}
              key={item.id}
              className={styles["img-container"]}
            >
              <Image
                src={item.image}
                alt={item.name || ""}
                width={400}
                height={300}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <span className={styles.description}>{item.name}</span>
              </div>
            </Link>
          ))
        ) : (
          <>로딩중</>
        )}
      </div>
    </div>
  );
}
