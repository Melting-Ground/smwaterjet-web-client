import Link from "next/link";
import Image from "next/image";
import styles from "./layout.module.scss";

export interface GalleryItemType {
  id: number;
  image: string;
  title: string;
  link?: string;
}

interface GalleryProps<T extends GalleryItemType> {
  list: T[];
  isLinkItem?: boolean;
}

export default function GalleryLayout<T extends GalleryItemType>({
  list,
  isLinkItem = false,
}: GalleryProps<T>) {
  return (
    <div className={styles.container}>
      <ol className={styles.gallery}>
        {list && list.length > 0
          ? list.map((item) => (
              // link 태그 등
              <li key={item.id} className={styles["image-container"]}>
                {isLinkItem && item.link ? (
                  <Link href={item.link}>
                    <Image
                      src={item.image}
                      alt={item.title || ""}
                      width={400}
                      height={300}
                      className={styles.image}
                    />
                    <div className={styles.overlay}>
                      <span className={styles.description}>{item.title}</span>
                    </div>
                  </Link>
                ) : (
                  <>
                    <Image
                      src={item.image}
                      alt={item.title || ""}
                      width={400}
                      height={300}
                      className={styles.image}
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
    </div>
  );
}
