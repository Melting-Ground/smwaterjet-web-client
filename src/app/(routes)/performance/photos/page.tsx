import React from "react";
import src from "../../../../../public/images/waterjet.jpg";
import Image from "next/image";
import styles from "./page.module.scss";

export default function Photos() {
  return (
    <div className={styles.container}>
      <div className={styles["image-container"]}>
        <Image src={src} alt="alt" width={400} className={styles.image} />
        <Image src={src} alt="alt" width={400} className={styles.image} />
        <Image src={src} alt="alt" width={400} className={styles.image} />
        <Image src={src} alt="alt" width={400} className={styles.image} />
        <Image src={src} alt="alt" width={400} className={styles.image} />
      </div>
    </div>
  );
}
