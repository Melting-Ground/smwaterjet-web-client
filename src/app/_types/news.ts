// export interface NewsType {
//   id: number;
//   title: string;
//   content: string;
//   url: string;
//   media: string; // 신문사
//   published_at: string;
//   created_at: string;
// }

// export interface NewsPostType {
//   title: string;
//   content: string;
//   url: string;
//   media: string; // 신문사
//   published_at: string;
// }

export interface NewsType {
  title: string;
  description: string;
  link: string;
  originallink: string;
  pubDate: string;
}
