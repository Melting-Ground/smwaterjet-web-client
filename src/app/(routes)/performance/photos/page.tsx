"use client";
import React from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import { motion } from "framer-motion";

interface ImageItem {
  id: number;
  description?: string;
  src: string;
  alt?: string;
}

export default function Photos() {
  const imageList: ImageItem[] = [
    {
      src: "/images/waterjet.jpg",
      alt: "alt",
      id: 1,
      description: "gkgk",
    },
    {
      src: "/images/waterjet.jpg",
      alt: "alt",
      id: 1,
      description: "gkgk",
    },
    {
      src: "/images/waterjet.jpg",
      alt: "alt",
      id: 1,
      description: "gkgk",
    },
    {
      src: "/images/waterjet.jpg",
      alt: "alt",
      id: 1,
      description: "gkgk",
    },
    {
      src: "/images/waterjet.jpg",
      alt: "alt",
      id: 1,
      description: "gkgk",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        {imageList.map((image) => (
          // link 태그 등
          <div key={image.id} className={styles["img-container"]}>
            <motion.div
              whileHover={{ scale: 1.08 }}
              className={styles["hover-effect"]}
            >
              <Image
                src={image.src}
                alt={image.alt || ""}
                width={400}
                height={300}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <span className={styles.description}>{image.description}</span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
