import { useEffect, useState } from "react";

export const useCarousel = ({ imagesLength }: { imagesLength: number }) => {
  const startIndex = imagesLength;
  const endIndex = imagesLength * 2;
  const [currentIndex, setCurrentIndex] = useState<number>(startIndex);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  //   const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(onMoveRightSlide, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === endIndex) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(startIndex);
      }, 500);
    } else if (currentIndex < startIndex) {
      setTimeout(() => {
        setCurrentIndex(endIndex - 1);
        setIsTransitioning(false);
      }, 500);
    } else {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
  }, [currentIndex, imagesLength]);

  const onMoveLeftSlide = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const onMoveRightSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return {
    currentIndex,
    onMoveLeftSlide,
    onMoveRightSlide,
    isTransitioning,
    // isButtonDisabled,
  };
};
