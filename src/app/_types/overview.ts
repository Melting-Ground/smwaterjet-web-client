export interface OverviewPostType {
  title: string;
  startDate: string; // 0000-00-00
  endDate: string;
  year: number;
  note?: string | null;
}

export interface OverviewType {
  id: number;
  title: string;
  startDate: string; // 0000-00-00
  endDate: string;
  year: number;
  note?: string | null;
}
