import Image from "next/image";
import styles from "./carousel.module.scss";
import { useCarousel } from "@/_hooks/useCarousel";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

const images = [
  { src: "/images/banner/company.jpg", alt: "1" },
  { src: "/images/banner/equipment.jpg", alt: "2" },
  { src: "/images/banner/performance.jpg", alt: "3" },
  { src: "/images/banner/support.jpg", alt: "4" },
  { src: "/images/banner/waterjet.jpg", alt: "" },
];

export default function Carousel() {
  const carouselImages = [...images, ...images, ...images];

  const {
    currentIndex,
    onMoveLeftSlide,
    onMoveRightSlide,
    isTransitioning,
    // isButtonDisabled,
  } = useCarousel({
    imagesLength: images.length,
  });

  return (
    <article className={styles["carousel-container"]}>
      <button
        className={styles["left-arrow"]}
        onClick={onMoveLeftSlide}
        aria-label="왼쪽 사진 보기"
        // disabled={isButtonDisabled}
      >
        <RiArrowLeftSLine size={20} />
      </button>
      <ul className={styles.carousel}>
        {carouselImages.map((image, index) => (
          <li
            key={index}
            className={styles["image-container"]}
            style={{
              transform: `translateX(-${currentIndex * (300 + 20)}px)`,
              transition: isTransitioning
                ? "transform 0.5s ease-in-out"
                : "none",
            }}
          >
            <Image
              src={image.src}
              alt={image.src}
              className={`${styles.image}`}
              layout="fill"
              objectFit="cover"
            />
          </li>
        ))}
      </ul>
      <button
        className={styles["right-arrow"]}
        onClick={onMoveRightSlide}
        aria-label="오른쪽 사진 보기"
        // disabled={isButtonDisabled}
      >
        <RiArrowRightSLine size={20} />
      </button>
    </article>
  );
}
