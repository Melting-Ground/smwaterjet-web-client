import fs from "node:fs";
import path from "node:path";
import PhotoGrid, { WorkMedia } from "./PhotoGrid";
import styles from "./page.module.scss";

const MEDIA_DIRECTORY = path.join(process.cwd(), "public", "images", "workList");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".ogg", ".mov"]);

function getWorkMedia() {
  if (!fs.existsSync(MEDIA_DIRECTORY)) return [];

  return fs
    .readdirSync(MEDIA_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => ({
      name: entry.name,
      extension: path.extname(entry.name).toLowerCase(),
    }))
    .filter(
      ({ extension }) =>
        IMAGE_EXTENSIONS.has(extension) || VIDEO_EXTENSIONS.has(extension)
    )
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true })
    );
}

export default function Photos() {
  const media: WorkMedia[] = getWorkMedia().map(({ name, extension }) => ({
    name,
    src: `/images/workList/${encodeURIComponent(name)}`,
    thumbnailSrc: fs.existsSync(
      path.join(MEDIA_DIRECTORY, "thumbs", `${path.parse(name).name}.webp`)
    )
      ? `/images/workList/thumbs/${encodeURIComponent(path.parse(name).name)}.webp`
      : `/images/workList/${encodeURIComponent(name)}`,
    type: VIDEO_EXTENSIONS.has(extension) ? "video" : "image",
  }));

  return (
    <section className={styles.container}>
      <h1 className={styles["sr-only"]}>현장사진</h1>
      <div className={styles["photos-container"]}>
        <PhotoGrid media={media} />
      </div>
    </section>
  );
}
