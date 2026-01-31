"use client";
import React from "react";
import { RiMapPinLine, RiPhoneLine, RiSmartphoneLine } from "@remixicon/react";
import { MapMarker, Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import styles from "./page.module.scss";
// import { useKakaoLoader } from "@/_hooks/useKakaoLoader";

export default function Location() {
  // useKakaoLoader(KAKAO_SDK_URL);
  return (
    <div className={styles.container}>
      <section>
        <h3 className={styles["sr-only"]}>오시는 길</h3>
        <div className={styles["inner-container"]}>
          <p className={styles.title}>ADDRESS</p>
          <ul className={styles["info-list"]}>
            <li className={styles["info-item"]}>
              <RiMapPinLine size={18} />
              <span>강원특별자치도 춘천시 동내면 신촌길 15</span>
            </li>
            <li className={styles["info-item"]}>
              <RiPhoneLine size={18} />
              <span>033-261-4175</span>
            </li>
            <li className={styles["info-item"]}>
              <RiSmartphoneLine size={18} />
              <span>010-4277-6693</span>
            </li>
          </ul>
          <div className={styles.line} />
          <div className={styles["map-container"]}>
            <Map
              center={{
                lat: 37.8516285,
                lng: 127.7706658,
              }}
              style={{
                width: "100%",
                height: "450px",
              }}
              level={4}
            >
              <MapMarker
                position={{ lat: 37.8516285, lng: 127.7706658 }}
                image={{
                  src: "/images/marker.png",
                  size: {
                    width: 42,
                    height: 42,
                  },
                  options: {
                    offset: {
                      x: 21,
                      y: -10,
                    },
                  },
                }}
              />
              <CustomOverlayMap
                position={{ lat: 37.8516285, lng: 127.7706658 }}
                yAnchor={1}
              >
                <div className={styles["address-link"]}>
                  <a
                    href="https://map.kakao.com/link/map/11394059"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <address>강원특별자치도 춘천시 동내면 신촌길 15</address>
                  </a>
                </div>
              </CustomOverlayMap>
            </Map>
          </div>
        </div>
      </section>
    </div>
  );
}
