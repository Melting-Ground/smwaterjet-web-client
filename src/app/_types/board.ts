export type BoardType = "notice" | "inquiry" | "overview";
export type CategoryType = "support" | "performance";
export const categoryMap: { [key in BoardType]: CategoryType } = {
  notice: "support",
  inquiry: "support",
  overview: "performance",
};
