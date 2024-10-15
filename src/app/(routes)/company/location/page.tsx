"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { MapMarker, Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import styles from "./page.module.scss";

export default function Location() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const onLoadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setIsLoaded(true);
        });
      }
    };

    if (!window.kakao) {
      window.addEventListener("kakao-map-api-loaded", onLoadKakaoMap);
    } else {
      onLoadKakaoMap();
    }

    return () => {
      window.removeEventListener("kakao-map-api-loaded", onLoadKakaoMap);
    };
  }, []);
  // 37.8516285,127.7706658
  return (
    <div className={styles.container}>
      <section>
        <div className={styles["inner-container"]}>
          <h3 className={styles.title}>오시는 길</h3>

          <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services,clusterer`}
            strategy="beforeInteractive"
            onLoad={() => {
              window.dispatchEvent(new Event("kakao-map-api-loaded"));
            }}
          />
          {isLoaded && (
            <>
              <Map // 지도를 표시할 Container
                center={{
                  // 지도의 중심좌표
                  lat: 37.8516285,
                  lng: 127.7706658,
                }}
                style={{
                  // 지도의 크기
                  width: "100%",
                  height: "450px",
                }}
                level={4} // 지도의 확대 레벨
              >
                <MapMarker // 마커를 생성합니다
                  position={{ lat: 37.8516285, lng: 127.7706658 }}
                  image={{
                    src: "/images/marker.png",
                    size: {
                      width: 42,
                      height: 42,
                    }, // 마커이미지의 크기입니다
                    options: {
                      offset: {
                        x: 21,
                        y: -10,
                      }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    },
                  }}
                />
                <CustomOverlayMap
                  position={{ lat: 37.8516285, lng: 127.7706658 }}
                  yAnchor={1}
                >
                  <div className={styles.address}>
                    <a
                      href="https://map.kakao.com/link/map/11394059"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <address>강원도 춘천시 동내면 신촌길 15</address>
                    </a>
                  </div>
                </CustomOverlayMap>
              </Map>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
