import Link from "next/link";
import Image from "next/image";
import styles from "./layout.module.scss";
import Pagination from "@/_components/Pagination/Pagination";
import { PhotoType } from "@/_types/photo";

export interface GalleryItemType {
  id: number;
  image: string;
  title: string;
  link?: string;
}

interface GalleryProps<T extends PhotoType> {
  list: T[];
  isLinkItem?: boolean;
  handleItemClick?: (item: PhotoType) => void;
  // 페이지네이션 (옵셔널?)
  handleArrowClick?: (direction: "prev" | "next") => void;
  handlePageClick?: (page: number) => void;
  pages?: number[];
  currentPage?: number;
}

export default function GalleryLayout<T extends PhotoType>({
  list,
  isLinkItem = false,
  handleItemClick,
  handleArrowClick,
  handlePageClick,
  pages,
  currentPage,
}: GalleryProps<T>) {
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  const handlePrevArrowClick = () => {
    if (!handleArrowClick) return;
    handleArrowClick("prev");
  };
  const handleNextArrowClick = () => {
    if (!handleArrowClick) return;

    handleArrowClick("next");
  };
  const handlePageButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!handlePageClick) return;
    const value = (e.target as HTMLButtonElement).value;
    handlePageClick(Number(value));
  };
  return (
    <div className={styles.container}>
      <ol className={styles.gallery}>
        {list && list.length > 0
          ? list.map((item) => (
              // link 태그 등
              <li key={item.id} className={styles["image-container"]}>
                {isLinkItem ? (
                  <Link href={`/${item.id}`}>
                    <Image
                      src={`${imageBaseUrl}/${item.path}`}
                      alt={item.title || ""}
                      width={400}
                      height={0}
                      layout="intrinsic"
                      className={styles.image}
                    />
                    <div className={styles.overlay}>
                      <span className={styles.description}>{item.title}</span>
                    </div>
                  </Link>
                ) : (
                  <>
                    <Image
                      src={`${imageBaseUrl}/${item.path}`}
                      alt={item.title || ""}
                      width={400}
                      height={0}
                      layout="intrinsic"
                      className={styles.image}
                      onClick={() => handleItemClick && handleItemClick(item)}
                    />
                    <div className={styles.overlay}>
                      <span className={styles.description}>{item.title}</span>
                    </div>
                  </>
                )}
              </li>
            ))
          : null}
      </ol>
      {pages && currentPage ? (
        <Pagination
          currentPage={currentPage}
          pages={pages}
          handlePageButtonClick={handlePageButtonClick}
          handlePrevArrowClick={handlePrevArrowClick}
          handleNextArrowClick={handleNextArrowClick}
        />
      ) : null}
    </div>
  );
}
