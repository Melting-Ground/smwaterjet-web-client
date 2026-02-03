import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

export async function GET() {
  try {
    const workDir = path.join(process.cwd(), "public", "images", "work");
    const fileNames = await fs.readdir(workDir);
    const images = fileNames
      .filter((name) =>
        IMAGE_EXTENSIONS.includes(path.extname(name).toLowerCase())
      )
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({
        src: `/images/work/${name}`,
        alt: `현장사진 ${path.basename(name, path.extname(name))}`,
      }));

    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ images: [] }, { status: 200 });
  }
}
