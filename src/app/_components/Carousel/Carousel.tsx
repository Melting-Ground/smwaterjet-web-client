import Image from "next/image";
import styles from "./carousel.module.scss";
import { useCarousel } from "@/_hooks/useCarousel";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const fallbackImages = [
  { src: "/images/work/work1.jpg", alt: "현장사진 1" },
  { src: "/images/work/work2.jpg", alt: "현장사진 2" },
  { src: "/images/work/work3.jpg", alt: "현장사진 3" },
  { src: "/images/work/work4.jpg", alt: "현장사진 4" },
  { src: "/images/work/work5.jpg", alt: "현장사진 5" },
];

export default function Carousel() {
  const [images, setImages] = useState(fallbackImages);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/work-images");
        const data = await response.json();
        if (Array.isArray(data.images) && data.images.length > 0) {
          setImages(data.images);
        }
      } catch (error) {
        // fallback to bundled list if API fails
      }
    };
    fetchImages();
  }, []);

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
            <Link href="/business/photos" className={styles["image-link"]}>
              <Image
                src={image.src}
                alt={image.alt || "현장사진"}
                className={styles.image}
                layout="fill"
                objectFit="cover"
              />
            </Link>
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
