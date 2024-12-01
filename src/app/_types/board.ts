export type BoardType = "notice" | "inquiry" | "reports";
export type CategoryType = "support" | "performance";
export const categoryMap: { [key in BoardType]: CategoryType } = {
  notice: "support",
  inquiry: "support",
  reports: "performance",
};
