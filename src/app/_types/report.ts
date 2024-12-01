export interface ReportPostType {
  title: string;
  start_date: string; // 0000-00-00
  end_date: string;
  year: string;
  note?: string | null;
}

export interface ReportType {
  id: number;
  title: string;
  start_date: string; // 0000-00-00
  end_date: string;
  year: string;
  note?: string | null;
}
